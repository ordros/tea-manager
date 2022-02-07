import { watch } from 'fs';
import * as React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';
import HookForm from './components/HookForm';
import TextInput from './components/TextInput';
import VerticalRangeInput from './components/VerticalRangeInput';

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

const App: React.FC<any> = () => {

  const defaultValues = {
    text: 'ダージリン',
    waterAmount: 100,
    leafAmount: 1.5,
  };
  const { register, watch } = useForm({ defaultValues });
  // document.addEventListener('touchmove', (e) => e.preventDefault(), { passive: false });

  return (
    <Root>
      <StyledTextInput register={register} name="text" />
      <VerticalRangeInput register={register} name="leafAmount" min={1} max={4} step={0.5} unit="g" colorName={'tea-leaf1'} defaultValue={defaultValues.leafAmount}/>
      <VerticalRangeInput register={register} name="waterAmount" min={100} max={400} step={10} unit="ml" colorName={'water'} defaultValue={defaultValues.waterAmount}/>
      <>
        {watch('text')}, {watch('leafAmount')}, {watch('waterAmount')}
      </>
    </Root>
  );
};

export default App;
