import { Component, OnInit, OnDestroy } from "@angular/core";
import { Observable } from "rxjs/Observable";
import { Parties } from "../../../../both/collections/parties.collection";
import { Party } from "../../../../both/models/party.model";
import { MeteorObservable } from "meteor-rxjs";
import { Subscription } from "rxjs/Subscription";
import { Subject } from "rxjs/Subject";
import 'rxjs/add/operator/combineLatest';
import template from "./parties-list.component.html";
import { PaginationService } from "ng2-pagination";

interface Pagination {
    limit: number,
    skip: number
}

interface Options extends Pagination {
    [key: string]: any
}


@Component({
    selector: 'parties-list',
    template
})

export class PartiesListComponent implements OnInit, OnDestroy {
    parties: Observable<Party[]>;
    partiesSub: Subscription;
    pageSize: Subject<number> = new Subject<number>();
    currPage: any = new Subject<number>();
    nameOrder: Subject<number> = new Subject<number>();
    optionsSub: Subscription;

    /**
     *
     */
    constructor(private paginationService: PaginationService) {

    }


    ngOnInit() {
        this.optionsSub = Observable.combineLatest(
            this.pageSize,
            this.currPage,
            this.nameOrder
        ).subscribe(([pageSize, currPage, nameOrder]) => {
            const options: Options = {
                limit: pageSize as number,
                skip: ((currPage as number) - 1) * (pageSize as number),
                sort: { name: nameOrder as number }
            };

            if (this.partiesSub) {
                this.partiesSub.unsubscribe();
            }

            this.partiesSub = MeteorObservable.subscribe('partiees',options).subscribe(() => {
                this.parties = Parties.find({}
                ).zone();
            });
        });
        this.paginationService.register({
            id: this.paginationService.defaultId.toString(),
            itemsPerPage: 10,
            currentPage: 1,
            totalItems: 30
        });

        this.paginationService.setCurrentPage(this.paginationService.defaultId.toString(), this.currPage as number)

        this.pageSize.next(10);
        this.currPage.next(1);
        this.nameOrder.next(1);
    }

    onPageChanged(page: number):void{
        this.currPage.next(page);
    }

    search = function (value: string): void {
        this.parties = Parties.find(value ? { location: value } : {}).zone();
    }
    ngOnDestroy() {
        this.partiesSub.unsubscribe();
        this.optionsSub.unsubscribe();
    }
}