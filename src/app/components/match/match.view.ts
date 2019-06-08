import { Component, OnInit, Inject } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { MatIconRegistry, MatDialog } from '@angular/material';

import { ToastyService, ToastyConfig, ToastOptions, ToastData } from 'ng2-toasty';
import { BrowserModule } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { PageSize } from '../_config/PageSize.config';
import { Match, MatchPageList } from './Models/match.model';
import { MatchService } from './Services/match.service';
import { DialogComponent } from '../dialog/dialog.component';
import { AppConfig } from '../_config/app.config';

@Component({
    selector: 'app-matchview',
    templateUrl: './match.view.html',
    providers: [MatchService, ToastyService, ToastyConfig]
})
/** Match component*/
export class MatchViewComponent implements OnInit {
    /** Match ctor */
    user: any;
    varJsonString: any;

    public loading = false;
    items: Array<any>;
    position = 'below';
    PageSize: string;
    p: number;
    MatchPageListObj: MatchPageList = new MatchPageList();
    destinationId: string;
    employeeId: string;
    websiteUrl = new AppConfig().websiteUrl;

    // tslint:disable-next-line:max-line-length
    constructor(private _router: Router, private _MatchService: MatchService, public dialog: MatDialog, private toastyService: ToastyService, private toastyConfig: ToastyConfig) {
        this.toastyConfig.theme = 'bootstrap';
        this.toastyConfig.position = 'top-center';
        this.PageSize = new PageSize().PageSize;
    }

    /** Called by Angular after Match component initialized */
    pagechangevents(ev: any) {
        this.GetMatchPageListListing(ev);
    }

    GetMatchPageListListing(pageno: number) {
        this.loading = true;
        this._MatchService.GetallMatchPageList(pageno, this.PageSize).subscribe
            (
            data => {
                this.loading = false;
                this.MatchPageListObj.MatchPageList = data.matchDetailss;
                this.MatchPageListObj.totalRecords = data.totalRecords;
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
        this.GetMatchPageListListing(1);
        this.p = 1;
    }

    copyStringToClipboard (str) {
        const el = document.createElement('textarea');
        el.value = str;
        el.setAttribute('readonly', '');
        document.body.appendChild(el);
        el.select();
        document.execCommand('copy');
        document.body.removeChild(el);
     }

    getMatchUrl(matchId, matchToken) {
        this.websiteUrl += 'claim';
        matchId = encodeURIComponent(matchId);
        matchToken = encodeURIComponent(matchToken);
        this.websiteUrl += '/' + matchId + '/' + matchToken;
        this.copyStringToClipboard(this.websiteUrl);
        this.toastyService.success('Link Copied Sucessfuly');
        this.websiteUrl = new AppConfig().websiteUrl;
    }

    DeleteRecored(Id: number) {
        this._MatchService.DeleteMatch(Id).subscribe
            (
            data => {

                this.GetMatchPageListListing(1);
                this.toastyService.success('Data Deleted Sucessfuly');
            },
            err => {
                if (err) {
                    this.toastyService.warning('An Error has occured please try again after some time !' + err);
                }
            });

    }
}
