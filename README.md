# meat-app-reative-forms
Este repositório continua o curso de Angular: App Angular (MEAT App) do Curso Construindo Aplicações Web Com o Novo Angular (4, 5 e 6)
Versão do repositório com Template Forms: https://github.com/dantovsky/meat-app 
Neste repositório, as novas modificações são a partir da aula 71. 

﻿19:43 07/01/2019

------------------------------------------------------------------
Arquivos importantes
------------------------------------------------------------------
tsconfig.json (arquivo que vai conter as configurações básicas do compilado)
packsge.json (criado após "npm ini -f", onde tem as dependências e outras configurações)
app.ts (arquivos de script)

------------------------------------------------------------------
Auto compilação dos arquivos ts
------------------------------------------------------------------
Tem duas maneiras:
1. Uma no tsconfig.json:
{
   "compileOnSave": true,
   "compilerOptions": {
       "outDir" : "dist"
   }
}
O outDir manda o JS para o diretório listado. Se quiser deixar na mesma pasta, pode remover esse atributo, mas deixo explícito aqui porque usamos mais na frente de qualquer forma.
2. Você pode deixar o compilador do ts executando em background. Essa opção é livre de editor e funciona para qualquer um. Abre uma nova aba ou instância do terminal, digita:
tsc -w (precisa instalar o compilador TypeScript com "np install typescript -g"
E deixa em background.

------------------------------------------------------------------
MODULO ::  O que é um módulo? >> Organiza o conteúdo
------------------------------------------------------------------
Uma unidade que contém classes, interfaces, funções e variáveis
com o objetivo de deixar o conteúdo de uma app isolado do restante da app.

No brwoser é necessário usar carregadores de módulos como:
- requireJS
- systemJS

Na aula 13 organizamos tudo o que foi feito para trás, ficando com os arquivos:
- base-ships.ts
- starfighters.ts

------------------------------------------------------------------
NAMESPACE (antigos módulos internos)
------------------------------------------------------------------
Outra maneira de organizar o code, e evita colisão de nomes.
Ex:

ARQUIVO: utilities.ts

namespace Utilities {
  export class ShipCleaner {...}
  function calcDistance(...)  {...}
}

ARQUIVO: other.ts
/// <reference path = "Utilities.ts" />

------------------------------------------------------------------
O que é Definição de Tipo?
------------------------------------------------------------------
...é apenas a definição de tipo daquela biblioteca, não é a implementação.
Possuem a extenção *.d.ts

Como obter as definições de tipo?
- npm registry
- Definitely Typed (Githup >> instalação manual)

Através do npm:

npm init // responder as perguntas, pode fazer "npm init -f" para forçar as configs padrões
name: (typescript)
version (1.0.0)

npm install --save lodash@4.14 // --save indica que a dependencia vai ser importante, e significa que vai usar essa dependencia tanto em desenvolvimento quanto em runtime
lodash@4.14

npm install -save-dev @types/lodash@4.14 // deve instalar também as definições de tipos do lodash
@types/lodash@4.14.51

O resultado criará um arquivo packages.json com as configs básicas da app e também as suas dependências

Devido a um bug no Atom, é necessário informar no arquivo tsconfig.json
"typeRoots": [
"nome_modules/@types"
]

------------------------------------------------------------------
Criar uma app (09/01/2019)
------------------------------------------------------------------
ng new nome-app --prefix=jad // --prefix é o que vai ser utilizado na frente de cada componente que for criado

------------------------------------------------------------------
Bootstrap (inicialização) do Angular com Webpack
------------------------------------------------------------------
O app.module.ts carrega o app.component.ts que carrega o app.component.html
No app.component é onde se define os componentes da app inicial, o seletor (tag) e o templateUrl

------------------------------------------------------------------
Componentes :: São elementos personalizados
------------------------------------------------------------------
Componentes são pequenas partes independentes reusáveis
>> Em Angular, são classes que tem um determinado ciclo de vida e que possui:
- um template para definir uma aparência
- e um selector (tag) :: para ser usada por outras partes da app

COMO DEFINIR UM COMPONENT ::

Um componente é uma classe que segue a sintaxe do ECMAScript 2015 + as features do TypeScript.
Sempre que declaramos a classe, a marcamos com a palavra "export", para que ela possa ser referenciada posteriormente
em outros arquivos de configurações exigidos pelo framework. Portanto quando marcamos com "export" esse arquivo passa a ser um módulo ECMAScript 2015.

Há mais coisas que precisamos informar ao Angular:
- qual o nome da TAG que queremos usar com esse componente?
  > para isso usamos o decorator @Component, e nele precisamos unformar duas coisas:
    - selector (TAG)
    - qual o template que o componente vai ter

    // ------------------------ COMPONENT (exemplo)----------------------

    import { Component } from '@angular/core';

    @Component({    // ------------------------------------------------------| DECORATOR
      selector: 'app-first',    // ------------------------------------------| SELECTOR (TAG)
      templateUrl: './myFirst.component.html'     // ------------------------| TEMPLATE QUE O COMPONENTE VAI TER
    })

    export class MyFirstComponent {
      constructor() {}
    }

Notas: existem duas formas de declarar um template:
- num arquivo externo através do atributo "templateUrl" (relativa, absoluta ou um URL HTTP)
- declarar o template direto dentro arquivo, mas usando o atributo "template" ao invés de "templateUrl". Forma recomendada apenas para template pequeno e simples.

    Exemplo ::
    template: '<h1>My first component</h1>'

    Exemplo utilizando MULTIPLAS LINHAS (sintaxe de template strings, do ECMAScript 2015) >> Acente crase (back tick)
    template: `<h1>
                  My first component
              </h1>`

    // ------------------------ TEMPLATE INTERPOLATION ----------------------
    // Os templates podem ter expressões que resolvem as propriedades do componente (template interpolation)

    @Component({
      selector: 'app-first',
      template: `<h1> {{title}} </h1>
                 <p>Welcome, {{user.name}}`
    })

    export class MyFirstComponent {
      title: string = 'My Star Wars Component'
      user = {name: 'Luke Skywalker'}
    }


    // ------------------------ COMPONENT (app.component.ts)----------------------

    import { Component } from '@angular/core';

    @Component({
      selector: 'jad-root',
      templateUrl: './app.component.html'
    })
    export class AppComponent {
      title = 'jedi-academy';
    }

Uma vez criado o componente, é necessário informar em qual módulo Angular o componente vai estar:
(não confundir módulos do Angular com módulos do ECMAScript 2015)
O módulo Angular é responsável por saber quais componentes, serviços, pipes e diretivas fazem parte da aplicação.
Cada um desses precisam estar em um módulo.
Se a declaração for feita num módulo raiz, toda a app tem acesso a aquele componente.

@NgModule({
  declarations: [MyFirstComponent]
})
export class AppModule {}

CRIAÇÃO DE COMPONENTE NO CONSOLE
ng generate component header --spec=false     // spcec é um param para gerar os arquivos de teste ou não

// forma reduzida deste comando:
ng g c header --spec=false

------------------------------------------------------------------
Property Binding
------------------------------------------------------------------
É quando deseja linkar o valor de uma propriedade de um elemento a uma expressão Angular, que pode avaliar para uma propriedade
de um componente, método ou até uma expressão mais elaborada.

Sintaxe ::

feita com [] "colchetes" ao redor da propriedade do elemento que se deseja atribuir o valor e pode ser aplicada a qualquer propriedade
de um elemento do DOM.

Exemplo ::

// no componente
user = {name: 'Luke Skywalker'}

<!-- no template do componente -->
<input type="text" [value]="user.name">

Sempre que o valor de name de user mudar, o valor de input também vai mudar,
mostrando que eles estão "ligados" >> Por isso é chamado de PROPERTY BINDING

Nesse caso, como a atualização é sempre em um sentido, se chama ONE-WAY BINDING
O one-way binding é sempre do COMPONENT => TEMPLATE

Exemplo ::

// in component
user = {name: 'Luke Skywalker'
        isJedi: true}

<!-- in template -->
<input type="text" [value]="user.name">
<div [hidden]="!user.isJedi">
    location of the jedi temple
</div>

É possível também usar certas expressões, como por exemplo [class.light] e associá-la a expressões booleanas,
se a variável for verdadeira, o Angular vai adicionar a classe "light" ao elemento final na renderização

Exemplo ::
<div [class.light]="user.isJedi"></div>

... renderizado ficará assim:
<div class="light"></div>

------------------------------------------------------------------
Passando Valores a um Componente
------------------------------------------------------------------
Como passar dados para um componente?
As propriedades que adicionamos aos componentes são públicas, mas precisamos avisar ao Angular quais dessas propriedades
podem receber dados dos seus componentes parents através de PROPERTY BINDING.

- ou lista-se um atributo que quer expor na lista de inputs do decorator @Component,
- ou marca um atributo com outro decorator, chamado @Input

Exemplo ::
Caso queira que o attr title deste componente possa ser alterado pelo seu component parent,
precisamos importar o decorator Input e adicioná-lo ao lado do attr

import { Component, Input } from '@angular/core'

@Component({
  selector: 'mt-header',
  template: '<h1>{{title}}</h1>'
})
export class HeaderComponent {
  @Input() title: string
}

- - -

<!-- usando o header em outro componente -->
<mt-header title="Minha App"></mt-header>

- - -

<!-- DOM em runtime -->
<mt-header title="Minha App">
    <h1>Minha App</h1> -----------------------------| CONTEÚDO RENDERIZADO
</mt-header>

- - - Pode também passar o valor por template interpolation ou property binding

<!-- template interpolation -->
<mt-header title="{{isJedi ? 'Jedi' : 'Sith'}}"></mt-header>

<!-- property binding -->
<mt-header [title]=isJedi ? 'Jedi' : 'Sith'"></mt-header>

- - - Uma outra possibilidade é expor o attr com um outro nome. Por padrão, o nome do attr é que é exporto

import { Component, Input } from '@angular/core'

@Component({
  selector: 'mt-header',
  template: '<h1>{{title}}</h1>'
})
export class HeaderComponent {
  @Input('value') title: string <--------------------- fizemos uma substituição para o nome "value"
}

- - -

<!-- usando o nome definido em @Input -->
<mt-header value="Título"></mt-header>

NOTA :: sempre que se quiser parra um valor que não seja string, precisa usar a  sintaxe de PROPERTY BINDING.

O hidden deve ser usado com bastante cautela e temos que saber que o hiiden controla a visibilidade do elemento por CSS.
Então o estilo global, CSS em algum outro lugar, pode estar influenciando na visibilidade de um componente.

Mais tarde, isto será melhorado com o uso de "diretivas".

------------------------------------------------------------------
DIRETIVAS :: São componentes com templates
------------------------------------------------------------------
Uma diretiva comum e simples serve para adicionar comportamento a um elemento do DOM, mas não tem o template de um componente.

Na realidade, existem 2 tipos de diretivas no Angular:
- COMPONENTES : mais comuns
- ESTRUTURAIS : mudam o template e a estrutura do DOM (Ex: ng-for e ng-if)
- ATRIBUTOS : onde associa um atributo a um elemento do DOM e um determinado comportamento é aplicado a esse elemento

- - - NG IF - - -
<!-- A diretiva ngIf é uma opção bem mais segura de usar que a propriedade HIDDEN, por que a prop hidden depende de estilos CSS, e esse estilo pode estar sendo sobrescrito em algum lugar da app.  -->

<!-- ng if -->
<input type="text" [value]="user.name">
<div *ngIf="user.isJedi">
  location of the jedi temple
</div>

- - -

<!-- ng if (versão não abreviada) -->
<input type="text" [value]="user.name">
<template [ngIf]="user.isJedi">
  <div>
    location of the jedi temple
  </div>
</template>

- - - NG FOR - - -

ngFor vai repetir o conteúdo de um elemento para cada item de uma coleção de objetos (repete o template de cada elemento)
<!-- ng for -->
<ul>
	<li *ngFor="let user of users">{{user.name}}</li>
</ul>

Podemos também declarar uma variável para saber cada elemento da lista (começa com index = 0)
<!-- ng for -->
<ul>
	<li *ngFor="let user of users; let i=index">
		{{user.name}}
	</li>
</ul>

- - - NG SWITCH - - -

O ngSwitch e o ngSwitchCase renderiza o conteúdo equivalente, o ngSwitchDefault mostra o conteúdo se nenhum dos conteúdos for verdadeiro
<div [ngSwitch]="profile">
	<p *ngSwitchCase="root">You can read & write</p>
	<p *ngSwitchCase="user">You can read</p>
	<p *ngSwitchDefault>go back, please!</p>
</div>

------------------------------------------------------------------
Usando Operador de Navegação Segura
------------------------------------------------------------------
Para evitar erros na consola JS (ex: "Cannot read property 'isJedi' of undefined"), podemos utilizar a "?" nas variáveis ou utilziar o *ngIf chamando apenas o conteúdo existente.

- - - Uso de ?

<div>
  Student: {{student?.name}}
  <div *ngIf="student?.isJedi">
    Jedi Temple: {{student?.temple}}
  </div>
</div>

- - - Uso de ngIf

<div *ngIf="student">
  Student: {{student?.name}}
  <div *ngIf="student?.isJedi">
    Jedi Temple: {{student?.temple}}
  </div>
</div>

<p *ngIf="!student">
  Sem dados para exibir!
</p>

------------------------------------------------------------------
COMPONENTES E EVENTOS
------------------------------------------------------------------
Duas formas:
- como um componente responde a eventos internos que ocorre dentro do próprio template
- como um componente pode produzir eventos que podem ser consumidos por outros componentes interessados

SINTAXE DOS EVENTOS: - ()
usamos parenteses ao redor de um evento para linká-lo a um método de um componente, assim sempre que a ação ocorrer, o método é chamado.

- - - Exemplo

import { Component } from '@angular/core';

@Component({
  selector: 'mt-clickable',
  templateUrl: '<button (click)="clicked()">Click!</button>'
})

export class ClickableComponent {

	clicked(): void {
		console.log('Button clicked!')
	}
}

- - - Referência ao evento através do obj $event

<!-- no tempalte do componente -->
<button (click)="clicked($event)">Click me!</button>

      |
      |
      |
      V

 // na função
 clicked(event): void {
   console.log(`Button clicked: ${event}`)
 }

- - - No evento keydown podemos associar a tecla, separada por ponto:

<!-- no tempalte do componente -->
<input (keydown.space)="keyDown($event)">

      |
      |
      |
      V

 // na função
 keyDown(event): void {
   console.log(`Key down: ${event}`)
 }


 ------------------------------------------------------------------
 EVENTOS DE COMPONENTES
 ------------------------------------------------------------------
Um componente pode emitir um evento personalizado também.
Para isso usamos uma classe chamada EVENTEMITTER, que é um adapter para a biblioteca RXJS, e possui um método emit(),
que chamamos quando chegar o momento de emitir o evento.

Pegando o exemplo anterior, se quiser criar um evento personalizado, precisamos importar mais dois tipos (Output e EventEmitter).
@Output() emite o evento, a saída do componente. O tipo será EventEmitter e o nome do evento, por padrão, é o nome da propriedade.

import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'mt-clickable',
  templateUrl: '<button (click)="clicked()">Click!</button>'
})

