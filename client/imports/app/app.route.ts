import {Route} from "@angular/router";
import {PartiesListComponent} from "../app/parties/parties-list.component";
import {PartyDetailsComponent} from "../../imports/app/parties/party-details.component";

export const routes: Route[] = [
    {path:'', component:PartiesListComponent},
    {path:'party/:partyId', component:PartyDetailsComponent}
];
