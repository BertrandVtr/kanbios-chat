import apiClient from './apiClient.ts';

export async function login(email: string, password: string): Promise<string | null> {
  try {
    const { data: { access_token } } = await apiClient.post('auth/login', { email, password });
    return access_token;
  } catch (e) {
    return null;
  }
}