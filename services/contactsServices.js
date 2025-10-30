import fs from "fs/promises";
import path from "path";
import { randomUUID } from "crypto";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const contactsPath = path.join(__dirname, "../db/contacts.json");

async function listContacts() {
  try {
    const contactsData = await fs.readFile(contactsPath, "utf-8");

    return JSON.parse(contactsData);
  } catch (error) {
    console.error("Error reading file:", error);
  }
}

async function getContactById(contactId) {
  try {
    const contactsData = await fs.readFile(contactsPath, "utf-8");
    const contacts = JSON.parse(contactsData);

    return contacts.find((contact) => contact.id === contactId) || null;
  } catch (error) {
    console.error("Error reading file:", error);
  }
}

async function removeContact(contactId) {
  try {
    const contactsData = await fs.readFile(contactsPath, "utf-8");
    const contacts = JSON.parse(contactsData);
    const contactToDeleteIdx = contacts.findIndex(
      (contact) => contact.id === contactId
    );
    if (contactToDeleteIdx === -1) return null;

    const deletedContact = contacts[contactToDeleteIdx];
    const updatedContacts = contacts.filter(
      (contact) => contact.id !== contactId
    );
    await fs.writeFile(contactsPath, JSON.stringify(updatedContacts, null, 2));

    return deletedContact;
  } catch (error) {
    console.error("Error reading file:", error);
  }
}

async function addContact(name, email, phone) {
  try {
    const newContact = {
      id: randomUUID(),
      name,
      email,
      phone,
    };
    const contactsData = await fs.readFile(contactsPath, "utf-8");
    const contacts = JSON.parse(contactsData);
    contacts.push(newContact);
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));

    return newContact;
  } catch (error) {
    console.error("Error adding contact:", error);
  }
}

async function renewContact(id, data) {
  try {
    const contactsData = await fs.readFile(contactsPath, "utf-8");
    const contacts = JSON.parse(contactsData);
    const contactIndex = contacts.findIndex((contact) => contact.id === id);
    if (contactIndex === -1) return null;

    contacts[contactIndex] = { ...contacts[contactIndex], ...data };
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));

    return contacts[contactIndex];
  } catch (error) {
    console.error("Error updating contact:", error);
  }
}

export {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  renewContact,
};
