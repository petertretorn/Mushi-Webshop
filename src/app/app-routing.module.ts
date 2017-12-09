import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminGuard } from '@app/core/admin.guard';
import { ProductPageComponent } from '@app/shop/product-page/product-page.component';
import { CartComponent } from '@app/shop/cart/cart.component';
import { CheckOutComponent } from '@app/shop/check-out/check-out.component';
import { LandingComponent } from '@app/landing/landing.component';

const routes: Routes = [
  { path: 'landing', component: LandingComponent },
  { path: 'cart', component: CartComponent },
  { path: 'check-out', component: CheckOutComponent },
  { path: 'product-page/:id', component: ProductPageComponent },
  { path: '', redirectTo: '/landing', pathMatch: 'full' },
  { path: 'admin', loadChildren: 'app/admin/admin.module#AdminModule', canActivate: [AdminGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
