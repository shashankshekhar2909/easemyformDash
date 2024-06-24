// src/app/alert/alert.component.ts
import { Component, OnInit } from '@angular/core';
import { Alert, AlertService } from '../services/alert.service';

@Component({
    selector: 'app-alert',
    templateUrl: './alert.component.html',
    styleUrls: ['./alert.component.scss']
})
export class AlertComponent implements OnInit {
    alerts: Alert[] = [];

    constructor(private alertService: AlertService) {}

    ngOnInit() {
        this.alertService.alerts$.subscribe(alert => {
            this.alerts.push(alert);
            setTimeout(() => this.removeAlert(alert), 5000);
        });
    }

    removeAlert(alert: Alert) {
        this.alerts = this.alerts.filter(a => a !== alert);
    }
}
