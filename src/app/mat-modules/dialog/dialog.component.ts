import { Component, inject } from '@angular/core';
import { MaterialSharedModule } from '../../shared/material-module/material-shared.module';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Users } from './../../shared/services/interface/users.service';
import { User } from './../../shared/services/interface/user.service';
import {
  Firestore,
  collection,
  addDoc,
  collectionData,
} from '@angular/fire/firestore';

@Component({
  selector: 'app-dialog',
  imports: [MaterialSharedModule],
  templateUrl: './dialog.component.html',
  styleUrl: './dialog.component.scss',
})
export class DialogComponent {
  private firestore = inject(Firestore);
  public data = inject(MAT_DIALOG_DATA);
  isDialogOpen: boolean = this.data.isDialogOpen || false;
  birthDate!: Date;
  newUser: User = new User({
    firstName: 'Konstantin',
    lastName: 'Aksenov',
    email: 'Konstantin.Aksenov@dev2k.net',
    mobile: '+595 994221200',
    street: 'Home-Str.',
    houseNumber: 187,
    zipCode: 9370,
    town: 'Loma Plata',
    country: 'Paraguay',
    birthDate: new Date().getTime(),
    description: 'Any Description',
    role: 'Admin',
    someMoreSomething: 'Any Place',
  });

  ngOnInit() {
    console.log(this.data);
  }

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
