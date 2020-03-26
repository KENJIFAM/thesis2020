export interface User {
  id: string;
  email: string;
  orgType: 'SUPERMARKET' | 'NON-PROFIT' | 'BUSINESS';
  orgName: string;
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
