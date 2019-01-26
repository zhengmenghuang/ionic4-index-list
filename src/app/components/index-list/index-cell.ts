import { Component, OnInit } from '@angular/core';

// 字母索引 单个item模块封装
@Component({
    selector: 'ion-index-cell',
    template: `
      <div class="index-cell">
        <div class="index-cell-item">
          <ng-content></ng-content>
        </div>
      </div>
    `,
    styles: [`
      .index-cell-item{
        box-sizing: border-box;
        color: inherit;
        min-height: 48px;
        overflow: hidden;
        position: relative;
        text-decoration: none;
        width: 100%;
        display: flex;
        align-items: center;
      }
    `]
})
export class IndexCellComponent implements OnInit {

  constructor() { }

  ngOnInit() { }

}
