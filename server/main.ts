import { Main } from "./imports/server-main/main";
import {Meteor} from "meteor/meteor";
import {loadParties} from "./imports/fixtures/parties";
import './imports/publications/parties'; 
import './imports/publications/users';
import "../both/methods/parties.methods";

Meteor.startup(() =>
    { 
        loadParties()
    }
    );
// const mainInstance = new Main();
// mainInstance.start();
