import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddBookComponent } from './add-books.component';

describe('AddBooksComponent', () => {
  let component: AddBookComponent;
  let fixture: ComponentFixture<AddBookComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddBookComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddBookComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
