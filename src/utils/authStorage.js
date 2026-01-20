// Get all registered users
export function getUsers() {
  return JSON.parse(localStorage.getItem("users") || "[]");
}

// Save users list
export function saveUsers(users) {
  localStorage.setItem("users", JSON.stringify(users));
}

// Find user by username or email
export function findUser(identifier) {
  const users = getUsers();
  return users.find(
    (u) => u.username === identifier || u.email === identifier
  );
}
