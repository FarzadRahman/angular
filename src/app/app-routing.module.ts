import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PostsComponent } from './components/posts/posts.component';
import { SinglePostComponent } from './components/single-post/single-post.component';
import { LoginComponent } from './components/login/login.component';
import {ShoppingCartComponent} from "./components/shopping-cart/shopping-cart.component";

const routes: Routes = [
  { path: '', component: PostsComponent },
  { path: 'single/:id', component: SinglePostComponent },
  { path: 'login', component: LoginComponent },
  { path: 'cart', component: ShoppingCartComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

 }
