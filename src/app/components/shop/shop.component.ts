  import { Component, OnInit } from '@angular/core';
  import { Route, Router } from '@angular/router';
  import { Product } from 'src/app/models/product';
  import { ProductService } from 'src/app/services/product.service';
  import { CategoryService } from 'src/app/services/category.service';
  import { Category } from 'src/app/models/category';
  import { AuthService } from 'src/app/services/auth.service';
  import { CartService } from 'src/app/services/cart.service';

  @Component({
    selector: 'app-shop',
    templateUrl: './shop.component.html',
    styleUrls: ['./shop.component.css']
  })
  export class ShopComponent implements OnInit {
    products!: Product[];
    categories!: Category[];
    filteredProducts!: Product[];
    selectedCategoryId: string | null = null;
    keyword: string = '';
    currentPage: number = 1;
    itemsPerPage: number = 12;
    successMessage: string = '';
    isLogin: boolean = false;
    selectedSize: { [key: string]: number } = {}; // Để lưu kích cỡ đã chọn cho từng sản phẩm
    sizes: number[] = [36, 37, 38, 39, 40, 41, 42, 43, 44];
    productTypes!: any[]; // Mới thêm
    selectedProductTypeId: string | null = null;
    priceRanges = [
      { label: 'Dưới 1 triệu', value: '0-1000000' },
      { label: '1 triệu - 2 triệu', value: '1000000-2000000' },
      { label: '2 triệu - 3 triệu', value: '2000000-3000000' },
      { label: 'Trên 3 triệu', value: '3000000-999999999' }
    ];

    selectedPriceRange: string | null = null;

    // Phân trang cho danh mục
    categoryCurrentPage: number = 1;
    categoryItemsPerPage: number = 6; // Hiển thị 4 danh mục mỗi trang

    constructor(
      private productService: ProductService,
      private categoryService: CategoryService,
      private auth: AuthService,
      private cartService: CartService,
      private router : Router
    ) {
      this.isLogin = this.auth.checkLogin();
    }

    ngOnInit() {
      this.loadProducts();
      this.loadCategories();
      this.loadProductTypes();
    }
    loadProductTypes() {
      this.productService.getAllProductTypes().subscribe(data => {
        this.productTypes = data;
      }, error => {
        console.error('Lỗi khi lấy danh mục sản phẩm:', error);
      });
    }

    loadProducts() {
      this.productService.getAll().subscribe(data => {
        this.products = data as Product[];
        this.filteredProducts = [...this.products];

        // Gọi hàm sắp xếp
        this.sortProductsByCategory();

        this.applyFilters();
      }, error => {
        console.error('Lỗi khi lấy sản phẩm:', error);
      });
  }
  sortProductsByCategory() {
    this.filteredProducts.sort((a, b) => {
        // So sánh nếu và chỉ nếu a hoặc b có id_danhmuc là '1'
        if (a.id_danhmuc === '1' && b.id_danhmuc !== '1') return -1; // a lên trước nếu a là '1'
        if (b.id_danhmuc === '1' && a.id_danhmuc !== '1') return 1;  // b lên trước nếu b là '1'

        // Sắp xếp các id_danhmuc còn lại theo thứ tự chữ cái
        return a.id_danhmuc.localeCompare(b.id_danhmuc); // Sử dụng localeCompare để so sánh chuỗi
    });
}


    loadCategories() {
      this.categoryService.getAll().subscribe(data => {
        this.categories = data as Category[];
      }, error => {
        console.error('Lỗi khi lấy danh mục:', error);
      });
    }

    sortProducts(event: Event) {
      const target = event.target as HTMLSelectElement; // Ép kiểu trong phương thức
      const order = target.value; // Lấy giá trị từ select element

      if (order === 'asc') {
        this.filteredProducts.sort((a, b) => a.gia - b.gia); // Sắp xếp từ thấp đến cao
      } else if (order === 'desc') {
        this.filteredProducts.sort((a, b) => b.gia - a.gia); // Sắp xếp từ cao đến thấp
      }
    }


    applyFilters() {
      this.filteredProducts = [...this.products]; // Reset danh sách sản phẩm trước khi áp dụng lọc

      // Lọc theo danh mục
      if (this.selectedCategoryId) {
        this.filteredProducts = this.filteredProducts.filter(product => product.id_nhasx === this.selectedCategoryId);
      }

      // Lọc theo nhà sản xuất
      if (this.selectedProductTypeId) {
        this.filteredProducts = this.filteredProducts.filter(product => product.id_danhmuc === this.selectedProductTypeId);
      }

      // Lọc theo khoảng giá
      if (this.selectedPriceRange) {
        const [minPrice, maxPrice] = this.selectedPriceRange.split('-').map(Number);
        this.filteredProducts = this.filteredProducts.filter(product =>
          product.gia_km >= (minPrice || 0) && product.gia_km <= (maxPrice || Infinity)
        );
      }

      // Lọc theo từ khóa tìm kiếm
      if (this.keyword.trim()) {
        const keywordLower = this.keyword.toLowerCase();
        this.filteredProducts = this.filteredProducts.filter(product =>
          product.ten.toLowerCase().includes(keywordLower)
        );
      }
      this.filterByPrice
      this.currentPage = 1; // Reset trang về đầu sau khi áp dụng bộ lọc
    }


    get totalPages(): number {
      return Math.ceil(this.filteredProducts.length / this.itemsPerPage);
    }

    get paginatedProducts(): Product[] {
      const startIndex = (this.currentPage - 1) * this.itemsPerPage;
      return this.filteredProducts.slice(startIndex, startIndex + this.itemsPerPage);
    }

    get totalCategoryPages(): number {
      return Math.ceil(this.categories.length / this.categoryItemsPerPage);
    }

    get paginatedCategories(): Category[] {
      const startIndex = (this.categoryCurrentPage - 1) * this.categoryItemsPerPage;
      return this.categories.slice(startIndex, startIndex + this.categoryItemsPerPage);
    }

    onSearch() {
      this.applyFilters();
    }

    filterByPrice() {
      if (this.selectedPriceRange) {
        const [minPrice, maxPrice] = this.selectedPriceRange.split('-').map(Number);

        this.filteredProducts = this.products.filter(product => {
          const price = product.gia_km;
          return price >= (minPrice || 0) && price <= (maxPrice || Infinity);
        });
      } else {
        this.filteredProducts = [...this.products]; // Reset sản phẩm nếu không có giá trị
      }

      this.currentPage = 1; // Reset về trang đầu
    }


    addToCart(product: Product) {
      const size = this.selectedSize[product.id];
      if (!size) {
        alert("Vui lòng chọn kích cỡ.");
        return;
      }

      const productToAdd = {
        ...product,
        size: size // Lưu kích cỡ vào đối tượng sản phẩm
      };

      // Gọi CartService để thêm sản phẩm vào giỏ hàng
      this.cartService.addCart(productToAdd); // Đảm bảo bạn sử dụng đúng phương thức
      this.successMessage = 'Đã thêm sản phẩm vào giỏ hàng';
      setTimeout(() => {
        this.successMessage = '';
      }, 3000);
    }


    changePage(page: number) {
      this.currentPage = page;
    }

    // Hàm điều hướng cho danh mục
    changeCategoryPage(page: number) {
      this.categoryCurrentPage = page;
    }

    hasNextCategory(): boolean {
      return this.categoryCurrentPage < this.totalCategoryPages;
    }

    hasPrevCategory(): boolean {
      return this.categoryCurrentPage > 1;
    }

    nextCategoryPage() {
      if (this.hasNextCategory()) {
        this.categoryCurrentPage++;
      }
    }

    prevCategoryPage() {
      if (this.hasPrevCategory()) {
        this.categoryCurrentPage--;
      }
    }

  }
