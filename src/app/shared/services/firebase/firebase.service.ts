import { inject, Injectable } from '@angular/core';
import { collectionData, Firestore, docData } from '@angular/fire/firestore';
import { collection, doc } from 'firebase/firestore';
import { Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Users } from './../interface/users.service';
import { User } from './../interface/user.service';

@Injectable({
  providedIn: 'root',
})
export class FirebaseService {
  firestore: Firestore = inject(Firestore);

  // Benutzerliste abrufen
  public users$: Observable<Users[]> = this.getUsersRef(); // Konvention$ + interface

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

  getUserById(collectionId: string, documentId: string): Observable<User> {
    const userDocRef = doc(this.firestore, `${collectionId}/${documentId}`);
    return docData(userDocRef) as Observable<User>;
  }
}
