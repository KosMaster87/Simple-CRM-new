import { Component, inject } from '@angular/core';
import { MaterialSharedModule } from '../../shared/material-module/material-shared.module';
import { DialogComponent } from '../../mat-modules/dialog/dialog.component';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-user',
  imports: [MaterialSharedModule],
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss',
})
export class UserComponent {
  private dialog = inject(MatDialog);
  private dialogRef!: MatDialogRef<DialogComponent>;
  isDialogOpen = false;

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
