import * as React from 'react';
import { useState } from 'react';
import styled from 'styled-components';
import { HookFormComponent } from '~/common';
import Icon from '../Icon';
import Typography from '../Typography';

type Props = HookFormComponent & {
  values: string[],
  defaultValue?: string,
  setSelectValue: (any) => void,
  isLoop?: boolean,
};

const Root = styled.div``;

const StyledSelect = styled.select`
  display: none;
`;

const IconWrapper = styled.div``;

const StyledIcon = styled(Icon)<{disabled?: boolean}>`
  stroke: ${({ disabled }) => disabled ? '#757575' : '#000'};
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const StyledTypography = styled(Typography)`
  height: 40px;
`;

const Select: React.FC<Props> = ({
  register,
  name,
  values,
  setSelectValue,
  isLoop = false,
}) => {
  const [value, setValue] = useState<string>(values[0]);

  const onChange = (e) => {
    const { onChange } = register(name);
    setValue(e.target.value);
    onChange(e);
  };

  const onClickUp = () => {
    let index = values.indexOf(value);
    if (index < 1) {
      if (!isLoop) {
        return;
      }
      index = values.length;
    }
    setSelectValue(values[index - 1]);
    setValue(values[index - 1]);
  };

  const onClickDown = () => {
    let index = values.indexOf(value);
    if (index >= values.length - 1) {
      if (!isLoop) {
        return;
      }
      index = -1;
    }
    setSelectValue(values[index + 1]);
    setValue(values[index + 1]);
  };

  return (
    <Root>
      <StyledSelect {...register(name)} onChange={onChange}>
        {values.map((value) => 
          <option key={value} value={value}>{value}</option>
        )}
      </StyledSelect>
      <Wrapper>
        <IconWrapper onClick={onClickUp}>
          <StyledIcon variant="arrowUp" disabled={!isLoop && values.indexOf(value) === 0}/>
        </IconWrapper>
        <StyledTypography variant="body" color="black" bold>{value}</StyledTypography>
        <IconWrapper onClick={onClickDown}>
          <StyledIcon variant="arrowDown" disabled={!isLoop && values.indexOf(value) === values.length - 1} />
        </IconWrapper>
      </Wrapper>
    </Root>
  );
};

export default Select;