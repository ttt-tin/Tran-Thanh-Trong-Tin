import mongoose, { Schema, Document } from "mongoose";

export interface ICalculation extends Document {
    number: number;
    method: string;
    result: number;
    startTime: Date;
    endTime: Date;
    duration: number;
}

const CalculationSchema: Schema = new Schema({
    number: { type: Number, required: true },
    method: { type: String, enum: ["a", "b", "c"], required: true },
    result: { type: Number, required: true },
    startTime: { type: Date, required: true },
    endTime: { type: Date, required: true },
    duration: { type: Number, required: true }
});

export default mongoose.model<ICalculation>("Calculation", CalculationSchema);