import { HttpErrorResponse } from '@angular/common/http'
import "rxjs/add/observable/throw";
import { Observable } from "rxjs/Observable";
import { ErrorHandler, Injectable, Injector, NgZone } from "@angular/core";

import { NotificationService } from './shared/messages/notification.service'
import { LoginService } from './security/login/login.service'

@Injectable()
export class ApplicationErrorHandler extends ErrorHandler {

  constructor(private ns: NotificationService, private injector: Injector, private zone: NgZone) {
    super()
  }
  handleError(errorResponse: HttpErrorResponse | any) {
    //this.ns.notify('ERRO')
    if (errorResponse instanceof HttpErrorResponse) {
      const message = errorResponse.error.message
      this.zone.run(() => {
        switch (errorResponse.status) {
          case 401:
            this.injector.get(LoginService).handleLogin()
            break;
          case 403:
            this.ns.notify(message || 'Não autorizado')
            break;
          case 404:
            this.ns.notify(message || 'Recurso não encontrado. Verifique o console para mais detalhes.')
            break;
        }
      })
    }
    super.handleError(errorResponse)
    // let errorMessage: string
    // if (error instanceof HttpErrorResponse) {
    //   const body = error.error
    //   //const err = body.error || JSON.stringify(body)
    //   // errorMessage = `Erro ${error.status} ao acessar a URL ${error.url} - ${error.statusText}`
    //   errorMessage = `${error.url}: ${error.status} - ${error.statusText || ''} ${body}`
    // } else {
    //   // errorMessage = error.toString()
    //   errorMessage = error.message ? error.message : error.toString()
    // }
    // console.log(errorMessage)
    // return Observable.throw(errorMessage)
  }
}
