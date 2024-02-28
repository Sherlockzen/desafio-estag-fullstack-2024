
interface Users {
  users: User[]
}

interface User {
  created_at: string,
  email: string,
  id: string,
  name: string,
  user_name: string,
  updated_at: string
}

interface Post {
  id: string,
  user_id: string,
  content: string,
  created_at: string,
  updated_at: string,
}


interface Album {
  created_at: string,
  description: string,
  id: string,
  title: string,
  updated_at: string
}

interface UserWithPosts {
  id: string,
  userName: string;
  name: string;
  email: string;
  posts: number;
  albums: number;
  days: string;
  city: string;
}

interface City {
  id: string,
  name: string,
  userId: string,
  createdAt: string,
  updatedAt: string,
}

interface Day {
  id: string,
  days_week: string,
  userId: string,
  createdAt: string,
  updatedAt: string,
}

export const getUsers = async (): Promise<Users> => {
  const resp = await fetch(`${process.env.API_URL!}/api/v1/users`, { next: { tags: ['users'] } });

  return resp.json();
}

export const getUsersPosts = async (currentPage: number = 1, pageSize: number = 5) => {
  const users = await getUsers();
  const usersData = users.users;

  const usersWithPosts: UserWithPosts[] = [];

  for (const user of usersData) {
    const userId: string = user.id;

    const postsResp = await fetch(`${process.env.API_URL!}/api/v1/users/${userId}/posts`);
    const postsData: { posts: Post[] } = await postsResp.json();


    const albumsResp = await fetch(`${process.env.API_URL!}/api/v1/users/${userId}/albums`);
    const albumsData: { albums: Album[] } = await albumsResp.json();

    const citiesResp = await fetch(`${process.env.API_URL!}/api/v1/users/${userId}/cities`);
    const citiesData: City = await citiesResp.json().then(value => value.city[0]);

    const daysResp = await fetch(`${process.env.API_URL!}/api/v1/users/${userId}/days`);
    const daysData: Day = await daysResp.json().then(value => value.day[0]);



    usersWithPosts.push({
      id: user.id,
      userName: user.user_name,
      name: user.name,
      email: user.email,
      posts: postsData.posts?.length ?? 0,
      albums: albumsData.albums?.length ?? 0,
      days: daysData.days_week,
      city: citiesData.name,
    })
  }


  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;

  const paginatedData = usersWithPosts.slice(startIndex, endIndex);
  const totalItems = usersWithPosts.length;
  const totalPages = Math.ceil(totalItems / pageSize);

  return {
    data: usersWithPosts,
    totalItems,
    totalPages,
  }

  // return usersWithPosts;
}