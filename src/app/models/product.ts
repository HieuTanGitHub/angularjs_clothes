import { Comment } from './comment';

export class Product {
  slice(arg0: number, arg1: number): any {
    throw new Error('Method not implemented.');
  }
  id!: string;
  ten!: string;
  gia!: number;
  gia_km!: number;
  hinh!: string;
  ngay!: string;
  xem!: number;
  hot!: boolean;
  mo_ta!:string;
  an_hien!: number;
  id_nhasx!: string;
  id_danhmuc!: string; // Đảm bảo thuộc tính này đã có
  imageUrl!: string;
  comments: Comment[] = [];
  viewCount?: number;
  nhaSanXuat!: string;
}
