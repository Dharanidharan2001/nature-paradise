import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { SharedService } from '../service/shared.service';
import { FeedbackService } from '../service/feedback.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrl: './feedback.component.css',
  providers:[MessageService]
})
export class FeedbackComponent {
  feedbackContent :string = "";

  constructor(private feedbackService: FeedbackService,private messageService : MessageService) { }

  submitFeedback() {
    const feedbackMessage = this.feedbackContent;
    this.feedbackService.postFeedback(feedbackMessage).subscribe(
      response => {
        this.messageService.add({severity: 'success',summary:'feedback sent',detail:'your feed saved successfully'})
        console.log('Feedback submitted successfully:', response);
      },
      error => {
        console.error('Error submitting feedback:', error);
      }
    );
  }
}
