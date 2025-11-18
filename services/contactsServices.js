import { Contact } from "../db/models/ContactModel.js";

async function listContacts() {
  try {
    const contacts = await Contact.findAll();
    return contacts;
  } catch (error) {
    console.error("Error fetching contacts: ", error);
    throw error;
  }
}

async function getContactById(contactId) {
  try {
    const contact = await Contact.findByPk(contactId);
    return contact;
  } catch (error) {
    console.error("Error fetching contact: ", error);
    throw error;
  }
}

async function removeContact(contactId) {
  try {
    const contact = await Contact.findByPk(contactId);
    if (!contact) return null;

    await contact.destroy();
    return contact;
  } catch (error) {
    console.error("Error removing contact: ", error);
    throw error;
  }
}

async function addContact(name, email, phone, favorite = false) {
  try {
    const newContact = await Contact.create({ name, email, phone, favorite });

    return newContact;
  } catch (error) {
    console.error("Error adding contact: ", error);
    throw error;
  }
}

async function updateContact(contactId, data) {
  try {
    const contact = await Contact.findByPk(contactId);
    if (!contact) return null;

    await contact.update(data);
    return contact;
  } catch (error) {
    console.error("Error updating contact: ", error);
    throw error;
  }
}

async function updateStatusContact(contactId, body) {
  try {
    const contact = await Contact.findByPk(contactId);
    if (!contact) return null;

    contact.favorite = body.favorite;
    await contact.save();
    return contact;
  } catch (error) {
    console.error("Error updating favorite status: ", error);
    throw error;
  }
}

export {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
  updateStatusContact,
};