export class ClickableComponent {

  @Output myEvent = new EventEmitter()

	clicked(): void {
		this.myEvent.emit()
	}
}

Usando o componente, podemos atribuir o método que será chamado quando o evento for emitido

<!-- no tempalte que usa o componente -->
<mt-clickable (myEvent)="willBeCalled()"></mt-clickable>

      |
      |
      |
      V

willBeCalled(): void {
  console.log('Event from clickable')
}

------------------------------------------------------------------
VARIÁVEIS DE TEMPLATES
------------------------------------------------------------------
Em um elemento, podemos usar uma sintaxe #nome-da-variavel.
Isso irá permitir:
- vai poder usar uma referência desse elemento dentro do template ou passar isso para um método. Com essa referência pode-se acessar atributos e métodos.

Exemplo: um textarea com uam variável #desription e um botão com uma função que ao clicar faz o focus para a textarea com a variável #description.

<div *ngIf="student?.isJedi">
  Jedi Temple: {{student?.temple}} <button type="button" name="button" (click)="description.focus()">Focus!</button>
  <br>
  <textarea name="name" #description></textarea>
</div>

------------------------------------------------------------------
ROTAS E NAVEGAÇÃO
------------------------------------------------------------------
No template de um componente, quando quisermos marcar uma área para ser trocada sempre quando um
novo componente entrar em cena, precisamos colocar o elemento "router-outlet".

