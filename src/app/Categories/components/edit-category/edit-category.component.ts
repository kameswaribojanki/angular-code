import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'src/app/services/message.service';
import { ICategory } from '../../models/ICategory';
import { CategoryService } from '../../services/category.service';

@Component({
  selector: 'app-edit-category',
  templateUrl: './edit-category.component.html',
  styleUrls: ['./edit-category.component.css']
})
export class EditCategoryComponent implements OnInit {
  categotyId:string="";
  categoryForm=new FormGroup({
    title: new FormControl(''),
    status: new FormControl(''),
  })
  title:string="";
  status:string="";

  constructor(private route:ActivatedRoute, private categoryService:CategoryService, private router:Router, private messageService:MessageService) { }
  
  ngOnInit(): void {
    this.categotyId=this.route.snapshot.params['id'];
    this.categoryService.getCategoryById(this.categotyId).subscribe(data=>{
      this.title=data.title;
      this.status=data.status
      // console.log(data);
      this.categoryForm.setValue({
        title:data.title,
        status:data.status
      })
    })
  }
  onEditCategory(){
    this.categoryService.editCategory(this.categoryForm.value as ICategory, this.categotyId).subscribe(data=>{
      //console.log(this.categoryForm.value['title']);
      this.messageService.setSuccessMessage("category updated successfully");
      this.router.navigate(['/categories']);
    })
  }


  canExit(){
    if(this.categoryForm.value['title']!==this.title || this.categoryForm.value['status']!==this.status){
    
      if(confirm('are you sure you want to leave this page')){
        return true;
      }
      return false;
    }
    return true;
  }

}
