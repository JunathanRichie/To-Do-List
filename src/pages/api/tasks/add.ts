import { NextApiRequest, NextApiResponse } from "next";
import { addTask } from "@/utils/Model";
import { PrismaClient } from "@prisma/client";
import { AddTaskValidation } from "@/utils/Validation";
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
        value: addTask;
      } = AddTaskValidation.validate(req.body);
      if (error) {
        responseError(res, false, error);
        return;
      }
      try {
        for (const tagName of value.tags) {
          const tag = await prisma.tag.findFirst({
            where: {
              name: tagName
            },
          });
          if(!tag) {
            throw new CustomError(StatusCodes.NOT_FOUND, "Tag not found");  
          }
          const task = await prisma.task.create({
            data: {
              name: value.name,
              startTime: new Date(value.startTime),
              endTime: new Date(value.endTime),
              details: value.details,
              status: value.status,
            },
          });
          await prisma.taskTag.create({
            data: {
              task: {
                connect: { id: task.id },
              },
              tag: {
                connect: {
                  id: tag?.id
                },
              },
            },
          });
        }

        responseSuccessWithoutData(
          res,
          StatusCodes.OK,
          true,
          "Tasks have been added successfully"
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
