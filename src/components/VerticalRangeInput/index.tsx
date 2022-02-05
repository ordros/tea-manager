import * as React from 'react';
import { HookFormComponent } from '~/types';
import styled from 'styled-components';
import { ColorName, getColor } from '~/palette';
import { useState } from 'react';
import { useEffect } from 'react';
import { useRef } from 'react';

type Props = HookFormComponent & {
  min: number,
  max: number,
  step: number,
  defaultValue: number,
  colorName?: ColorName,
};

const StyledRangeInput = styled.input.attrs({
  type: 'range',
})`
  -webkit-appearance: none;
  appearance: none;
  cursor: pointer;
  background: 
  ${({ colorName, percentile }) => `linear-gradient(to right, ${getColor(colorName)} ${percentile}%, ${getColor(colorName)}66 ${percentile}%)`};
  height: 18px;
  width: 100%;
  border-radius: 2px;
  border: none;
  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    background: #fff;
    width: 32px;
    height: 32px;
    border-radius: 50%;
    border: 2px solid ${getColor('gray1')};
    box-shadow: 0px 3px 6px 0px rgba(0, 0, 0, 0.15);
  }
  &:active::-webkit-slider-thumb {
    box-shadow: 0px 5px 10px -2px rgba(0, 0, 0, 0.8);
  }
`;

const VerticalRangeInput: React.FC<Props> = ({
  register,
  name,
  colorName = 'tea-leaf1',
  min,
  max,
  step,
  defaultValue,
  ...rest
}) => {
  const [percentile, setPercentile] = useState((defaultValue-min)/(max-min)*100);
  const onChange = (e) => {  
    const { onChange } = register(name);
    setPercentile(((e.target.value-min)/(max-min))*100);
    onChange(e);
  };

  return <StyledRangeInput
    colorName={colorName}
    percentile={percentile}
    {...register(name)}
    onChange={onChange}
    min={min}
    max={max}
    step={step}
  />
};

export default VerticalRangeInput;