import { Component, OnInit } from '@angular/core';
import { NewsService } from '../../services/news.service' // Đường dẫn của file service cần phải phù hợp
import { News } from '../../models/news'; // Đảm bảo bạn tạo model News phù hợp

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css']
})
export class NewsComponent implements OnInit {
  newsArticles: News[] = []; // Khai báo mảng tin tức

  constructor(private newsService: NewsService) { } // Inject NewsService

  ngOnInit(): void {
    this.loadNews(); // Gọi hàm loadNews khi component khởi tạo
  }

  loadNews(): void {
    this.newsService.getNews().subscribe({
      next: (data) => {
        this.newsArticles = data; // Gán dữ liệu từ dịch vụ vào mảng tin tức
      },
      error: (err) => {
        console.error('Error loading news', err); // Xử lý lỗi (nếu có)
      }
    });
  }
}
