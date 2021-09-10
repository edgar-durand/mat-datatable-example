import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {PostsComponent} from "./components/posts/posts.component";
import {CommentsComponent} from "./components/comments/comments.component";

const routes: Routes = [
  {
    path: 'home',
    component: PostsComponent,
  },
  {
    path: 'comments/:id',
    component: CommentsComponent,
  },
  {
    path: '**',
    redirectTo: 'home',
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
