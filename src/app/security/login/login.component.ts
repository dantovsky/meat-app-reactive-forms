import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { LoginService } from "./login.service"
import { User } from './user.model'
import { NotificationService } from '../../shared/messages/notification.service'

@Component({
  selector: 'mt-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup

  constructor(private fb: FormBuilder, private loginService: LoginService,
    private notificationService: NotificationService) { }

  ngOnInit() {
    // init form
    this.loginForm = this.fb.group({
      email: this.fb.control('', [Validators.required, Validators.email]), // ------- inicia com valor cazinho e tem duas validações
      password: this.fb.control('', [Validators.required])
    })
  }

  login() {
    // para receber o valor, precisamos do método subscribe (porque isso aqui é um Observable)
    this.loginService.login(this.loginForm.value.email, this.loginForm.value.password)
      .subscribe(user => this.notificationService.notify(`Bem vindo, ${user.name}`),
        response => // HttpErrorResponse
          this.notificationService.notify(response.error.message))
    // para utilizar, agora temos que declarar o serviço no SharedModule
  }
}
