import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { ICategory } from '../models/ICategory';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  updatedCategoryFalse = false;
  // baseUrl = `https://angula-http-crud-default-rtdb.firebaseio.com/`;
  baseUrl = `https://angular-crud-6c851-default-rtdb.firebaseio.com/`;
  // getCategoriesEvent = new EventEmitter<void>()
  constructor(private http: HttpClient) {}
  addCategory(category: ICategory): Observable<any> {
    return this.http.post<{ name: string }>(
      `${this.baseUrl}categories.json`,
      category
    );
  }
  getCategories(): Observable<ICategory[]> {
    return this.http
      .get<{ [id: string]: ICategory }[]>(`${this.baseUrl}categories.json`)
      .pipe(
        map((categories) => {
          let formattedCategories: ICategory[] = [];
          for (let id in categories) {
            formattedCategories.push({ id, ...categories[id] } as ICategory);
          }
          return formattedCategories;
        })
      );
  }
  getCategoryById(id: string) {
    return this.http.get<ICategory>(`${this.baseUrl}/categories/${id}.json`);
  }
  editCategory(category: ICategory, id: string) {
    return this.http.put(`${this.baseUrl}categories/${id}.json`, category);
  }
  deleteCategory(id: string) {
    return this.http.delete(`${this.baseUrl}/categories/${id}.json`);
  }
}
