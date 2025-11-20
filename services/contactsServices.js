import { Contact } from "../db/models/ContactModel.js";

export const listContacts = async ({ owner, limit, offset, favorite }) => {
  try {
    const whereClause = { owner };
    if (favorite !== undefined) {
      if (favorite === "true") whereClause.favorite = true;
      else if (favorite === "false") whereClause.favorite = false;
    }

    const contacts = await Contact.findAll({
      where: whereClause,
      limit,
      offset,
    });

    return contacts;
  } catch (error) {
    console.error("Error fetching contacts: ", error);
    throw error;
  }
};

export const getContactById = async (query) => {
  try {
    const contact = await Contact.findOne({ where: query });
    return contact;
  } catch (error) {
    console.error("Error fetching contact: ", error);
    throw error;
  }
};

export const removeContact = async (query) => {
  try {
    const contact = await Contact.findOne({ where: query });
    if (!contact) return null;

    await contact.destroy();
    return contact;
  } catch (error) {
    console.error("Error removing contact: ", error);
    throw error;
  }
};

export const addContact = async (payload) => {
  try {
    const newContact = await Contact.create(payload);

    return newContact;
  } catch (error) {
    console.error("Error adding contact: ", error);
    throw error;
  }
};

export const updateContact = async (query, data) => {
  try {
    const contact = await getContactById(query);
    if (!contact) return null;

    await contact.update(data);
    return contact;
  } catch (error) {
    console.error("Error updating contact: ", error);
    throw error;
  }
};

export const updateStatusContact = async (query, body) => {
  try {
    const contact = await getContactById(query);
    if (!contact) return null;

    contact.favorite = body.favorite;
    await contact.save();
    return contact;
  } catch (error) {
    console.error("Error updating favorite status: ", error);
    throw error;
  }
};
