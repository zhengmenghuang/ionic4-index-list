import {
  AfterViewChecked, Component, ContentChildren, ElementRef, Input, QueryList,
  ViewChild
} from '@angular/core';
import {IndexSectionComponent} from './index-section';

// 字母索引 多个字母列表模块封装 这里处理了侧边栏 总人数
@Component({
  selector: 'ion-index-list',
  template: `
    <div class="index-list scrollContent">
      <div class="index-list-wrapper scrollContent" #scrollContent tappable (scroll)="onScroll($event)">
        <ng-content select="[top]"></ng-content>
        <ng-content></ng-content>
        <ng-content select="[bottom]"></ng-content>
        <div class="sum-contact" *ngIf="hasSum">
          {{_sumContact}}位联系人
        </div>
      </div>

      <div *ngIf="_indexes.length" class="index-list-nav" (touchstart)="touchstart($event)" (touchmove)="touchmove($event)"
           (touchend)="touchend($event)">
        <div class="index-bar" *ngFor="let index of _indexes;"
             [class.index-list-nav-activate]="index === _currentIndicator">
          {{index}}
        </div>
      </div>

      <div class="modal" [class.show]="_showModal">
        {{_currentIndicator}}
      </div>
    </div>
  `,
  styles: [`
    ::-webkit-scrollbar {
      width: 0
    }

    .index-list {
      width: 100%;
      height: 100%;
      overflow: hidden;
    }

    .index-list-wrapper {
      width: 100%;
      overflow-y: scroll;
      -webkit-overflow-scrolling: touch;
    }

    .index-list-nav {
      width: 6%;
      position: absolute;
      top: 0;
      right: 0;
      display: flex;
      justify-content: center;
      flex-direction: column;
      text-align: center;
      background-color: rgba(245, 245, 245, 0.3);
      height: 100%;
      z-index: 1000;
      -webkit-touch-callout: none;
    }

    .index-bar {
      padding: 2px 6px;
      font-size: 10px;
    }

    .index-list-nav-activate {
      color: yellowgreen;
    }

    .sum-contact{
      text-align: center;
      padding: 1em;
      font-size: 1.3em;
      color: #8c8c8c;
    }

    .modal {
      top: 50%;
      left: 50%;
      z-index: 100;
      position: fixed;
      pointer-events: none;
      width: 20vw;
      height: 20vw;
      line-height: 20vw;
      margin-left: -10vw;
      margin-top: -10vw;
      color: #fff;
      font-size: 3em;
      text-align: center;
      border-radius: 8px;
      background-color: rgba(0, 0, 0, 0.52);
      -webkit-box-shadow: 0 0 4px 1px rgba(0, 0, 0, 0.16);
      box-shadow: 0 0 4px 1px rgba(0, 0, 0, 0.16);
      -webkit-transition: opacity .5s;
      -o-transition: opacity .5s;
      transition: opacity .5s;
      opacity: 0;
    }

    .modal.show {
      opacity: 1;
    }
  `]
})
export class IndexListComponent implements AfterViewChecked {
  _currentIndicator: string; // 当前的字母索引
  _indexes: Array<string> = []; // 右侧导航
  _offsetTops: Array<number> = []; // 每个IndexSection 的offsetTop
  _navOffsetX = 0; // 点击时字母栏距离顶部的距离
  _indicatorTime: any = null; // 函数节流
  _showModal = false; // 弹层是否激活
  _sumContact = 0; // 总共联系人的数量


  @Input() hasTop = false;
  @Input() hasSum = false;

  @ViewChild('top') top: ElementRef;
  @ViewChild('bottom') bottom: ElementRef;
  @ContentChildren(IndexSectionComponent) _listOfIndexSection: QueryList<IndexSectionComponent>;
  @ViewChild('scrollContent') scrollContent: ElementRef;

  constructor() {

  }

  ngAfterViewChecked(): void {
    /*当列表变更后 更新字母表*/
    const newSum = this._listOfIndexSection['_results'].reduce((sum, item) => [...sum, ...item._listOfIndexCell['_results']], []).length;
    if (newSum !== this._sumContact && this._listOfIndexSection) {
      setTimeout(() => {
        // 重置基本信息
        this._sumContact = newSum;
        this._indexes = [];
        this._offsetTops = [];
        this._navOffsetX = 0;

        // 赋值字母索引
        this._listOfIndexSection.forEach((section) => {
          this._indexes.push(section.index);
          this._offsetTops.push(section.getElementRef().nativeElement.offsetTop);
        });

        // 判断是否需要显示到顶的箭头
        if (this.hasTop) {
          this._indexes.unshift('↑');
          this._offsetTops.unshift(0);
          this._currentIndicator = '↑';
        } else {
          if (this._indexes.length) { this._currentIndicator = this._indexes[0]; }
        }
      }, 0);
    }
  }

  onScroll(e: any) {
    e.preventDefault();
    const scrollTopOffsetTop = this.scrollContent.nativeElement.scrollTop;
    this._offsetTops.forEach((v, i) => {
      if (scrollTopOffsetTop >= v) {
        this._currentIndicator = this._indexes[i];
        this.setCurrentSection(this._currentIndicator);
      }
    });
  }

  touchstart(e: any) {
    this._navOffsetX = e.changedTouches[0].clientX;
    this.scrollList(e.changedTouches[0].clientY);
  }

  touchmove(e: any) {
    e.preventDefault();
    this.scrollList(e.changedTouches[0].clientY);
  }

  touchend(e: any) {
    this._indicatorTime = setTimeout(() => {
      this._showModal = false;
    }, 500);
  }

  scrollList(y: any) {
    const currentItem: any = document.elementFromPoint(this._navOffsetX, y);
    if (!currentItem || !currentItem.classList.contains('index-bar')) {
      return;
    }
    this._currentIndicator = currentItem['innerText'];
    const index = this._indexes.indexOf(this._currentIndicator);

    this.scrollContent.nativeElement.scrollTop = this._offsetTops[index];


    this._showModal = true;
    if (this._indicatorTime) {
      clearTimeout(this._indicatorTime);
    }
  }


  setCurrentSection(currentindex: string) {
    const listArray = this._listOfIndexSection.toArray();
    listArray.forEach((section) => {
      section._current = section.index === currentindex;
    });
  }

}
