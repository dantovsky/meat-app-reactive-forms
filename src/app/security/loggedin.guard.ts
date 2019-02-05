import { CanLoad, Route, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { Injectable } from "@angular/core";
import { LoginService } from "./login/login.service";

@Injectable()
export class LoggedIdGuard implements CanLoad, CanActivate {

  constructor(private loginService: LoginService) { }

  // funcao auxiliar para o o canLoad() e o canActivate()
  checkAuthentication(path: string): boolean {
    const loggedin = this.loginService.isLoggedIn()
    if (!loggedin) {
      this.loginService.handleLogin(`/${path}`)
    }
    return loggedin
  }

  // método que recebe um param que diz pra gente qual é a config da rota que a gente associou o LoggedIdGuard
  canLoad(route: Route): boolean { //| Observable<boolean> | Promise<boolean>
    console.log('canLoad')
    return this.checkAuthentication(route.path)
  }

  // no canActivate() temos todas as infos da rota que vai ser ativada (params e outras refs a outros obj e todas as rotas parents)
  // ActivatedRouteSnapshot :: representa a rota a rota já ativada
  // RouterStateSnapshot :: é uma arvore de ActivatedRouteSnapshot (vai ter todo o caminho de todas as rota ativadas até chegar na nossa). Poderíamos também conseguir acessar os snapshots das rotas parents.
  canActivate(activatedRoute: ActivatedRouteSnapshot, routerState: RouterStateSnapshot): boolean {
    console.log('canActivate')
    return this.checkAuthentication(activatedRoute.routeConfig.path)
  }
}
