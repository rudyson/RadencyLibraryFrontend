import {HttpClient, HttpHeaders} from "@angular/common/http";
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
  backendUrl: string = "https://localhost:5000";

  constructor(private http: HttpClient) {

  }

  deleteBook(id: number, secret: string) {
    return this.http.delete<IResponseBook>(`${(this.backendUrl)}/api/books/${id.toString()}?secret=${secret}`);
  }

  postBookInformation(book: IBookEditModel) {
    return this.http.post<IResponseBook>(`${(this.backendUrl)}/api/books/save`, book);
  }

  putBookRate(id: number, rate: ICompactRate) {
    return this.http.put<IResponseRate>(`${(this.backendUrl)}/api/books/${id.toString()}/rate`, rate);
  }

  putBookReview(id: number, review: ICompactReview) {
    return this.http.put<IResponseReview>(`${(this.backendUrl)}/api/books/${id.toString()}/review`, review);
  }

  getBookById(id: number) {
    return this.http.get<IBookDetailedModel>(`${(this.backendUrl)}/api/books/${id.toString()}`);
  }

  getBooksOrderedList(order: string | undefined): Observable<IBookCompactModel[]> {
    if (order === undefined) {
      return this.http.get<IBookCompactModel[]>(`${(this.backendUrl)}/api/books`);
    } else {
      return this.http.get<IBookCompactModel[]>(`${(this.backendUrl)}/api/books?order=${order}`);
    }
  }

  getBooksRecommendations(genre: string | undefined): Observable<IBookCompactModel[]> {
    if (genre === undefined) {
      return this.http.get<IBookCompactModel[]>(`https://localhost:5000/api/recommended`);
    } else {
      return this.http.get<IBookCompactModel[]>(`https://localhost:5000/api/recommended?genre=${genre}`);
    }
  }
}
