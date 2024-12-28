import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RouterModule, Routes, CanActivate } from '@angular/router';
import { HeadersComponent } from './components/headers/headers.component';
import { FooterComponent } from './components/footer/footer.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { CategoyListComponent } from './components/categoy-list/categoy-list.component';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { CategoryAddComponent } from './components/category-add/category-add.component';
import { CategoryEditComponent } from './components/category-edit/category-edit.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import { ProductAddComponent } from './components/product-add/product-add.component';
import { ProductEditComponent } from './components/product-edit/product-edit.component';
import { ProductDetailComponent } from './components/product-detail/product-detail.component';
import { MyAccountComponent } from './components/my-account/my-account.component';
import { Product } from './models/product';
import { AuthGuard } from './auth/auth-guard';
import { AdminGuard } from './auth/admin-guard';
import { ProductsComponent } from './components/products/products.component';
import { AdminHomeComponent } from './components/admin-home/admin-home.component';
import { AdminOrderComponent } from './components/admin-order/admin-order.component';
import { ShopComponent } from './components/shop/shop.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { CartComponent } from './components/cart/cart.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { ThankYouComponent } from './components/thank-you/thank-you.component';
import { CartNavComponent } from './components/cart-nav/cart-nav.component';
import { AccountAdminComponent } from './components/account-admin/account-admin.component';
import { AdminDoanhthuComponent } from './components/admin-doanhthu/admin-doanhthu.component';
import { MyProfileComponent } from './components/my-profile/my-profile.component';
import { Product_categoryComponent } from './components/product_category/product_category.component';
import { AdminShopComponent } from './components/admin-shop/admin-shop.component';
import { NewsComponent } from './components/news/news.component';
import { NewsDetailComponent } from './components/news-detail/news-detail.component';
import { MyProfileEditComponent } from './components/my-profile-edit/my-profile-edit.component';
import { PaymentComponent } from './components/payment/payment.component';
import { VnpayService } from './services/vnpay.service';
// import { UserComponent } from './components/user/user.component';





// định nghĩa các routes trong dự án
const routes: Routes = [
 {path: 'home', component :HomeComponent},
 {path: 'login', component :LoginComponent},
 {path: 'category-list', component :CategoyListComponent, canActivate:[AdminGuard]},
 {path: 'category-add', component :CategoryAddComponent, canActivate:[AdminGuard]},
 {path: 'category-edit/:id', component :CategoryEditComponent, canActivate:[AdminGuard]},
 {path: 'product-list', component :ProductListComponent},
 {path: 'product-add', component :ProductAddComponent, canActivate:[AdminGuard]},
 {path: 'product-edit/:id', component :ProductEditComponent, canActivate:[AdminGuard]},
 {path: 'product-detail/:id', component :ProductDetailComponent, },
 {path: 'my-account', component :MyAccountComponent, canActivate: [AuthGuard]},
 {path: 'products', component :ProductsComponent},
 {path: '', redirectTo: "/home", pathMatch:'full'},
 {path: 'admin', component :AdminHomeComponent, canActivate: [AuthGuard]},
 {path: 'admin-order', component :AdminOrderComponent, canActivate: [AuthGuard]},
 {path: 'shop', component: ShopComponent },
 {path: 'forgot-password', component: ForgotPasswordComponent },
 {path: 'reset-password', component: ResetPasswordComponent },
 {path: 'cart', component: CartComponent},
 {path: 'checkout', component: CheckoutComponent},
 {path: 'user', component: ThankYouComponent},
 {path: 'thank-you', component: ThankYouComponent},
 {path: 'account-admin', component: AccountAdminComponent, canActivate: [AuthGuard]},
 {path: 'admin-doanhthu', component: AdminDoanhthuComponent, canActivate: [AuthGuard] },
 {path: 'my-profile/:id', component: MyProfileComponent},
 {path: 'product-category/:id', component: Product_categoryComponent},
 {path: 'admin-shop', component: AdminShopComponent, canActivate: [AuthGuard]},
 { path: 'news', component: NewsComponent }, // This should list all news articles
 { path: 'news/:id', component: NewsDetailComponent },
 { path: 'my-profile-edit/:id', component: MyProfileEditComponent}

// {path: '/orders', component: UserComponent},


]

@NgModule({
  declarations: [
    AppComponent,
    HeadersComponent,
    FooterComponent,
    HomeComponent,
    LoginComponent,
    CategoyListComponent,
    CategoryAddComponent,
    CategoryEditComponent,
    ProductListComponent,
    ProductAddComponent,
    ProductEditComponent,
    ProductDetailComponent,
    MyAccountComponent,
    ProductsComponent,
    AdminHomeComponent,
    AdminOrderComponent,
    ShopComponent,
    ForgotPasswordComponent,
    ResetPasswordComponent,
    CartComponent,
    CheckoutComponent,
    ThankYouComponent,
    CartNavComponent,
    AccountAdminComponent,
    AdminDoanhthuComponent,
    MyProfileComponent,
    Product_categoryComponent,
    AdminShopComponent,
    MyProfileEditComponent,
    PaymentComponent,
// UserComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CommonModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes),
    BrowserAnimationsModule, // Quan trọng để Toast hoạt động
    ToastrModule.forRoot({
      timeOut: 3000, // Thời gian hiển thị
      positionClass: 'toast-top-right', // Vị trí hiển thị
      preventDuplicates: true, // Ngăn trùng lặp
    }),

  ],
  providers: [
    VnpayService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
