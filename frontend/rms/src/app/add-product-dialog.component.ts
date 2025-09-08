import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';



@Component({
  selector: 'app-add-product-dialog',
  templateUrl: './add-product-dialog.html',
  imports: [MatFormFieldModule, MatInputModule, ReactiveFormsModule, MatButtonModule]
})
export class AddProductDialogComponent {
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<AddProductDialogComponent>
  ) {
    this.form = this.fb.group({
      item_name: ['', Validators.required],
      item_rental_price: [0, Validators.required],
      item_quantity: [1, Validators.required],
    });
  }

  save() {
    if (this.form.valid) {
      this.dialogRef.close(this.form.value);
    }
  }

  cancel() {
    this.dialogRef.close();
  }
}
