import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ComparisonComponent } from './comparison.component';
import { SharedModuleModule } from '../shared-module.module';

const routes: Routes = [{ path: '', component: ComparisonComponent }];

@NgModule({
  declarations: [ComparisonComponent],
  imports: [CommonModule, SharedModuleModule, RouterModule.forChild(routes)],
})
export class ComparisonModule {}
