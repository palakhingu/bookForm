  import { Component, Inject, OnInit } from '@angular/core';
  import { MaterialModule } from '../../module/material/material.module';
  import { MatDatepickerModule } from '@angular/material/datepicker';
  import { provideNativeDateAdapter } from '@angular/material/core';
  import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
  import { FormArray, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
  import { CommonModule } from '@angular/common';

  @Component({
    selector: 'app-edit-book',
    standalone: true,
    imports: [MaterialModule, MatDatepickerModule, ReactiveFormsModule, FormsModule, CommonModule],
    templateUrl: './edit-book.component.html',
    styleUrls: ['./edit-book.component.css'],
    providers: [provideNativeDateAdapter()]
  })
  export class EditBookComponent implements OnInit {
    editBooks!: FormGroup;
    dynamicFormGroup!: FormGroup;

    constructor(
        @Inject(MAT_DIALOG_DATA) public data: any,
        private dialogRef: MatDialogRef<EditBookComponent>,
        private _formBuilder: FormBuilder
    ) { }

    ngOnInit(): void {
        this.defineForm();
    }

    defineForm(): void {
      this.dynamicFormGroup = this._formBuilder.group({
        parts: this._formBuilder.array([this.createPart()])
    });
        this.editBooks = this._formBuilder.group({
            name: [this.data?.editData.name || '', Validators.required],
            author: [this.data?.editData.author || '', Validators.required],
            dynamicData: this.dynamicFormGroup
        });
  const parts = this.data?.editData.partDetails || [];
  if (parts.length === 0) {
    this.captureAndAdd();
  } else {
    parts.forEach(part => {
      (this.dynamicFormGroup.get('parts') as FormArray).push(
        this._formBuilder.group({
          partName: [part.partName || '', Validators.required],
          publishDate: [part.publishDate || '', Validators.required]
        })
      );
    });
  }
    }
   
createPart(): FormGroup {
  return this._formBuilder.group({
    partName: ['', Validators.required],
    publishDate: ['', Validators.required]
  });
}

isCurrentPartFilled(index: number): boolean {
  const currentPart = this.parts.at(index);
  return currentPart.value.partName && currentPart.value.publishDate ;
}

get parts(): FormArray {
  return this.dynamicFormGroup.get('parts') as FormArray;
}

captureAndAdd(): void {
  const partsFormArray = this.dynamicFormGroup.get('parts') as FormArray;
   partsFormArray.push(this.createPart());
  
}
            save(): void {
              const formData = this.editBooks.getRawValue();
              formData.price = this.data.editData.price;
              formData.rating = this.data.editData.rating;
              formData.type = this.data.editData.type;
              formData.partDetails = formData.dynamicData.parts
              delete formData.dynamicData;
              formData.part=formData.partDetails.length;

            let books = JSON.parse(localStorage.getItem('books') || '[]');
            const index = books.findIndex((book: any) => book.name === this.data.editData.name && book.author === this.data.editData.author);
            if (index !== -1) {
              books[index] = formData;
              localStorage.setItem('books', JSON.stringify(books));
              this.dialogRef.close(true)
            }
          
            }
  }    