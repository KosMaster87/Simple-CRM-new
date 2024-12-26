import { Component, inject, ChangeDetectionStrategy } from '@angular/core';
import { MaterialSharedModule } from '../../shared/material-module/material-shared.module';
import { DialogComponent } from '../../mat-modules/dialog/dialog.component';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { FirebaseService } from '../../shared/services/firebase/firebase.service';

@Component({
  selector: 'app-user',
  imports: [MaterialSharedModule],
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserComponent {
  private firebaseService = inject(FirebaseService);
  private dialog = inject(MatDialog);
  private dialogRef!: MatDialogRef<DialogComponent>;
  isDialogOpen = false;
  loading = false;

  longText = `The Chihuahua is a Mexican breed of toy dog. It is named for the
  Mexican state of Chihuahua and is among the smallest of all dog breeds. It is
  usually kept as a companion animal or for showing.`;

  onLogUsers() {
    this.loading = true;
    this.firebaseService.getUsersRef().subscribe({
      next: () => {
        console.log('Daten erfolgreich abgerufen');
        this.loading = false;
      },
      error: (err) => {
        console.error('Fehler beim Abrufen der Daten:', err);
        this.loading = false;
      },
    });
  }

  openDialog() {
    if (this.isDialogOpen) {
      return;
    }

    this.isDialogOpen = true;
    this.dialogRef = this.dialog.open(DialogComponent, {
      data: {
        name: 'Mate',
        isDialogOpen: this.isDialogOpen,
      },
      autoFocus: false,
      disableClose: false,
      enterAnimationDuration: '500ms',
      exitAnimationDuration: '300ms',
    });

    this.dialogRef.afterClosed().subscribe(() => {
      this.isDialogOpen = false;
    });
  }
}
