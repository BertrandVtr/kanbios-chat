import { ComponentProps } from 'react';

type FormInputProps = ComponentProps<'input'> & {
  label: string,
}

export const FormInput = ({ name, type, id, required, label, onChange, value, ...props }: FormInputProps) => {
  return (
    <div {...props}>
      <label htmlFor={id} className="block text-gray-700 font-semibold mb-2">
        {label}
      </label>
      <input
        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
        id={id}
        type={type}
        name={name}
        required={required}
        onChange={onChange}
        value={value}
      />
    </div>
  );
};