<!-- no template do componente -->
<div>
	<mt-header></mt-header>           ------------------------------- FIXO
</div>
<div>
	<outer-outlet></outer-outlet>     ------------------------------- DINÂMICO
</div>

- - - Rotas são um array

- - - Precisa indicar que rotas serão usadas no módulo através da função:
      - forRoot(ROUTES) no módulo raiz, ou
      - forChild nos outros módulos

- - - Como os caminhos são acionados ::

<!-- no template de algum componente :: um caminho a ser acionado -->
<a routerLink="/restaurants">Restaurantes</a>

<!-- ou :: um conjunto de parametros -->
<a [routerLink]="['/restaurants']">Restaurantes</a>

------------------------------------------------------------------
INJEÇÃO DE DEPENDÊNCIA
------------------------------------------------------------------
É um padrão de projeto onde a pp deixa de instanciar seus objetos manualmente e passa a depender
do framework para obter os objetos que ela quer usar.

O framework gerencia a instanciação dos objs, bem como suas dependências e disponibiliza isso
para os componentes da app.

# Informando ao Angular o que será injetado
Pra deixar um serviço disponível pra ser injetado em componentes, é necessário declará-lo
na lista de providers de um componente ou módulo.

Se for no:
- COMPONENTE :: uma instancia do serviço fica disponível para o componente e seus filhos

