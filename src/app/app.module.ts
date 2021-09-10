import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {PostsComponent} from './components/posts/posts.component';
import {MyNavComponent} from './components/my-nav/my-nav.component';
import {LayoutModule} from '@angular/cdk/layout';
import {PostsService} from "./services/posts.service";
import {HttpService} from "./services/http.service";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {CommentsComponent} from './components/comments/comments.component';
import {SearchComponent} from './components/search/search.component';
import {AngularMaterialModule} from "./modules/angular-material/angular-material.module";

@NgModule({
  declarations: [
    AppComponent,
    PostsComponent,
    MyNavComponent,
    CommentsComponent,
    SearchComponent
  ],
    imports: [
        BrowserModule,
        AngularMaterialModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        LayoutModule,
        ReactiveFormsModule,
        FormsModule
    ],
  providers: [PostsService, HttpService],
  bootstrap: [AppComponent]
})
export class AppModule { }
