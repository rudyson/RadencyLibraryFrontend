import {Component, OnInit} from '@angular/core';
import {IBookCompactModel, IBookEditModel} from "../../models/models";
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
  loadingAll = false;
  loadingRecommended = false;
  booksAllOrdered$: Observable<IBookCompactModel[]>;
  booksRecommended$: Observable<IBookCompactModel[]>;
  selectedOrderOption: string | undefined;
  genreOrderOption: string | undefined;
  orderOptions: OrderOption[] = [{value: 'title', viewValue: 'Title'}, {value: 'author', viewValue: 'Author'}];

  loadAllBooks(): void {
    this.loadingAll = true;
    this.booksAllOrdered$ = this.apiFetcher
      .getBooksOrderedList(this.selectedOrderOption).pipe(
        tap(() => this.loadingAll = false)
      );
  }
  loadRecommendedBooks(): void {
    this.loadingRecommended = true;
    this.booksRecommended$ = this.apiFetcher
      .getBooksRecommendations(this.genreOrderOption).pipe(
        tap(() => this.loadingRecommended = false)
      );
  }

  constructor(private apiFetcher: ApiFetcherService) {
  }

  ngOnInit(): void {
    this.loadAllBooks();
    this.loadRecommendedBooks();
  }

  loadRecommendedFormSent(value: any) {
    let genre = value.genre as string;
    this.genreOrderOption = (genre=="") ? undefined:genre;
    this.loadRecommendedBooks();
  }
}
