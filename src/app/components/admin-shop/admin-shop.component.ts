import { Component, OnInit } from '@angular/core';
import { ShopDataService } from '../../services/shop-data.service';
import * as bootstrap from 'bootstrap';

@Component({
  selector: 'app-admin-shop',
  templateUrl: './admin-shop.component.html',
  styleUrls: ['./admin-shop.component.css']
})
export class AdminShopComponent implements OnInit {
  albums: any[] = [];
  newsArticles: any[] = [];
  currentAlbum: any = {};
  currentNews: any = { date: '' };
  isEditMode: boolean = false;
  isEditNewsMode: boolean = false;

  constructor(private shopDataService: ShopDataService) {}

  ngOnInit(): void {
    this.loadAlbums();
    this.loadNews();
  }

  loadAlbums() {
    this.shopDataService.getAlbums().subscribe(data => {
      this.albums = data;
    });
  }

  loadNews() {
    this.shopDataService.getNews().subscribe(data => {
      this.newsArticles = data;
    });
  }

  openAlbumModal() {
    this.currentAlbum = {};
    this.isEditMode = false;
    const modalElement = document.getElementById('albumModal');
    if (modalElement) {
      const modal = new bootstrap.Modal(modalElement);
      modal.show();
    }
  }

  saveAlbum() {
    if (this.isEditMode) {
      // Cập nhật album
      this.shopDataService.updateAlbum(this.currentAlbum.id, this.currentAlbum).subscribe(() => {
        this.loadAlbums(); // Tải lại albums
      });
    } else {
      // Thêm album mới
      this.shopDataService.addAlbum(this.currentAlbum).subscribe(() => {
        this.loadAlbums(); // Tải lại albums
      });
    }
    this.closeModal('albumModal');
  }

  deleteAlbum(index: number) {
    const album = this.albums[index];
    this.shopDataService.deleteAlbum(album.id).subscribe(() => {
      this.loadAlbums(); // Tải lại albums
    });
  }

  editAlbum(index: number) {
    this.currentAlbum = { ...this.albums[index] };
    this.isEditMode = true;
    const modalElement = document.getElementById('albumModal');
    if (modalElement) {
      const modal = new bootstrap.Modal(modalElement);
      modal.show();
    }
  }

  openNewsModal() {
    this.currentNews = {};
    this.isEditNewsMode = false;
    const modalElement = document.getElementById('newsModal');
    if (modalElement) {
      const modal = new bootstrap.Modal(modalElement);
      modal.show();
    }
  }

  saveNews() {
    if (!this.isEditNewsMode) {
      // Gán ngày hiện tại với định dạng yyyy-MM-dd
      const now = new Date();
      this.currentNews.date = now.toISOString().split('T')[0];
    }

    if (this.isEditNewsMode) {
      this.shopDataService.updateNews(this.currentNews.id, this.currentNews).subscribe(() => {
        this.loadNews(); // Tải lại news
      });
    } else {
      this.shopDataService.addNews(this.currentNews).subscribe(() => {
        this.loadNews(); // Tải lại news
      });
    }

    this.closeModal('newsModal');
  }


  deleteNews(index: number) {
    const news = this.newsArticles[index];
    this.shopDataService.deleteNews(news.id).subscribe(() => {
      this.loadNews(); // Tải lại news
    });
  }

  editNews(index: number) {
    this.currentNews = { ...this.newsArticles[index] };
    this.isEditNewsMode = true;
    const modalElement = document.getElementById('newsModal');
    if (modalElement) {
      const modal = new bootstrap.Modal(modalElement);
      modal.show();
    }
  }

  closeModal(modalId: string) {
    const modalElement = document.getElementById(modalId);
    if (modalElement) {
      const modalInstance = bootstrap.Modal.getInstance(modalElement);
      if (modalInstance) {
        modalInstance.hide();
      }
    }
  }
}
