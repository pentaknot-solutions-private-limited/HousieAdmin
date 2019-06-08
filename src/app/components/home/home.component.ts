import { Component, OnInit } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastyService, ToastyConfig, ToastOptions, ToastData } from 'ng2-toasty';

import { Dashboard } from './Models/dahsboard.model';
import { DashboardService } from './Services/dashboard.service';

@Component({
    // tslint:disable-next-line:component-selector
    selector: 'home',
    templateUrl: './home.component.html',
    providers: [ToastyService, ToastyConfig, DashboardService]

})
export class HomeComponent implements OnInit {
    Dashboard: Dashboard = new Dashboard();

    // tslint:disable-next-line:max-line-length
  constructor(private _router: Router, private _DashboardService: DashboardService, private _routeParams: ActivatedRoute, private toastyService: ToastyService, private toastyConfig: ToastyConfig) {
    this.toastyConfig.theme = 'bootstrap';
    this.toastyConfig.position = 'top-center';
    }
ngOnInit(): void {
// this._DashboardService.GetAllDashboardCount().subscribe
// (
//     data => {
//         this.Dashboard = data;
//     },
//     err => {
//         if (err) {
//             this.toastyService.warning('An Error has occured please try again after some time !' + err);
//         }
//     });
    }
}
