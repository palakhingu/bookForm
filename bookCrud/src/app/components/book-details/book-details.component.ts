import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddBookComponent} from '../add-books/add-books.component';
import { MaterialModule } from '../../module/material/material.module';
import { EditBookComponent } from '../edit-book/edit-book.component';

@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.css'],
  imports: [MaterialModule],
  standalone: true,
})
export class BookDetailsComponent implements OnInit {
  displayedColumns: string[] = [
    'no',
    'name',
    'author',
    'price',
    'rating',
    'type',
    'part',
    'action',
  ];
  dataSource: any[] = [];

  constructor(private dialog: MatDialog) {}

  ngOnInit(): void {
    this.displayBookData();
  }

  AddBook(): void {
    const dialogue = this.dialog.open(AddBookComponent, {
      maxWidth: '100%',
      maxHeight: '100%',
    });

    dialogue.afterClosed().subscribe((dialogResult) => {
      if (dialogResult) {
        this.ngOnInit();
      }
    });
  }

  displayBookData(): void {
    this.dataSource = JSON.parse(localStorage.getItem('books') || '[]');
  }
  editBooks(data: any[]) {
    const dialogue = this.dialog.open(EditBookComponent, {
      data: {
        isFrom: 'editBooks',
        editData: data,
      },
      maxWidth: '100%',
      maxHeight: '100%',
    });

    dialogue.afterClosed().subscribe((dialogResult) => {
      if (dialogResult) {
        this.ngOnInit();
      }
    });
  }
  deleteBook(index: number): void {
    let books: any[] = JSON.parse(localStorage.getItem('books') || '[]');

    if (index >= 0 && index < books.length) {
      books.splice(index, 1);
      localStorage.setItem('books', JSON.stringify(books));
      this.displayBookData();
    } else {
      console.error('Invalid index');
    }
  }
}
