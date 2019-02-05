import { Component, OnInit } from '@angular/core'
import { LoginService } from '../../security/login/login.service'
import { User } from '../../security/login/user.model'

@Component({
  selector: 'mt-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent implements OnInit {

  constructor(private loginService: LoginService) { }

  ngOnInit() {
  }

  // func p disponibilizar as infos q esta dentro do loginService para o template do user-detail
  user(): User {
    return this.loginService.user
  }

  // saber se user está logado ou nao
  isLoggedIn(): boolean {
    return this.loginService.isLoggedIn() // chama a funcao equivalente que está em LoginService
  }

  login() {
    this.loginService.handleLogin()
  }

  logout() {
    this.loginService.logout()
  }

}
