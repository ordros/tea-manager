import * as React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import styled, { css } from 'styled-components';

type Props = {
  renderTitleContent: (tabId: string) => React.ReactNode,
  renderContent: (tabId: string) => React.ReactNode,
  tabList: {
    id: string,
    label: string,
  }[],
  tabId?: string,
};

const Root = styled.div`
  width: calc(100% - 8px);
  padding: 0 4px;
`;

const TitleWrapper = styled.div``;

const TabIndexesWrapper = styled.div`
  display: flex;
  * + * {
    margin-left: 4px;
  }
`;

const TabIndex = styled.div<{ isSelected: boolean }>`
  height: 39px;
  padding: 0 16px;
  color: #757575;
  font-size: 20px;
  font-weight: bold;
  display: flex;
  align-items: center;
  border-radius: 4px 4px 0 0;
  background: ${({ isSelected }) => isSelected ? '#fff' : '#B6B6B6'};
  cursor: pointer;
`;

const ContentWrapper = styled.div`
  background: #fff;
`;

const Content = styled.div<{ isSelected: boolean }>`
  visibility: ${({ isSelected }) => !isSelected ? 'hidden' : 'visible'};
  height: ${({ isSelected }) => !isSelected ? '0' : 'auto'};
`;

const TabArea: React.FC<Props> = ({
  renderTitleContent,
  renderContent,
  tabList,
  tabId: initTab = null,
}) => {
  const [tab, setTab] = useState(initTab || tabList[0].id);

  return (
    <Root>
      <TitleWrapper>{renderTitleContent(tab)}</TitleWrapper>
      <TabIndexesWrapper>
        {tabList.map(({ id, label }) => <TabIndex key={id} isSelected={tab === id} onClick={() => setTab(id)}>{label}</TabIndex>)}
      </TabIndexesWrapper>
      <ContentWrapper>
        {tabList.map(({ id }) => (
          <Content key={id} isSelected={tab === id}>
            {renderContent(id)}
          </Content>
        ))}
      </ContentWrapper>
    </Root>
  );
};

export default TabArea;