import * as React from 'react';
import { useState } from 'react';
import styled from 'styled-components';
import Drawer from '~/components/Drawer';
import TeaPresetEdit from '~/components/TeaPresetEdit';
import { useDispatch, useSelector } from 'react-redux';
import store, { RootState } from '~/store';
import { requestTeaPresets } from '~/actions/teaPreset';
import Typography from '../Typography';
import { getColor } from '~/palette';
import { useForm } from 'react-hook-form';
import Select from '../Select';
import { TEA_TYPES, WATER_AMOUNT_PER_CUP } from '~/const';
import Icon from '../Icon';
import { useEffect } from 'react';

type Props = {
  leafId: string,
  drawerOpen?: boolean,
  onBackToList: () => void,
  onDelete: (leafId: string) => void,
};

const Root = styled.div`
  background: #D6D6D6;
  @media (max-width: 600px) {
    min-width: auto;
  }
  height: 667px;
  overflow: hidden;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
`;

const StyledDrawer = styled(Drawer)``;

const BackDrop = styled.div<{ isVisible: boolean }>`
  position: absolute;
  height: 100%;
  width: 100%;
  background: #000;
  transition: opacity 500ms;
  opacity: ${({ isVisible }) => isVisible ? '0.5' : '0'};
  z-index: ${({ isVisible }) => isVisible ? '1' : '-1'};
`;

const Header = styled.div`
  background: ${getColor('tea-leaf1')};
  padding: 14px 16px;
  min-height: 20px;
`;

const HeaderLabelWrapper = styled.div`
  display: flex;
  justify-content: center;
`;

const ButtonList = styled.div`
  display: flex;
  justify-content: space-between;
`;

const BackButton = styled.div`
  margin-top: 8px;
  cursor: pointer;
`;

const SelectorsWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const AmountsWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const AmountWrapper = styled.div`
  width: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const SelectorWrapper = styled.div`
  width: 50%;
`;
const TeaCalcAndEditPage: React.FC<Props> = ({
  leafId,
  drawerOpen: initDrawerOpen = false,
  onBackToList,
  onDelete,
}) => {
  const [drawerOpen, setDrawerOpen] = useState(initDrawerOpen);
  const formState = useSelector((state: RootState) => state.teaPresetEdit);
  const dispatch = useDispatch();
  const { control, watch, reset } = useForm({
    defaultValues: {
      cups: '1',
      teaType: 'ストレート',
    },
  });

  useEffect(() => {
    dispatch(requestTeaPresets(leafId));
  }, [leafId]);

  if (!formState) {
    dispatch(requestTeaPresets(leafId));
  }
  const calcWater = (cups: number) => {
    if (!formState) {
      return null;
    }
    return WATER_AMOUNT_PER_CUP * cups;
  };
  
  const calcLeaf = (cups: number, teaTypeLabel: string) => {
    if (!formState || !formState.presets) {
      return null;
    }
    const teaType = TEA_TYPES.find(({ label }) => label === teaTypeLabel).id;
    const preset = formState.presets[teaType];
    if (!preset) {
      return null;
    }
    return Math.floor((preset.leafAmount / preset.waterAmount) * WATER_AMOUNT_PER_CUP * cups * 10) / 10;
  };

  return (
    <Root key={leafId}>
      <BackDrop isVisible={drawerOpen} />
      <StyledDrawer isOpen={drawerOpen} onOpen={() => setDrawerOpen(true)} onClose={() => setDrawerOpen(false)} >
        <TeaPresetEdit leafId={leafId} onSave={() => setDrawerOpen(false)} />
      </StyledDrawer>
      <Content>
        <Header>
          <HeaderLabelWrapper>
            <Typography color="white" variant="header" bold>{(formState && formState.leafName) || '名称未設定'}</Typography>
          </HeaderLabelWrapper>
          <ButtonList>
            <BackButton onClick={onBackToList}>
              <Typography color="water" variant="body2">一覧</Typography>
            </BackButton>
            <BackButton onClick={() => onDelete(leafId)}>
              <Typography color="warning" variant="body2">削除</Typography>
            </BackButton>
          </ButtonList>
        </Header>
        <SelectorsWrapper>
          <SelectorWrapper>
            <Select control={control} name="cups" values={['1', '2', '3', '4', '5'].reverse()} />
          </SelectorWrapper>
          <SelectorWrapper>
            <Select control={control} name="teaType" values={TEA_TYPES.map(({ label }) => label)} isLoop />
          </SelectorWrapper>
        </SelectorsWrapper>
        <AmountsWrapper>
          <AmountWrapper>
            <Icon variant="water" color="water" />
            <Typography variant="body" color="water" bold>{calcWater(parseInt(watch('cups'))) || ' - '}ml</Typography>
          </AmountWrapper>
          <AmountWrapper>
            <Icon variant="watch" color="tea-leaf1" />
            <Typography variant="body" color="tea-leaf1" bold>{calcLeaf(parseInt(watch('cups')), watch('teaType')) || ' - '}g</Typography>
          </AmountWrapper>
        </AmountsWrapper>
      </Content>
    </Root>
  )
};

export default TeaCalcAndEditPage;