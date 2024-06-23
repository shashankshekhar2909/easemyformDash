import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AlertService } from '../services/alert.service';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss']
})
export class AlertComponent implements OnInit {
  message!: string;
  type:any = "success";
  private subscription: Subscription = new Subscription;

  constructor(private alertService: AlertService) {}

  ngOnInit() {
    this.subscription = this.alertService.getAlert().subscribe(alert => {
      this.type = alert.type;
      this.message = alert.message;
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  closeAlert() {
    this.message = '';
  }
}
