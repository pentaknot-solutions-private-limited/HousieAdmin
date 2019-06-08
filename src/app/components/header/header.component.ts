import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, NavigationExtras } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  user: any;
  varJsonString: any;
  /** header ctor */
  constructor(private _router: Router, private _routeParams: ActivatedRoute) { }
  Logout() {
      localStorage.removeItem('UHKey');
      this._router.navigate(['/login'], { relativeTo: this._routeParams });
  }
  /** Called by Angular after header component initialized */
  ngOnInit(): void {
      this.varJsonString = localStorage.getItem('UHKey');
      this.user = JSON.parse(this.varJsonString);
  }
}
