import { EventEmitter } from "@angular/core";

export class NotificationService {
  notifier = new EventEmitter<string>()

  // Funcao que recebe str e passa essa msg para o metodo emit() do notifier
  notify(message: string) {
    this.notifier.emit(message)
  }
}
