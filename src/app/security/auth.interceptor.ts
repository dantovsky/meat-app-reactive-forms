import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from "@angular/common/http";
import { Observable } from "rxjs/Observable";
import { Injectable, Injector } from "@angular/core";
import { LoginService } from "./login/login.service";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  // Injector é uma ref pro mecanismo de injeção de dependencias do Angular
  // Através do Injector podemos obter qualquer objeto que esteja registado dentro do container de injeção de dependencia
  // ex: ref para NotificationService, ref para o LoginService
  // Ele tem um método get() onde pasamos qual o tipo que queremos e ele vai dar a instancia e as dependencia dessa instancia completamente resolvida, como se estivesse recebendo isso no constructor().
  constructor(private injector: Injector) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const loginService = this.injector.get(LoginService) // aqui vamos ter o acesso ao LoginService

    // se estiver autenticado vai enviar o token (adicionar o header)
    if (loginService.isLoggedIn()) {
      // HttpRequest é um obj imutável, ou seja, não conseguimos modificar essa instancia, então vamos ter que clonar esse obj já com as modificações necessárias
      const authRequest = request.clone(
        { setHeaders: { 'Authorization': `Bearer ${loginService.user.accessToken}` } }) // adicao de headers customizados a um request existene
      return next.handle(authRequest)
    } else {
      return next.handle(request)
    }
    // console.log('Intercepting ', request)
  }
}
