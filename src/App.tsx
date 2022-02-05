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
  // padding: 8px;
  @media (max-width: 600px) {
    min-width: auto;
  }
  height: 100vh;
  width: 500px;
  padding: 0 16px;
  display: flex;
  flex-direction: column;
`;

const App: React.FC<any> = () => {

  const defaultValues = {
    text: 'a',
    range: 20,
  };
  return (
    <Root>
      <HookForm
        defaultValues={defaultValues}
      >
        <TextInput name="text" />
        <VerticalRangeInput name="range" min={10} max={100} step={10} defaultValue={defaultValues.range}/>
      </HookForm>
    </Root>
  );
};

export default App;
