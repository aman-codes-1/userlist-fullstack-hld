import { User, UserList } from "@/features/users/data/schema";

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL!;

export async function getUsers(): Promise<UserList> {
  const res = await fetch(`${BASE_URL}/users`);
  
  if (!res.ok) throw new Error("Failed to fetch users");
  return res.json();
}

export async function getUserById(id: string): Promise<User> {
  const res = await fetch(`${BASE_URL}/user/${id}`);
  if (!res.ok) throw new Error(`Failed to fetch user ${id}`);
  return res.json();
}

export async function createUser(data: Partial<User>): Promise<User> {
  const res = await fetch(`${BASE_URL}/user`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    const errorBody = await res.json().catch(() => null);
    const errorMessage = errorBody?.message || "Failed to create user";
    throw new Error(errorMessage);
  }
  return res.json();
}
