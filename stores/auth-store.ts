import { create } from "zustand";
import { persist } from "zustand/middleware";
import { User } from "@/types";

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  register: (data: RegisterData) => Promise<boolean>;
  logout: () => void;
}

interface RegisterData {
  name: string;
  email: string;
  phone: string;
  password: string;
}

const mockUser: User = {
  id: 1,
  name: "کاربر شاواز",
  email: "user@shavaz.ir",
  phone: "09121234567",
  avatar: "/category/01.webp",
  address: "تهران، خیابان ولیعصر، پلاک ۱۲۳",
  city: "تهران",
  postalCode: "1234567890",
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      isLoading: false,

      login: async (email: string, _password: string) => {
        set({ isLoading: true });
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1500));
        set({
          user: { ...mockUser, email },
          isAuthenticated: true,
          isLoading: false,
        });
        return true;
      },

      register: async (data: RegisterData) => {
        set({ isLoading: true });
        await new Promise((resolve) => setTimeout(resolve, 1500));
        set({
          user: {
            ...mockUser,
            name: data.name,
            email: data.email,
            phone: data.phone,
          },
          isAuthenticated: true,
          isLoading: false,
        });
        return true;
      },

      logout: () => {
        set({ user: null, isAuthenticated: false });
      },
    }),
    {
      name: "shavaz-auth",
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);