@Component({ providers: [ MyFirstService ] })
export class MyFirstService {
  constructor(private firstService: MyFirstService) { }
}

- MÓDULO :: o serviço fica disponível para todos os componentes da app.
@Ngmodule({
  declarations: [...],
  providers: [ MyFirstService],
})
export class AppModule {}

------------------------------------------------------------------
SERVIÇOS
------------------------------------------------------------------
São classes comuns em Angular, que se pode usar para injetar em componentes e em outros serviços.
Serviços são geralmente usados em uma app para encapsular o acesso a API de backend.

Podem ser SINGLETONS.

São  os escopos que se pode usar para declarar um serviço:

- Módulo Angular -----------------| providers: []
  Fica disponível para ser injetado por todas as classes declarados nesse mesmo módulo (inclui componentes e outros serviços)

- Componente e seus filhos -----------------| providers: []
  O serviço vai ser intanciado e compartilhado apenas para o componente e seus componentes filhos

- Somente componente  -----------------| viewProviders: []
  Fica apenas disponível para o componente

# Serviços também podem solicitar injeção de outros serviços
Para isso deve usar o decorator @Injectable() ------------| apenas para receber injeções

import { Injectable } from '@angular/core'
import { Http } from '@angular/http'

@Injectable() // RECEBER INFECOES

