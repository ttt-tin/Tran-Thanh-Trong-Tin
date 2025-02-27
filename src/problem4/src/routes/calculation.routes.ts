import { Router } from "express";
import { CalculationService } from "../services/calculation.service";

const router = Router();

router.post("/", async (req, res) => {
    try {
        const { number, method } = req.body;
        const calculation = await CalculationService.createCalculation(number, method);
        res.status(201).json(calculation);
    } catch (error) {
        const errMessage = error instanceof Error ? error.message : "An unknown error occurred";
        res.status(400).json({ error: errMessage });
    }
});

router.get("/", async (_, res) => {
    const calculations = await CalculationService.getAllCalculations();
    res.json(calculations);
});

router.get("/:id", async (req, res) => {
    const calculation = await CalculationService.getCalculationById(req.params.id);
    if (calculation) res.json(calculation);
    else res.status(404).json({ error: "Calculation not found" });
});

router.delete("/:id", async (req, res) => {
    const deleted = await CalculationService.deleteCalculation(req.params.id);
    if (deleted) res.json({ message: "Deleted successfully" });
    else res.status(404).json({ error: "Calculation not found" });
});

export default router;
