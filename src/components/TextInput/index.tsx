import * as React from 'react';
import { HookFormComponent } from '~/common';
import styled from 'styled-components';

type Props = HookFormComponent & {}

const StyledInput = styled.input`
  font-size: 16px;
  border: 2px solid transparent;
  border-radius: 4px;
  background: transparent;
  padding: 4px;
  /* mix-blend-mode: multiply; */
  &:focus {
    border: 2px solid #757575;
    z-index: 10;
    outline: 0;
    background: #fff;
  }
`;

const TextInput: React.FC<Props> = ({
  register,
  name,
  ...rest
}) => {
  return <StyledInput {...register(name)} {...rest} />;
};

export default TextInput;