import { NextApiRequest, NextApiResponse } from "next";
import { addTag } from "@/utils/Model";
import { PrismaClient } from "@prisma/client";
import { AddTagsValidation } from "@/utils/Validation";
import Joi from "joi";
import {
  responseError,
  responseSuccess,
  responseSuccessWithoutData,
} from "@/utils/API-Response";
import { StatusCodes } from "http-status-codes";
import { CustomError } from "@/utils/ErrorHandling";
const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    try {
      const {
        error,
        value,
      }: {
        error?: Joi.ValidationError;
        value: addTag;
      } = AddTagsValidation.validate(req.body);
      if (error) {
        responseError(res, false, error);
        return;
      }
      try {
        const isRegisted = await prisma.tag.findUnique({
          where:{
            name: value.name
          }
        })
        if(isRegisted) {
          throw new CustomError(StatusCodes.BAD_REQUEST, "Tag already exists");
        }
        const tag = await prisma.tag.create({
          data: {
            name: value.name,
            color: value.color,
          },
        });
        responseSuccessWithoutData(
          res,
          StatusCodes.OK,
          true,
          "Tags have been added successfully"
        );
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
