import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SimpleNotificationsModule } from 'angular2-notifications';
import { ImageComponent } from './commonComponents/image/image.component';
import { LinkComponent } from './commonComponents/link/link.component';
import { ImageLinkComponent } from './commonComponents/image-link/image-link.component';
import { IconLinkComponent } from './commonComponents/icon-link/icon-link.component';
import { ViewProductsComponent } from './product-form/view-products/view-products.component';
import { ProductItemComponent } from './product-form/product-item/product-item.component';
@NgModule({
  declarations: [
    ImageComponent,
    LinkComponent,
    ImageLinkComponent,
    IconLinkComponent,
    ViewProductsComponent,
    ProductItemComponent,
  ],
  imports: [CommonModule, SimpleNotificationsModule.forRoot()],
  exports: [
    RouterModule,
    ImageComponent,
    LinkComponent,
    ImageLinkComponent,
    IconLinkComponent,
    ViewProductsComponent,
    ProductItemComponent,
  ],
})
export class SharedModuleModule {}
