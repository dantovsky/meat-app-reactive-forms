import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Router, NavigationEnd } from '@angular/router'

import { Observable } from "rxjs/Observable";
import 'rxjs/add/operator/do'
import 'rxjs/add/operator/filter'

import { MEAT_API } from '../../app.api'
import { User } from "app/security/login/user.model";

@Injectable() // vamos injeter serviços ao LoginServide
export class LoginService {

  user: User
  lastURL: string

  constructor(private http: HttpClient, private router: Router) {
    // a prop events é um OBservable que quando se inscrever, vamos ser notificados da mudança de navegação
    this.router.events.filter(e => e instanceof NavigationEnd)
      .subscribe((e: NavigationEnd) => this.lastURL = e.url)
  }

  // saber se o user está logado na APP
  isLoggedIn(): boolean {
    return this.user !== undefined
  }

  login(email: string, password: string): Observable<User> {
    return this.http.post<User>(`${MEAT_API}/login`,
      { email: email, password: password })
      .do(user => this.user = user)
    // agora, no login.component.ts, precisa criar um método de login, associar com o botao e chamar esse método do login.service
  }

  logout() {
    this.user = undefined // destruimos a info do user que está logado
  }

  handleLogin(path: string = this.lastURL) {
    this.router.navigate(['/login', btoa(path)]) // -------| btoa() é para fazer o encode com Base64 e tornar a URL mais amigável. Será necessário fazer o decode no login.component
  }
}
