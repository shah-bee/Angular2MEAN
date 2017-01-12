import { Main } from "./imports/server-main/main";
import {Meteor} from "meteor/meteor";
import {loadParties} from "./imports/fixtures/parties";
import './imports/publications/parties'; 

Meteor.startup(() =>
    { 
        loadParties()
    }
    );
// const mainInstance = new Main();
// mainInstance.start();
