export const ROLE_COLORS: Record<number, string> = {
  1: "bg-purple-100 text-purple-800 border-purple-200",
  2: "bg-orange-100 text-orange-800 border-orange-200",
  3: "bg-blue-100 text-blue-800 border-blue-200",
  4: "bg-green-100 text-green-800 border-green-200",
  5: "bg-indigo-100 text-indigo-800 border-indigo-200"
};

export const USER_FORM_MESSAGES = {
  ADD_SUCCESS: "User added successfully",
  UPDATE_SUCCESS: "User updated successfully",
  DELETE_SUCCESS: "User deleted successfully",
  EMAIL_EXISTS: "A user with this email already exists",
  REQUIRED_FIELDS: "Please fill in all required fields",
  INVALID_EMAIL: "Please enter a valid email address",
  PASSWORD_LENGTH: "Password must be at least 6 characters long",
};


const ROLE_NAME_COLORS: Record<string, string> = {
  "Super Administrator": "bg-purple-100 text-purple-800 border-purple-200",
  "Administrateur": "bg-orange-100 text-orange-800 border-orange-200",
  "ProductOwner": "bg-blue-100 text-blue-800 border-blue-200",
  "ScrumMaster": "bg-green-100 text-green-800 border-green-200",
  "Developer": "bg-indigo-100 text-indigo-800 border-indigo-200",
  "Développeur": "bg-indigo-100 text-indigo-800 border-indigo-200",
  "ChefDeProjet": "bg-blue-100 text-blue-800 border-blue-200",
};

export const getRoleColorByName = (roleName?: string): string => {
  if (!roleName) return "bg-gray-100 text-gray-800 border-gray-200";
  return ROLE_NAME_COLORS[roleName] || "bg-slate-100 text-slate-800 border-slate-200";
};