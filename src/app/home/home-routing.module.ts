import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home.component';
import { HomeSliderComponent } from './home-slider/home-slider.component';
import { HomeSliderItemComponent } from './home-slider-item/home-slider-item.component';
import { SharedModuleModule } from '../shared-module.module';

const routes: Routes = [{ path: '', component: HomeComponent }];

@NgModule({
  declarations: [HomeComponent, HomeSliderComponent, HomeSliderItemComponent],
  imports: [CommonModule, RouterModule.forChild(routes), SharedModuleModule],
  exports: [RouterModule],
})
export class HomeRoutingModule {}
