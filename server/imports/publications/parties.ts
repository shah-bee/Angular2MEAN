import {Meteor} from "meteor/meteor";
import {Parties} from "../../../both/collections/parties.collection";
import { Counts } from 'meteor/tmeasday:publish-counts';

interface Pagination {
    limit: number,
    skip: number
}

interface Options extends Pagination {
    [key: string]: any
}
Meteor.publish('party',function(partyId:string){
    return Parties.find(buildQuery.call(this,partyId));
});

Meteor.publish('partiees', function(options: Options, location?:string) {
  Counts.publish(this, 'numberOfParties', Parties.collection.find(buildQuery.call(this,null,location)), { noReady: true });
 
  return Parties.find(buildQuery.call(this), options);
});

function buildQuery(partyId?:string):Object{
debugger;
    const isAvailable={
    $or: [{
      // party is public
      public: true
    },
    // or
    { 
      // current user is the owner
      $and: [{
        owner: this.userId 
      }, {
        owner: {
          $exists: true
        }
      }]
    }]
  
    };

    if(partyId){
        return{
            $and: [{
                _id:partyId
            },
            isAvailable]
        };
    }
     return isAvailable;
}