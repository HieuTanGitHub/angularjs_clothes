import { Component, OnInit } from '@angular/core';
import { OrderService } from '../../services/order.service';
import { AuthService } from '../../services/auth.service';
import { OrderType } from '../../models/order';
import { User } from '../../models/user';
import { Product } from '../../models/product';
import { Review } from '../../models/review';

@Component({
  selector: 'app-thank-you',
  templateUrl: './thank-you.component.html',
  styleUrls: ['./thank-you.component.less']
})
export class ThankYouComponent implements OnInit {
  totalOrders: number = 0;
  filteredOrders: OrderType[] = [];
  searchKeyword: string = '';
  orders: OrderType[] = [];
  users: User[] = [];
  currentPage = 1;
  itemsPerPage = 12;
  totalPages = 0;
  selectedOrderId: string | null = null;
  products: Product[] = [];
  newReviewContent: string = '';
  newReviewRating: number | null = null;
  reviews: Review[] = [];
  submissionMessage: string = '';
  username: string = '';
  selectedProductId: string | null = null;
  confirmationMessage: string = '';

  constructor(private orderService: OrderService, private authService: AuthService) {}

  ngOnInit(): void {
    this.loadUsers();
    this.loadOrders();

    this.orderService.getTotalOrders().subscribe(
      (total) => (this.totalOrders = total),
      (error) => console.error('Error fetching total orders:', error)
    );
  }

  loadUsers(): void {
    this.authService.getUsers().subscribe(
      (data: User[]) => {
        this.users = data;
        this.filterOrders();
      },
      (error) => {
        console.error('Error fetching users:', error);
      }
    );
  }

  loadOrders(): void {
    this.orderService.getOrders().subscribe(
      (data) => {
        this.orders = data;
        this.filterOrders();
        this.totalPages = Math.ceil(this.filteredOrders.length / this.itemsPerPage);
      },
      (error) => {
        console.error('Error fetching orders:', error);
      }
    );
  }

  getPaginatedOrders(): OrderType[] {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    return this.filteredOrders.slice(startIndex, startIndex + this.itemsPerPage);
  }

  onSearch(event: Event): void {
    event.preventDefault();
    this.filterOrders();
    this.currentPage = 1;
  }

  private filterOrders(): void {
    const keyword = this.searchKeyword.toLowerCase(); // Tối ưu hóa chuyển đổi thành chữ thường
    const userId = this.authService.getLoggedInUserId();

    this.filteredOrders = this.orders.filter((order) => {
      const customerName = order.customerName ? order.customerName.toLowerCase() : '';
      const id = order.id ? order.id.toLowerCase() : '';
      const userIdExists = String(order.userId) === String(userId);

      return (customerName.includes(keyword) || id.includes(keyword)) && userIdExists;
    });

    this.totalPages = Math.ceil(this.filteredOrders.length / this.itemsPerPage);
  }

  toggleOrderDetails(orderId?: string): void {
    if (orderId) {
      this.selectedOrderId = orderId;
      this.loadReviewsForOrder(orderId);
    }
  }

  loadProductsForOrder(productIds: { productId: string; quantity: number }[]): void {
    const ids = productIds.map(product => product.productId);
    this.orderService.getProductsByIds(ids).subscribe(
      (data: Product[]) => {
        this.products = data;
      },
      (error) => {
        console.error('Error fetching products:', error);
      }
    );
  }

  deleteOrder(orderId: string): void {
    if (confirm('Bạn có chắc chắn muốn hủy đơn hàng này?')) {
      this.orderService.deleteOrder(orderId).subscribe(
        () => {
          this.loadOrders();
          this.confirmationMessage = `Đơn hàng ${orderId} đã được hủy thành công.`;
          setTimeout(() => this.confirmationMessage = '', 3000); // Xóa thông báo sau 3 giây
          console.log(`Order ${orderId} has been deleted.`);
        },
        (error) => {
          console.error('Error deleting order:', error);
        }
      );
    }
  }

  getStatusText(status: number): string {
    switch (status) {
      case 0: return 'Chờ duyệt';
      case 1: return 'Đang xử lý';
      case 2: return 'Đang giao hàng';
      case 3: return 'Hoàn thành';
      case 4: return 'Đã hủy';
      default: return 'Chưa xác định';
    }
  }

  getStatusBadge(status: number): string {
    switch (status) {
      case 0: return 'badge bg-secondary';
      case 1: return 'badge bg-warning';
      case 2: return 'badge bg-primary';
      case 3: return 'badge bg-success';
      case 4: return 'badge bg-danger';
      default: return 'badge bg-secondary';
    }
  }

  changePage(page: number): void {
    if (page > 0 && page <= this.totalPages) {
      this.currentPage = page;
    }
  }

  // Phương thức để gửi đánh giá
  submitReview(productId: string): void {
    if (this.newReviewContent && this.newReviewRating) {
      const newReview: Review = {
        productId,
        customerName: 'Tên Khách Hàng', // Thay đổi theo yêu cầu
        username: this.username, // Lấy username từ thuộc tính
        rating: this.newReviewRating,
        content: this.newReviewContent,
        date: new Date().toISOString()
      };

      this.orderService.submitReview(newReview).subscribe(review => {
        this.reviews.push(review);
        this.newReviewContent = '';
        this.newReviewRating = null;
        this.submissionMessage = 'Đánh giá của bạn đã được gửi thành công!';
      }, error => {
        console.error('Error submitting review:', error);
        this.submissionMessage = 'Đã xảy ra lỗi khi gửi đánh giá.';
      });
    } else {
      this.submissionMessage = 'Vui lòng nhập nội dung đánh giá và chọn số sao.';
    }
  }

  // Phương thức để tải đánh giá cho sản phẩm
  loadReviewsForOrder(orderId: string): void {
    const order = this.orders.find(o => o.id === orderId);
    if (order && order.products) { // Kiểm tra order và order.products
      this.loadProductsForOrder(order.products);
      this.loadReviews(order.products[0].productId); // Tải đánh giá cho sản phẩm đầu tiên
    }
  }

  loadReviews(productId: string): void {
    this.orderService.getReviewsByProductId(productId).subscribe(data => {
      this.reviews = data;
    }, error => {
      console.error('Error loading reviews:', error);
    });
  }
}
