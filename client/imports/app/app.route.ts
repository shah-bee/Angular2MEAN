import {Route} from "@angular/router";
import {Meteor} from "meteor/meteor"
import {PartiesListComponent} from "../app/parties/parties-list.component";
import {PartiesComponent} from "../app/parties/parties.component";
import {PartyDetailsComponent} from "../../imports/app/parties/party-details.component";

export const routes: Route[] = [
    {path:'', component:PartiesListComponent},
    {path:'party',component:PartiesComponent},
    {path:'party/:partyId', component:PartyDetailsComponent, canActivate:['canActivateForLoggedIn']}
];

export const ROUTES_PROVIDERS =[{
    provide:'canActivateForLoggedIn',
    useValue:() => !! Meteor.userId()
}];