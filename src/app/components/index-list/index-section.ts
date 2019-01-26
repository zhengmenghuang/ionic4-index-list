import {
    AfterViewChecked, Component, ContentChildren, ElementRef, Input,
    QueryList
} from '@angular/core';
import {IndexCellComponent} from './index-cell';

// 字母索引 单个字母列表模块封装 这里处理了字母显示
@Component({
    selector: 'ion-index-section',
    template: `
        <div class="index-section" [class.index-section-current]="_current">
            <!-- group-->
            <div class="index-section-index">
                {{index}}
            </div>

            <!--分组下的详细内容-->
            <div class="index-section-main">
                <ng-content>

                </ng-content>
            </div>
        </div>
    `,
    styles: [`
        .index-section-index {
            margin: 0;
            padding: .2em 1em;
            background-color: #eee;
        }

        .index-section-main {
            /*border-bottom: 1px solid #dedede;*/
        }

        .index-section-current .index-section-index {
            position: sticky;
            position: -webkit-sticky;
            top: 0;
            left: 0;
            width: 100%;
            z-index: 3;
            transform: translateZ(0px);

        }
    `]
})
export class IndexSectionComponent implements AfterViewChecked {

    _current = false;

    @Input() index: string;

    @ContentChildren(IndexCellComponent) _listOfIndexCell: QueryList<IndexCellComponent>;

    constructor(public elementRef: ElementRef) {

    }

    getElementRef(): ElementRef {
        return this.elementRef;
    }

    ngAfterViewChecked(): void {
    }
}
