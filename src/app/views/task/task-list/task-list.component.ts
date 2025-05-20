import { Component, OnInit } from '@angular/core';
import { TableDirective, RowComponent, ColComponent, TextColorDirective, CardComponent, CardHeaderComponent, CardBodyComponent } from '@coreui/angular';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { IconDirective } from '@coreui/icons-angular';

@Component({
  selector: 'app-task-list',
  standalone: true, // Assuming this is a standalone component
  imports: [
    IconDirective,
    CommonModule,
    TableDirective,
    RowComponent,
    ColComponent,
    TextColorDirective,
    ReactiveFormsModule,
    CardComponent,
    CardHeaderComponent,
    CardBodyComponent
  ],
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.scss'
})
export class TaskListComponent implements OnInit {

  // **CORRECTED TYPE DEFINITION: Added 'id' property**
  taskList: { id: number; description: string; deadlines: Date; priorities: string; attachments: File[] }[] = [];

  constructor() { }

  ngOnInit(): void {
    this.init();
  }

  init(): void {
    // **CORRECTED DATA: Added 'id' to each task object**
    this.taskList = [
      { id: 1, description: 'Task 1', deadlines: new Date('2023-10-01'), priorities: 'High', attachments: [] },
      { id: 2, description: 'Task 2', deadlines: new Date('2023-10-02'), priorities: 'Medium', attachments: [] },
      { id: 3, description: 'Task 3', deadlines: new Date('2023-10-03'), priorities: 'Low', attachments: [] },
      { id: 4, description: 'Task 4', deadlines: new Date('2023-10-04'), priorities: 'High', attachments: [] },
      { id: 5, description: 'Task 5', deadlines: new Date('2023-10-05'), priorities: 'Medium', attachments: [] },
      { id: 6, description: 'Task 6', deadlines: new Date('2023-10-06'), priorities: 'Low', attachments: [] },
      { id: 7, description: 'Task 7', deadlines: new Date('2023-10-07'), priorities: 'High', attachments: [] },
      { id: 8, description: 'Task 8', deadlines: new Date('2023-10-08'), priorities: 'Medium', attachments: [] },
      { id: 9, description: 'Task 9', deadlines: new Date('2023-10-09'), priorities: 'Low', attachments: [] },
      { id: 10, description: 'Task 10', deadlines: new Date('2023-10-10'), priorities: 'High', attachments: [] }
    ];
    console.log(this.taskList);
  }

  // **CORRECTED deleteTask PARAMETER NAME (already done, but reiterating)**
  deleteTask(idToDelete: number): void {
    // Now 'task.id' exists, and 'idToDelete' is a number
    this.taskList = this.taskList.filter(task => task.id !== idToDelete);
    console.log(`Task with ID ${idToDelete} removed.`);
    console.log('Updated Task List:', this.taskList);
  }
}