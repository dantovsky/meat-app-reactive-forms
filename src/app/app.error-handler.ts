import { HttpErrorResponse } from '@angular/common/http'
import "rxjs/add/observable/throw";
import { Observable } from "rxjs/Observable";

export class ErrorHandler {
  static handleError(error: HttpErrorResponse | any) {
    let errorMessage: string
    if (error instanceof HttpErrorResponse) {
      const body = error.error
      //const err = body.error || JSON.stringify(body)
      // errorMessage = `Erro ${error.status} ao acessar a URL ${error.url} - ${error.statusText}`
      errorMessage = `${error.url}: ${error.status} - ${error.statusText || ''} ${body}`
    } else {
      // errorMessage = error.toString()
      errorMessage = error.message ? error.message : error.toString()
    }
    console.log(errorMessage)
    return Observable.throw(errorMessage)
  }
}
