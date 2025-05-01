"use client";

import UsersProvider from "@/features/users/context/users-context";
import UserList from "./userList";

export default function Users() {
  return (
    <UsersProvider>
      <UserList />
    </UsersProvider>
  );
}
