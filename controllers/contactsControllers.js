import {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
  updateStatusContact,
} from "../services/contactsServices.js";

import HttpError from "../helpers/HttpError.js";

export const getAllContacts = async (req, res) => {
  const contacts = await listContacts();
  return res.json({
    status: "success",
    code: 200,
    data: contacts,
  });
};

export const getOneContact = async (req, res, next) => {
  const { id } = req.params;
  const contact = await getContactById(id);
  if (!contact) {
    return next(HttpError(404));
  }

  return res.json({
    status: "success",
    code: 200,
    data: contact,
  });
};

export const deleteContact = async (req, res, next) => {
  const { id } = req.params;
  const deletedContact = await removeContact(id);
  if (!deletedContact) {
    return next(HttpError(404));
  }

  return res.json({
    status: "success",
    code: 200,
    data: deletedContact,
  });
};

export const createContact = async (req, res) => {
  const { name, email, phone, favorite } = req.body;
  const newContact = await addContact(name, email, phone, favorite);

  return res.status(201).json({
    status: "success",
    code: 201,
    data: newContact,
  });
};

export const updateContactData = async (req, res, next) => {
  const { id } = req.params;
  const updatedData = req.body;

  const updatedContact = await updateContact(id, updatedData);
  if (!updatedContact) {
    return next(HttpError(404));
  }

  return res.json({
    status: "success",
    code: 200,
    data: updatedContact,
  });
};

export const updateFavorite = async (req, res, next) => {
  const { id } = req.params;
  const body = req.body;
  const contact = await getContactById(id);

  if (!contact) return next(HttpError(404));

  if (contact.favorite === body.favorite) {
    const message = body.favorite
      ? "Contact is already in favorite"
      : "Contact is not in favorite already";
    return next(HttpError(409, message));
  }

  const updatedContact = await updateStatusContact(id, body);
  return res.json({
    status: "success",
    code: 200,
    data: updatedContact,
  });
};
