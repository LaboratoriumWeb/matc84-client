import { User } from "../types/user";
import { api } from "./api";

export const userService = {
  async listUsers(): Promise<User[]> {
    const response = await api.get<User[]>("/users");
    return response.data;
  },

  async deleteUser(userId: string): Promise<void> {
    await api.delete(`/users/${userId}`);
  },
};
