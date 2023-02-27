import {Component, Input} from '@angular/core';
import {IBookCompactModel} from "../../models/models";
import {MatDialog} from "@angular/material/dialog";
import {ViewBookComponent} from "../view-book/view-book.component";
import {EditBookComponent} from "../edit-book/edit-book.component";

@Component({
  selector: 'app-book-list-item',
  templateUrl: './book-list-item.component.html',
  styleUrls: ['./book-list-item.component.css']
})
export class BookListItemComponent {
  @Input() book : IBookCompactModel

  constructor(private matDialog: MatDialog) {
  }

  openViewBookDialog() {
    let dialogRef = this.matDialog.open(ViewBookComponent,{
      data:{
        id : this.book.id
      },
      width: "50%",
      height: "85%",
      disableClose: true
    });
    dialogRef.afterClosed().subscribe(result=>{
      console.log(result.id)
    });
  }

  openEditBookDialog() {
     let dialogRef = this.matDialog.open(EditBookComponent,{
      data:{
        id : this.book.id
      },
      width: "50%",
      height: "85%",
      disableClose: true
    });
    dialogRef.afterClosed().subscribe(result=>{
      console.log(result.id)
    });
  }
}
