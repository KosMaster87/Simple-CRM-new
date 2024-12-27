import {
  Component,
  inject,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
} from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MaterialSharedModule } from './../../shared/material-module/material-shared.module';
import { DialogComponent } from './../../mat-modules/dialog/dialog.component';
import { FirebaseService } from './../../shared/services/firebase/firebase.service';
import { CommonModule } from '@angular/common';
import { Users } from './../../shared/services/interface/users.service';
import { User } from './../../shared/services/interface/user.service';
import { Observable, of } from 'rxjs';
import { Firestore } from '@angular/fire/firestore';
import { catchError } from 'rxjs/operators';

@Component({
  selector: 'app-user',
  imports: [MaterialSharedModule, CommonModule],
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush, // Änderungserkennung
})
export class UserComponent {
  firestore: Firestore = inject(Firestore);
  public firebaseService = inject(FirebaseService);
  public users$: Observable<Users[]> = this.firebaseService.users$;

  public selectedUser$: Observable<User | null> = of(null);
  public selectedUserId: string | null = null;

  public error: string | null = null;
  private cdr: ChangeDetectorRef = inject(ChangeDetectorRef);
  private dialog = inject(MatDialog);
  private dialogRef!: MatDialogRef<DialogComponent>;
  isDialogOpen: boolean = false;
  loading: boolean = false;

  trackByUserId(index: number, user: Users): string | undefined {
    return user.id;
  }

  // Benutzer auswählen
  selectUser(userId: string): void {
    this.selectedUserId = userId;
    this.selectedUser$ = this.firebaseService.getUserById('users', userId).pipe(
      catchError((error) => {
        this.error = 'Benutzer konnte nicht geladen werden';
        console.error('Error fetching user:', error);
        return of(null);
      })
    );
  }

  // Zurück zur Benutzerliste
  resetSelection(): void {
    this.selectedUserId = null;
    this.selectedUser$ = of(null);
  }

  // Benutzerliste neu laden
  refreshUsers(): void {
    this.loading = true;
    this.users$ = this.firebaseService.getUsersRef().pipe(
      catchError((err) => {
        this.error = 'Fehler beim Laden der Benutzerliste';
        console.error('Error fetching user list:', err);
        this.loading = false;
        return of([]);
      })
    );

    this.users$.subscribe(() => {
      this.loading = false;
      this.cdr.markForCheck();
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
      this.cdr.markForCheck();
    });
  }

  // openEditDialog(user: User): void {
  //   this.dialog.open(DialogComponent, {
  //     data: user,
  //     autoFocus: false,
  //   });
  // }
}
