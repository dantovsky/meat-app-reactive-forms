import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { ActivatedRoute, Router } from '@angular/router'
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
  navigateTo: string

  constructor(private fb: FormBuilder, private loginService: LoginService,
    private notificationService: NotificationService, private activatedRoute: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    // init form
    this.loginForm = this.fb.group({
      email: this.fb.control('juliana@gmail.com', [Validators.required, Validators.email]), // ------- inicia com valor cazinho e tem duas validações
      password: this.fb.control('juliana23', [Validators.required])
    })
    this.navigateTo = this.activatedRoute.snapshot.params['to'] || btoa('/') // se alguem chamar a pagina de login e nao disse uma rota, vai para a poágina de login
    // btoa() é para fazer o encode com Base64 e tornar a URL mais amigável. Será necessário fazer o decode na funcao login()
  }

  login() {
    // para receber o valor, precisamos do método subscribe (porque isso aqui é um Observable)
    this.loginService.login(this.loginForm.value.email, this.loginForm.value.password)
      .subscribe(user => this.notificationService.notify(`Bem vindo, ${user.name}`),
        response => // HttpErrorResponse
          this.notificationService.notify(response.error.message),
        () => {
          this.router.navigate([atob(this.navigateTo)])
        }) // 1º param: pegar a resposta; 2ª param: em caso de erro; 3º param: quando o Observable terminar
    // para utilizar, agora temos que declarar o serviço no SharedModule
  }
}
