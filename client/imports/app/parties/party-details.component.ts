import { Component, OnInit, OnDestroy } from "@angular/core";
import { ActivatedRoute, CanActivate } from "@angular/router";
import "rxjs/add/operator/map";
import { Subscription } from "rxjs/Subscription";
import template from "./party-details.component.html";

import { Parties } from "../../../../both/collections/parties.collection";
import { Users } from "../../../../both/collections/users.collection";
import { Party } from "../../../../both/models/party.model";
import { User } from "../../../../both/models/user.model";
import { MeteorObservable } from "meteor-rxjs";
import {Observable} from 'rxjs/Observable';


@Component({
    selector: 'party-details',
    template
})
export class PartyDetailsComponent implements OnInit, CanActivate, OnDestroy {
    partyId: string;
    paramsSub: Subscription;
    party: Party;
    partySub: Subscription;
    uninvitedSub:Subscription;
    users:Observable<User>;
    constructor(private route: ActivatedRoute) {

    }

    invite(user:Meteor.User){
        MeteorObservable.call('invite', this.party._id,user._id).subscribe(() => {
            alert('User successfully added');
        },(error) => {
            alert('Failed to invite due to ${error}');
        });
    }

    saveParty() {
        Parties.update(this.party._id, {
            $set: {
                name: this.party.name,
                description: this.party.description,
                location: this.party.location
            }
        })

    };

    canActivate() {
        const party = Parties.findOne(this.partyId)
        return (party && party.owner == Meteor.userId());
    };

    ngOnInit() {
        this.paramsSub = this.route.params
            .map(params => params["partyId"])
            .subscribe(partyId => this.partyId = partyId)

        if (this.partySub) {
            this.partySub.unsubscribe();
        }
        this.partySub = MeteorObservable.subscribe('party', this.partyId).subscribe(() => {
            MeteorObservable.autorun().subscribe(() =>{
            this.party = Parties.findOne(this.partyId);
            this.getUsers(this.party);
            });
        });

        if(this.uninvitedSub){
            this.uninvitedSub.unsubscribe();
        }

        this.uninvitedSub = MeteorObservable.subscribe('uninvited', this.partyId).subscribe(() => {
           this.users = Users.find({
             _id: {
               $ne: Meteor.userId()
              }
            }).zone();
        });
    }
   
    getUsers(party:Party){
        if(party){
            this.users = Users.find({
                _id:{
                    $nin:party.invited || [],
                    $ne:Meteor.userId()
                }
            }).zone();
        }
    }

    ngOnDestroy() {
        this.paramsSub.unsubscribe();
        this.partySub.unsubscribe();
        this.uninvitedSub.unsubscribe();
    }
}