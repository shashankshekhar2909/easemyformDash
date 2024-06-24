// src/app/alert.service.ts
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

export interface Alert {
    type: 'success' | 'info' | 'warning' | 'danger';
    message: string;
}

@Injectable({
    providedIn: 'root',
})
export class AlertService {
    private alertSubject = new Subject<Alert>();
    alerts$ = this.alertSubject.asObservable();

    showAlert(type: 'success' | 'info' | 'warning' | 'danger', message: string) {
      console.log('calling this');
      this.alertSubject.next({ type, message });
    }
}
