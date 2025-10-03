export interface SignInForm {
    email : string
    password : string
}

export type SignUpForm = SignInForm & {
    name : string
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