import { FormInput } from '../../components/forms/FormInput.tsx';
import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../store/hooks.ts';
import { login, selectIsAuthenticated } from '../../store/auth/authSlice.ts';
import { LogInFormData } from '../../types/LogInFormData.ts';

export const LogInPage = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const isAuthenticated = useAppSelector(selectIsAuthenticated);

  const [formData, setFormData] = useState<LogInFormData>({
    email: '',
    password: '',
  });

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    dispatch(login(formData));
  }

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated]);

  return (
    <>
      <div className="max-w-md mx-auto mt-10 bg-white p-8 border border-gray-200 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center mb-6">Connexion</h2>
        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
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
          </div>

          <p className="text-center">
            <button
              type="submit"
              className="mt-8 w-full py-2 px-4 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 transition-colors"
            >
              S'inscrire
            </button>

            <NavLink className="mt-4 block text-sm text-blue-500 hover:text-blue-700 hover:underline text-center" to="/signIn">
              Vous n'avez pas de compte ? Créez-en un
            </NavLink>
          </p>
        </form>
      </div>
    </>
  );
};