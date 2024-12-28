import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CategoryService } from 'src/app/services/category.service';
import { Category } from './../../models/category';
import { first } from 'rxjs/operators'; // Đừng quên import first

@Component({
  selector: 'app-category-add',
  templateUrl: './category-add.component.html',
  styleUrls: ['./category-add.component.css']
})
export class CategoryAddComponent implements OnInit {
  categoryForm: FormGroup;
  category: Category;

  constructor(private categoryService: CategoryService, private router: Router) {
    this.category = new Category();
    this.categoryForm = new FormGroup({
      'ten': new FormControl('', [Validators.required, Validators.minLength(3)])
    });
  }

  ngOnInit(): void {
  }

  onSubmit() {
    if (this.categoryForm.invalid) {
      alert('Vui lòng nhập hợp lệ');
      return console.log('Không hợp lệ');
    }

    // Kiểm tra tính trùng lặp
    this.categoryService.checkDuplicateName(this.categoryForm.get('ten')?.value).pipe(first()).subscribe(data => {
      if (data.length > 0) {
        alert('Tên danh mục đã tồn tại. Vui lòng nhập tên khác.');
      } else {
        // Nếu không trùng lặp, lưu danh mục mới
        this.categoryService.save(this.categoryForm.value).subscribe(data => {
          console.log(data);
          this.router.navigate(['/category-list']);
        });
      }
    }, error => {
      console.error('Lỗi khi kiểm tra tên danh mục:', error);
    });
  }
}
