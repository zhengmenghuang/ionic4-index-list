import {Component} from '@angular/core';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  key: string;
  spell = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'J', 'K', 'M', 'N', 'L', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
  contactGroup = [];

  constructor() {
    // 数据 同步获取 会导致索引黏贴位置错误
    setTimeout(() => {
      this.spell.forEach(c => {
        const data = [];
        for (let i = 0; i < 10; i++) {
          data.push(`${c}${i}`);
        }
        this.contactGroup.push({
          Spell: c,
          Data: data
        });
      });
    }, 0);
  }
}
