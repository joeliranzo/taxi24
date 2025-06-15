export class Driver {
  constructor(
    public readonly id: string,
    public name: string,
    public latitude: number,
    public longitude: number,
    public isAvailable: boolean,
    public createdAt: Date,
    public updatedAt: Date,
  ) {}
}
