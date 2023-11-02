import { Router, json } from "express";
import validatorBuilder from "../middlewares/validatorBuilder.js";
import { changeUserBalance } from "../services/user-service.js";
import zod from "zod";

const BalanceSchema = zod.object({
  userId: zod.string().uuid(),
  amount: zod.number().int().finite().safe(),
});

const router = Router();

router.post(
  "/change_balance",
  json(),
  validatorBuilder(BalanceSchema),
  async (req, res) => {
    const result = await changeUserBalance(req.app.get("connection"), req.body);

    res
      .status(result.status ? 200 : 400)
      .setHeader("content-type", "application/json")
      .send(result);
  },
);

export default router;
