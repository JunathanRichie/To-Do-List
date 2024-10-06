import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
import {
  responseError,
  responseSuccess,
  responseSuccessWithoutData,
} from "@/utils/API-Response";
import { StatusCodes } from "http-status-codes";
const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    try {
      const tags = await prisma.tag.findMany();
      responseSuccess(res, StatusCodes.OK, true, "Tags have been fetched successfully", tags);
    } catch (error) {
      responseError(res, false, error);
    }
  } else {
    res.status(405).json({ message: "Method Not Allowed" });
  }
}
