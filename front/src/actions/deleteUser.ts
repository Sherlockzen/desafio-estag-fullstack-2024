'use server'

import { User } from "@/components/usersTable/columns"
import { revalidateTag } from "next/cache";

export async function deleteUser(user: string) {
  const deleted = await fetch(`${process.env.API_URL}/api/v1/users/${user}`, {
    method: 'DELETE',
    headers: {
      'accept': 'application/json'
    },

  })
  revalidateTag('users')
  return deleted.json();
}