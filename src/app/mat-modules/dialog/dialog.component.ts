import { Component, inject } from '@angular/core';
import { MaterialSharedModule } from '../../shared/material-module/material-shared.module';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { User } from './../../models/user.class';
import {
  Firestore,
  collection,
  addDoc,
  collectionData,
} from '@angular/fire/firestore'; // addDoc importieren

@Component({
  selector: 'app-dialog',
  imports: [MaterialSharedModule],
  templateUrl: './dialog.component.html',
  styleUrl: './dialog.component.scss',
})
export class DialogComponent {
  private firestore = inject(Firestore);
  // itemCollection = collection(this.firestore, 'User');
  // item$ = collectionData<Item>(itemCollection);

  public data = inject(MAT_DIALOG_DATA);
  // private dialogRef = inject(MatDialogRef<DialogComponent>);

  isDialogOpen: boolean = this.data.isDialogOpen || false;
  // user: User = new User();
  // newUser: User = this.data.user || new User();
  newUser: User = new User({
    firstName: 'Konstantin',
    lastName: 'Aksenov',
    eMail: 'Konstantin.Aksenov@dev2k.net',
    mobile: '+595 994221200',
    street: 'Home-Str.',
    houseNumber: 187,
    zipCode: 9370,
    town: 'Loma Plata',
    country: 'Paraguay',
    someMoreSomething: 'Any Place',
    birthDate: new Date().getTime(),
  });

  birthDate!: Date;

  ngOnInit() {
    console.log(this.data);
  }

  ngOnDestroy() {
    console.table(this.newUser);
    // console.log(this.dialogRef);
    this.isDialogOpen = false;
  }

  addCancel() {
    console.log('Dialog geschlossen durch "cancel".');
  }

  /**
   * collection: Zum Erstellen einer Referenz auf eine Sammlung in der Firestore-Datenbank.
   * onSnapshot: Fügt einen Listener hinzu, der auf Änderungen in der Firestore-Datenbank reagiert.
   *
   * BehaviorSubject / Verhalten Subjekt: Ein Teil von RxJS, der es ermöglicht, Werte zu speichern und Änderungen in Echtzeit zu verfolgen.
   */
  addUser() {
    try {
      console.log('Firestore object:', this.firestore);

      // Stellen Sie sicher, dass this.firestore vom Typ Firestore ist
      if (!(this.firestore instanceof Firestore)) {
        throw new Error('Firestore ist nicht korrekt initialisiert.');
      }

      // Sammlung 'users' referenzieren
      const userCollectionRef = collection(this.firestore, 'users');

      // Benutzer hinzufügen
      addDoc(userCollectionRef, { ...this.newUser })
        .then((result) => {
          console.log('User erfolgreich hinzugefügt:', result);
        })
        .catch((error) => {
          console.error('Fehler beim Hinzufügen des Benutzers:', error.message);
        });
    } catch (error) {
      console.error('Fehler beim Erstellen der Collection:', error);
    }
  }
}
