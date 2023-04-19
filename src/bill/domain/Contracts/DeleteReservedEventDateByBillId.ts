interface Data {
  billId: string
}

export type DeleteReservedEventDateByBillIdDB = (data: Data) => Promise<number>
