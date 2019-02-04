import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs/Observable";
import 'rxjs/add/operator/do'

import { MEAT_API } from '../../app.api'
import { User } from "app/security/login/user.model";

@Injectable() // vamos injeter serviços ao LoginServide
export class LoginService {

  user: User
  constructor(private http: HttpClient) { }

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
}
