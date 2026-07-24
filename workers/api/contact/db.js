import { PrismaClient } from '../../generated/prisma/index.js';
import { withAccelerate } from '@prisma/extension-accelerate';

let client;

export function getDatabase(env) {
  if (!client) {
    client = new PrismaClient({
      datasources: { db: { url: env.DATABASE_URL } }
    }).$extends(withAccelerate());
  }
  return client;
}

export async function createContact(contact, env) {
  return getDatabase(env).contact.create({ data: contact });
}
