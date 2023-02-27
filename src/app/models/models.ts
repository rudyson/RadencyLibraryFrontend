import {Observable} from "rxjs";

export interface IBookDetailedModel {
  id: number;
  title: string;
  author: string;
  cover: string;
  content: string;
  rating: number;
  reviews: Observable<IExpandedReview>;
}

export interface IExpandedReview {
  id: number;
  message: string;
  reviewer: string;
}
export interface IBookCompactModel {
  id: number;
  title: string;
  author: string;
  rating: number;
  reviewsNumber: number;
}
