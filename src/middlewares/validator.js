import { validationResult } from "express-validator";

export const aplicarValidaciones =  (req, res, next) => {
const errores = validationResult(req);

if (!errores.isEmpty())
    res.status(400).json({error: errores.array()})

console.log(errores);
next();
}

//manejo de errores