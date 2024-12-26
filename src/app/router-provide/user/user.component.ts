import {
  Component,
  inject,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
} from '@angular/core';
import { MaterialSharedModule } from '../../shared/material-module/material-shared.module';
import { DialogComponent } from '../../mat-modules/dialog/dialog.component';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { FirebaseService } from '../../shared/services/firebase/firebase.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user',
  imports: [MaterialSharedModule, CommonModule],
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush, // Änderungserkennung
})
export class UserComponent {
  private cdr: ChangeDetectorRef = inject(ChangeDetectorRef);
  public firebaseService = inject(FirebaseService);
  private dialog = inject(MatDialog);
  private dialogRef!: MatDialogRef<DialogComponent>;
  public error: string | null = null;
  loading: boolean = false;
  isDialogOpen: boolean = false;

  refreshUsers() {
    this.loading = true;
    this.firebaseService.getUsersRef().subscribe({
      next: () => {
        this.loading = false;
        this.cdr.markForCheck();
      },
      error: (err) => {
        this.loading = false;
        this.cdr.markForCheck();
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
