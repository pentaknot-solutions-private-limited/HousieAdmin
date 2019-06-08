import { Component, OnInit } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastyService, ToastyConfig, ToastOptions, ToastData } from 'ng2-toasty';
import { Speech } from 'speak-tts';
import { Match } from './Models/match.model';
import { MatchDetailsRel } from './Models/matchdetailsrel.model';
import { MatchService } from './Services/match.service';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { MatchSummaryModel } from './Models/match.summary.model';
import { ImageConfig } from '../_config/Img.config';

@Component({
  selector: 'app-matchsummary',
  templateUrl: './match.summary.html',
  styleUrls: ['./match.component.css'],
  providers: [ToastyService, ToastyConfig, MatchService]
})
export class MatchSummaryComponent implements OnInit {

  user: any;
  varJsonString: any;
  public loading = false;
  position = 'below';

  public test: string;
  FullHousie: MatchSummaryModel = new MatchSummaryModel();
  FirstLine: MatchSummaryModel = new MatchSummaryModel();
  SecondLine: MatchSummaryModel = new MatchSummaryModel();
  ThirdLine: MatchSummaryModel = new MatchSummaryModel();
  Lucky: MatchSummaryModel = new MatchSummaryModel();
  Match: Match = new Match();
  MatchDetailsRel: MatchDetailsRel = new MatchDetailsRel();
  items: Array<Match>;
  ID: string;
  Viewname: string;
  Isdisabled: boolean;
  ImgUrl: string;
  // tslint:disable-next-line:max-line-length
  constructor(private _router: Router, private _MatchService: MatchService, private _routeParams: ActivatedRoute, private toastyService: ToastyService, private toastyConfig: ToastyConfig) {
    this.toastyConfig.theme = 'bootstrap';
    this.toastyConfig.position = 'top-center';
    this.ImgUrl = new ImageConfig().ImgURL;

    // this.selectedMoment = new Date();
  }



  ngOnInit() {
    this.varJsonString = localStorage.getItem('UHKey');
    this.user = JSON.parse(this.varJsonString);
    this.ID = this._routeParams.snapshot.params['ID'];
    this.Viewname = this._routeParams.snapshot.params['Viewname'];
    this._MatchService.GetMatchSummary(this.ID).subscribe(
      data => {
        data.forEach(element => {
          if (element.fullHousie) {
            this.FullHousie = element;
          } else if (element.firstLine) {
            this.FirstLine = element;
          } else if (element.secondLine) {
            this.SecondLine = element;
          } else if (element.thirdLine) {
            this.ThirdLine = element;
          } else if (element.lucky) {
            this.Lucky = element;
          }
        });
        // console.log(this.FullHousie);
        // console.log(this.ThirdLine);
      }, err => {
        if (err) {
          this.toastyService.warning('An Error has occured please try again after some time !' + err);
        }
      }
    );
  }

}
