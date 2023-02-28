import {HttpClient} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {delay, Observable} from "rxjs";
import {
  IBookCompactModel,
  IBookDetailedModel, IBookEditModel,
  ICompactRate,
  ICompactReview, IResponseBook,
  IResponseRate,
  IResponseReview
} from "../models/models";

@Injectable(
  {
    providedIn: "root"
  }
)
export class ApiFetcherService {
  constructor(private http: HttpClient) {
  }
  postBookInformation(book : IBookEditModel){
    return this.http.post<IResponseBook>(`https://localhost:5000/api/books/save`, book);
  }
  putBookRate(id: number, rate: ICompactRate) {
    return this.http.put<IResponseRate>(`https://localhost:5000/api/books/${id.toString()}/rate`, rate);
  }
  putBookReview(id: number, review: ICompactReview) {
    return this.http.put<IResponseReview>(`https://localhost:5000/api/books/${id.toString()}/review`, review);
  }

  getBookById(id: number) {
    return this.http.get<IBookDetailedModel>(`https://localhost:5000/api/books/${id.toString()}`);
  }

  getBooksOrderedList(order: string | undefined): Observable<IBookCompactModel[]> {
    if (order === undefined) {
      return this.http.get<IBookCompactModel[]>(`https://localhost:5000/api/books`);
    } else {
      return this.http.get<IBookCompactModel[]>(`https://localhost:5000/api/books?order=${order}`);
    }
  }
}
