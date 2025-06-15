export class Passenger {
  constructor(
    public readonly id: string,
    public name: string,
    public latitude: number,
    public longitude: number,
    public createdAt: Date,
    public updatedAt: Date,
  ) {}
}
