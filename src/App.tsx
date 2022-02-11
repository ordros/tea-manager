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
    waterAmount: 200,
    leafAmount: 3.5,
    cup: 1,
    teaType: 'ストレート',
  };
  const { register, watch, setValue, control } = useForm({ defaultValues });

  return (
    <Root>
      <StyledTextInput register={register} name="text" />
      <SliderWrapper>
        <WaterIcon variant="water" color="water" />
        <StyledSlider control={control} name="waterAmount" min={100} max={400} step={10} unit="ml" colorName={'water'}/>
      </SliderWrapper>
      <SliderWrapper>
        <WatchIcon variant="watch" color="tea-leaf1" />
        <StyledSlider control={control} name="leafAmount" min={1} max={4} step={0.5} unit="g" colorName={'tea-leaf1'} />
      </SliderWrapper>
      <Select control={control} name="cup" values={['1', '2', '3', '4', '5']}  />
      <Select control={control} name="teaType" values={['ストレート', 'アイス', 'ミルク']} isLoop />
      <div>
        {watch('text')}, {watch('leafAmount')}, {watch('waterAmount')}, {watch('cup')}, {watch('teaType')}
      </div>
    </Root>
  );
};

export default App;
