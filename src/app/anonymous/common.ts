export interface SignInForm {
    email : string
    password : string
}

export type SignUpForm = {
    email : string,
    password : string,
    name : string,
    phone : string,
    address : string,
    township : number
}

export interface AuthResult {
    email : string
    name : string
    role : 'Admin' | 'Member' | 'BranchAdmin'
    accessToken : string
    refreshToken : string
}

export interface AddressResult {
    id : number
    name : string
}

export interface CategoryResult {
    id : number
    name : string
    description : string    
}