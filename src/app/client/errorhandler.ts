import { clientErrorStore } from "@/store/client-error.store";
import type { AxiosError } from "axios";

export function handleError(error:AxiosError) {
    clientErrorStore.getState().setError(error)
}