import Joi from "joi";

export const AddTaskValidation = Joi.object({
  name: Joi.string().required(),
  startTime: Joi.date().required(),
  endTime: Joi.date(),
  details: Joi.string(),
  status: Joi.string(),
  tags: Joi.array().items(Joi.string()),
})