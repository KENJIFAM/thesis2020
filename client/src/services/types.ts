export interface BaseUser {
  id: string;
  orgType: 'SUPERMARKET' | 'NON-PROFIT' | 'BUSINESS';
  orgName: string;
}

export interface User extends BaseUser {
  email: string;
}

export interface Request {
  id: string;
  message: string;
  place: string;
  startTime: string;
  endTime: string;
  foodList: string;
  user: BaseUser;
  reqType: 'offer' | 'need';
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
