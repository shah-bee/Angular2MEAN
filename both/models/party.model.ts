import {CollectionObject} from "../models/collection-object.model";

export interface Party extends CollectionObject{
    name:string,
    description:string,
    location:string,
    owner?: string,
    public:boolean;
    invited?:string[];
}