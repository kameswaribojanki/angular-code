import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { LoginComponent } from "./Auth/components/login/login.component";
import { RegisterComponent } from "./Auth/components/register/register.component";
import { AddCategoryComponent } from "./Categories/components/add-category/add-category.component";
import { CategoriesComponent } from "./Categories/components/categories/categories.component";
import { EditCategoryComponent } from "./Categories/components/edit-category/edit-category.component";
import { AuthGuard } from "./Guards/auth.guard";
import { DeactivateGuardService } from "./Guards/deactivate-guard.service";
import { HomeComponent } from "./home/home.component";
import { AddPostComponent } from "./Posts/components/add-post/add-post.component";
import { EditPostComponent } from "./Posts/components/edit-post/edit-post.component";
import { PostsComponent } from "./Posts/components/posts/posts.component";
const appRoutes:Routes=[
    {path:'', component:HomeComponent},
    {path:'posts', component:PostsComponent, canActivate:[AuthGuard], children:[{path:'add',component:AddPostComponent, canDeactivate:[DeactivateGuardService]},{path:':id/edit',component:EditPostComponent, canDeactivate:[DeactivateGuardService]}]},
    {path:'categories', component:CategoriesComponent, canActivate:[AuthGuard]},
    {path:'category/add', component:AddCategoryComponent, canActivate:[AuthGuard],canDeactivate:[DeactivateGuardService]},
    {path:'category/:id/edit', component:EditCategoryComponent, canActivate:[AuthGuard],canDeactivate:[DeactivateGuardService]},
    {path:'login',component:LoginComponent},
    {path:'register',component:RegisterComponent}
]
@NgModule({
    imports:[RouterModule.forRoot(appRoutes)],
    exports:[RouterModule]
})
export class AppRoutingModule{

}