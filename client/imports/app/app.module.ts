import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { AppComponent } from "./app.component";
import {PartiesComponent} from "../app/parties/parties.component";
import {PartiesListComponent} from "../app/parties/parties-list.component";
import {PartyDetailsComponent} from "../app/parties/party-details.component";

import {RouterModule} from "@angular/router";
import {routes} from "./app.route";
import {FormsModule,ReactiveFormsModule} from "@angular/forms";
import {AccountsModule} from "angular2-meteor-accounts-ui";


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
    
  ],
  // Modules
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes),
    AccountsModule
  ],
  // Main Component
  bootstrap: [ AppComponent ]
})
export class AppModule {
  constructor() {

  }
}
