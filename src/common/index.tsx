import { UseFormRegister, UseFormRegisterReturn } from 'react-hook-form';

export type HookFormComponent = {
  register?: (name: string) => UseFormRegisterReturn,
  name: string,
};

export type StyledComponent = {
  className?: string,
};