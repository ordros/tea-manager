import * as React from 'react';
import styled from 'styled-components';
import ScrollViewWithIndex from './components/ScrollViewWithIndex';

const App: React.FC<any> = () => {
  const items = [
    {
      type: 'A',
      text: 'ああああああああああああああああああああああああああ',
    },
    {
      type: 'B',
      text: 'ああああああああああああああああああああああああああ',
    },
    {
      type: 'C',
      text: 'ああああああああああああああああああああああああああ',
    },
    {
      type: 'D',
      text: 'ああああああああああああああああああああああああああ',
    },
    {
      type: 'E',
      text: 'ああああああああああああああああああああああああああ',
    },
  ];
  return (
    <>
      <ScrollViewWithIndex items={items} />
    </>
  );
};

export default App;
