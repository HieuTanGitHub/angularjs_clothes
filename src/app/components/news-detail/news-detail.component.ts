import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NewsService } from '../../services/news.service';
import { News } from '../../models/news';

@Component({
  selector: 'app-news-detail',
  templateUrl: './news-detail.component.html',
  styleUrls: ['./news-detail.component.css']
})
export class NewsDetailComponent implements OnInit {
  newsDetail: News | null = null;

  constructor(
    private route: ActivatedRoute,
    private newsService: NewsService
  ) {}

  ngOnInit(): void {
    const newsId = this.route.snapshot.paramMap.get('id');
    if (newsId) {
      this.newsService.getNewsDetail(newsId).subscribe({
        next: (data) => {
          this.newsDetail = data;
        },
        error: (err) => {
          console.error('Error fetching news details:', err);
          this.newsDetail = null; // Set newsDetail to null if there's an error
        }
      });
    }
  }
}
