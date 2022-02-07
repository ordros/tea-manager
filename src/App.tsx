import * as React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';
import HookForm from './components/HookForm';
import Icon from './components/Icon';
import TextInput from './components/TextInput';
import Typography from './components/Typography';
import Slider from './components/Slider';
import Select from './components/Select';

const Root = styled.div`
  background: #D6D6D6;
  @media (max-width: 600px) {
    min-width: auto;
  }
  height: 678px;
  // width: calc(375px - 32px);
  // width: 100vw;
  padding: 0 24px;
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

const StyledTextInput = styled(TextInput)`
  margin-top: 24px;
`;

const SliderWrapper = styled.div`
  display: flex;
  margin: 6px 0;
`;

const StyledSlider = styled(Slider)`
  width: 261px;
`;

const WatchIcon = styled(Icon)`
  fill: #757575;
  transform: translateY(18px);
  margin-right: 10px;
`;

const WaterIcon = styled(Icon)`
  fill: #6563ff;
  transform: translateY(18px);
  margin-right: 10px;
`;

const StyledIcon = styled(Icon)`
  stroke: #000;
`;

const App: React.FC<any> = () => {

  const defaultValues = {
    text: 'ダージリン',
    waterAmount: 100,
    leafAmount: 1.5,
    cup: 1,
    teaType: 'ストレート',
  };
  const { register, watch, setValue } = useForm({ defaultValues });
  // document.addEventListener('touchmove', (e) => e.preventDefault(), { passive: false });

  const setCupValue = (value: string) => {
    setValue('cup', parseInt(value));
  };
  const setCupLoopValue = (value: string) => {
    setValue('teaType', value);
  };

  return (
    <Root>
      <StyledTextInput register={register} name="text" />
      <SliderWrapper>
        <WaterIcon variant="water" color="water" />
        <StyledSlider register={register} name="waterAmount" min={100} max={400} step={10} unit="ml" colorName={'water'} defaultValue={defaultValues.waterAmount}/>
      </SliderWrapper>
      <SliderWrapper>
        <WatchIcon variant="watch" color="tea-leaf1" />
        <StyledSlider register={register} name="leafAmount" min={1} max={4} step={0.5} unit="g" colorName={'tea-leaf1'} defaultValue={defaultValues.leafAmount}/>
      </SliderWrapper>
      <Select register={register} name="cup" values={['1', '2', '3', '4', '5']} setSelectValue={setCupValue} />
      <Select register={register} name="teaType" values={['ストレート', 'アイス', 'ミルク']} setSelectValue={setCupLoopValue} isLoop />
      <>
        {watch('text')}, {watch('leafAmount')}, {watch('waterAmount')}, {watch('cup')}, {watch('teaType')}
      </>
    </Root>
  );
};

export default App;
