import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { CatalogComponent } from './catalog.component';
import { SharedModuleModule } from '../shared-module.module';

const routes: Routes = [{ path: '', component: CatalogComponent }];

@NgModule({
  declarations: [CatalogComponent],
  imports: [CommonModule, SharedModuleModule, RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CatalogModule {}
