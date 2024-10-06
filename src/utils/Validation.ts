import Joi from "joi";

export const AddTaskValidation = Joi.object({
  name: Joi.string().required(),
  startTime: Joi.date().required(),
  endTime: Joi.date(),
  details: Joi.string(),
  status: Joi.string(),
  tags: Joi.array().items(Joi.string()),
});

export const UpdateTaskValidation = Joi.object({
  id: Joi.string().required(),
  name: Joi.string(),
  startTime: Joi.date(),
  endTime: Joi.date(),
  details: Joi.string(),
  status: Joi.string(),
  tags: Joi.array().items(Joi.string()),
});

export const AddTagsValidation = Joi.object({
  name: Joi.string().required(),
  color: Joi.string().required(),
})

export const RemoveTagValidation = Joi.string().guid().required();