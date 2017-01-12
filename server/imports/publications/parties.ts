import {Meteor} from "meteor/meteor";
import {Parties} from "../../../both/collections/parties.collection";

Meteor.publish('party',function(partyId:string){
    return Parties.find(buildQuery.call(this,partyId));
});

Meteor.publish('partiees', function() {
  return Parties.find(buildQuery.call(this));
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