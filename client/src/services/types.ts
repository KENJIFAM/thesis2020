// Auth

export interface BaseUser {
  id: string;
  orgType: 'SUPERMARKET' | 'NON-PROFIT' | 'BUSINESS';
  orgName: string;
}

export interface User extends BaseUser {
  email: string;
}

export interface ErrorResponse {
  error: string;
}

export interface LogInFormData {
  email: string;
  password: string;
}

export interface SignUpFormData extends LogInFormData {
  orgType: 'SUPERMARKET' | 'NON-PROFIT' | 'BUSINESS';
  orgName: string;
}

export interface AuthResponse {
  id: string;
  token: string;
}

export interface TokenPayload {
  id: string;
  iat: string;
  exp: string;
}

// Request

export interface RequestBase {
  message: string;
  place: string;
  startTime: string;
  endTime: string;
  foodList: string;
  reqType: 'offer' | 'need';
}

export interface Request extends RequestBase {
  id: string;
  user: BaseUser;
}

export type RequestFormData = RequestBase;
