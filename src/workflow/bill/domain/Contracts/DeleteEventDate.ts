interface Data {
  invoiceCode: string
}

export type DeleteEventDateDB = (data: Data) => Promise<number>
