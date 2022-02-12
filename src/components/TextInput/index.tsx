import * as React from 'react';
import { HookFormComponent } from '~/common';
import styled from 'styled-components';

type InputProps = {
  placeholder: string,
};

type Props = HookFormComponent & InputProps & {
  required: boolean,
};

const StyledInput = styled.input`
  font-family: "Roboto","Helvetica","Arial",sans-serif;
  font-size: 16px;
  border: 2px solid transparent;
  border-radius: 4px;
  box-sizing: border-box;
  background: transparent;
  padding: 8px;
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
  required = false,
  ...rest
}) => {
  return <StyledInput {...register(name, { required })} {...rest} />;
};

export default TextInput;