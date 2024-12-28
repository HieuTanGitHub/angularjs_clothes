import { query } from '@angular/animations';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product';
import { ProductService } from 'src/app/services/product.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
products! : Product[];
private subscription!: Subscription;
  constructor(private productService: ProductService, private Router: Router, private route : ActivatedRoute) {

  }

  ngOnInit() {
    this.subscription = this.route.queryParams
    .subscribe(params => {
      this.productService.getProductByQuery(params).subscribe(data => {
        this.products = data as Product[];
    })

    return
    });
  }

}
