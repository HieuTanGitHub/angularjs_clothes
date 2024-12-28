import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CategoryService } from 'src/app/services/category.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-add',
  templateUrl: './product-add.component.html',
  styleUrls: ['./product-add.component.css']
})
export class ProductAddComponent implements OnInit {
  productForm: FormGroup;
  categories: any[] = [];
  successMessage: string | null = null;

  constructor(
    private categoryService: CategoryService,
    private productService: ProductService,
    private router: Router
  ) {
    this.productForm = new FormGroup({
      'ten': new FormControl('', [Validators.required, Validators.minLength(6)]),
      'id_nhasx': new FormControl(null, Validators.required),
      'gia_km': new FormControl(null, Validators.required),
      'mo_ta': new FormControl('', Validators.required),
      'hinh': new FormControl('', [Validators.required])
    });
  }

  ngOnInit(): void {
    this.categoryService.getAll().subscribe({
      next: (data) => {
        this.categories = data;
      },
      error: (err) => console.error('Error loading categories:', err)
    });
  }

  onSubmit(): void {
    if (this.productForm.invalid) {
      this.productForm.markAllAsTouched();
      return;
    }

    const formValues = this.productForm.value;
    const productData = {
      ten: formValues.ten,
      gia_km: formValues.gia_km,
      mo_ta: formValues.mo_ta,
      id_nhasx: formValues.id_nhasx,
      hinh: formValues.hinh,
      xem: 0, // Mặc định là 0
      ngay: new Date().toISOString().split('T')[0], // Ngày hiện tại
      hot: 0, // Mặc định là 0
      an_hien: 1 // Mặc định là 1
    };

    this.saveProduct(productData);
  }

  saveProduct(product: any): void {
    this.productService.save(product).subscribe({
      next: () => {
        this.successMessage = 'Product added successfully!';
        setTimeout(() => {
          this.successMessage = null;
          this.router.navigate(['/product-list']);
        }, 3000);
      },
      error: (err) => {
        console.error('Error saving product:', err);
      }
    });
  }
}
