import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AlertService {
  private alertSubject = new Subject<{ type: string, message: string }>();

  getAlert() {
    return this.alertSubject.asObservable();
  }

  showAlert(type: 'success' | 'danger' | 'warning' | 'info', message: string) {
    this.alertSubject.next({ type, message });
  }
}
