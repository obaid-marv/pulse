export interface LoginResponse{
    success: boolean,
    message: string,
    token: string,
    isVerified: boolean
}

export interface basicResponse {
    success: boolean,
    message: string,
}

export interface User{
    id: number,
    username: string,
    email: string,
    name: string,
    isVerified: boolean
}


export interface allUsersResponse{
    success: boolean,
    users: User[]
}

export interface SignupResponse{
    success: boolean,
    message: string,
    token: string,
    user: {id: number, email: string }
}

export interface MyDetailsResponse{
    success: boolean,
    user: User
}


export interface ApiError {
    message: string;
    statusCode: number;
    details?: string;
}
  