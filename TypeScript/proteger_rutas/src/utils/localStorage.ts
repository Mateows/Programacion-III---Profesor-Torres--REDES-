import type { IUser } from "../types/IUser";

const USERS_KEY = "users";
const SESSION_KEY = "userData";

const DEFAULT_USERS: IUser[] = [
  {
    email: "admin@foodstore.com",
    password: "admin",
    role: "admin",
  },
];

export const saveUsers = (users: IUser[]): void => {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
};

export const getUsers = (): IUser[] => {
  const storedUsers = localStorage.getItem(USERS_KEY);
  if (!storedUsers) {
    saveUsers(DEFAULT_USERS);
    return DEFAULT_USERS;
  }

  try {
    const users: unknown = JSON.parse(storedUsers);
    return Array.isArray(users) ? (users as IUser[]) : [];
  } catch {
    return [];
  }
};

export const addUser = (user: IUser): void => {
  saveUsers([...getUsers(), user]);
};

export const saveUser = (user: IUser): void => {
  localStorage.setItem(SESSION_KEY, JSON.stringify(user));
};

export const getUser = (): IUser | null => {
  const storedUser = localStorage.getItem(SESSION_KEY);
  if (!storedUser) return null;

  try {
    const user: unknown = JSON.parse(storedUser);
    return user && typeof user === "object" ? (user as IUser) : null;
  } catch {
    return null;
  }
};

export const getAuthenticatedUser = (): IUser | null => {
  const sessionUser = getUser();

  if (!sessionUser) {
    return null;
  }

  return (
    getUsers().find(
      (user) =>
        user.email === sessionUser.email &&
        user.password === sessionUser.password
    ) ?? null
  );
};

export const removeUser = (): void => {
  localStorage.removeItem(SESSION_KEY);
};