export class MyService {

  constructor(private http: Http) {
  }

  list() {
    return this.http.get('/url')
  }
}

Exemplos de SERVIÇOS que o Angular disponibiliza:

- TITLE: serviço para obter e alterar o título de uma página.
  O componente pode requisitar a injeção e usar o método setTitle para substituir o título.
  Este serv existe porque não é possível usar expressões Angular na página HTML inteira, como o title fica
  no <head> e essa parte não faz parte o Bootstrap, criaram essa alternativa com o Serviço TITLE.

  import { Title } from '@angular/platform-browser'

  @Component({
    viewProviders: [Title]
  })
  export class MyPageComponent {

    constructor(title: Title) {
      title.setTitle(':: My Fancy Title ::')
    }
  }

- HTTP: encapsula acesso HTTP

- ROUTER: realiza navegação de forma programática

------------------------------------------------------------------
REACTIVE PROGRAMING (Iterator + Observer)
------------------------------------------------------------------
Você ouve um evento, e quando ele acontece, você é notificado e responde a ele.

Baseado no padrão chamado "observer" (fornecido pela biblioteca RXJS)
Um evento acontece, e os que estão interessados reagem a ele.

NO Angular, os métodos da API HTTP retornam Observable<RESPONSE>
GET, POST, PUT, DELETE HEAD, OPTIONS

------------------------------------------------------------------
Packages Instaladas no Projeto MEAT App
------------------------------------------------------------------
npm install -g json-server                --------| emular um API server

------------------------------------------------------------------
Parametrizando Rotas
------------------------------------------------------------------
2 formas de obter parâmetros:

- a partir de SNAPSHOT (fotografia dos params no momento em que a gente pedir)
(1) precisa injetar o objeto AcivatedRoute no contrutor do componente
(2) usar a funcao snapshot passando o id como params

export class MyComponent implements OnInit {

  constructor(private rout: ActivatedRoute) { } -------------------------| (1)

  ngOnInit() {
    const id = this.route.snapshot.params['id'] -------------------------| (2)
    this.myObj = // ...obter os dados baseado no id
  }
}

- SUBSCRIBE (se inscrevendo na rota e executando a mudança de params)

export class MyComponent implements OnInit {

  constructor(private rout: ActivatedRoute) { } -------------------------| (1)

  ngOnInit() {
    // O componente se inscreve para recever as notificações de mudança de parâmetros nas rotas
    this.route.params.subscribe(params => { -----------------------------| (2)
      const id = params['id']
      this.myObj = // ...obter os dados baseado no id
    })
  }
}

------------------------------------------------------------------
PIPES
------------------------------------------------------------------
Transformam dados para uma apresentação diferente
- string para uppercase ou lowercase
- formatar números
- formatar moedas
- formatar datas
- limitar o tamanho de um array
- formatar um conteúdo JSON

Exemplos:

# Pipe JSON
Ver uma  representação JSON de um objeto (exibe todas as propriedades de um obj)

<!-- in component -->
user = { name: 'Luke Skywalker', isJedi: true }

<!-- in template (JSON PIPE)-->
<div>{{user | json}}</div>

<!-- renderizado -->
<div> { name: 'Luke Skywalker', isJedi: true } </div>


# Pipe uppercase
<!-- in template -->
<div>{{user | uppercase}}</div>

# Pipe lowercase
<!-- in template -->
<div>{{user | lowercase}}</div>

# Pipe percent
<!-- in template -->
<div>{{0.5 | percent}}</div>

# Pipe date
<!-- in template -->
<div>{{birthday | date: 'dd/M/yyyy'}}</div>

# Pipe moeda
<!-- in template -->
<div>{{price | currency}}</div>

<!-- renderizado -->
<div>USD45.90</div>

//

