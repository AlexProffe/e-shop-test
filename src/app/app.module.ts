import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ServiceComponent } from './service/service.component';
import { HeaderComponent } from './header/header.component';
import { HeaderPanelComponent } from './header-panel/header-panel.component';
import { HeaderNavComponent } from './header-nav/header-nav.component';
import { ImageComponent } from './image/image.component';
import { LinkComponent } from './link/link.component';
import { ImageLinkComponent } from './image-link/image-link.component';
import { IconLinkComponent } from './icon-link/icon-link.component';
import { WishlistComponent } from './wishlist/wishlist.component';
import { MenuComponent } from './menu/menu.component';
import { MenuItemComponent } from './menu-item/menu-item.component';
import { FooterComponent } from './footer/footer.component';
import { FooterCopyrightComponent } from './footer-copyright/footer-copyright.component';
import { MainComponent } from './main/main.component';
import { CartCountComponent } from './cart-count/cart-count.component';
import { HomeSliderComponent } from './home-slider/home-slider.component';
import { HomeSliderItemComponent } from './home-slider-item/home-slider-item.component';
import {AngularFirestoreModule} from "@angular/fire/firestore";
import {AngularFireModule} from "@angular/fire";
import  {environment} from "../environments/environment";
import {AngularFireAuthModule} from "@angular/fire/auth";

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
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
    AngularFireAuthModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
