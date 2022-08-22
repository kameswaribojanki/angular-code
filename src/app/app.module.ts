import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
// import { PostsComponent } from './posts/posts.component';
import { HeaderComponent } from './header/header.component';
import { CategoriesComponent } from './Categories/components/categories/categories.component';
import { AddCategoryComponent } from './Categories/components/add-category/add-category.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EditCategoryComponent } from './Categories/components/edit-category/edit-category.component';
import { PostsComponent } from './Posts/components/posts/posts.component';
import { PostDetailsComponent } from './Posts/components/post-details/post-details.component';
import { AddPostComponent } from './Posts/components/add-post/add-post.component';
import { LoginComponent } from './Auth/components/login/login.component';
import { RegisterComponent } from './Auth/components/register/register.component';
import { LoaderComponent } from './loader/loader.component';
import { FilterPipesPipe } from './pipesService/filter-pipes.pipe';
import { EditPostComponent } from './Posts/components/edit-post/edit-post.component';
import { AuthInterceptorService } from './services/auth-interceptor.service';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    // PostsComponent,
    HeaderComponent,
    CategoriesComponent,
    AddCategoryComponent,
    EditCategoryComponent,
    PostsComponent,
    PostDetailsComponent,
    AddPostComponent,
    LoginComponent,
    RegisterComponent,
    LoaderComponent,
    FilterPipesPipe,
    EditPostComponent
  ],
  imports: [
    BrowserModule, AppRoutingModule, HttpClientModule, ReactiveFormsModule, FormsModule
  ],
  providers: [{provide:HTTP_INTERCEPTORS, useClass:AuthInterceptorService,multi:true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
