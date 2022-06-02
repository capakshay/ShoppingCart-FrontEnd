import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddProductComponent } from './Components/add-product/add-product.component';
import { BuyproductComponent } from './Components/buyproduct/buyproduct.component';
import { DeleteProductComponent } from './Components/delete-product/delete-product.component';
import { HomeComponent } from './Components/home/home.component';
import { ProductAddComponent } from './Components/product-add/product-add.component';
import { AuthGuardService } from './services/auth-guard.service';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'bill',
    component: BuyproductComponent,
    // canActivate:[]
  },
  {
    path: 'admin',
    component: ProductAddComponent,
    canActivate: [AuthGuardService],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
