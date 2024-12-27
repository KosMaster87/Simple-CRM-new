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

@Component({
  selector: 'app-user',
  imports: [MaterialSharedModule, CommonModule],
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush, // Änderungserkennung
})
export class UserComponent {
  public firebaseService = inject(FirebaseService);
  public users$: Observable<Users[]> = this.firebaseService.users$;
  // public selectedUser$: Observable<User | null> | null = null;
  public selectedUser$: Observable<User | null> = of(null);
  public error: string | null = null;
  public selectedUserId: string | null = null;
  private cdr: ChangeDetectorRef = inject(ChangeDetectorRef);
  private dialog = inject(MatDialog);
  private dialogRef!: MatDialogRef<DialogComponent>;
  loading: boolean = false;
  isDialogOpen: boolean = false;

  trackByUserId(index: number, user: Users): string | undefined {
    return user.id;
  }

  // Benutzer auswählen
  selectUser(userId: string): void {
    this.selectedUserId = userId;
    this.selectedUser$ = this.firebaseService.getUserById('users', userId);
  }

  // Benutzerliste neu laden
  refreshUsers(): void {
    this.loading = true;
    this.users$ = this.firebaseService.getUsersRef();
    this.users$.subscribe({
      next: () => (this.loading = false),
      error: (err) => {
        this.error = 'Fehler beim Laden der Benutzerliste';
        console.error(err);
        this.loading = false;
      },
    });
  }

  // Zurück zur Benutzerliste
  resetSelection(): void {
    this.selectedUserId = null;
    this.selectedUser$ = of(null);
  }

  // editUser(user: Users): void {
  //   console.log('Benutzer bearbeiten:', user);
  //   // Hier können weitere Logiken zur Bearbeitung des Benutzers implementiert werden
  // }

  // refreshUsers() {
  //   this.loading = true;
  //   this.firebaseService.getUsersRef().subscribe({
  //     next: () => {
  //       this.loading = false;
  //       this.cdr.markForCheck();
  //     },
  //     error: (err) => {
  //       this.loading = false;
  //       this.cdr.markForCheck();
  //     },
  //   });
  // }

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
