import {CollectionObject} from "../models/collection-object.model";

export interface Party extends CollectionObject{
    name:String,
    description:String,
    location:String
}