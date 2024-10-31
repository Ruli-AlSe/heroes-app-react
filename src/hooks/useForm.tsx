import { useState } from 'react';

interface FormData {
  [key: string]: string | number | readonly string[] | undefined;
}

export const useForm = (initialForm: FormData = {}) => {
  const [formState, setFormState] = useState(initialForm);

  const onInputChange = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = target;

    setFormState({ ...formState, [name]: value });
  };

  const onResetForm = () => {
    setFormState(initialForm);
  };

  return {
    formState,
    onInputChange,
    onResetForm,
  };
};
