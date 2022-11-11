import dayjs from 'dayjs'
import fs from 'fs/promises'
import { join, resolve } from 'path'

const viewPath = resolve(__dirname, '..', '..', '..', 'view', 'invoice')

export const deleteInvoiceUseCase = async () => {
  const filesNames = await fs.readdir(viewPath)

  for (const name of filesNames) {
    const unixDate = Number(name.split('-')[1].split('.')[0])

    const date = dayjs.unix(unixDate)

    const difference = date.diff(new Date(), 'hours')

    if (difference >= 12) {
      const filePath = join(viewPath, name)

      await fs.unlink(filePath)
    }
  }
}
