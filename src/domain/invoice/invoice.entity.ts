export class Invoice {
  constructor(
    public readonly id: string,
    public tripId: string,
    public amount: number,
    public issuedAt: Date,
  ) {}
}
