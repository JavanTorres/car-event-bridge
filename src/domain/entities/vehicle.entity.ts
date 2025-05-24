export class Vehicle {
  constructor(
    public readonly uuid: string,
    public readonly placa: string,
    public readonly chassi: string,
    public readonly renavam: string,
    public readonly modelo: string,
    public readonly marca: string,
    public readonly ano: number,
  ) {}
}
