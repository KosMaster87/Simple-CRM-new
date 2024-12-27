import { inject, Injectable } from '@angular/core';
import { collectionData, Firestore, docData } from '@angular/fire/firestore';
import { addDoc, collection, doc, onSnapshot } from 'firebase/firestore';
import { Observable } from 'rxjs';
import { Users } from './../interface/users.service';
import { User } from './../interface/user.service';

@Injectable({
  providedIn: 'root',
})
export class FirebaseService {
  firestore: Firestore = inject(Firestore);
  public users$: Observable<Users[]> = this.getUsersRef(); // Konvention$ + interface

  // unsubscribeUsers;

  constructor() {
    // this.unsubscribeUsers = onSnapshot();
  }

  getUsersRef(): Observable<Users[]> {
    const usersCollection = collection(this.firestore, 'users');
    const observableCollectionData = collectionData(
      usersCollection
    ) as Observable<Users[]>;

    observableCollectionData.subscribe((data) => {
      console.log('Service: Benutzerliste abgerufen:');
      console.table(data);
    });

    return observableCollectionData;
  }

  // getUserRef(collection_ID: string, document_ID: string): Observable<User> {
  //   const documentRef = doc(this.firestore, `${collection_ID}/${document_ID}`);
  //   return docData(documentRef) as Observable<User>;
  // }

  getUserById(collectionId: string, documentId: string): Observable<User> {
    const userDocRef = doc(this.firestore, `${collectionId}/${documentId}`);
    return docData(userDocRef) as Observable<User>;
  }
}
