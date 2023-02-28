import { Component } from '@angular/core';
import {IBookEditModel, IBookNewModel} from "../../models/models";
import {ApiFetcherService} from "../../services/api-fetcher.service";
import {NgForm} from "@angular/forms";

@Component({
  selector: 'app-new-book-pane',
  templateUrl: './new-book-pane.component.html',
  styleUrls: ['./new-book-pane.component.css']
})
export class NewBookPaneComponent {
  imageData: string | undefined;
  isImageSaved: boolean = false;
  cardImageBase64: string = "";
  imageError: string | undefined;
  constructor(private apiFetcher: ApiFetcherService) {
  }

  handleFileInput(files: FileList) {
    const reader = new FileReader();
    reader.onload = (event: any) => {
      this.imageData = event.target.result;
    };
    reader.readAsDataURL(files[0]);
  }

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
        image.src = e.target.result;
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
            this.cardImageBase64 = e.target.result;
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

  saveNewBook(form: NgForm) {
    this.apiFetcher.postNewBookInformation({
      author: form.value.author,
      title: form.value.title,
      cover: this.cardImageBase64,
      content: form.value.content,
      genre: form.value.genre
    } as IBookNewModel).subscribe(
      next => {
        this.resetNewBookForm(form)
      },
      error => {
        console.error(error)
      }
    );
  }

  resetNewBookForm(form: NgForm) {
    this.cardImageBase64="";
    this.isImageSaved=false;
    form.reset()
  }
}
