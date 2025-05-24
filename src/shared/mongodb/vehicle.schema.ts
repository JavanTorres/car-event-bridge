import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ collection: 'vehicles', timestamps: true })
export class VehicleDocument extends Document {
  @Prop({ required: true })
  uuid: string;

  @Prop({ required: true })
  placa: string;

  @Prop({ required: true })
  chassi: string;

  @Prop({ required: true })
  renavam: string;

  @Prop({ required: true })
  modelo: string;

  @Prop({ required: true })
  marca: string;

  @Prop({ required: true })
  ano: number;
}

export const VehicleSchema = SchemaFactory.createForClass(VehicleDocument);
