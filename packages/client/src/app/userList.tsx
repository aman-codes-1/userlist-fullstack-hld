"use client";

import { useContext } from "react";
import { Header } from "@/components/layout/header";
import { Main } from "@/components/layout/main";
import { ThemeSwitch } from "@/components/theme-switch";
import { columns } from "@/features/users/components/users-columns";
import { UsersDialogs } from "@/features/users/components/users-dialogs";
import { UsersPrimaryButtons } from "@/features/users/components/users-primary-buttons";
import { UsersTable } from "@/features/users/components/users-table";
import { useUsers } from "@/features/users/context/users-context";

export default function UserList() {
  const { userList } = useUsers();

  return (
    <>
      <Header fixed>
        <div className="ml-auto flex items-center space-x-4">
          <ThemeSwitch />
        </div>
      </Header>
      <Main>
        <div className="mb-2 flex flex-wrap items-center justify-between space-y-2">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">User List</h2>
            <p className="text-muted-foreground">
              Manage your users and their roles here.
            </p>
          </div>
          <UsersPrimaryButtons />
        </div>
        <div className="-mx-4 flex-1 overflow-auto px-4 py-1 lg:flex-row lg:space-y-0 lg:space-x-12">
          <UsersTable data={userList} columns={columns} />
        </div>
      </Main>
      <UsersDialogs />
    </>
  );
}
