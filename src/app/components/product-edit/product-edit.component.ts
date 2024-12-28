import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from 'src/app/models/product';
import { ProductService } from 'src/app/services/product.service';
import { CategoryService } from 'src/app/services/category.service';
import { Category } from 'src/app/models/category';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.css']
})
export class ProductEditComponent implements OnInit {
  productForm: FormGroup;
  product!: Product;
  categories!: Category[];
  id: string;
  successMessage: string | null = null;
  errorMessage: string | null = null;

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
    private router: Router,
    private categoryService: CategoryService
  ) {
    this.id = this.route.snapshot.params['id'];
    this.productForm = new FormGroup({
      ten: new FormControl('', [Validators.required, Validators.minLength(6)]),
      id_nhasx: new FormControl(null, Validators.required),
      gia_km: new FormControl(null, Validators.required),
      hinh: new FormControl('', Validators.required)
    });
  }

  ngOnInit() {
    this.productService.get(this.id).subscribe({
      next: (data) => {
        this.product = data as Product;
        this.productForm.patchValue(this.product);
      },
      error: (err) => console.error('Error loading product:', err)
    });

    this.categoryService.getAll().subscribe({
      next: (data) => {
        this.categories = data as Category[];
      },
      error: (err) => console.error('Error loading categories:', err)
    });
  }

  onSubmit() {
    if (this.productForm.invalid) {
      this.errorMessage = 'Please fill in all required fields correctly.';
      setTimeout(() => (this.errorMessage = null), 3000);
      return;
    }

    this.productService.update(this.id, this.productForm.value).subscribe({
      next: (data) => {
        this.successMessage = 'Product updated successfully!';
        setTimeout(() => {
          this.successMessage = null;
          this.router.navigate(['/product-list']);
        }, 3000);
      },
      error: (err) => {
        this.errorMessage = 'Error updating product. Please try again.';
        setTimeout(() => (this.errorMessage = null), 3000);
        console.error('Error updating product:', err);
      }
    });
  }

  onFileSelected(event: Event) {
    const target = event.target as HTMLInputElement;
    if (target.files && target.files.length > 0) {
      const file: File = target.files[0];
      const formData = new FormData();
      formData.append('image', file);

      this.productService.uploadImage(formData).subscribe({
        next: (response) => {
          console.log('Image uploaded successfully', response);
          this.product.hinh = response.imageUrl;
          this.productForm.patchValue({ hinh: response.imageUrl });
        },
        error: (err) => {
          console.error('Error uploading image', err);
        }
      });
    }
  }
}
