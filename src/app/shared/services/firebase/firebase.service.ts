import { inject, Injectable } from '@angular/core';
import { collectionData, Firestore, docData } from '@angular/fire/firestore';
import { collection, doc } from 'firebase/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FirebaseService {
  firestore: Firestore = inject(Firestore);

  getUsersRef(): Observable<any> {
    const usersCollection = collection(this.firestore, 'users');
    const observableColData = collectionData(usersCollection);

    observableColData.subscribe((data) => {
      console.log('Service: Benutzerliste abgerufen:');
      console.table(data);
    });

    return observableColData;
  }

  getUserRef(collection_ID: string, document_ID: string): Observable<any> {
    const documentRef = doc(this.firestore, `${collection_ID}/${document_ID}`);
    return docData(documentRef);
  }
}
