import { Component, Inject, OnInit } from '@angular/core';
import {  MatDialogRef } from '@angular/material/dialog';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MaterialModule } from '../../module/material/material.module';
@Component({
  selector: 'app-add-book',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, MaterialModule],
  templateUrl: './add-books.component.html',
  styleUrl: './add-books.component.css',
})
export class AddBookComponent implements OnInit {
  bookForm!: FormGroup;
  constructor(
    private _formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<AddBookComponent>
  ) {}

  ngOnInit(): void {
    this.defineForm();
  }
  defineForm() {
    this.bookForm = this._formBuilder.group({
      name: ['', Validators.required],
      author: ['', Validators.required],
      price: ['', Validators.required],
      rating: ['', Validators.required],
      type: ['', Validators.required],
    });
  }
  addBook() {
    if (!this.bookForm.valid) {
      return;
    } else {
      let existingBooks: any[] = JSON.parse(
        localStorage.getItem('books') || '[]'
      );
      let bookDetails = { ...this.bookForm.value, part: 0 } as { name: string, author: string, price: number, rating: number, type: string, part: number }; // Explicitly define the type of the 'part' property
      existingBooks.push(bookDetails); // Push new book details into existing array
      localStorage.setItem('books', JSON.stringify(existingBooks)); // Store the entire array in localStorage
      this.dialogRef.close(true);
    }
  }
}