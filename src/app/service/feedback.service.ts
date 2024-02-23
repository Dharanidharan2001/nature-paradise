// feedback.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FeedbackService {

  private apiUrl = 'http://localhost:3000/feedback';

  constructor(private http: HttpClient) { }

  postFeedback(feed: string): Observable<any> {
    const payload = { feed };
    return this.http.post<any>(this.apiUrl, payload);
  }
}

