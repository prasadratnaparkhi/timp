import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ModalBodyComponent,
  ModalComponent,
  ModalFooterComponent,
  ModalHeaderComponent,
  ModalTitleDirective,
  RowComponent,
  ColComponent,
  TextColorDirective,
  CardComponent,
  CardHeaderComponent,
  CardBodyComponent,
  FormControlDirective,
  FormDirective,
  FormLabelDirective,
  FormSelectDirective, // Added for the <select> element
  ButtonDirective
} from '@coreui/angular';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RestApiService } from '../../../services/rest.api.service';
import { HttpHeaders } from '@angular/common/http'; // Import HttpHeaders for content type

@Component({
  selector: 'app-task-create',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ModalComponent,
    ModalHeaderComponent,
    ModalTitleDirective,
    ModalBodyComponent,
    ModalFooterComponent,
    RowComponent,
    ColComponent,
    TextColorDirective,
    CardComponent,
    CardHeaderComponent,
    CardBodyComponent,
    FormControlDirective,
    FormDirective,
    FormLabelDirective,
    FormSelectDirective, // Make sure to include this in imports for <select>
    ButtonDirective,
  ],
  templateUrl: './task-create.component.html',
  styleUrl: './task-create.component.scss'
})
export class TaskCreateComponent {

  taskForm = {
    description: 'description here',
    deadlines: '',
    priorities: '',
  };

  selectedFiles: File[] = []; // Array to store selected files

  public visible = false;

  constructor(public restApi: RestApiService) {
  }

  // Method to handle file selection
  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files) {
      this.selectedFiles = Array.from(input.files); // Convert FileList to an array of Files
      console.log('Selected Files:', this.selectedFiles);
    }
  }

  onSubmit() {
    console.log('Task Data:', this.taskForm);
    console.log('Files to upload:', this.selectedFiles);

    // Create FormData object to send both text data and files
    const formData = new FormData();

    // Append text fields from taskForm
    formData.append('description', this.taskForm.description);
    formData.append('deadlines', this.taskForm.deadlines);
    formData.append('priorities', this.taskForm.priorities);

    // Append each selected file
    this.selectedFiles.forEach((file, index) => {
      formData.append(`attachments[${index}]`, file, file.name); // Use an array-like name for backend parsing
      // Or simply: formData.append('attachments', file, file.name); if backend expects multiple fields with same name
    });

    // Note: When sending FormData, DO NOT manually set 'Content-Type': 'multipart/form-data'
    // The browser sets it automatically, including the boundary, which is crucial.
    // If you explicitly set it, you'll likely run into issues.

    this.restApi.postAPI('/task/create', formData).subscribe(
      data => {
        console.log('Upload Success:', data);
        this.visible = true;
        // Optionally reset the form and files after successful submission
        this.taskForm = { description: '', deadlines: '', priorities: '' };
        this.selectedFiles = []; // Clear selected files
        // Optionally reset the file input visually (if needed, but not strictly necessary as new selection will overwrite)
        const fileInput = document.getElementById('attachments') as HTMLInputElement;
        if (fileInput) {
          fileInput.value = ''; // Clear the file input display
        }
        this.toggleLiveDemo(); // Hide the modal after submission
      },
      err => {
        console.error('Upload Error:', err);
        // Optionally display an error message to the user
      }
    );
  }

  toggleLiveDemo() {
    this.visible = !this.visible;
  }

  handleLiveDemoChange(event: any) {
    this.visible = event;
  }
}