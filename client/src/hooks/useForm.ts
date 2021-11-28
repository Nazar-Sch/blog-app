import { ChangeEvent, FormEvent, useState } from 'react';

interface Validation {
  required?: {
    value: boolean;
    message: string;
  };
  pattern?: {
    value: string;
    message: string;
  };
  custom?: {
    isValid: (value: string) => boolean;
    message: string;
  };
}

type Validations<T extends {}> = Partial<Record<keyof T, Validation>>;

type ErrorRecord<T> = Partial<Record<keyof T, string>>;

export const useForm = <T extends Record<keyof T, any> = {}>(options?: {
  validations?: Validations<T>;
  initialValues?: Partial<T>;
  onSubmit?: () => void;
}) => {
  const [values, setValues] = useState<T>(
    (options?.initialValues || {}) as T
  );
  const [errors, setErrors] = useState<ErrorRecord<T>>({});

  const handleChange =
    (key: keyof T) =>
    (e: ChangeEvent<HTMLInputElement & HTMLSelectElement>) => {
      const { value } = e.target;
      setValues({
        ...values,
        [key]: value,
      });
    };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const validations = options?.validations;
    if (validations) {
      let valid = true;
      const newErrors: any = {};

      for (const key in validations) {
        const value = values[key];

        const validation = validations[key];
        if (validation?.required?.value && !value) {
          valid = false;
          newErrors[key] = validation?.required?.message;
        }

        const pattern = validation?.pattern;
        if (pattern?.value && !RegExp(pattern.value).test(value)) {
          valid = false;
          newErrors[key] = pattern.message;
        }

        const custom = validation?.custom;
        if (custom?.isValid && !custom.isValid(value)) {
          valid = false;
          newErrors[key] = custom.message;
        }
      }

      if (!valid) {
        setErrors(newErrors);
        return;
      }
    }

    setErrors({});

    if (options?.onSubmit) {
      options.onSubmit();
      if (options?.initialValues) {
        setValues({ ...values, ...options.initialValues });
      }
    }
  };

  return {
    values,
    handleChange,
    handleSubmit,
    errors,
  };
};
