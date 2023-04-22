import { DatabaseFailError } from '@core/domain/errors/domain_error'
import { fail, notFound } from '@core/infra/middleware/http_error_response'
import { UserSupportService } from '@mail/domain/Contracts/UserSupport'
import { createHtml } from '@mail/services/templetes/user-support'
import { createDateUTC } from '@utils/date'
import { getMonths } from '@utils/date/months'
import { pipe } from 'fp-ts/lib/function'
import * as TE from 'fp-ts/lib/TaskEither'

const { months, dateLocalizer } = getMonths('pt')

export const userSupportService: UserSupportService = (userSupportSend) => (data) => {
  const { name, phoneNumber, email, message, service } = data
  const now = createDateUTC().format()
  const date = dateLocalizer(now, months)

  return pipe(
    TE.tryCatch(
      async () => {
        const html = createHtml({
          name,
          phoneNumber,
          email,
          message,
          service,
          date
        })

        await userSupportSend({ html, name, email })
      },
      (err: any) => {
        if (err.name === 'EntityNotFound') {
          return notFound(err)
        }

        console.log(err)
        return fail(new DatabaseFailError())
      }
    )
  )
}
