import { handleError } from "@/app/client/errorhandler"
import { anonymousClient, securedClient } from "@/app/file"
import { CategoryResult } from "../common"

export async function getAllCategories(): Promise<CategoryResult[]> {
  try {
    const response = await securedClient().get('/member/category');
    console.log("Response from getAllCategories:", response.data);
    return response.data ?? []; // always return array
  } catch (error) {
    handleError(error as any);
    return []; // ✅ error ဖြစ်ရင် empty array return
  }
}


// export async function getAllRegions():Promise<AddressResult[]> {
//     const response = await anonymousClient().get('/address/regions').catch(handleError)
//     return response?.data
// }