import { Component, OnInit } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastyService, ToastyConfig, ToastOptions, ToastData } from 'ng2-toasty';
import { Speech } from 'speak-tts';
import { Match } from './Models/match.model';
import { MatchDetailsRel } from './Models/matchdetailsrel.model';
import { MatchService } from './Services/match.service';
import { trigger, state, style, animate, transition } from '@angular/animations';

@Component({
  selector: 'app-matchlive',
  templateUrl: './match.live.html',
  styleUrls: ['./match.component.css'],
  providers: [ToastyService, ToastyConfig, MatchService]
})
export class MatchLiveComponent implements OnInit {

  user: any;
  varJsonString: any;
  public loading = false;
  position = 'below';

  public test: string;
  Match: Match = new Match();
  MatchDetailsRel: MatchDetailsRel = new MatchDetailsRel();
  items: Array<Match>;
  ID: string;
  Viewname: string;
  playDisabled: boolean;
  gameOver: boolean;
  Isdisabled: boolean;
  selectedMoment: any;
  list: Array<any> = [];
  winners: Array<any> = [];
  slist: Array<{ num: number; isdisabled: boolean; }> = [];
  row: Array<any> = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  value: number;
  checklist: Array<any> = [];
  num: number;
  randomWinner: boolean;
  topLineWinner: string;
  middleLineWinner: string;
  lastLineWinner: string;
  fullHousieWinner: string;
  luckyWinner: string;

  // tslint:disable-next-line:max-line-length
  constructor(private _router: Router, private _MatchService: MatchService, private _routeParams: ActivatedRoute, private toastyService: ToastyService, private toastyConfig: ToastyConfig) {
    this.toastyConfig.theme = 'bootstrap';
    this.toastyConfig.position = 'top-center';

    // this.selectedMoment = new Date();
  }

  winnerInterval;
  timeLeft = 0;
  interval;

  startTimer() {
    if (!this.playDisabled) {
      this.playDisabled = true;
    }
    if (this.checklist && this.timeLeft === 0) {
      this.timeLeft = this.checklist.length;
    }
    this.interval = setInterval(() => {
      if (this.timeLeft < 90) {
        this.value = this.list[this.timeLeft];
        // const ind = this.slist.findIndex(x => x.num === this.value);
        // Enter the number marked into database
        this.MatchDetailsRel.number = this.value;
        this._MatchService.AddMatchDetailsRel(this.MatchDetailsRel).subscribe
          (
            data => {
              const ind = this.slist.findIndex(x => x.num === this.value);
              this.slist[ind].isdisabled = true;
            },
            err => {
              if (err) {
              }
            });
        // ----------
        this.timeLeft++;
      } else {
        this.toastyService.info('Game Over !!');
        this.timeLeft = 0;
        clearInterval(this.interval);
      }
    }, 5000);
  }


    getLuckyWinner() {
      this._MatchService.GetLuckyWinner(this.ID).subscribe(
        data => {
          this.luckyWinner = data.name;
          this.randomWinner = false;
        }, err => {
          if (err) {
            this.toastyService.warning('An Error has occured please try again after some time !' + err);
          }
        }
      );
    }



  getWinnerList() {
    this.randomWinner = true;
    this._MatchService.GetMatchWinner(this.ID).subscribe(
      data => {
        data.forEach(element => {
          if (element.firstLine) {
            this.topLineWinner = element.playerName;
          } else if (element.secondLine) {
            this.middleLineWinner = element.playerName;
          } else if (element.thirdLine) {
            this.lastLineWinner = element.playerName;
          } else if (element.fullHousie) {
            this.pauseTimer();
            this.gameOver = true;
            this.fullHousieWinner = element.playerName;
          } else {
            this.luckyWinner = element.playerName;
            this.randomWinner = false;
          }
        });
      }
    );
    this.winnerInterval = setInterval(() => {
      this._MatchService.GetMatchWinner(this.ID).subscribe(
        data => {
          data.forEach(element => {
            if (element.firstLine) {
              this.topLineWinner = element.playerName;
            } else if (element.secondLine) {
              this.middleLineWinner = element.playerName;
            } else if (element.thirdLine) {
              this.lastLineWinner = element.playerName;
            } else if (element.fullHousie) {
              this.pauseTimer();
              if (!this.gameOver) {
                this.toastyService.info(element.playerName + ' has Win Full Hosuie, Game Over !!');
                clearInterval(this.winnerInterval);
              }
              // this.toastyService.info('Game Over!!');
              this.fullHousieWinner = element.playerName;
            } else {
              this.luckyWinner = element.playerName;
              this.randomWinner = false;
            }
          });
        }
      );
    }, 15000);
  }

  pauseTimer() {
    if (this.playDisabled) {
      this.playDisabled = false;
    }
    clearInterval(this.interval);
  }

  getMarkedNumber(Id: any) {
    this._MatchService.GetMatchDetailsRelByMatchId(Id).
      subscribe(
        data => {
          this.checklist = data;
          for (let i = 0; i < this.checklist.length; i++) {
            const element = this.checklist[i];
            this.slist[element - 1].isdisabled = true;
          }
        },
        err => {
          if (err) {
            this.toastyService.warning('An Error has occured please try again after some time !' + err);
          }
        });
  }


  ngOnInit() {
    this.gameOver = false;
    this.playDisabled = false;
    this.varJsonString = localStorage.getItem('UHKey');
    this.user = JSON.parse(this.varJsonString);
    this.ID = this._routeParams.snapshot.params['ID'];
    this.Viewname = this._routeParams.snapshot.params['Viewname'];
    if (this.ID == null) {
      this.Match.createdBy = this.user.AdminId;
    }
    if (this.Viewname === 'view') {
      this.Isdisabled = true;
    }
    if (this.Viewname === 'live') {
      this.Isdisabled = false;
    }
    this.getWinnerList();
    if (this.ID != null) {
      this.loading = true;
      this._MatchService.EditMatch(this.ID).
        subscribe
        (
          data => {
            this.loading = false;
            if (data != null) {
              this.Match = <Match>data;
              this.MatchDetailsRel.matchId = this.Match.matchId;
              this.MatchDetailsRel.createdBy = this.user.AdminId;
              this.list = this.Match.matchGeneratedNumber.split(',');
              this.list.map(vars => {
                const inl = false;
                this.slist.push({ num: vars, isdisabled: inl });
              });
              this.Match.updatedBy = this.user.AdminId;
              this.slist.sort((n1, n2) => n1.num - n2.num);
              // console.log(this.slist);
              this.getMarkedNumber(this.Match.matchId);
            } else {
              this.toastyService.warning('Match Not Found');
            }
          },
          err => {
            if (err) {
              this.toastyService.warning('An Error has occured please try again after some time !' + err);
            }
          });
    }
  }

}
