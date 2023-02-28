import {Observable} from "rxjs";

export interface IBookDetailedModel {
  id: number;
  title: string;
  author: string;
  cover: string;
  content: string;
  rating: number;
  reviews: IExpandedReview[];
}
export interface IResponseBook{
  id:number
}
export interface IBookEditModel{
  id: number,
  title: string,
  cover: string,
  content: string,
  author: string
}

export interface IExpandedReview {
  id: number;
  message: string;
  reviewer: string;
}
export interface IResponseReview{
  id: number
}
export interface IResponseRate{
  id: number
}
export interface ICompactRate{
  score: number
}
export interface ICompactReview {
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
