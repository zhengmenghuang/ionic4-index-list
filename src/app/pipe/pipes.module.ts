import {NgModule} from '@angular/core';
import {FilterPipe} from './filter';



export const pipes = [
    FilterPipe
];

@NgModule({
    declarations: [pipes],
    exports: [pipes]
})

export class PipesModule {
}
