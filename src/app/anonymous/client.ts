import { ApiResponse } from "../dto"
import { anonymousClient } from "../file"
import { handleError } from "../client/errorhandler"
import { AuthResult, AddressResult, SignInForm, SignUpForm } from "./common"
import { authStore } from "@/store/auth-result.store"


export async function signInRequest(form : SignInForm):ApiResponse<AuthResult> {
    const response = await anonymousClient().post('/token/generate', form).catch(handleError)
    return response?.data
}


export async function signUpRequest(form: SignUpForm):ApiResponse<AuthResult> {
    const response = await anonymousClient().post('/signup', form).catch(handleError)
    return response?.data
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

