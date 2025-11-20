import express from "express";
import * as contactsController from "../controllers/contactsControllers.js";
import validateBody from "../helpers/validateBody.js";
import {
  createContactSchema,
  updateContactSchema,
  updateFavoriteSchema,
} from "../schemas/contactsSchemas.js";
import { authenticate } from "../middlewares/authenticate.js";

const contactsRouter = express.Router();

contactsRouter.use(authenticate);

contactsRouter.get("/", contactsController.getAllContacts);

contactsRouter.get("/:id", contactsController.getOneContact);

contactsRouter.delete("/:id", contactsController.deleteContact);

contactsRouter.post(
  "/",
  validateBody(createContactSchema),
  contactsController.createContact
);

contactsRouter.put(
  "/:id",
  validateBody(updateContactSchema),
  contactsController.updateContactData
);

contactsRouter.patch(
  "/:id/favorite",
  validateBody(updateFavoriteSchema),
  contactsController.updateFavorite
);

export default contactsRouter;
