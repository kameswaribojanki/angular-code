import { Component, OnInit } from '@angular/core';
import { ICategory } from '../../models/ICategory';
import { CategoryService } from '../../services/category.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {
  categories:ICategory[]=[];
  filteredString:string="";
  constructor(private categoryService:CategoryService) { }

  ngOnInit(): void {
   this.getCategories();
  }
  onDeleteCategory(id:any){
    this.categoryService.deleteCategory(id).subscribe(data=>{
      this.getCategories();
    });
    
  }

  getCategories() {
    this.categoryService.getCategories().subscribe(categories=>{
      this.categories=categories;
    })
  }

}
