import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { LocalStorageService } from '../services/local-storage.service';


@Component({
  selector: 'app-todo-modal',
  templateUrl: './todo-modal.component.html',
  styleUrls: ['./todo-modal.component.css']
})
export class TodoModalComponent implements OnInit {
  receiveData: any;
  isEdiable: any;
  IndexOfelement:any;

  constructor(private localstorageservice: LocalStorageService,
    public dialogRef: MatDialogRef<DashboardComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
      console.log(data);
    if (data !== null) {
      this.receiveData = data.todo;
      this.isEdiable = data.isEdit;
      this.IndexOfelement = data.indexOfelement;
    }
    
  }

  radioButtonValue: string = "noteOnly";
  inputTextData = new FormControl();
  dueDate: any = null;
  isNotes: boolean = true;
  isDate: boolean = false;
  isFile: boolean = false;
  isNotesDateAttach: boolean = false;
  isDateNotes: boolean =false;
  isNotesOnly: boolean = true;
  fileName: any = '';
  storeObj: any = [];

  ngOnInit(): void {
   if(this.data !==null){
    this.inputTextData = new FormControl(this.data.todo.notes);
    this.dueDate = this.data.todo.dueDate;
    this.fileName = this.data.todo.file;
    console.log(this.data.todo.file,this.fileName)
    if(this.data.todo.file)
    {
      this.isFile=true;
      this.isDate=true;
      this.isNotesDateAttach=true;
      this.isNotesOnly=false;
      this.isDateNotes=false
    }
    else if(this.data.todo.dueDate && !(this.data.todo.file)){
      this.isFile=false;
      this.isDate=true;
      this.isNotesDateAttach=false;
      this.isNotesOnly=false;
      this.isDateNotes=true;
    }
    else{
      this.isFile=false;
      this.isDate=false
      this.isNotes=true;
      this.isNotesDateAttach=false;
      this.isNotesOnly=true;
      this.isDateNotes=false;
    }
    console.log(this.data.isEdit);
    console.log("checking textData", this.data);}
  }

  //Based on the Radio button clicked
  radioChange(event: any) {
    if (event.value === 'noteOnly'
      || event.value === 'noteDate'
      || event.value === 'noteDateAttachment') {
      this.isNotes = true;
      this.isDate = false;
    }
    if (event.value === 'noteDate'
      || event.value === 'noteDateAttachment') {
      this.isDate = true;
    }
    if (event.value === 'noteDate') {
      this.fileName = this.isEdiable ? this.receiveData.file : "";
      this.isDate = true;
      this.isFile = false;
      this.isNotesDateAttach = false;
      this.isNotesOnly = false;
      this.isDateNotes = true;
      this.dueDate = this.isEdiable ? this.receiveData.dueDate : null;
      this.inputTextData = this.isEdiable ? new FormControl(this.receiveData.notes) : new FormControl('');
    }
    if (event.value === 'noteDateAttachment') {
      this.isFile = true;
      this.isDate = true;
      this.isNotesDateAttach = true;
      this.isNotesOnly = false;
      this.isDateNotes = false;
      this.dueDate = this.isEdiable ? this.receiveData.dueDate : null;
      this.fileName = this.isEdiable ? this.receiveData.file : "";
      this.inputTextData = this.isEdiable ? new FormControl(this.receiveData.notes) : new FormControl('');

    }
    if (event.value === 'noteOnly') {
      this.isDateNotes = false;
      this.isNotesDateAttach = false;
      this.isNotesOnly = true;
      this.inputTextData = this.isEdiable ? new FormControl(this.receiveData.notes) : new FormControl('');
      this.dueDate = this.isEdiable ? this.receiveData.dueDate : null;
      this.fileName = this.isEdiable ? this.receiveData.file : "";
    }
    this.radioButtonValue = event.value;
  }
  onInputTextNote() {
    console.log();
  }

  //File Upload
  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      this.fileName = file.name;
    }
  }

  //Save TODO
  handleSubmit() {
    const getData: any = this.localstorageservice.getItem('todo')
    const newGetData = JSON.parse(getData)
   let  newData: any = [];
    if(newGetData !=null){
      newData=[...newGetData]
    }
    console.log("check", newData.length);
    let newDataLen = newData.length + 1;
    // if(this.inputTextData.value === null){
      newData.push({
        id: 0 + 1,
        notes: this.inputTextData.value,
        dueDate: this.dueDate,
        file: this.fileName
      });
      console.log(newData)
      this.localstorageservice.setItem("todo", JSON.stringify(newData));
      this.storeObj = newData;
  }

  //Update Todo
   handleUpdate(event: any) {
    const newItem: any = this.localstorageservice.getItem("todo");
    const newData1: any = [...JSON.parse(newItem)];
    const arryObj = newData1.findIndex(((obj: any, index: any) => index === this.IndexOfelement));
    newData1[arryObj].id = this.receiveData.id;
    newData1[arryObj].notes = this.inputTextData.value;
    newData1[arryObj].dueDate = this.dueDate;
    newData1[arryObj].file = this.fileName;
    this.localstorageservice.setItem("todo", JSON.stringify(newData1));
  }

  handleDelete(event: any){
    const newItem: any = this.localstorageservice.getItem("todo");
    const newData2: any = [...JSON.parse(newItem)];
    const deletedItem = newData2.filter(((obj: any, index: any) => index !== this.IndexOfelement));
    this.localstorageservice.setItem("todo", JSON.stringify(deletedItem));
  }
}
