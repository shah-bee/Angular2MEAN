export * from "./app.component";
export * from "./app.module";

import {PartiesComponent} from "../app/parties/parties.component";
import {PartiesListComponent} from "../app/parties/parties-list.component";

export const PARTIES_DECLARATIONS= [
    PartiesComponent,
    PartiesListComponent
];