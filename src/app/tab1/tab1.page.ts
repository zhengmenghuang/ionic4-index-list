import {Component} from '@angular/core';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  show: boolean; // 控制是否显示底边
  str: string; // 填充数组

  constructor() {
    this.str = 'qwertyuiopasdfghjklzxcvbnm';
    this.show = true;
  }
}
