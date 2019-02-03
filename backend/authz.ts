import { Request, Response } from 'express'
import * as jwt from 'jsonwebtoken'

import { apiConfig } from './api-config'


export const handleAuthorization = (req: Request, resp: Response, next) => {
  const token = extractToken(req)
  if (!token) {
    resp.setHeader('WWW-Authenticate', 'Bearer token_type="JWT"') // header que diz que estamos a espera de um TOKEN do tipo JWT
    resp.status(401).json({ message: 'Você precisa se autenticar.' }) // mensagem a informar o erro
    // poderia no entando passar logo o status(403) Forbbiden :: proibido de acessar o recurso
    // e ignorar a passagem do setHeader(), não dando pistas sobre o que estamos a espera
    // poderia tambem retornar um status(404) Not Found :: dar a entender ao cli que o recusro nem existe (para que ele nao tente outras maneiras de burlar o esquema de autenticação)
  } else {
    // funcao que espera:
    // - o token,
    // - o pass pa verifica a assinatura do token,
    // - o callback, onde essa funcao vai dizer de deu erro ou nao e informar o próprio token decodificado
    jwt.verify(token, apiConfig.secret, (error, decoded) => {
      if (decoded) {
        next() // ---------------| está tudo certo, pode deixar o request passar
      } else {
        resp.status(403).json({ message: 'Não autorizado.' })
      }
    })
  }
}

function extractToken(req: Request): string {
  let token = undefined
  // vamos inspecionar o obj Headers do Request, para ver se o TOKEN chamado Authorization (que é o que estamos a espera) está presente
  if (req.headers && req.headers.authorization) {
    // Será um obj do tipo
    // Authorization: Bearer ZZZ.ZZZ.ZZZ
    const parts: string[] = req.headers.authorization.split(' ')
    if (parts.length === 2 && parts[0] === 'Bearer') {
      token = parts[1]
    }
  }
  return token
}
