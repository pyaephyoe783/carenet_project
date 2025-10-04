import { ApiResponse } from "../dto"
// import { anonymousClient } from "../file"
import { handleError } from "../client/errorhandler"
import { AuthResult, AddressResult, SignInForm, SignUpForm } from "./common"
import { authStore } from "@/store/auth-result.store"
import { anonymousClient, securedClient } from "../file"


export async function signInRequest(form : SignInForm):ApiResponse<AuthResult> {
    const response = await anonymousClient().post('/token/generate', form).catch(handleError)
    return response?.data
}


export async function signUpRequest(form: SignUpForm, profileImage?: File | null) {
    const formData = new FormData();
    formData.append("form", new Blob([JSON.stringify(form)], { type: "application/json" }));
  if (profileImage) formData.append("profileImage", profileImage);
    const response = await anonymousClient().post('/signup', formData).catch(handleError)
  return response;
}

export async function refreshToken(token: string):ApiResponse<AuthResult> {
    const response = await anonymousClient().post('/token/refresh', {token : token}).catch(handleError)
    return response?.data
}


export async function getAllRegions():Promise<AddressResult[]> {
    const response = await anonymousClient().get('/address/regions').catch(handleError)
    return response?.data
}

export async function getADistrictsByRegion(regionId: number):Promise<AddressResult[]> {
    const response = await anonymousClient().get(`/address/districts/${regionId}`).catch(handleError)
    return response?.data
}

export async function getTownshipsByDistrict(districtId: number):Promise<AddressResult[]> {
    const response = await anonymousClient().get(`/address/townships/${districtId}`).catch(handleError)
    return response?.data
}


export async function createCampaign(formData: FormData) {
    const client = securedClient();
    const response = await client.post("/member/campaign", formData, {
        headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data; // returns { data: <campaignId> }
}