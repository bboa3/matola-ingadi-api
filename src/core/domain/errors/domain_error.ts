export interface DomainError {
  message: string
}

export class DatabaseFailError extends Error implements DomainError {
  constructor () {
    super('Oops! Erro. Por favor contacte suporte')
    this.name = 'DatabaseFailed'
  }
}

export class EntityNotFoundError extends Error implements DomainError {
  constructor () {
    super('Chamada da API inválida. Por favor, tente ou visite a documentação (https://api.matolaingadi.com/docs)')
    this.name = 'EntityNotFound'
  }
}

export class ExtractDataFailError extends Error implements DomainError {
  constructor (message: string) {
    super(message)
    this.name = 'ExtractDataFailed'
  }
}

export class EntityAlreadyExistError extends Error implements DomainError {
  constructor (message: string) {
    super(message)
    this.name = 'EntityAlreadyExist'
  }
}
