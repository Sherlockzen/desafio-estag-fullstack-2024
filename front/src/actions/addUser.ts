'use server'

import { revalidateTag } from "next/cache";

interface Value {
  userName: string,
  name: string,
  email: string,
  city: string,
  days: string[],
}

export const addUser = async (value: Value) => {
  const userResp = await fetch(`${process.env.API_URL}/api/v1/users/create`, {
    method: 'POST',
    headers: {
      'accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      'email': value.email,
      'name': value.name,
      'user_name': value.userName,
      'password': 'senha',
    })
  });

  const userId = await userResp.json().then(data => data.user.id);

  await fetch(`${process.env.API_URL}/api/v1/cities/create`, {
    method: 'POST',
    headers: {
      'accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      'user_id': userId,
      'name': value.city,
    })
  });

  function daysResult(data: string[]) {
    if (data.includes('sábado') && data.includes('domingo')) {
      const dataResult = 'fim de semana';
      return dataResult;
    } else if (data.length === 7) {
      const dataResult = 'todos';
      return dataResult;
    }

    const dataResult = data.join(', ')
    return dataResult

  }

  await fetch(`${process.env.API_URL}/api/v1/days/create`, {
    method: 'POST',
    headers: {
      'accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      'user_id': userId,
      'days_week': daysResult(value.days),
    })
  });

  revalidateTag('users')
}