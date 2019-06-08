import { Component, OnInit } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastyService, ToastyConfig, ToastOptions, ToastData } from 'ng2-toasty';
import { Match, MatchPrizeRel, Images, MatchPriceRel } from './Models/match.model';
import { MatchService } from './Services/match.service';
import { FormControl } from '@angular/forms';
import { ImageConfig } from '../_config/Img.config';

@Component({
    selector: 'app-match',
    templateUrl: './match.component.html',
    styleUrls: ['./match.component.css'],
    providers: [ToastyService, ToastyConfig, MatchService]
})
export class MatchComponent implements OnInit {
    user: any;
    varJsonString: any;
    public loading = false;
    position = 'below';
    selected: FormControl = new FormControl();
    public test: string;
    Match: Match = new Match();
    MatchPrizeRel: MatchPrizeRel = new MatchPrizeRel();
    // MatchPriceRel: MatchPriceRel = new MatchPriceRel();
    MatchPriceRel: Array<MatchPriceRel> = [];
    Images: Images = new Images();
    items: Array<Match>;
    ID: string;
    Viewname: string;
    Isdisabled: boolean;
    selectedMoment: any;
    img1: string;
    img2: any;
    img3: any;
    img4: any;
    tempMatchId: string;
    indexedArray: Array<any> = [];
    ImgUrl: string;
    // indexedArray;
    // tslint:disable-next-line:max-line-length
    constructor(private _router: Router, private _MatchService: MatchService, private _routeParams: ActivatedRoute, private toastyService: ToastyService, private toastyConfig: ToastyConfig) {
        this.toastyConfig.theme = 'bootstrap';
        this.toastyConfig.position = 'top-center';
        // this.selectedMoment = new Date();
        this.ImgUrl = new ImageConfig().ImgURL;
    }


    onSubmit() {
        this.loading = true;
        // this.isdisabled = true;
        this._MatchService.AddMatch(this.Match).subscribe
            (
                data => {
                    this.loading = false;
                    if (this.Viewname !== 'edit') {
                        this.tempMatchId = data;
                        this.MatchPrizeRel.matchId = this.tempMatchId;
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

    onPrizeRelSubmits() {
        this.MatchPrizeRel.imageDetails = [...this.indexedArray];
        // console.log(this.MatchPrizeRel.imageDetails);
    }

    onPrizeRelSubmit() {
        this.loading = true;
        this.MatchPrizeRel.imageDetails = [...this.indexedArray];
        this._MatchService.AddMatchPrize(this.MatchPrizeRel).subscribe
            (
                data => {
                    this.loading = false;
                    // this.tempMatchId = data.data;
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

    GetMatchPriceRel() {
         this._MatchService.GetMatchPrizeByMatchId(this.ID).
            subscribe
            (
                data => {
                    this.loading = false;
                    this.MatchPriceRel = data;
                    // console.log(this.MatchPriceRel);
                    },
                err => {
                    if (err) {
                        this.toastyService.warning('An Error has occured please try again after some time !' + err);
                    }
                });
    }

    resetFormdata() {
        // this.isdisabled = false;
        this.Match.title = '';
        this.Match.description = '';
    }

    change(index: number) {
        this.selected.setValue(index);
    }

    onSelectFile(event, dp) {
        if (event.target.files && event.target.files[0]) {
            const reader = new FileReader();
            reader.readAsDataURL(event.target.files[0]); // read file as data url
            reader.onload = () => {
                switch (dp) {
                    case 1: this.img1 = reader.result.toString();
                        const img = reader.result.toString().split(',');
                        this.indexedArray.push({ 'displayPosition': dp, 'fileName': img[1] });
                        break;
                    case 2: this.img2 = reader.result.toString();
                        const imgs = reader.result.toString().split(',');
                        this.indexedArray.push({ 'displayPosition': dp, 'fileName': imgs[1] }); break;
                    case 3: this.img3 = reader.result.toString();
                        const imgr = reader.result.toString().split(',');
                        this.indexedArray.push({ 'displayPosition': dp, 'fileName': imgr[1] }); break;
                    case 4: this.img4 = reader.result.toString();
                        const imgt = reader.result.toString().split(',');
                        this.indexedArray.push({ 'displayPosition': dp, 'fileName': imgt[1] }); break;
                }
            };
            // console.log(this.indexedArray);
        }
    }
    ngOnInit() {
        this.varJsonString = localStorage.getItem('UHKey');
        this.user = JSON.parse(this.varJsonString);
        this.ID = this._routeParams.snapshot.params['ID'];
        this.Viewname = this._routeParams.snapshot.params['Viewname'];
        if (this.ID == null) {
            this.Match.createdBy = this.user.AdminId;
        }
        if (this.Viewname === 'view') {
            this.Isdisabled = true;
            this.MatchPrizeRel.matchId = this.ID;
            this.GetMatchPriceRel();
        }
        if (this.Viewname === 'edit') {
            this.Isdisabled = false;
            this.MatchPrizeRel.matchId = this.ID;
            this.GetMatchPriceRel();
        }
        if (this.ID != null) {
            this.loading = true;
            this._MatchService.EditMatch(this.ID).
                subscribe
                (
                    data => {
                        this.loading = false;
                        this.Match = <Match>data;
                        this.Match.updatedBy = this.user.AdminId;
                    },
                    err => {
                        if (err) {
                            this.toastyService.warning('An Error has occured please try again after some time !' + err);
                        }
                    });
        }
    }
}