<!-- in template (com 3 params opcionais:
1. string ISO da moeda a ser usada
2. indica se usa-se o símbolo ao invés da string ISO
3. indica o formato do número) -->
<div>{{price | currency: 'BRL': true}}</div>

<!-- renderizado -->
<div>R$45.90</div>

# Pipe slice :: limitar arays e strings
<!-- in template (limitado aos 4 primeiros caracteres da string)-->
<div>{{user.name | slice: 0:4}}</div>

<!-- renderizado -->
<div>Luke</div>

# Pipes combinados com outros pipes
<!-- in template -->
<div>{{['one', 'two'] | slice: 0:1 | json | uppercase}}</div>

<!-- renderizado -->
<div>["ONE"]</div>

------------------------------------------------------------------
# 54 Internacionalização :: Localiazando o currency para moeda BRL
------------------------------------------------------------------
Precisa adicionar nas dependêcias do projeto ::

Arquivo package.json
- "intl": "^1.2.5" => o pipe currency utiliza esse pacote

Arquivo polyfills.ts
Incluir a dependência do pacote "intl" e incluir o script necessário pela biblioteca do Angular para converter os números para o padrão PT
- import 'intl';
- import 'intl/locale-data/jsonp/pt-BR.js';

Agora precisa dizer ao Angular que queremos usar como localização o padrão pt-BR
faz-se isso no módulo raiz:
- LOCALE_ID ::
  import { NgModule, LOCALE_ID } from '@angular/core';
- na lista de providers precisamos trocar o valor da localização utilizando esse token ::
  providers: [RestaurantsService, ShoppingCartService, {provide: LOCALE_ID, useValue: 'pt-BR'}],

------------------------------------------------------------------
# 55 Template Forms
------------------------------------------------------------------
Forma declarativa de configurar formulários no template do componente.

# Config no app.module.ts ::
- import { FormsModule } from '@angular/forms'
- imports: [
  BrowserModule,
  HttpModule,
  FormsModule, ------------------------------| Add também no imports @ngModule
  RouterModule.forRoot(ROUTES)
],

Usamos a diretiva ngModel nos inputs que devem ser controlados pelo framework.

# DIRETIVA "ngForm" :: O Angular associa implicitamente a diretiva ngForm a uma tag <form>.
Com essa diretiva podemos determinar:
- validade do form
- valor
- outros status: dirty, pristine e touched

Com "template forms" é preciso usar a diretiva ngModel (o atributo name será obrigatório)

Form rastreia os campos com ngModel e passa a ficar ciente do valor do campo
<form>
	<input type="text" name="name" ngModel>
</form>
Neste exemplo:
- form valid se name valid
- form invalid se name invalid

# ONE-WAY BINDING associando o campo a uma propriedade de um componente:
<form>
	<input type="text" name="name" [ngModel]="username">
</form>
// -----------------------------------| Nesse caso, apenas quando o valor do componente mudar o valor é atualizado (o contrário não acontece)
@Component({...})
export class UserComponent {
  username: string = "Nome do usuário"
}

# TWO-WAY BINDING associando o campo a uma propriedade de um componente (nas duas vias de sentido):
<form>
	<input type="text" name="name" [(ngModel)]="username">
</form>
// -----------------------------------| Nesse caso, se o campo mudar, o valor da propriedade do componente também muda
@Component({...})
export class UserComponent {
  username: string = "Nome do usuário"
}

# ngForm permite acessar propriedades do formulário
Podemos obter uma ref a diretiva através de template variables e construir expressões que ajudam a controlar o acesso a certos componentes do form,
por exemplo: habilitar ou não um botão baseado da validade do próprio form.
<form #myForm="ngForm">
	<input type="text" name="name" ngModel>
	<input type="text" name="lastname" ngModel>
	<input type="text" name="address" ngModel>

	<button [disabled]="myForm.invalid"></button>
</form>

# Desabilitar a validação de forms do browser
Cada browser tem um estilo de validação diferente. Portanto criamos uma experiência comum com o Angular
<form novalidate>

# Debugger e ver valores do template forms ::
podemos analisar os dados com a exibição dos valores (utilizando a template variable):
{{form.valid}} {{form.value | json}}


------------------------------------------------------------------
# 58 Validação com Template Forms
------------------------------------------------------------------
A diretiva ngModel disponibiliza os seguintes estados que podem ser verificados para dar feedback visual ao user:
- VALID | INVALID :: se o valor do campo está de acordo ou não com as regras de validação
- PRISTINE | DIRTY :: pristine representa o estado inicial do campo ou form, uma vez que o user digita no campo ele se torna DIRTY e não volta mais
- UNTOUCHED | TOUCHED :: touched indica quando o user entra no campo

