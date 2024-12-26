import { inject, Injectable } from '@angular/core';
import { collectionData, Firestore, docData } from '@angular/fire/firestore';
import { collection, doc } from 'firebase/firestore';
import { Observable } from 'rxjs';
import { User } from '../interface/user.service';

@Injectable({
  providedIn: 'root',
})
export class FirebaseService {
  firestore: Firestore = inject(Firestore);
  public users$: Observable<User[]> = this.getUsersRef(); // Konvention$ + interface

  getUsersRef(): Observable<User[]> {
    const usersCollection = collection(this.firestore, 'users');
    const observableCollectionData = collectionData(
      usersCollection
    ) as Observable<User[]>;

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
}
