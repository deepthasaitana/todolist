import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { LocalStorageService } from '../services/local-storage.service';
import { TodoModalComponent } from '../todo-modal/todo-modal.component';
import { dataTodo } from './model/tododata';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(public dialog: MatDialog, private localstorageservice: LocalStorageService) {
    this.getTodoData();
  }
  todoData: any;
  todo: any;
  isEdit: boolean = false;

  ngOnInit(): void {
    let data: any = this.localstorageservice.getItem("todo");
    this.todoData = JSON.parse(data);
  }

//Add TODO list Item
  handleAddToDo() {
    const dialogRef = this.dialog.open(TodoModalComponent);

    dialogRef.afterClosed().subscribe(result => {
      this.getTodoData();
    });
  }

  //After Adding Get TODO List item
  public getTodoData() {
    let data: any = this.localstorageservice.getItem("todo");
    this.todoData = JSON.parse(data);
    console.log(data)
  }

  //Edit TODO List item
  handleEdit(todo: any,indexOfelement:any) {
    this.todo = todo;
    const dialogRef = this.dialog.open(TodoModalComponent, {
      data: {
        todo,
        isEdit: true,
        indexOfelement
      }
    });
    document.getElementById("inputTextData")?.setAttribute('value', todo.notes);
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
      this.getTodoData();
    });
  }

}
