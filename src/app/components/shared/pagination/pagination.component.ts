import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
    selector: 'app-pagination',
    templateUrl: './pagination.component.html',
    styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent implements OnInit {

    pagination;

    @Input('pagination') set paginationObject(pagination) {

        this.pagination = pagination;
        console.log('a pagination:', pagination);
    }

    @Output('selected-page') newPage: EventEmitter<string> = new EventEmitter<string>();

    constructor() {
    }

    ngOnInit() {
    }

    setPage(link: string) {
        this.newPage.emit(link);
    }

}
