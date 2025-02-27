import Calculation, { ICalculation } from "../models/calculation.model";
import { sum_to_n_a, sum_to_n_b, sum_to_n_c } from "../utils/solution";

export class CalculationService {
    static async createCalculation(number: number, method: string): Promise<ICalculation> {
        let result: number;
        const startTime = new Date();
        let endTime: Date;
        let duration: number;

        switch (method) {
            case "a":
                result = sum_to_n_a(number);
                break;
            case "b":
                result = sum_to_n_b(number);
                break;
            case "c":
                result = sum_to_n_c(number);
                break;
            default:
                throw new Error("Invalid method");
        }

        endTime = new Date();
        duration = endTime.getTime() - startTime.getTime(); // Duration in milliseconds

        const calculation = new Calculation({ number, method, result, startTime, endTime, duration });
        return await calculation.save();
    }

    static async getAllCalculations(): Promise<ICalculation[]> {
        return await Calculation.find();
    }

    static async getCalculationById(id: string): Promise<ICalculation | null> {
        return await Calculation.findById(id);
    }

    static async deleteCalculation(id: string): Promise<ICalculation | null> {
        return await Calculation.findByIdAndDelete(id);
    }
}
