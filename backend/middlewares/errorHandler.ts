import { Request, Response, NextFunction } from "express";

export const errorHandler = async (error: any, req: Request, res: Response, next: NextFunction) => {
    if(error.message === "Bad request") {
        res.json({message: "Bad request, something went wrong" })
    } else {
        res.status(500).json({ message: `Internal server error ${process.env.ENVIORMENT === "dev" ? " - from error handler" : ""}` })

    }
    
}