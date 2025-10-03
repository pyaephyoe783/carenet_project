import { AuthResult } from "@/app/anonymous/common"
import { create } from "zustand"
import { createJSONStorage, persist } from "zustand/middleware"

type AuthStoreType = {
    auth? : AuthResult
    setAuth : (auth? : AuthResult) => void
    logout: () => void
    isAuthenticated: boolean
}

export const authStore = create(persist<AuthStoreType>(
   (set) => ({
        auth: undefined,
        setAuth: (auth) => set({auth: auth}),
        logout: () => set({auth: undefined}),
        isAuthenticated: false
   }),
   {
     name: 'com.jdc.balance.user',
     storage: createJSONStorage(() => sessionStorage),
     onRehydrateStorage: () => (state) => {
        if(state?.auth) {
            state.isAuthenticated = true
        }
     }
   }
))

export function userName() {
  const auth = authStore.getState().auth as AuthResult | undefined

  if(!auth) {
    throw Error("You need to login")
  }

  return auth.email
}