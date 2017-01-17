import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { AppComponent } from "./app.component";
import {PartiesComponent} from "../app/parties/parties.component";
import {PartiesListComponent} from "../app/parties/parties-list.component";
import {PartyDetailsComponent} from "../app/parties/party-details.component";

import {RouterModule} from "@angular/router";
import {routes,ROUTES_PROVIDERS} from "./app.route";
import {FormsModule,ReactiveFormsModule} from "@angular/forms";
import {AccountsModule} from "angular2-meteor-accounts-ui";
import {Ng2PaginationModule} from "ng2-pagination";



@NgModule({
  // Components, Pipes, Directive
  declarations: [
    AppComponent,
    PartiesComponent,
    PartyDetailsComponent,
    PartiesListComponent
  ],
  // Entry Components
  entryComponents: [
    AppComponent
  ],
  // Providers
  providers: [
    ROUTES_PROVIDERS
  ],
  // Modules
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes), 
    AccountsModule,
   Ng2PaginationModule
  ],
  // Main Component
  bootstrap: [ AppComponent ]
})
export class AppModule {
  constructor() {

  }
}
