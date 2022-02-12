import * as React from 'react';
import { Provider } from 'react-redux';

import styled from 'styled-components';
import TeaManager from './components/TeaManager';
import store from './store';


const Wrapper = styled.div<{ isVisible: boolean }>`
  display: ${({ isVisible }) => isVisible ? 'inline' : 'none'};
`;

const App: React.FC<any> = () => {
  return (
    <Provider store={store}>
      <TeaManager />
    </Provider>
  );
};

export default App;
