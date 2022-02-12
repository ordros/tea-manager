import * as React from 'react';
import { useDispatch } from 'react-redux';
import TeaCalcAndEditPage from '../TeaCalcAndEditPage';
import { useState } from 'react';
import TeaListPage from '../TeaListPage';
import { ulid } from 'ulid';
import styled from 'styled-components';
import { deleteTeaPreset } from '../../actions/teaList';


const Wrapper = styled.div<{ isVisible: boolean }>`
  visibility: ${({ isVisible }) => !isVisible ? 'hidden' : 'visible'};
  height: ${({ isVisible }) => !isVisible ? '0' : 'auto'};
  /* display: ${({ isVisible }) => isVisible ? 'inline' : 'none'}; */
`;

const TeaManager: React.FC<any> = () => {
  const [mode, setMode] = useState<'list' | 'edit'>('list');
  const [leafId, setLeafId] = useState("0");
  const [editDrawerOpen, setEditDrawerOpen] = useState(false);
  const [listPageKey, setListPageKey] = useState('');
  const dispatch = useDispatch();
  const getNewId = () => {
    return ulid();
  };

  const onChangeMode = (mode: 'list' | 'edit') => {
    if (mode === 'list') {
      setListPageKey(getNewId());
    } else {
    }
    setMode(mode);
  };
  
  const onAddTeaLeaf = () => {
    setLeafId(getNewId());
    onChangeMode('edit');
    setEditDrawerOpen(true);
    setTimeout(() => {
      setEditDrawerOpen(false);
    }, 500);
  };

  const onSelectLeaf = (leafId: string) => {
    setLeafId(leafId);
    onChangeMode('edit');
  };

  const onBackToList = () => {
    onChangeMode('list');
  };

  const onDelete = (leafId: string) => {
    dispatch(deleteTeaPreset(leafId));
    onChangeMode('list');
  };

  return (
    <>
      <Wrapper isVisible={mode === 'list'}>
        <TeaListPage key={listPageKey} onAddTeaLeaf={onAddTeaLeaf} onSelectLeaf={onSelectLeaf}/>
      </Wrapper>
      <Wrapper isVisible={mode === 'edit'}>
        <TeaCalcAndEditPage key={leafId} leafId={leafId} drawerOpen={editDrawerOpen} onBackToList={onBackToList} onDelete={onDelete} />
      </Wrapper>
    </>
  );
};

export default TeaManager;
