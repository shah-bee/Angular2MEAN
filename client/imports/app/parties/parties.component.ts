import {Component,OnInit} from "@angular/core";
import {FormGroup,FormBuilder,Validators} from "@angular/forms";
import template from "./parties.component.html";
import  {Parties} from "../../../../both/collections/parties.collection";


@Component({
    selector:"parties",
    template
})
export class PartiesComponent implements OnInit{
    addForm :FormGroup;

    constructor(private formBuilder:FormBuilder) {
                
    }

    ngOnInit(){
        this.addForm = this.formBuilder.group({
            name:['',Validators.required],
            description:[],
            location:['',Validators.required]
        })

    }

    addParty():void{
            if(this.addForm.valid){
                Parties.insert(this.addForm.value);
                this.addForm.reset();
            }

    }
}