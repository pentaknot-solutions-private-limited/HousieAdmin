import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { MatchComponent } from './components/match/match.component';
import { MatchLiveComponent } from './components/match/match.live';
import { MatchViewComponent } from './components/match/match.view';
import { PlayerComponent } from './components/player/player.component';
import { PlayerViewComponent } from './components/player/player.view';

import { AuthGuard } from './components/_guard/auth.guard';
import { MatchSummaryComponent } from './components/match/match.summary';


const routes: Routes = [
  { path: '', redirectTo: 'Login', pathMatch: 'full' },
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'match', component: MatchComponent, canActivate: [AuthGuard] },
  { path: 'matchview', component: MatchViewComponent, canActivate: [AuthGuard] },
  { path: 'editmatch/:ID/:Viewname', component: MatchComponent, canActivate: [AuthGuard] },
  { path: 'livematch/:ID/:Viewname', component: MatchLiveComponent, canActivate: [AuthGuard] },
  { path: 'summary/:ID', component: MatchSummaryComponent, canActivate: [AuthGuard] },
  { path: 'player', component: PlayerComponent, canActivate: [AuthGuard] },
  { path: 'playerview', component: PlayerViewComponent, canActivate: [AuthGuard] },
  { path: 'editplayer/:ID/:Viewname', component: PlayerComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: '**', redirectTo: 'home', canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
