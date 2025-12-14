import { useState, useMemo } from "react";
import { User } from "@/types/users";

export const useUserFilters = (users: User[]) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");

  const filteredUsers = useMemo(() => {
    let result = [...users];

    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter(
        (user) =>
          user.firstName.toLowerCase().includes(term) ||
          user.lastName.toLowerCase().includes(term) ||
          user.email.toLowerCase().includes(term)
      );
    }

    if (roleFilter !== "all") {
      if (roleFilter === "unassigned") {
        result = result.filter((user) => !user.roleName);
      } else {
        result = result.filter((user) => user.roleName === roleFilter);
      }
    }

    return result;
  }, [users, searchTerm, roleFilter]);

  return {
    searchTerm,
    setSearchTerm,
    roleFilter,
    setRoleFilter,
    filteredUsers,
  };
};