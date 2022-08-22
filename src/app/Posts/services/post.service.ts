import { HttpClient } from "@angular/common/http";
import { EventEmitter, Injectable } from "@angular/core";
import { map, Observable } from "rxjs";
import { IPost } from "../models/IPost";

@Injectable({
    providedIn:'root'
})
export class PostService{
    addPostEvent=new EventEmitter<boolean>;
    editPostEvent=new EventEmitter<boolean>;
    setAddPost(msg:boolean){
        this.addPostEvent.emit(msg);
    }
    setEditPost(msg:boolean){
        this.editPostEvent.emit(msg);
    }
    // baseUrl = `https://angula-http-crud-default-rtdb.firebaseio.com/`;
    baseUrl=`https://angular-crud-6c851-default-rtdb.firebaseio.com/`;
    constructor(private http:HttpClient){}
    
    addPost(post:IPost):Observable<{name:string}>{
        return this.http.post<{name:string}>(`${this.baseUrl}posts.json`,post);
    }
    getPosts():Observable<IPost[]>{
        return this.http.get<{[id:string]:IPost}[]>(`${this.baseUrl}posts.json`).pipe(map(posts=>{
            let formattedPosts:IPost[]=[];
            for (let id in posts) {
                formattedPosts.push({id, ...posts[id]} as IPost);
              }
              return formattedPosts;
        }))
    }
    getPostsById(id:string){
        return this.http.get<IPost>(`${this.baseUrl}/posts/${id}.json`);
    }
    editPost(post:IPost,id:string){
        return this.http.put(`${this.baseUrl}posts/${id}.json`,post);
    }
    deletePost(id:string){
        return this.http.delete(`${this.baseUrl}/posts/${id}.json`);
    }
}