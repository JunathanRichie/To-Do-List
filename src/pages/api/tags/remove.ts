import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
import { RemoveTagValidation } from "@/utils/Validation";
import Joi from "joi";
import {
  responseError,
  responseSuccess,
} from "@/utils/API-Response";
import { StatusCodes } from "http-status-codes";
const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "DELETE") {
    try {
      const {
        error,
        value,
      }: {
        error?: Joi.ValidationError;
        value: string;
      } = RemoveTagValidation.validate(req.body.id);      
      if (error) {
        responseError(res, false, error);
        return;
      }
      try {
        const tag = await prisma.tag.delete({
          where: {
            id: value,
          },
        })
        responseSuccess(res, StatusCodes.OK, true, "Tag has been removed successfully", tag);
      } catch (error) {
        responseError(res, false, error);
      }
    } catch (error) {
      responseError(res, false, error);
    }
  } else {
    res.status(405).json({ message: "Method Not Allowed" });
  }
}
