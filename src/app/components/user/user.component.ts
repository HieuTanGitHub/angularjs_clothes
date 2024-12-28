import { Component } from '@angular/core';
import { OrderService } from '../../services/order.service';
import { OrderType } from '../../models/order';
@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.less']
})
export class UserComponent {
  totalOrders: number = 0;
  filteredOrders: OrderType[] = []; // Mảng chứa kết quả tìm kiếm
  searchKeyword: string = ''; // Từ khóa tìm kiếm
  orders: OrderType[] = [];

  currentPage = 1;
  itemsPerPage = 12; // Số lượng mục trên mỗi trang
  totalPages = 0; // Tổng số trang

  constructor(private orderService: OrderService) {}

  ngOnInit(): void {
    this.loadOrders();
    // Đếm số đơn hàng
    this.orderService.getTotalOrders().subscribe(
      (total) => (this.totalOrders = total),
      (error) => console.error('Error fetching total orders:', error)
    );
  }

  loadOrders(): void {
    this.orderService.getOrders().subscribe((data) => {
      this.orders = data;
      this.filterOrders(); // Áp dụng tìm kiếm ngay khi tải đơn hàng
      this.totalPages = Math.ceil(this.orders.length / this.itemsPerPage); // Tính tổng số trang
    });
  }

  getPaginatedOrders(): OrderType[] {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    return this.filteredOrders.length > 0
      ? this.filteredOrders.slice(startIndex, startIndex + this.itemsPerPage)
      : this.orders.slice(startIndex, startIndex + this.itemsPerPage); // Lấy đơn hàng gốc nếu không có tìm kiếm
  }

  // Xử lý tìm kiếm
  onSearch(event: Event): void {
    event.preventDefault();
    this.filterOrders(); // Gọi phương thức lọc đơn hàng
    this.currentPage = 1; // Reset về trang đầu tiên
  }

  // Phương thức lọc đơn hàng
  private filterOrders(): void {
    const keyword = this.searchKeyword.toLowerCase();
    this.filteredOrders = this.orders.filter((order) => {
      const customerName = order.customerName
        ? order.customerName.toLowerCase()
        : '';
      const id = order.id ? order.id.toLowerCase() : '';
      return customerName.includes(keyword) || id.includes(keyword);
    });

    // Cập nhật lại số trang
    this.totalPages = Math.ceil(this.filteredOrders.length / this.itemsPerPage);
  }

    getStatusText(status: number): string {
      switch (status) {
        case 0:
          return 'Chờ duyệt';
        case 1:
          return 'Đang xử lý';
        case 2:
          return 'Đang giao hàng';
        case 3:
          return 'Hoàn thành';
        case 4:
          return 'Đã hủy';
        default:
          return 'Chưa xác định';
      }
    }

    getStatusBadge(status: number): string {
      switch (status) {
        case 0:
          return 'badge bg-secondary';
        case 1:
          return 'badge bg-warning';
        case 2:
          return 'badge bg-primary';
        case 3:
          return 'badge bg-success';
        case 4:
          return 'badge bg-danger';
        default:
          return 'badge bg-secondary';
      }
    }

  updateOrderStatus(order: OrderType): void {
    this.orderService
      .updateOrder(order.id!, order)
      .subscribe(() => this.loadOrders());
  }

  changeStatus(order: OrderType, newStatus: number): void {
    order.status = newStatus;
    this.updateOrderStatus(order);
  }

  editOrder(orderId: string): void {
    // Chuyển hướng đến trang sửa đơn hàng hoặc hiển thị modal
  }

  deleteOrder(orderId: string): void {
    this.orderService.deleteOrder(orderId).subscribe(() => this.loadOrders());
  }

  changePage(page: number): void {
    if (page > 0 && page <= this.totalPages) {
      this.currentPage = page;
    }
  }
}
