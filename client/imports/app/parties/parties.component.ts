import {InjectUser} from "angular2-meteor-accounts-ui";
import {Component,OnInit} from "@angular/core";
import {FormGroup,FormBuilder,Validators} from "@angular/forms";
import template from "./parties.component.html";
import  {Parties} from "../../../../both/collections/parties.collection";
import {Party} from "../../../../both/models/party.model";

@Component({
    selector:"parties",
    template
})
@InjectUser('user')
export class PartiesComponent implements OnInit{
    addForm :FormGroup;
    user:Meteor.User;

    constructor(private formBuilder:FormBuilder) {
                
    }

    ngOnInit(){
        console.log(this.user);
        this.addForm = this.formBuilder.group({
            name:['',Validators.required],
            description:[],
            location:['',Validators.required]
        })

    }

     
    addParty():void{
            if(!Meteor.userId()){
                alert('Please log in to add a party!');
                return;
            }

            if(this.addForm.valid){
                Parties.insert((<any>Object).assign({}, this.addForm.value, { owner : Meteor.userId() }));
                this.addForm.reset();
            }
    }
}