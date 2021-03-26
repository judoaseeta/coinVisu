export interface AuthError {
    message: string;
    eCode: 103;
}
export interface AuthSuccess {
    token: string;
    id: string;
}