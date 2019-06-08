import { Component, OnInit, Inject } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { MatIconRegistry, MatDialog } from '@angular/material';

import { ToastyService, ToastyConfig, ToastOptions, ToastData } from 'ng2-toasty';
import { BrowserModule } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { PageSize } from '../_config/PageSize.config';
import { Player, PlayerPageList } from './Models/player.model';
import { PlayerService } from './Services/player.service';
import { DialogComponent } from '../dialog/dialog.component';

@Component({
    selector: 'app-playerview',
    templateUrl: './player.view.html',
    providers: [PlayerService, ToastyService, ToastyConfig]
})
/** Player component*/
export class PlayerViewComponent implements OnInit {
    /** Player ctor */
    user: any;
    varJsonString: any;

    public loading = false;
    items: Array<any>;
    position = 'below';
    PageSize: string;
    p: number;
    PlayerPageListObj: PlayerPageList = new PlayerPageList();
    destinationId: string;
    employeeId: string;

    // tslint:disable-next-line:max-line-length
    constructor(private _router: Router, private _PlayerService: PlayerService, public dialog: MatDialog, private toastyService: ToastyService, private toastyConfig: ToastyConfig) {
        this.toastyConfig.theme = 'bootstrap';
        this.toastyConfig.position = 'top-center';
        this.PageSize = new PageSize().PageSize;
    }

    /** Called by Angular after Player component initialized */
    pagechangevents(ev: any) {
        this.GetPlayerPageListListing(ev);
    }

    GetPlayerPageListListing(pageno: number) {
        this.loading = true;
        this._PlayerService.GetallPlayerPageList(pageno, this.PageSize).subscribe
            (
            data => {
                this.loading = false;
                this.PlayerPageListObj.PlayerPageList = data.players;
                this.PlayerPageListObj.totalRecords = data.totalRecords;
            },
            err => {
                if (err) {
                    this.toastyService.warning('An Error has occured please try again after some time !' + err);
                }
            });


    }

    /* Dialog for delete  */

    // tslint:disable-next-line:member-ordering
    Yes: string;
    // tslint:disable-next-line:member-ordering
    No: string;
    // tslint:disable-next-line:member-ordering
    tempId: number;

    openDialog(Id: number, did: string) {
        // console.log(Id);
        this.tempId = Id;
        this.destinationId = did;
        // tslint:disable-next-line:prefer-const
        let dialogRef = this.dialog.open(DialogComponent, {
            width: '250px',
            data: {
                Yes: this.Yes, No: this.No
            }
        });

        dialogRef.afterClosed().subscribe(result => {
            // console.log('The dialog was closed');
            this.No = result;
            if (result === 'Yes') {
                this.DeleteRecored(this.tempId);
            }
        });
    }

    // -----------
    ngOnInit(): void {
        this.varJsonString = localStorage.getItem('UHKey');
        this.user = JSON.parse(this.varJsonString);
        this.employeeId = this.user.AdminId;
        this.GetPlayerPageListListing(1);
        this.p = 1;
    }

    DeleteRecored(Id: number) {
        this._PlayerService.DeletePlayer(Id).subscribe
            (
            data => {

                this.GetPlayerPageListListing(1);
                this.toastyService.success('Data Deleted Sucessfuly');
            },
            err => {
                if (err) {
                    this.toastyService.warning('An Error has occured please try again after some time !' + err);
                }
            });

    }
}
