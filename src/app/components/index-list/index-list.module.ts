import { NgModule } from '@angular/core';
import { IndexListComponent } from './index-list';
import {IndexSectionComponent} from './index-section';
import {CommonModule} from '@angular/common';
import {IndexCellComponent} from './index-cell';

// 字母索引模块总出口
@NgModule({
  declarations: [
    IndexListComponent,
    IndexSectionComponent,
    IndexCellComponent
  ],
  imports: [
    CommonModule,
  ],
  exports: [
    IndexListComponent,
    IndexSectionComponent,
    IndexCellComponent
  ]
})
export class IndexListModule {}
