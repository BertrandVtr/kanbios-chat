import { FormInput } from '../../components/forms/FormInput.tsx';
import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../store/hooks.ts';
import { selectIsAuthenticated, signIn } from '../../store/auth/authSlice.ts';

interface SingInFormData {
  firstName: string,
  lastName: string,
  email: string;
  confirmPassword: string;
  password: string;
}

export const SingInPage = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const isAuthenticated = useAppSelector(selectIsAuthenticated);

  const [formData, setFormData] = useState<SingInFormData>({
    firstName: '',
    lastName: '',
    email: '',
    confirmPassword: '',
    password: '',
  });

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    event.preventDefault();

    const { name, value } = event.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    dispatch(signIn(formData));
  }

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated]);

  return (
    <>
      <div className="max-w-md mx-auto mt-10 bg-white p-8 border border-gray-200 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center mb-6">Inscription</h2>
        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div className="flex gap-4">
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
            </div>
            <FormInput
              name="email"
              id="email"
              label="Email"
              type="email"
              onChange={handleChange}
              value={formData.email}
            />
            <FormInput
              name="password"
              id="password"
              label="Mot de passe"
              type="password"
              onChange={handleChange}
              value={formData.password}
            />
            <FormInput
              name="confirmPassword"
              id="confirmPassword"
              label="Confirmez le mot de passe"
              type="password"
              onChange={handleChange}
              value={formData.confirmPassword}
            />
          </div>
          <p className="text-center">
            <button
              type="submit"
              className="mt-8 w-full py-2 px-4 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 transition-colors"
            >
              S'inscrire
            </button>

            <NavLink to="/logIn" className="mt-4 block text-sm text-blue-500 hover:text-blue-700 hover:underline text-center">
              Vous avez déjà un compte ? Connectez vous
            </NavLink>
          </p>
        </form>
      </div>
    </>
  );
};