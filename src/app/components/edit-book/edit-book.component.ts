import {Component, Inject, OnDestroy, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {ApiFetcherService} from "../../services/api-fetcher.service";
import {Observable, tap} from "rxjs";
import {IBookDetailedModel, IBookEditModel, ICompactReview} from "../../models/models";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-edit-book',
  templateUrl: './edit-book.component.html',
  styleUrls: ['./edit-book.component.css']
})
export class EditBookComponent implements OnInit, OnDestroy {
  id: number;
  loading = false;
  book$: Observable<IBookDetailedModel>;
  imageData: string | undefined;
  isImageSaved: boolean = false;
  cardImageBase64edit: string = "";
  imageError: string | undefined;

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
        tap(res => {
          this.loading = false;
          this.cardImageBase64edit = res.cover;
          this.isImageSaved = true;
        })
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

  handleInputChange(e: any) {
    let file = e.dataTransfer ? e.dataTransfer.files[0] : e.target.files[0];
    let pattern = /image-*/;
    let reader = new FileReader();
    if (!file.type.match(pattern)) {
      alert('invalid format');
      return;
    }
    reader.onload = this._handleReaderLoaded.bind(this);
    reader.readAsDataURL(file);
  }

  _handleReaderLoaded(e: any) {
    let reader = e.target;
    this.cardImageBase64edit = reader.result;
  }

  /*
    fileChangeEvent(fileInput: any) {
      this.imageError = undefined;
      if (fileInput.target.files && fileInput.target.files[0]) {
        // Size Filter Bytes
        const max_size = 20971520;
        const allowed_types = ['image/png', 'image/jpeg'];
        const max_height = 15200;
        const max_width = 25600;

        if (fileInput.target.files[0].size > max_size) {
          this.imageError =
            'Maximum size allowed is ' + max_size / 1000 + 'Mb';

          return false;
        }

        if (!allowed_types.includes(fileInput.target.files[0].type)) {
          this.imageError = 'Only Images are allowed ( JPG | PNG )';
          return false;
        }
        const reader = new FileReader();
        reader.onload = (e: any) => {
          const image = new Image();
          this.cardImageBase64edit = e.target.result;
          //image.src = e.target.result;
          // @ts-ignore
          image.onload = rs => {
            // @ts-ignore
            const img_height = rs.currentTarget['height'];
            // @ts-ignore
            const img_width = rs.currentTarget['width'];

            console.log(img_height, img_width);


            if (img_height > max_height && img_width > max_width) {
              this.imageError =
                'Maximum dimentions allowed ' +
                max_height +
                '*' +
                max_width +
                'px';
              return false;
            } else {
              this.cardImageBase64edit = e.target.result;
              this.isImageSaved = true;
              return true;
              // this.previewImagePath = imgBase64Path;
            }
          };
        };

        reader.readAsDataURL(fileInput.target.files[0]);
      }
      return false;
    }
    */
  onSaveChanges(value: any) {
    this.apiFetcher.postBookInformation({
      id: this.id,
      title: value.title,
      cover: this.cardImageBase64edit,
      content: value.content,
      author: value.author
    } as IBookEditModel).subscribe(
      next => {
        this.matDialogRef.close("Book edited");
      },
      error => {
        console.error(error)
      }
    );
  }

  tryToDeleteBook() {
    if (confirm("Are you sure?")) {
      let secret = prompt("What's the SECRET?");
      if (secret == null || secret == "") {
      } else {
        this.apiFetcher.deleteBook(this.id, secret).subscribe(
          next => {
            this.matDialogRef.close("Book deleted");
          },
          error => {
            confirm("Access denied")
            console.error(error)
          }
        );
      }
    } else {

    }
  }
}
