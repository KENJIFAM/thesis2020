import { useState } from 'react';

export interface FormFieldProps<T> {
  value: T;
  error: string;
  handleChange: (value: T) => void;
  setError: (error: string) => void;
}

const useFormField = <T>(initialValue: T): FormFieldProps<T> => {
  const [value, setValue] = useState<T>(initialValue);
  const [error, setError] = useState<string>('');

  return {
    value,
    error,
    handleChange: setValue,
    setError,
  };
};

export default useFormField;
