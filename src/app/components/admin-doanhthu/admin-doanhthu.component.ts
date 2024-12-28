import { Component, AfterViewInit } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { OrderService } from 'src/app/services/order.service';  // Dịch vụ lấy order
import { OrderType } from '../../models/order';  // Mô hình Order

@Component({
  selector: 'app-admin-doanhthu',
  templateUrl: './admin-doanhthu.component.html',
  styleUrls: ['./admin-doanhthu.component.css'],
})
export class AdminDoanhthuComponent implements AfterViewInit {
  startDate: string = ''; // Ngày bắt đầu
  endDate: string = ''; // Ngày kết thúc
  totalOrders: number = 0; // Tổng số đơn hàng
  public revenueData: number[] = new Array(12).fill(0);  // Tổng doanh thu cho từng tháng
  public orderStatusData = [0, 0, 0, 0, 0]; // Chờ duyệt, Đang xử lý, Đang giao hàng, Đã hoàn thành, Đã hủy
  public orderStatusLabels = [
    'Chờ duyệt',
    'Đang xử lý',
    'Đang giao hàng',
    'Đã hoàn thành',
    'Đã hủy',
  ];

  constructor(private orderService: OrderService) { }

  ngAfterViewInit() {
    Chart.register(...registerables);
    this.getOrders(); // Lấy dữ liệu đơn hàng
  }

  // Phương thức lấy đơn hàng
  getOrders() {
    this.orderService.getOrders().subscribe((orders: OrderType[]) => {
      this.processOrders(orders);
      this.createCharts();
    });
  }
  

  processOrders(orders: OrderType[]) {
    this.totalOrders = orders.length;  // Tính tổng số đơn hàng
    for (const order of orders) {
      const date = new Date(order.createdAt);
      const month = date.getMonth(); // 0 - 11

      // Chỉ cộng doanh thu khi trạng thái là 'Đã hoàn thành'
      if (order.status === 3) {
        if (month < 12) {
          this.revenueData[month] += order.totalPrice;
        }
      }

      // Thống kê trạng thái đơn hàng
      switch (order.status) {
        case 0:
          this.orderStatusData[0]++; // Chờ duyệt
          break;
        case 1:
          this.orderStatusData[1]++; // Đang xử lý
          break;
        case 2:
          this.orderStatusData[2]++; // Đang giao hàng
          break;
        case 3:
          this.orderStatusData[3]++; // Đã hoàn thành
          break;
        case 4:
          this.orderStatusData[4]++; // Đã hủy
          break;
        default:
          break;
      }
    }
  }

  createCharts() {
    const lineCtx = document.getElementById('lineChart') as HTMLCanvasElement;

    if (lineCtx) {
      const ctx = lineCtx.getContext('2d');
      if (ctx) {
        new Chart(ctx, {
          type: 'line',
          data: {
            labels: [
              'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
            ],
            datasets: [
              {
                label: 'Doanh thu (VNĐ)',
                data: this.revenueData,
                borderColor: '#3498db',
                backgroundColor: 'rgba(52, 152, 219, 0.2)',
                tension: 0.4,
              },
            ],
          },
          options: {
            responsive: true,
            scales: {
              y: {
                beginAtZero: true,
                ticks: { callback: (value) => value.toLocaleString() },
              },
            },
          },
        });
      }
    }

    const pieCtx = document.getElementById('pieChart') as HTMLCanvasElement;

    if (pieCtx) {
      const ctx = pieCtx.getContext('2d');
      if (ctx) {
        new Chart(ctx, {
          type: 'pie',
          data: {
            labels: this.orderStatusLabels,
            datasets: [
              {
                label: 'Trạng thái đơn hàng',
                data: this.orderStatusData,
                backgroundColor: ['#949494', '#e67e22', '#2980b9', '#27ae60', '#e74c3c'], // Các màu sắc tương ứng
                borderColor: ['#949494', '#e67e22', '#2980b9', '#27ae60', '#e74c3c'],
                borderWidth: 1,
              },
            ],
          },
          options: {
            responsive: true,
            plugins: {
              legend: {
                position: 'bottom',
              },
            },
          },
        });
      }
    }
  }
}
