import { User } from '../types/User.ts';
import { Paginated } from '../types/Paginated.ts';
import apiClient from './apiClient.ts';
import { EditUserFormData } from '../types/EditUserFormData.ts';

export async function getUsers(page: number = 1, limit: number = 20): Promise<Paginated<User>> {
  const { data } = await apiClient.get<Paginated<User>>('/users', { params: { page, limit } });

  return data;
}

export async function getUser(id: number): Promise<User | null> {
  const { data } = await apiClient.get<User>(`users/${id}`);

  return data;
}

export async function updateUser(id:number, formData: EditUserFormData) {
  const { data } = await apiClient.patch(`users/${id}`, formData);

  return data;
}