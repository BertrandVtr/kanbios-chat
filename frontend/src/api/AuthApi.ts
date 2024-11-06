import apiClient from './apiClient.ts';
import { SingInFormData } from '../types/SingInFormData.ts';

export async function login(email: string, password: string): Promise<string | null> {
  try {
    const { data: { access_token } } = await apiClient.post('auth/login', { email, password });
    return access_token;
  } catch {
    return null;
  }
}

export async function signIn(formData: SingInFormData): Promise<string | null> {
  try {
    const { data: { access_token } } = await apiClient.post('auth/register', formData);
    return access_token;
  } catch {
    return null;
  }
}

export async function verifyToken(): Promise<boolean> {
  try {
    await apiClient.get('auth/validate-token');
    return true;
  } catch {
    return false;
  }
}