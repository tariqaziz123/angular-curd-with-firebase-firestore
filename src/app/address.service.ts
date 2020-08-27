import { Injectable } from '@angular/core';
import { Address } from './address';
import {AngularFirestore} from '@angular/fire/firestore'
@Injectable({
  providedIn: 'root'
})
export class AddressService {

  constructor( private fireStore : AngularFirestore) { }

  saveAdress(address: Address){
      console.log ("from service class")
      console.log (address)
      this.fireStore.collection("addres").add({...address})
  }

  readAddress (){
    return this.fireStore.collection("addres").snapshotChanges()
  }

  updateAddress ( address: Address ){
    this.fireStore.doc('addres/'+address.id).update({...address})
  }

  deleteAddress ( address: Address ) {
    this.fireStore.doc('addres/'+address.id).delete()

  }

}
