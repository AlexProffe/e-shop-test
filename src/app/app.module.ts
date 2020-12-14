import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { ServiceWorkerModule } from '@angular/service-worker';
import { AppComponent } from './app.component';
import { ServiceComponent } from './service/service.component';
import { HeaderComponent } from './header/header.component';
import { HeaderPanelComponent } from './header/header-panel/header-panel.component';
import { HeaderNavComponent } from './header/header-nav/header-nav.component';

import { WishlistComponent } from './header/wishlist/wishlist.component';
import { MenuComponent } from './header/menu/menu.component';
import { MenuItemComponent } from './header/menu-item/menu-item.component';
import { FooterComponent } from './footer/footer.component';
import { FooterCopyrightComponent } from './footer/footer-copyright/footer-copyright.component';
import { CartCountComponent } from './header/cart-count/cart-count.component';

import { environment } from '../environments/environment';
import { AppRoutingModule } from './app.routing.module';
import { SharedModuleModule } from './shared-module.module';

@NgModule({
  declarations: [
    AppComponent,
    ServiceComponent,
    HeaderComponent,
    HeaderPanelComponent,
    HeaderNavComponent,
    WishlistComponent,
    MenuComponent,
    MenuItemComponent,
    FooterComponent,
    FooterCopyrightComponent,
    CartCountComponent,
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
    AngularFireAuthModule,
    AppRoutingModule,
    SharedModuleModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
