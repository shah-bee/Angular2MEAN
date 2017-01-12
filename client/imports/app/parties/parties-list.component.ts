import {Component,OnInit,OnDestroy} from "@angular/core";
import {Observable} from "rxjs/Observable";
import {Parties} from "../../../../both/collections/parties.collection";
import {Party} from "../../../../both/models/party.model";
import {MeteorObservable} from "meteor-rxjs";
import {Subscription} from "rxjs/Subscription";
import template from "./parties-list.component.html";

@Component({
    selector:'parties-list',
    template
})

export class PartiesListComponent implements OnInit,OnDestroy{
    parties:Observable<Party[]>;
    partiesSub:Subscription;

    ngOnInit(){
        this.parties = Parties.find({}).zone();
        this.partiesSub = MeteorObservable.subscribe('partiees').subscribe();
    }
    search = function(value: string): void {
    this.parties = Parties.find(value ? { location: value } : {}).zone();
  }
    ngOnDestroy() {
    this.partiesSub.unsubscribe();
  }
}