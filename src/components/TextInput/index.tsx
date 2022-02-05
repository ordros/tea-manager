import * as React from 'react';
import { HookFormComponent } from '~/types';

type Props = HookFormComponent & {}

const TextInput: React.FC<Props> = ({
  register,
  name,
  ...rest
}) => {
  return <input {...register(name)} {...rest} />;
};

export default TextInput;