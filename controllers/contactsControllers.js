import * as contactsService from "../services/contactsServices.js";

import HttpError from "../helpers/HttpError.js";

export const getAllContacts = async (req, res) => {
  const { id: owner } = req.user;
  const contacts = await contactsService.listContacts({ owner });
  return res.json({
    status: "success",
    code: 200,
    data: contacts,
  });
};

export const getOneContact = async (req, res, next) => {
  const { id } = req.params;
  const { id: owner } = req.user;

  const contact = await contactsService.getContactById({ id, owner });
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
  const { id: owner } = req.user;

  const deletedContact = await contactsService.removeContact({ id, owner });
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
  const { id: owner } = req.user;
  console.log("Owner", owner);

  const newContact = await contactsService.addContact({ ...req.body, owner });

  return res.status(201).json({
    status: "success",
    code: 201,
    data: newContact,
  });
};

export const updateContactData = async (req, res, next) => {
  const { id } = req.params;
  const { id: owner } = req.user;

  const updatedData = req.body;

  const updatedContact = await contactsService.updateContact(
    { id, owner },
    updatedData
  );
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
  const { id: owner } = req.user;

  const body = req.body;
  const contact = await contactsService.getContactById({ id, owner });

  if (!contact) return next(HttpError(404));

  if (contact.favorite === body.favorite) {
    const message = body.favorite
      ? "Contact is already in favorite"
      : "Contact is not in favorite already";
    return next(HttpError(409, message));
  }

  const updatedContact = await contactsService.updateStatusContact(
    { id, owner },
    body
  );
  return res.json({
    status: "success",
    code: 200,
    data: updatedContact,
  });
};
