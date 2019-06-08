import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { BrowserAnimationsModule, NoopAnimationsModule } from '@angular/platform-browser/animations';

import { ToastyModule } from 'ng2-toasty';
import { LoadingModule } from 'ngx-loading';
import { NgxPaginationModule } from 'ngx-pagination';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { HeaderComponent } from './components/header/header.component';
import { DialogComponent } from './components/dialog/dialog.component';
import { LoginComponent } from './components/login/login.component';
import { FooterComponent } from './components/footer/footer.component';
import { AuthGuard } from './components/_guard/auth.guard';

import {
    MatButtonModule, MatToolbarModule, MatIconModule, MatChipsModule, MatTooltipModule,
    MatCardModule, MatCheckboxModule, MatRadioModule, MatAutocompleteModule,
    MatInputModule, MatDatepickerModule, MatNativeDateModule, MatTabsModule, MatSelectModule, MatDialogModule
} from '@angular/material';

import { MatchComponent } from './components/match/match.component';
import { MatchViewComponent } from './components/match/match.view';
import { MatchLiveComponent } from './components/match/match.live';
import { MatchSummaryComponent } from './components/match/match.summary';
import { PlayerComponent } from './components/player/player.component';
import { PlayerViewComponent } from './components/player/player.view';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    DialogComponent,
    LoginComponent,
    MatchComponent,
    MatchViewComponent,
    MatchLiveComponent,
    MatchSummaryComponent,
    PlayerComponent,
    PlayerViewComponent
  ],
  imports: [
    BrowserAnimationsModule,
    NoopAnimationsModule,
    CommonModule,
    HttpModule,
    FormsModule,
    AppRoutingModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatToolbarModule,
    MatIconModule,
    MatChipsModule,
    MatTooltipModule,
    MatCardModule,
    MatCheckboxModule,
    MatRadioModule,
    MatAutocompleteModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatTabsModule,
    MatSelectModule,
    MatDialogModule,
    ToastyModule,
    LoadingModule,
    NgxPaginationModule,
    OwlDateTimeModule,
    OwlNativeDateTimeModule
  ],
  providers: [AuthGuard],
  entryComponents: [DialogComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