A diff entre DIRTY e TOUCHED é que para o campo ficar no estado DIRTY o user precisa modificá-lo

Para saber o em qual estado o campo se encontra, precisamos obrer uma referência para a diretiva ngModel do campo
<form #myForm="ngForm">
	<input name="name" [ngModel]="username" #ipt="ngModel">
	<span *ngIf="ipt.invalid">Nome inválido</span>
</form>

# VALIDATORS
Podemos atribuir as seguintes validações a um campo:
- REQUIRED
- PATTERN - REGEX => expressão regular para validar baseado no pardão informado
- minLENGTH & maxLENGTH

<form>
	<input name="name" [ngModel]="username" #ipt="ngModel"
    required minlength="5">
	<span *ngIf="ipt.invalid">Nome inválido</span>
</form>

# Para ajudar dar o feedback visual ao user, o Angular associa aos campos e ao form as classes ::
- NG-VALID | NG-INVALID
- NG-PRISTINE | NG-DIRTY
- NG-UNTOUCHED | NG-TOUCHED

ERRO na consola do Chrome logo após fazer o #iptAddress="ngModel ::
Unhandled Promise rejection: Template parse errors:
There is no directive with "exportAs" set to "ngModel" ("o</label>
            <input type="text" class="form-control" name="address" required minlength="5" [ERROR ->]#iptAddress="ngModel" placeholder="Endereço" autocomplete="off">
            <span class="help-block""): ng:///AppModule/OrderComponent.html@28:90 ; Zone: <root> ; Task: Promise.then ; Value: Error: Template parse errors: (...)

Solução no StackOverflow
https://stackoverflow.com/questions/38648407/angular2-error-there-is-no-directive-with-exportas-set-to-ngform

Solução mais simples que funcionou para mim :: apenas coloquei novamente o ngModel juntamente com o #iptAddress="ngModel" na inpunt, ficando assim:
<input type="text" class="form-control" name="address" required minlength="5" ngModel #iptAddress="ngModel" placeholder="Endereço" autocomplete="off">

------------------------------------------------------------------
# 61 Componente de Input Através de Content Projection
------------------------------------------------------------------
Criação de um componente para representar um input-text

Isto servirá para simplificar o código do template HTML e evitar a repetição de código.
Exemplo de como ficaram dois itens do formulário ::


<div class="form-group" [class.has-success]="iptAddress.valid && (iptAddress.dirty || iptAddress.touched)"
                        [class.has-error]="!iptAddress.valid && (iptAddress.dirty || iptAddress.touched)">
  <label class="control-label sr-only" for="inputSuccess"><i class="fa fa-check"></i> Endereço</label>
  <input type="text" class="form-control" name="address" required minlength="5" ngModel #iptAddress="ngModel" placeholder="Endereço" autocomplete="off">
  <span class="help-block" *ngIf="iptAddress.valid && (iptAddress.dirty || iptAddress.touched)"><i class="fa fa-check"></i> Ok</span>
  <span class="help-block" *ngIf="!iptAddress.valid && (iptAddress.dirty || iptAddress.touched)"><i class="fa fa-remove"></i> Campo obrigatório</span>
</div>
</div>
<div class="col-sm-2 col-xs-6">
<div class="form-group" [class.has-success]="iptNumber.valid && (iptNumber.dirty || iptNumber.touched)"
                        [class.has-error]="!iptNumber.valid && (iptNumber.dirty || iptNumber.touched)">
  <label class="control-label sr-only" for="inputSuccess"><i class="fa fa-check"></i> Número</label>
  <input type="text" class="form-control" name="number" required #iptNumber="ngModel" ngModel placeholder="Número" autocomplete="off">
  <span class="help-block" *ngIf="iptNumber.valid && (iptNumber.dirty || iptNumber.touched)"><i class="fa fa-check"></i> Ok</span>
  <span class="help-block" *ngIf="!iptNumber.valid && (iptNumber.dirty || iptNumber.touched)"><i class="fa fa-remove"></i> Campo obrigatório</span>          </div>
</div>

Após criar um component e substituir um destes um destes form-group pela tag do component, no browser, o feedback visual continua, porém o elemento perde a sua rastreabilidade.
Isto acontece porque o input text agora está encapsulado em outro componente e o form não consegue mais enxergá-lo.

Temos duas formas para resolver:
- Content Projection :: transformar o componente num component container, onde aplica-se apenas o estilo visual e deixa com que o component parent (o componente de compra) passe o input text
- Control Value Accessor :: deixar o componente totalmente isoladodentro do input e impolementa uma interface chamada control value accessor (serve de ponte entre as diretivas usadas de apoio ao formulário, como o ngModel e o próprio component)

CONTENT PROJECTION
- usar uma tag chamada <ng-content> no lugar do input text.
  Similar ao router-outlet (marcar uma região onde através de uma navegação entramos com um component correspondente àquele caminho), no "ng-content", ele também representa um espaço que vai entrar um conteúdo (o conte+udo que vai ficar entre as tags do component)
  No component, camos usar o decorator @ContentChild, onde dizemos qual é o elemento ou diretiva que queremos buscar uma referência

- Importat decorator Input para referenciar os atributos que irão receber infos dos parents (de fora)

- Pegar uma ref para ngModel que vai ser declarada por quem tiver usando o component (vai ficar como filho do component)
  1. import NgModel em angular/forms
  2. ContentChild em @angular/core

------------------------------------------------------------------
# 62 Validação com Expressões Regulares
------------------------------------------------------------------
Feito com o atributo pattern.

# Email Regex
`/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i`

# Number Regex
`/^[0-9]*$/`

------------------------------------------------------------------
# 63 ControlValueAccessor
------------------------------------------------------------------
Ao usar a interface ControlValueAccessor precisa implementar os seus métodos:
- writeValue(obj: any): void;
- registerOnChange(fn: any): void;
- registerOnTouched(fn: any): void;
- setDisabledState?(isDisabled: boolean): void;

------------------------------------------------------------------
Navegação Programática via Router
------------------------------------------------------------------
- Precisa fazer import Router:
  import { Router } from '@angular/router'

- Instanciar no constructor:
  private router: Router

- Usar o método navigate()
  this.router.navigate(['/order-summary'])

------------------------------------------------------------------
# 71 - REACTIVE FORMS
------------------------------------------------------------------
Nova forma que o Angular traz para implementar formulários.
Ao invés de usar ngModel e validadores nos campos criamos instancias de FORM GROUP ou FORM CONTROL
dentro de um componente.

// O form é representado por FormGroup que vai agrupar um ou mais campos dentro dele
// Pra ajudar nessa tarefa o Angula disponibiliza o obj FormBuilder, que ajuda na criação dos campos e outros grupos.
// FormBuilder tem um método chamado group({}) onde recebe um obj com propriedades representando cada campo do form.
@Component({...})
export class UserComponent implements OnInit {

  userForm: FormGroup

  constructor(private fb: FormBuiler) {}

  ngOnInit() {
    this.userForm = this.fb.group({
      username: '', -------------------------------------------- | campo iniciado com valor vazio
      password: '' --------------------------------------------- | campo iniciado com valor vazio
    })
  }
}

// --- Mesmo resultado usando o método control(), do FormBuiler

@Component({...})
export class UserComponent implements OnInit {

  userForm: FormGroup

  constructor(private fb: FormBuiler) {}

  ngOnInit() {
    this.userForm = this.fb.group({
      username: this.fb.control(''),
      password: this.fb.control('') ---------------------------- | FormControl
    })
  }
}

// --- Os validadores podem ser passados em um array ao criar o FormControl

this.userForm = this.fb.group({
  username: this.fb.control('', [validators.required]), ---------| campo obrigatório
  password: this.fb.control('', [validators.required]) ----------| tem que ter no mín 3 caracteres
})

VALIDATORS :: Reactve Forms te os validadores padrão (todos declarados como funções estáticas da classe Validators):
- minlength(..) | maxlength(..)
- required
- patern(..)

Se o form tiver campos que fazem sentido serem agrupados, pode-se fazer isso com um outro Form Group.
A vantagem de um group é que pode aplicar validadores ao nível do grupo para validar valores entre os componentes.
Ex. para o endereço:

@Component({...})
export class UserComponent implements OnInit {

  userForm: FormGroup

  constructor(private fb: FormBuiler) {}

  ngOnInit() {
    this.userForm = this.fb.group({
      username: '', -------------------------------------------- | campo iniciado com valor vazio
      password: '' --------------------------------------------- | campo iniciado com valor vazio
      address: this.fb.group({
        street: '',
        zip:
      })
    })
  }
}

Ex de como fica o template (não vai mais usar o ngModel).
O form será associado com o grupo do componente através da diretiva "formGroup".
Cada componente será associado com "formControlName":

<form [formGroupName]="userForm"> -----------------------------------| diretiva formGroupName
	<input type="text" formControlName="username"/>
  <input type="password" formControlName="password"/>
  <div formGroupName="address">
    <input type="text" formControlName="street"/>
    <input type="text" formControlName="zip"/>
  </div>
</form>

// --- A partir deste ponto, como o programa MEAT APP será refatorado de Template Forms para Reactive Forms,
foi criado um novo repositório Git:
https://github.com/dantovsky/meat-app-reactive-forms
