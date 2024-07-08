//return the role of the user
export function roleUser(req) {
  const role = req.payload.role;
  return role;
}
