import {HttpClient} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {delay, Observable} from "rxjs";
import {IBookCompactModel, IBookDetailedModel} from "../models/models";

@Injectable(
  {
    providedIn: "root"
  }
)
export class ApiFetcherService {
  constructor(private http: HttpClient) {
  }

  getBookById(id: number) {
    return this.http.get<IBookDetailedModel>(`https://localhost:5000/api/books/${id.toString()}`).pipe(delay(500));
  }

  getBooksOrderedList(order: string | undefined): Observable<IBookCompactModel[]> {
    if (order === undefined) {
      return this.http.get<IBookCompactModel[]>(`https://localhost:5000/api/books`).pipe(delay(500));
    } else {
      return this.http.get<IBookCompactModel[]>(`https://localhost:5000/api/books?order=${order}`);
    }
  }
}
