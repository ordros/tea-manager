import * as React from 'react';
import { useEffect } from 'react';
import { Control, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import styled, { css } from 'styled-components';
import { requestTeaPresets, saveTeaPresets, saveTeaPresetsByLeaf } from '~/actions/teaPreset';
import { StyledComponentProps } from '~/common';
import { TEA_TYPES } from '~/const';
import { RootState } from '~/store';
import Icon from '../Icon';
import Select from '../Select';
import Slider from '../Slider';
import TabArea from '../TabArea';
import TextInput from '../TextInput';
import Typography from '../Typography';

type Props = StyledComponentProps & {
  leafId?: string,
  onSave: () => void,
};

const TitleWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const TextInputWrapper = styled.div`
  width: 80%;
  padding: 4px 0;
  display: flex;
  align-items: center;
`;

const StyledTextInput = styled(TextInput)<{ isInvalid: boolean }>`
  width: 100%;
  font-weight: bold;
  font-size: 20px;
  ${({ isInvalid }) => isInvalid && css`border: 2px solid red !important`};
`;

const SaveButton = styled.div`
  width: 20%;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  height: 100%;
`;

const SaveButtonLabel = styled(Typography)`
  line-height: 20px;
`;

const Root = styled.div`
  height: 100%;
`;

const Wrapper = styled.div`
  display: flex;
  padding: 24px 24px 0;
  align-items: center;
`;

const StyledSlider = styled(Slider)``;

const LeafIcon = styled(Icon)`
  transform: translateY(18px);
  margin-right: 10px;
`;

const WatchIcon = styled(Icon)`
  margin-right: 10px;
`;

const WaterIcon = styled(Icon)`
  transform: translateY(18px);
  margin-right: 10px;
`;

const BrewTimeWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  > * {
    margin-left: 8px;
  }
`;

const TeaPresetEdit: React.FC<Props> = ({
  className,
  onSave,
  leafId = "0",
}) => {
  const tabList = TEA_TYPES;
  const formState = useSelector((state: RootState) => state.teaPresetEdit);
  const { register, control, getValues, reset, formState: { errors }, handleSubmit } = useForm({ defaultValues: formState, mode: 'onSubmit' });
  const dispatch = useDispatch();
  const onClickSave = () => {
    const values = getValues();
    dispatch(saveTeaPresets({ leafId, ...values }));
    onSave();
  };
  if (!formState) {
    dispatch(requestTeaPresets(leafId));
  }
  useEffect(() => {
    reset({...formState});
  }, [formState])

  useEffect(() => {
    const preset = {
      waterAmount: null,
      leafAmount: null,
      brew: {
        minute: null,
        second: null,
      },
    };
    reset({
      leafId,
      leafName: null,
      presets: {
        'black': {...preset},
        'iced': {...preset},
        'milk': {...preset},
      },
    });
    dispatch(requestTeaPresets(leafId));
  }, [leafId]);

  const renderTitleContent = (id: string) => (
    <TitleWrapper key={`${id}_${leafId}`}>
      <TextInputWrapper>
        <StyledTextInput register={register} name="leafName" placeholder="茶葉名" isInvalid={!!errors.leafName} required />
      </TextInputWrapper>
      <SaveButton onClick={handleSubmit(onClickSave)}>
        <SaveButtonLabel color="water" variant="body2">保存</SaveButtonLabel>
      </SaveButton>
    </TitleWrapper>
  );

  const renderContent = (id: string) => (
    <Root key={`${id}_${leafId}`}>
      <>
        <Wrapper>
          <WaterIcon variant="water" color="water" />
          <StyledSlider control={control} name={`presets.${id}.waterAmount`} min={100} max={400} step={10} unit="ml" colorName={'water'}/>
        </Wrapper>
        <Wrapper>
          <LeafIcon variant="watch" color="tea-leaf1" />
          <StyledSlider control={control} name={`presets.${id}.leafAmount`}  min={1} max={4} step={0.5} unit="g" colorName={'tea-leaf1'} />
        </Wrapper>
      </>
      <Wrapper>
        <WatchIcon variant="watch" color="black" />
        <BrewTimeWrapper>
          <Select control={control} name={`presets.${id}.brew.minute`} values={[...Array(10)].map((_, index) => `0${index}`).reverse()} isLoop />
          <Typography variant="body" color="black" bold>:</Typography>
          <Select control={control} name={`presets.${id}.brew.second`}  values={['50', '40', '30', '20', '10', '00']} isLoop />
        </BrewTimeWrapper>
      </Wrapper>
    </Root>
  );
  return (
    <TabArea
      renderTitleContent={renderTitleContent}
      renderContent={renderContent}
      tabList={tabList}
    />
  );
};

export default TeaPresetEdit;