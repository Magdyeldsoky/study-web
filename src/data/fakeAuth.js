const USERS_KEY = "fake_users";
const CURRENT_USER_KEY = "current_user";

const getUsers = () => {
    return JSON.parse(localStorage.getItem(USERS_KEY)) || [];
};

const saveUsers = (users) => {
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
};

export const registerUser = (user) => {
    const users = getUsers();

    const exists = users.find(
        (u) => u.email === user.email || u.username === user.username
    );

    if (exists) {
        return { success: false, message: "User already exists" };
    }

    users.push(user);
    saveUsers(users);

    console.log("✅ Users after register:", users);

    return { success: true };
};

export const loginUser = ({ identifier, password }) => {
    const users = getUsers();

    console.log("🧠 Stored users:", users);
    console.log("✍️ Login attempt:", identifier, password);

    const user = users.find(
        (u) =>
            (u.email === identifier || u.username === identifier) &&
            u.password === password
    );

    if (!user) {
        return { success: false, message: "This account does not exist" };
    }

    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));

    return { success: true, user };
};

export const logout = () => {
    localStorage.removeItem(CURRENT_USER_KEY);
};

export const getCurrentUser = () => {
    return JSON.parse(localStorage.getItem(CURRENT_USER_KEY)) || null;
};

export const updateUser = (updatedUser) => {
    const users = getUsers();

    const index = users.findIndex((u) => u.username === updatedUser.username);

    if (index === -1) {
        console.error("❌ User not found for update");
        return { success: false, message: "User not found" };
    }

    users[index] = updatedUser;
    saveUsers(users);

    const currentUser = getCurrentUser();
    if (currentUser && currentUser.username === updatedUser.username) {
        localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(updatedUser));
    }

    console.log("✅ User updated:", updatedUser);
    return { success: true };
};
