import {Component,OnInit,OnDestroy} from "@angular/core";
import {ActivatedRoute,CanActivate} from "@angular/router";
import "rxjs/add/operator/map";
import {Subscription} from "rxjs/Subscription";
import template from "./party-details.component.html";

import {Parties} from "../../../../both/collections/parties.collection";
import {Party} from "../../../../both/models/party.model";

@Component({
   selector:'party-details',
   template
})
export class PartyDetailsComponent implements OnInit, CanActivate{
           partyId:string;
           paramsSub:Subscription;
           party:Party;
           
           constructor(private route:ActivatedRoute) {
               
           }

           saveParty(){
                Parties.update(this.party._id,{
                    $set: {
                        name : this.party.name,
                        description: this.party.description,
                        location:this.party.location
                    }
                })

           }

        removeParty(party:Party):void{
        Parties.remove(party._id);
        }

           canActivate(){

               const party = Parties.findOne(this.partyId)
               return (party && party.owner == Meteor.userId());
           }

           ngOnInit(){
               this.paramsSub = this.route.params
               .map(params => params["partyId"])
               .subscribe(partyId => this.partyId = partyId)

               this.party = Parties.findOne(this.partyId);
           }

           ngOnDestroy(){
               this.paramsSub.unsubscribe();
           }
}