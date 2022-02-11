import * as React from 'react';
import { FieldValues, RefCallBack, useController } from 'react-hook-form';
import styled from 'styled-components';
import { HookFormControledComponent } from '~/common';
import Icon from '../Icon';
import Typography from '../Typography';

type ComponentProps = {
  values: string[],
  isLoop?: boolean,
};

type InnerProps = ComponentProps & {
  inputRef: RefCallBack,
  value: string,
  onChange: React.ChangeEventHandler,
};

type Props = HookFormControledComponent & ComponentProps;

const Root = styled.div``;

const StyledSelect = styled.select`
  /* display: none; */
`;

const IconWrapper = styled.div``;

const StyledIcon = styled(Icon)<{disabled?: boolean}>`
  stroke: ${({ disabled }) => (disabled ? '#757575' : '#000')};
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const StyledTypography = styled(Typography)`
  height: 40px;
`;

interface SelectChangeEvent extends React.ChangeEvent {
  target: HTMLSelectElement,
};

const SelectInner: React.FC<InnerProps> = ({
  values,
  isLoop,
  inputRef,
  value,
  onChange,
}) => {
  const onClickUp = (e) => {
    let index = values.indexOf(value.toString());
    if (index < 1) {
      if (!isLoop) {
        return;
      }
      index = values.length;
    }
    const event = e as SelectChangeEvent;
    event.target.value = values[index - 1];
    onChange(event);
  };

  const onClickDown = (e) => {
    let index = values.indexOf(value.toString());
    if (index >= values.length - 1) {
      if (!isLoop) {
        return;
      }
      index = -1;
    }
    const event = e as SelectChangeEvent;
    event.target.value = values[index + 1];
    onChange(event);
  };

  return (
    <Root>
      <Wrapper ref={inputRef}>
        <IconWrapper onClick={onClickUp}>
          <StyledIcon variant="arrowUp" disabled={!isLoop && values.indexOf(value.toString()) === 0}/>
        </IconWrapper>
        <StyledTypography variant="body" color="black" bold>{value}</StyledTypography>
        <IconWrapper onClick={onClickDown}>
          <StyledIcon variant="arrowDown" disabled={!isLoop && values.indexOf(value.toString()) === values.length - 1} />
        </IconWrapper>
      </Wrapper>
    </Root>
  );
};


const Select: React.FC<Props> = ({
  control,
  name,
  values,
  isLoop = false,
}) => {
  const {
    field: { ref, onChange, ...rest },
    formState: {},
  } = useController({ name, control });

  return (
    <SelectInner
      inputRef={ref} 
      values={values}
      isLoop={isLoop}
      onChange={onChange}
      {...rest}
    />
  );
};

export default Select;