import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Category } from 'src/app/core/models/category.model';
import { CategoriesService } from 'src/app/core/services/categories.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {

  category: Category

  constructor( private categoriesService: CategoriesService,
               private router: Router,
               private route: ActivatedRoute ) { }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      if (params.id) {
        this.getCategory(params.id);
      }
    })
  }

   createCategory(data){
    this.categoriesService.createCategory(data)
    .subscribe(rta => {
      this.router.navigate(['/admin/categories']);
    })
  }

   updateCategory(data){
    this.categoriesService.updateCategory(this.category._id, data)
    .subscribe(rta => {
      this.router.navigate(['/admin/categories']);
    })
  }

  private getCategory(id: string){
    this.categoriesService.getCategory(id)
    .subscribe(data => {
      this.category = data;
    })
  }

}
