import { createInjectableType } from '@angular/compiler';
import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatTable } from '@angular/material/table'
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DataSource } from '@angular/cdk/collections';
import { MatTableDataSource} from '@angular/material/table';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  
trackerArray: Array<any> = [];

trackerRef = new FormGroup({
  id: new FormControl("",[Validators.required]),
  fullname: new FormControl("",[Validators.required]),
  task: new FormControl("",[Validators.required]),
  taskdate: new FormControl("",[Validators.required])
})

  addTask(){
    let addTracker = this.trackerRef.value;

    let empID = addTracker.id;
    let empName = addTracker.fullname;
    let empTask = addTracker.task;
    let empDate = addTracker.taskdate;

    let tracker = {eid: empID, ename: empName, etask: empTask, edate: empDate};
    this.trackerArray.push(tracker);

    console.log("ID: "+ this.trackerArray[0].eid);
    console.log("Name: "+ this.trackerArray[0].ename);
    console.log("Task: "+ this.trackerArray[0].etask);
    console.log("Date: " +this.trackerArray[0].edate);

  }

}

