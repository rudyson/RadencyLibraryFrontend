import {Component, Inject, OnDestroy, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA,MatDialogRef} from "@angular/material/dialog";
import {Observable, tap} from "rxjs";
import {IBookDetailedModel} from "../../models/models";
import {ApiFetcherService} from "../../services/api-fetcher.service";

@Component({
  selector: 'app-view-book',
  templateUrl: './view-book.component.html',
  styleUrls: ['./view-book.component.css']
})
export class ViewBookComponent implements OnInit,OnDestroy{
  id:number;
   loading = false;
  book$: Observable<IBookDetailedModel>;
  constructor(
    @Inject(MAT_DIALOG_DATA) private data: {id:number},
    private matDialogRef:MatDialogRef<ViewBookComponent>,
    private apiFetcher: ApiFetcherService) {
    this.id=data.id;
  }
   loadBook(): void {
    this.loading = true;
    this.book$ = this.apiFetcher
      .getBookById(this.id).pipe(
        tap(() => this.loading = false)
      );
  }
  ngOnInit(): void {
    this.loadBook();
  }

  ngOnDestroy(): void {
    this.matDialogRef.close(this.data);
  }

  onCloseClick() {
    this.matDialogRef.close()
  }
}
