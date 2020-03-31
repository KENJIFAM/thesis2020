import type { FormFieldProps } from '../hooks/useFormField';
import type { Moment } from 'moment';

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

export interface AuthResponse {
  id: string;
  token: string;
}

export interface TokenPayload {
  id: string;
  iat: string;
  exp: string;
}

export interface LogInFormData {
  email: string;
  password: string;
}

export interface SignUpFormData extends LogInFormData {
  orgType: 'SUPERMARKET' | 'NON-PROFIT' | 'BUSINESS';
  orgName: string;
}

export type LogInField = 'email' | 'password';

export type SignUpField = LogInField | 'orgType' | 'orgName';

export type AuthForm =
  | { [key in LogInField]: FormFieldProps<string> }
  | { [key in SignUpField]: FormFieldProps<string> };

export type AuthFormData = LogInFormData | SignUpFormData;

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

export interface RequestForm {
  message: FormFieldProps<string>;
  place: FormFieldProps<string>;
  startTime: FormFieldProps<Moment | null>;
  endTime: FormFieldProps<Moment | null>;
  foodList: FormFieldProps<string>;
}

export type RequestFormData = RequestBase;
