import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";
import useDialogState from "@/hooks/use-dialog-state";
import { User, UserList, UserListSchema } from "../data/schema";
import { getUsers } from "@/lib/api";

type UsersDialogType = "invite" | "add" | "edit" | "delete";

interface UsersContextType {
  open: UsersDialogType | null;
  setOpen: (str: UsersDialogType | null) => void;
  currentRow: User | null;
  setCurrentRow: Dispatch<SetStateAction<User | null>>;
  userList: UserList | [];
  setUserList: Dispatch<SetStateAction<UserList | []>>;
  refetchUsers: () => Promise<void>;
}

const UsersContext = createContext<UsersContextType | null>(null);

interface Props {
  children: ReactNode;
}

export default function UsersProvider({ children }: Props) {
  const [open, setOpen] = useDialogState<UsersDialogType>(null);
  const [currentRow, setCurrentRow] = useState<User | null>(null);
  const [userList, setUserList] = useState<UserList>([]);

  const fetchUsers = async () => {
    const users = await getUsers();
    const validUserList = UserListSchema.parse(users);
    setUserList(validUserList);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const refetchUsers = async () => {
    await fetchUsers();
  };

  return (
    <UsersContext
      value={{
        open,
        setOpen,
        currentRow,
        setCurrentRow,
        userList,
        setUserList,
        refetchUsers,
      }}
    >
      {children}
    </UsersContext>
  );
}

export const useUsers = () => {
  const usersContext = useContext(UsersContext);

  if (!usersContext) {
    throw new Error("useUsers has to be used within <UsersContext>");
  }

  return usersContext;
};
