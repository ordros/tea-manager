import * as React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { requestAllTeaPresets } from '~/actions/teaList';
import { getColor } from '~/palette';
import { RootState } from '~/store';
import Typography from '../Typography';

type Props = {
  onAddTeaLeaf: () => void,
  onSelectLeaf: (leafId: string) => void,
};

const Header = styled.div`
  background: ${getColor('tea-leaf1')};
  padding: 14px 16px;
  display: flex;
  justify-content: center;
`;

const SaveButton = styled.div`
  position: absolute;
  right: 16px;
  cursor: pointer;
`;

const Root = styled.div``;

const TeaItemList = styled.div`
  margin: 0 8px;
`;

const TeaItem = styled.div`
  width: 100%;
  border-bottom: 1px solid ${getColor('gray1')};
  &:active {
    background: ${getColor('gray1')};
  }
`;

const LabelWrapper = styled.div`
  margin: 12px;
`;

const TeaItemLabel = styled(Typography)``;

const TeaListPage: React.FC<Props> = ({
  onAddTeaLeaf,
  onSelectLeaf,
}) => {
  const dispatch = useDispatch();
  const state = useSelector((state: RootState) => state.teaList);
  if (state.length === 0) {
    dispatch(requestAllTeaPresets());
  }

  useEffect(() => {
    dispatch(requestAllTeaPresets());
  }, [])
  return (
    <Root>
      <Header>
        <Typography color="white" variant="header" bold>茶葉一覧</Typography>
        <SaveButton onClick={onAddTeaLeaf}>
          <Typography color="water" variant="body2">追加</Typography>
        </SaveButton>
      </Header>
      <TeaItemList>
        {state.length !== 0 && state.sort((a, b) => a.createdAt - b.createdAt).map((preset) => (
          <TeaItem key={preset.leafId} onClick={() => onSelectLeaf(preset.leafId)} >
            <LabelWrapper>
              <TeaItemLabel variant="header" color="gray1">{preset.leafName}</TeaItemLabel>
            </LabelWrapper>
          </TeaItem>
        ))}
      </TeaItemList>
    </Root>
  );
};


export default TeaListPage;