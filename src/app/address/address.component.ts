import { Component, OnInit } from '@angular/core';
import { Address } from '../address';
import { AddressService } from '../address.service';
import {NgForm} from '@angular/forms'

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.css']
})
export class AddressComponent implements OnInit {

  formData = new Address();

  addresses : Address[]

  constructor( private addressService : AddressService) { }

  ngOnInit(): void {

    this.addressService.readAddress().subscribe(
      (data)=>{

       this.addresses= data.map ( (document)=>{
          return {
            id: document.payload.doc.id,
            ...document.payload.doc.data() as {}
          }  as Address
        } )

        console.log ("Data received >> ", data)
      }
    )
  }

  saveData(addressForm: NgForm){

    console.log ("saving data ")
    console.log (this.formData)
    if (this.formData.id==null){
      this.addressService.saveAdress(this.formData)
    }
    else {
      this.addressService.updateAddress(this.formData)
    }

    this.formData= new Address();
    addressForm.resetForm()
  }


  editData( address : Address ) {
    this.formData= address
  }

  deleteData (address : Address){
    this.addressService.deleteAddress(address)
  }

  clear(addressForm: NgForm){
    console.log("inside clear !!!")
    this.formData= new Address();
    console.log (addressForm)
    addressForm.resetForm()
  }
}
