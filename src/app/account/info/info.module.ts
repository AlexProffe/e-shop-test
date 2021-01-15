import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { SharedModuleModule } from '../../shared-module.module';
import { InfoComponent } from './info.component';

const routes: Routes = [{ path: '', component: InfoComponent }];

@NgModule({
  declarations: [InfoComponent],
  imports: [CommonModule, SharedModuleModule, RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InfoModule {}
