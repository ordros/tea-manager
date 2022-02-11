import * as React from 'react';
import { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { HookFormControledComponent, StyledComponentProps } from '~/common';
import { ColorName, getColor } from '~/palette';
import Typography from '~/components/Typography';
import { RefCallBack, useController } from 'react-hook-form';

type ComponentProps = StyledComponentProps & {
  min: number,
  max: number,
  step: number,
  unit?: string,
  colorName?: ColorName,
};

type InnerProps = ComponentProps & {
  inputRef: RefCallBack,
  value: number,
  onChange: React.ChangeEventHandler,
};

type Props = HookFormControledComponent & ComponentProps;

const calcTranslateX = (width: number, percentile: number) => {
  return (width - 32) * (percentile/100) + 16;
};

const Wrapper = styled.div`
  width: 100%;
`;

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

const SliderInner: React.FC<InnerProps> = ({
  className,
  value,
  inputRef,
  onChange,
  colorName = 'tea-leaf1',
  min,
  max,
  step,
  unit,
}) => {
  const ref = useRef(null);
  const [percentile, setPercentile] = useState((value-min)/(max-min)*100);
  const [textTranslateX, setTextTranslateX] = useState(0);

  useEffect(() => {
    setPercentile((value-min)/(max-min)*100)
    const x = calcTranslateX(ref.current && ref.current.offsetWidth, percentile);
    setTextTranslateX(x);
  });

  return (
    <Wrapper ref={ref} className={className}>
      <TextWrapper>
        <StyledTypography
          variant='header'
          bold
          color={colorName}
          shiftX={textTranslateX}
        >{value}{unit}</StyledTypography>
      </TextWrapper>
      <StyledRangeInput
        ref={inputRef}
        colorName={colorName}
        percentile={percentile}
        value={value}
        min={min}
        max={max}
        step={step}
        onChange={onChange}
      />
    </Wrapper>
  );
};

const Slider: React.FC<Props> = ({
  className,
  control,
  name,
  ...restProps
}) => {
  const {
    field: { ref, ...restFields },
    formState: {},
  } = useController({ name, control });

  return (
    <SliderInner
      inputRef={ref}
      {...restProps}
      {...restFields}
    />
  );
};

export default Slider;