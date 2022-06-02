import { NotificationService } from './services/notification.service';
import { authInterceptorProviders } from './_helpers/auth.interceptor';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatDialogModule } from '@angular/material/dialog';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './Components/header/header.component';
import { ProductListComponent } from './Components/product-list/product-list.component';
import { ImageSliderComponent } from './Components/image-slider/image-slider.component';
import { ProductPopupComponent } from './Components/product-popup/product-popup.component';
import { CartComponent } from './Components/cart/cart.component';
import { BuyproductComponent } from './Components/buyproduct/buyproduct.component';
import { HomeComponent } from './Components/home/home.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http';
import { AddProductComponent } from './Components/add-product/add-product.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DeleteProductComponent } from './Components/delete-product/delete-product.component';
import { EditProductsComponent } from './Components/edit-products/edit-products.component';
import { ProductAddComponent } from './Components/product-add/product-add.component';
import { ImageSliderPopupComponent } from './Components/image-slider-popup/image-slider-popup.component';
import { UserLoginComponent } from './Components/user-login/user-login.component';
import { UserRegisterComponent } from './Components/user-register/user-register.component';
import { ProductService } from './services/product.service';
import { TransferDataService } from './services/transfer-data.service';
import { ToastrModule } from 'ngx-toastr';
import { BillgenerateComponent } from './Components/billgenerate/billgenerate.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ProductListComponent,
    ImageSliderComponent,
    ProductPopupComponent,
    CartComponent,
    BuyproductComponent,
    HomeComponent,
    AddProductComponent,
    DeleteProductComponent,
    EditProductsComponent,
    ProductAddComponent,
    ImageSliderPopupComponent,
    UserLoginComponent,
    UserRegisterComponent,
    BillgenerateComponent,
  ],
  entryComponents: [ProductPopupComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    NgbModule,
    MatDialogModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MatToolbarModule,
    MatIconModule,
    MatSidenavModule,
    MatButtonModule,
    ToastrModule.forRoot({
      timeOut: 1000,
      progressBar: true,
      progressAnimation: 'increasing',
      positionClass: 'toast-top-center',
    }),
  ],
  providers: [ProductService, TransferDataService, authInterceptorProviders],
  bootstrap: [AppComponent],
})
export class AppModule {}
