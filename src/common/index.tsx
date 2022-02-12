import { Control, RegisterOptions, UseFormRegisterReturn } from 'react-hook-form';

export type HookFormComponent = {
  register?: (name: string, options?: RegisterOptions) => UseFormRegisterReturn,
  name: string,
};

export type HookFormControledComponent = {
  control: Control<any>,
  name: string,
};

export type StyledComponentProps = {
  className?: string,
};