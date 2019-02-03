import { Request, Response } from 'express'
import { User, users } from './users'

import * as jwt from 'jsonwebtoken'
import { apiConfig } from './api-config'

export const handleAuthentication = (req: Request, resp: Response) => {
  //code que vai processar o POST que foi feito pro login
  const user: User = req.body
  if (isValid(user)) {
    // const para representar o user
    const dbUser = users[user.email] // isto seria o equivalente a uma query no BD
    const token = jwt.sign({ sub: dbUser.email, iss: 'meat-api' }, apiConfig.secret)
    resp.json({ name: dbUser.name, email: dbUser.email, accessToken: token })
  } else {
    resp.status(403).json({ message: 'Dados inválidos.' })
  }
}

function isValid(user: User): boolean {
  console.log(user)
  if (!user) {
    return false
  }
  const dbUser = users[user.email]
  return dbUser !== undefined && dbUser.matches(user)
}
