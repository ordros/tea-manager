import { Control, UseFormRegisterReturn } from 'react-hook-form';

export type HookFormComponent = {
  register?: (name: string) => UseFormRegisterReturn,
  name: string,
};

export type HookFormControledComponent = {
  control: Control<any>,
  name: string,
};

export type StyledComponentProps = {
  className?: string,
};