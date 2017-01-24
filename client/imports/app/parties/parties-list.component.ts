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
import { Counts } from 'meteor/tmeasday:publish-counts';

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
    currPage: Subject<number> = new Subject<number>();
    nameOrder: Subject<number> = new Subject<number>();
    optionsSub: Subscription;
    autorunSub: Subscription;
    partiesSize: number = 0;
    /**
     *
     */
    constructor(private paginationService: PaginationService) {
        //   id: this.paginationService.defaultId;
        //   this.pageSize: 10;
        //   this.currPage: 1;
        //   totalItems: this.partiesSize
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

            this.partiesSub = MeteorObservable.subscribe('partiees', options).subscribe(() => {
                this.parties = Parties.find({}, {
                    sort: { name: nameOrder as number }
                }).zone();
            });
        });
        this.paginationService.register({
            id: this.paginationService.defaultId(),
            itemsPerPage:10,
            currentPage: 1,
            totalItems: this.partiesSize
        });

                //this.paginationService.setItemsPerPage(this.paginationService.defaultId(),2);
        this.paginationService.setCurrentPage(this.paginationService.defaultId(),1)

         this.pageSize.next(10);
         this.currPage.next(1);
         this.nameOrder.next(1);

        this.autorunSub = MeteorObservable.autorun().subscribe(() => {
            this.partiesSize = Counts.get('numberOfParties');
            this.paginationService.setTotalItems(this.paginationService.defaultId(), this.partiesSize);
        });
    }

    onPageChanged(page: number): void {
        this.currPage.next(page);
    }

    removeParty(party: Party): void {
        Parties.remove(party._id);
    };

    changeSortOrder(nameOrder:string):void{
        this.nameOrder.next(parseInt(nameOrder));
    }

    search = function (value: string): void {
        this.parties = Parties.find(value ? { location: value } : {}).zone();
    }
    ngOnDestroy() {
        this.partiesSub.unsubscribe();
        this.optionsSub.unsubscribe();
        this.autorunSub.unsubscribe();
    }
}