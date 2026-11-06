const USERS_KEY = "users";
const SESSION_KEY = "userData";
const DEFAULT_USERS = [
    {
        email: "admin@foodstore.com",
        password: "admin",
        role: "admin",
    },
];
export const saveUsers = (users) => {
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
};
export const getUsers = () => {
    const storedUsers = localStorage.getItem(USERS_KEY);
    if (!storedUsers) {
        saveUsers(DEFAULT_USERS);
        return DEFAULT_USERS;
    }
    try {
        const users = JSON.parse(storedUsers);
        return Array.isArray(users) ? users : [];
    }
    catch {
        return [];
    }
};
export const addUser = (user) => {
    saveUsers([...getUsers(), user]);
};
export const saveUser = (user) => {
    localStorage.setItem(SESSION_KEY, JSON.stringify(user));
};
export const getUser = () => {
    const storedUser = localStorage.getItem(SESSION_KEY);
    if (!storedUser)
        return null;
    try {
        const user = JSON.parse(storedUser);
        return user && typeof user === "object" ? user : null;
    }
    catch {
        return null;
    }
};
export const getAuthenticatedUser = () => {
    const sessionUser = getUser();
    if (!sessionUser) {
        return null;
    }
    return (getUsers().find((user) => user.email === sessionUser.email &&
        user.password === sessionUser.password) ?? null);
};
export const removeUser = () => {
    localStorage.removeItem(SESSION_KEY);
};
