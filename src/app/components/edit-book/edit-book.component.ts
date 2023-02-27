import {Component, Inject, OnDestroy, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {ApiFetcherService} from "../../services/api-fetcher.service";
import {Observable, tap} from "rxjs";
import {IBookDetailedModel} from "../../models/models";

@Component({
  selector: 'app-edit-book',
  templateUrl: './edit-book.component.html',
  styleUrls: ['./edit-book.component.css']
})
export class EditBookComponent implements OnInit, OnDestroy {
  id: number;
  loading = false;
  book$: Observable<IBookDetailedModel>;

  constructor(
    @Inject(MAT_DIALOG_DATA) private data: { id: number },
    private matDialogRef: MatDialogRef<EditBookComponent>,
    private apiFetcher: ApiFetcherService) {
    this.id = data.id;
  }

  loadBook(): void {
    this.loading = true;
    this.book$ = this.apiFetcher
      .getBookById(this.id).pipe(
        tap(() => this.loading = false)
      );
  }

  onCloseClick() {
    this.matDialogRef.close()
  }

  ngOnInit(): void {
    this.loadBook();
  }

  ngOnDestroy(): void {
    this.matDialogRef.close(this.data);
  }
}
