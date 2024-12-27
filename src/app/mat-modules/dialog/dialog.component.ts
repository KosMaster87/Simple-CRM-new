import { Component, inject } from '@angular/core';
import { MaterialSharedModule } from '../../shared/material-module/material-shared.module';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { User } from './../../shared/services/interface/user.service';
import { Firestore, collection, addDoc } from '@angular/fire/firestore';

@Component({
  selector: 'app-dialog',
  imports: [MaterialSharedModule],
  templateUrl: './dialog.component.html',
  styleUrl: './dialog.component.scss',
})
export class DialogComponent {
  firestore: Firestore = inject(Firestore);
  public data = inject(MAT_DIALOG_DATA);
  isDialogOpen: boolean = this.data.isDialogOpen || false;
  birthDate!: Date;
  newUser: User = new User(
    'Konstantin',
    'Aksenov',
    'Konstantin.Aksenov@dev2k.net',
    '+595 994221200',
    'Home-Str.',
    '187',
    '9370',
    'Loma Plata',
    'Paraguay',
    new Date(),
    'Any Description',
    'Admin',
    'Any Place'
  );

  async addUser() {
    const usersCollection = collection(this.firestore, 'users');

    if (!usersCollection) {
      throw new Error('Collection reference konnte nicht erstellt werden.');
    }

    try {
      const docRef = await addDoc(usersCollection, this.newUser.toJSON());
      console.log('User erfolgreich hinzugefügt:', docRef.id);
    } catch (error: any) {
      console.error('Fehler beim Hinzufügen des Benutzers:', error.message);
    }
  }

  ngOnInit() {
    console.log(this.data);
    console.log('Firestore:', this.firestore);
  }
}
