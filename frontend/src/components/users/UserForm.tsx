import { ChangeEvent, FC, FormEvent, useState } from 'react';
import { User } from '../../types/User.ts';
import { FormInput } from '../forms/FormInput.tsx';
import { EditUserFormData } from '../../types/EditUserFormData.ts';
import { updateUser } from '../../api/UsersApi.ts';

interface UserFormProps {
  user: User;
  onSuccess?: (user?: User) => void;
}

export const UserForm: FC<UserFormProps> = ({ user, onSuccess }) => {
  const [formData, setFormData] = useState<EditUserFormData>({
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
  });

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    event.preventDefault();

    const { name, value } = event.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const newUser = await updateUser(user.id, formData);
    onSuccess?.(newUser);
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="space-y-4">
        <FormInput
          name="lastName"
          id="lastName"
          label="Nom"
          type="text"
          onChange={handleChange}
          value={formData.lastName}
        />
        <FormInput
          name="firstName"
          id="firstName"
          label="Prénom"
          type="text"
          onChange={handleChange}
          value={formData.firstName}
        />
        <FormInput
          name="email"
          id="email"
          label="Email"
          type="email"
          onChange={handleChange}
          value={formData.email}
        />
      </div>
      <p className="text-center">
        <button
          type="submit"
          className="mt-8 w-full py-2 px-4 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 transition-colors"
        >
          Mettre à jour
        </button>
      </p>
    </form>

  );
};