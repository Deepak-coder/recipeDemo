import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private messageService: MessageService) { }

  showSuccess(message:string){
    this.messageService.add({ summary: message, severity: 'success', sticky: false });
}

showError(message){
  this.messageService.add({ summary: message, severity: 'error', sticky: false })
}

showInfo(message){
  this.messageService.add({ summary: message, severity: 'info', sticky: false })
}

showWarning(message){
  this.messageService.add({ summary: message, severity: 'warn', sticky: false })
}

}
