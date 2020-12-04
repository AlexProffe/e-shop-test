import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { ServiceComponent } from './service/service.component';
import { HeaderComponent } from './header/header.component';
import { HeaderPanelComponent } from './header/header-panel/header-panel.component';
import { HeaderNavComponent } from './header/header-nav/header-nav.component';
import { ImageComponent } from './commonComponents/image/image.component';
import { LinkComponent } from './commonComponents/link/link.component';
import { ImageLinkComponent } from './commonComponents/image-link/image-link.component';
import { IconLinkComponent } from './commonComponents/icon-link/icon-link.component';
import { WishlistComponent } from './header/wishlist/wishlist.component';
import { MenuComponent } from './header/menu/menu.component';
import { MenuItemComponent } from './header/menu-item/menu-item.component';
import { FooterComponent } from './footer/footer.component';
import { FooterCopyrightComponent } from './footer/footer-copyright/footer-copyright.component';
import { MainComponent } from './main/main.component';
import { CartCountComponent } from './header/cart-count/cart-count.component';
import { HomeSliderComponent } from './home/home-slider/home-slider.component';
import { HomeSliderItemComponent } from './home/home-slider-item/home-slider-item.component';
import { environment } from '../environments/environment';
import { ProductFormComponent } from './product-form/product-form.component';
import { CreateProductComponent } from './product-form/create-product/create-product.component';
import { ViewProductsComponent } from './product-form/view-products/view-products.component';
import { ProductItemComponent } from './product-form/product-item/product-item.component';
import { AppRoutingModule } from './app.routing.module';

@NgModule({
  declarations: [
    AppComponent,
    ServiceComponent,
    HeaderComponent,
    HeaderPanelComponent,
    HeaderNavComponent,
    ImageComponent,
    LinkComponent,
    ImageLinkComponent,
    IconLinkComponent,
    WishlistComponent,
    MenuComponent,
    MenuItemComponent,
    FooterComponent,
    FooterCopyrightComponent,
    MainComponent,
    CartCountComponent,
    HomeSliderComponent,
    HomeSliderItemComponent,
    ProductFormComponent,
    CreateProductComponent,
    ViewProductsComponent,
    ProductItemComponent,
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
    AngularFireAuthModule,
    ReactiveFormsModule,
    AppRoutingModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
