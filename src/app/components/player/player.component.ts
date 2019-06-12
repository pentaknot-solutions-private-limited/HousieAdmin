import { Component, OnInit } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastyService, ToastyConfig, ToastOptions, ToastData } from 'ng2-toasty';

import { Player, PlayerPageList } from './Models/player.model';
import { PlayerService } from './Services/player.service';
import { FormControl, Validators, NgModel, ReactiveFormsModule } from '@angular/forms';

const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

@Component({
    selector: 'app-player',
    templateUrl: './player.component.html',
    styleUrls: ['./player.component.css'],
    providers: [ToastyService, ToastyConfig, PlayerService]
})
export class PlayerComponent implements OnInit {

    user: any;
    varJsonString: any;
    public loading = false;
    position = 'below';

    public test: string;
    Player: Player = new Player();
    items: Array<Player>;
    ID: string;
    Viewname: string;
    Isdisabled: boolean;
    alldisabled: boolean;
    selectedMoment: any;

    // ---------------------Email validation--------------------------//

    private emailFormControl = new FormControl('', [Validators.required, Validators.pattern(EMAIL_REGEX)]);
    //   ------Email validation------

    emailId = new FormControl('', [Validators.required, Validators.email]);

    getErrorMessage() {

        return this.emailFormControl.hasError('required') ? 'You must enter a value' :
            this.emailFormControl.hasError('pattern') ? ' Not a valid email' : '';

    }


    // tslint:disable-next-line:max-line-length
    constructor(private _router: Router, private _PlayerService: PlayerService, private _routeParams: ActivatedRoute, private toastyService: ToastyService, private toastyConfig: ToastyConfig) {
        this.toastyConfig.theme = 'bootstrap';
        this.toastyConfig.position = 'top-center';

        // this.selectedMoment = new Date();
    }

    onSubmit() {
        this.loading = true;
        // this.isdisabled = true;
        this._PlayerService.AddPlayer(this.Player).subscribe
            (
                data => {


                    this.loading = false;
                    if (this.Viewname !== 'edit') {

                        this.resetFormdata();
                        this.toastyService.success('Data Added Sucessfuly');
                    } else {

                        this.toastyService.success('Records Updated Sucessfuly');
                    }

                },
                err => {
                    if (err) {
                        this.toastyService.warning('An Error has occured please try again after some time !' + err);
                        this.loading = false;

                    }
                });
    }

    resetFormdata() {
        // this.isdisabled = false;
        this.Player.name = '';
        this.Player.email = '';
        this.Player.mobileNumber = '';
        this.Player.address = '';
        this.Player.passwordHash = '';
    }

    ngOnInit() {
        this.varJsonString = localStorage.getItem('UHKey');
        this.user = JSON.parse(this.varJsonString);
        this.ID = this._routeParams.snapshot.params['ID'];
        this.Viewname = this._routeParams.snapshot.params['Viewname'];
        if (this.ID == null) {
            this.Player.createdBy = this.user.AdminId;
        }
        if (this.Viewname === 'view') {
            this.Isdisabled = true;
            this.alldisabled = true;
        }
        if (this.Viewname === 'edit') {
            this.Isdisabled = false;
            this.alldisabled = true;
        }
        if (this.ID != null) {
            this.loading = true;
            this._PlayerService.EditPlayer(this.ID).
                subscribe
                (
                    data => {
                        this.loading = false;
                        this.Player = <Player>data;
                        this.Player.updatedBy = this.user.AdminId;
                    },
                    err => {
                        if (err) {
                            this.toastyService.warning('An Error has occured please try again after some time !' + err);
                        }
                    });
        }
    }

}
