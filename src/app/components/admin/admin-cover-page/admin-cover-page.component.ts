import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';

interface CoverLetter {
  name: string;
  size: number;
  type: string;
  file?: File;
}

@Component({
  selector: 'app-admin-cover-page',
  templateUrl: './admin-cover-page.component.html',
  styleUrl: './admin-cover-page.component.scss',
})
export class AdminCoverPageComponent implements OnInit {
  isDragging = false;
  resume: CoverLetter | null = null;
  jobDescription: string = '';
  errorMessage: string | null = null;
  successMessage: string | null = null;
  maxFileSize = 5 * 1024 * 1024; // 5MB in bytes
  form: FormGroup;

  constructor(private fb: FormBuilder, private authService: AuthService) {
    this.form = this.fb.group({
      jobDescription: ['', Validators.required]
    });
  }

  ngOnInit() {
    // Load existing cover letter if any
    this.loadExistingCoverLetter();
  }

  private loadExistingCoverLetter() {
    // TODO: Implement API call to get existing cover letter
  }

  onDragOver(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    this.isDragging = true;
  }

  onDragLeave(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    this.isDragging = false;
  }

  onDrop(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    this.isDragging = false;

    const files = event.dataTransfer?.files;
    if (files?.length) {
      this.handleFile(files[0]);
    }
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files?.length) {
      this.handleFile(input.files[0]);
    }
  }

  private handleFile(file: File) {
    this.errorMessage = null;
    this.successMessage = null;

    // Check file type
    if (!this.isValidFileType(file.type)) {
      this.errorMessage = 'Please upload only PDF, DOC, or DOCX files.';
      return;
    }

    // Check file size
    if (file.size > this.maxFileSize) {
      this.errorMessage = 'File size should not exceed 5MB.';
      return;
    }

    // Update current cover letter
    this.resume = {
      name: file.name,
      size: file.size,
      type: file.type,
      file: file
    };

    // TODO: Implement actual file upload
    this.uploadFile(file);
  }

  private isValidFileType(type: string): boolean {
    const validTypes = [
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
    ];
    return validTypes.includes(type);
  }

  private async uploadFile(file: File) {
    try {
      // TODO: Implement actual file upload to server
      // Simulating upload
      await new Promise(resolve => setTimeout(resolve, 1000));
      this.successMessage = 'Resume uploaded successfully!';
    } catch (error) {
      this.errorMessage = 'Failed to upload resume. Please try again.';
    }
  }

  downloadFile() {
    // TODO: Implement file download
    if (this.resume?.file) {
      const url = URL.createObjectURL(this.resume.file);
      const a = document.createElement('a');
      a.href = url;
      a.download = this.resume.name;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }
  }

  removeFile() {
    // TODO: Implement file deletion from server
    this.resume = null;
    this.successMessage = 'Resume letter removed successfully.';
  }

  formatFileSize(bytes: number): string {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  }
  loadingCoverLetter = false;
  coverLetter: any;
  coverLetterResponse: any;
  generateCoverLetter() {
    if(this.resume === null) {
      console.log('jobDescription', this.jobDescription);
      console.log('resume', this.resume);
      return;
    } else {
      console.log('Generating cover letter...');
      this.loadingCoverLetter = true;
      const formData = new FormData();
      // formData.append('job_desc_file', 'user_cv');
      formData.append('job_desc_text', this.jobDescription);
      formData.append('resume', this.resume.file as Blob);
      this.authService.getCoverPage(formData).subscribe({
        next: (res:any) => {
          console.log('res', res);
          this.coverLetterResponse = res;
          this.coverLetter = res.cover_letter;
          this.loadingCoverLetter = false;
        },
        error: (err:any) => {
          console.log('err', err);
          this.errorMessage = 'Failed to generate cover letter. Please try again.';
          alert(this.errorMessage);
          this.loadingCoverLetter = false;
        }
      });
    }
  }
  downloadCoverLetter() {
    // TODO: Implement cover letter download
    if (this.coverLetterResponse) {
      window.open(this.coverLetterResponse.pdf_path, '_blank');
    }
  }
}
