import * as React from 'react';
import { HookFormComponent } from '~/common';
import styled from 'styled-components';
import { ColorName, getColor } from '~/palette';
import { useState } from 'react';
import { useEffect } from 'react';
import { useRef } from 'react';
import Typography from '../Typography';

type Props = HookFormComponent & {
  min: number,
  max: number,
  step: number,
  unit?: string,
  defaultValue: number,
  colorName?: ColorName,
};

const calcTranslateX = (width: number, percentile: number) => {
  return (width - 32) * (percentile/100) + 16;
};

const Wrapper = styled.div``;

const TextWrapper = styled.div`
  display: flex;
  margin-bottom: 8px;
`;

const StyledTypography = styled(Typography)<{shiftX: number}>`
  transform: translateX(${({ shiftX }) => `calc(${shiftX}px - 50%)`});
`;

const StyledRangeInput = styled.input.attrs({
  type: 'range',
})<{colorName: ColorName, percentile: number}>`
  -webkit-appearance: none;
  appearance: none;
  cursor: pointer;
  background: ${({ colorName, percentile }) => `linear-gradient(to right, ${getColor(colorName)} ${percentile}%, ${getColor(colorName)}66 ${percentile}%)`};
  height: 18px;
  width: 100%;
  border-radius: 8px;
  border: none;

  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    background: #fff;
    width: 32px;
    height: 32px;
    border-radius: 50%;
    border: 2px solid ${getColor('gray1')};
    box-shadow: 0 3px 6px 0 rgba(0, 0, 0, 0.15);
  }

  &:active::-webkit-slider-thumb {
    box-shadow: 0 5px 10px -2px rgba(0, 0, 0, 0.8);
  }
`;

const VerticalRangeInput: React.FC<Props> = ({
  register,
  name,
  colorName = 'tea-leaf1',
  min,
  max,
  step,
  unit,
  defaultValue,
  ...rest
}) => {
  const [value, setValue] = useState(defaultValue);
  const [percentile, setPercentile] = useState((defaultValue-min)/(max-min)*100);
  const [textTranslateX, setTextTranslateX] = useState(0);
  const onChange = (e) => {  
    const { onChange } = register(name);
    setPercentile(((e.target.value-min)/(max-min))*100);
    setValue(e.target.value);
    onChange(e);
  };
  const ref = useRef(null)

  useEffect(() => {
    const x = calcTranslateX(ref.current && ref.current.offsetWidth, percentile);
    setTextTranslateX(x);
  }, [ref.current, percentile])

  return (
    <Wrapper ref={ref}>
      <TextWrapper>
        <StyledTypography
          variant='header'
          bold
          color={colorName}
          shiftX={textTranslateX}
        >{value}{unit}</StyledTypography>
      </TextWrapper>
      <StyledRangeInput
        colorName={colorName}
        percentile={percentile}
        {...register(name)}
        onChange={onChange}
        min={min}
        max={max}
        step={step}
      />
    </Wrapper>
  );
};

export default VerticalRangeInput;