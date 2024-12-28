import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from 'src/app/models/product';
import { ProductService } from 'src/app/services/product.service';
import { Review } from 'src/app/models/review';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
  product!: Product;
  newReviewContent: string = '';
  newReviewRating: number | null = null;
  relatedProducts: Product[] = [];
  reviews: Review[] = [];
  submissionMessage: string = '';
  id: string;
  customerName: string = 'Tên Khách Hàng';
  selectedSize: string = '';


  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
    private router: Router,
    private cartService: CartService
  ) {
    this.id = route.snapshot.params['id'];
  }

  ngOnInit() {
    this.loadProductDetails();
    this.loadReviews();
    this.incrementViewCount();
  }

  loadProductDetails() {
    this.productService.get(this.id).subscribe(data => {
      this.product = data as Product;
      this.getRelatedProducts(this.product.id);
    }, error => {
      console.error('Error loading product details:', error);
    });
  }

  loadReviews() {
    this.productService.getReviewsByProductId(this.id).subscribe(data => {
      this.reviews = data;
    }, error => {
      console.error('Error loading reviews:', error);
    });
  }

  getRelatedProducts(productId: string) {
    this.productService.getRelatedProductsById(productId).subscribe(data => {
      this.relatedProducts = data as Product[];
      this.relatedProducts = this.relatedProducts.filter(product => product.id !== productId);
      this.relatedProducts = this.relatedProducts.slice(0, 5);
    }, error => {
      console.error('Error loading related products:', error);
    });
  }

  navigateToProductDetail(productId: string): void {
    this.router.navigate(['/product', productId]);
  }

  submitReview(): void {
    if (this.newReviewContent && this.newReviewRating) {
      const newReview: Review = {
        productId: this.product.id,
        customerName: this.customerName,
        username: this.customerName,
        content: this.newReviewContent,
        rating: this.newReviewRating,
        date: new Date().toISOString()
      };

      this.productService.submitReview(this.product.id, newReview).subscribe(review => {
        this.reviews.push(review);
        this.newReviewContent = '';
        this.newReviewRating = null;
        this.submissionMessage = 'Đánh giá của bạn đã được gửi thành công!';
      }, error => {
        console.error('Error submitting review:', error);
        this.submissionMessage = 'Đã xảy ra lỗi khi gửi đánh giá.';
      });
    } else {
      console.log('Review content or rating is missing');
      this.submissionMessage = 'Vui lòng nhập nội dung đánh giá và chọn số sao.';
    }
  }

  getAverageRating(): number {
    if (this.reviews.length === 0) {
      return 0;
    }
    const totalRating = this.reviews.reduce((sum, review) => sum + (review.rating || 0), 0);
    return totalRating / this.reviews.length;
  }

  incrementViewCount(): void {
    this.productService.incrementViewCount(this.id).subscribe(updatedProduct => {
      this.product = updatedProduct; // Cập nhật sản phẩm với số lượt xem mới
      console.log('View count incremented successfully');
    }, error => {
      console.error('Error incrementing view count:', error);
    });
  }

  addToCart(product: any) {
    if (!this.selectedSize) {
      this.submissionMessage = "Vui lòng chọn kích thước trước khi thêm vào giỏ hàng!";
      return;
    }

    // Create a copy of the product and include the selected size
    const productToAdd = {
      ...product,
      size: this.selectedSize // Add selected size
    };

    this.cartService.addCart(productToAdd);
    this.submissionMessage = "Sản phẩm đã được thêm vào giỏ hàng!";
  }
}
