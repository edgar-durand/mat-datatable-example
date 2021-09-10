import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {PostsComponent} from "./components/posts/posts.component";
import {CommentsComponent} from "./components/comments/comments.component";
import {LoginComponent} from "./components/login/login.component";
import {AuthGuard} from "./guards/auth.guard";

const routes: Routes = [
  {
    path: 'posts',
    component: PostsComponent,
    canActivate: [AuthGuard],
  },  {
    path: 'comments/:id',
    component: CommentsComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: '**',
    redirectTo: '/login',
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
