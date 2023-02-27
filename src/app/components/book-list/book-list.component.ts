import {Component, OnInit} from '@angular/core';
import {IBookCompactModel} from "../../models/models";
import {Observable, tap} from "rxjs";
import {ApiFetcherService} from "../../services/api-fetcher.service";

interface OrderOption {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css']
})
export class BookListComponent implements OnInit {
  loading = false;
  booksOrdered$: Observable<IBookCompactModel[]>;
  selectedOrderOption: string | undefined;
  orderOptions: OrderOption[] = [{value: 'title', viewValue: 'Title'}, {value: 'author', viewValue: 'Author'}];

  loadBooks(): void {
    this.loading = true;
    this.booksOrdered$ = this.apiFetcher
      .getBooksOrderedList(this.selectedOrderOption).pipe(
        tap(() => this.loading = false)
      );
  }

  constructor(private apiFetcher: ApiFetcherService) {
  }

  ngOnInit(): void {
    this.loadBooks();
  }
}
