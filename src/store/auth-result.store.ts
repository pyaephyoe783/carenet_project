import { AuthResult } from "@/app/anonymous/common"
import { create } from "zustand"
import { persist, createJSONStorage } from "zustand/middleware"

type AuthStoreType = {
  auth?: AuthResult
  setAuth: (auth?: AuthResult) => void
  clearAuth: () => void
}

export const authStore = create(
  persist<AuthStoreType>(
    (set) => ({
      auth: undefined,
      setAuth: (auth) => set({ auth }),
      clearAuth: () => set({ auth: undefined }),
    }),
    {
      name: "com.talent.donationcenter.auth", // clearer key name
      storage: createJSONStorage(() => localStorage),
    }
  )
)

/**
 * Get the current user's email.
 * Throws an error if not authenticated.
 */
export function userEmail(): string {
  const { auth } = authStore.getState()

  if (!auth) {
    throw new Error("You need to login first.")
  }

  return auth.email
}

/**
 * Get the current user's role.
 * Returns undefined if not logged in.
 */
export function userRole(): string | undefined {
  return authStore.getState().auth?.role
}
