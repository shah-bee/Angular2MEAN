export * from "./app.component";
export * from "./app.module";

import {PartiesComponent} from "../app/parties/parties.component";
import {PartiesListComponent} from "../app/parties/parties-list.component";
import {PartyDetailsComponent} from "../app/parties/party-details.component";
import {AppModule} from "./app.module";
import {AppComponent} from "./app.component";

export const PARTIES_DECLARATIONS= [
    PartiesComponent,
    PartiesListComponent,
    PartyDetailsComponent,
];