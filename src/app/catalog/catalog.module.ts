import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { NotificationsService, SimpleNotificationsModule } from 'angular2-notifications';
import { CatalogComponent } from './catalog.component';
import { SharedModuleModule } from '../shared-module.module';
import { ScrollableDirective } from '../Directives/scrollable.directive';

const routes: Routes = [{ path: '', component: CatalogComponent }];

@NgModule({
  declarations: [CatalogComponent, ScrollableDirective],
  imports: [CommonModule, SharedModuleModule, RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CatalogModule {}
