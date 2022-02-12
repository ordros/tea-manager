import * as React from 'react';
import { useRef } from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import styled, { css } from 'styled-components';
import { StyledComponentProps } from '~/common';
import { ColorName, getColor } from '~/palette';
import Icon from '../Icon';
import Typography from '../Typography';

type Props = StyledComponentProps & {
  isOpen: boolean,
  onOpen?: () => void,
  onClose?: () => void,
  children?: React.ReactNode,
};

const HANDLE_HEIGHT = 43;

const Root = styled.div<{
  isVisible: boolean,
  isOpen: boolean,
  contentSize: {
    height: number,
  },
  windowSize: {
    height: number,
  },
}>`
  width: 100%;
  position: absolute;
  z-index: 100;
  opacity: ${({ isVisible }) => isVisible ? '1' : '0'};
  background: ${getColor('tea-leaf1')};
  transition: transform 0.5s;
  transform: ${({ isOpen, contentSize, windowSize }) => css`translateY(${isOpen ? (windowSize.height - (contentSize && contentSize.height) - HANDLE_HEIGHT) : (windowSize.height - HANDLE_HEIGHT)}px)`};
`;

const Handle = styled.div`
  height: ${HANDLE_HEIGHT}px;
  background: ${getColor('tea-leaf1')};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 5px 0 0;
`;

const HandleLabel = styled(Typography)`
  transform: translateY(-24px);
`;

const Content = styled.div``;

const Drawer: React.FC<Props> = ({
  className,
  isOpen,
  onOpen,
  onClose,
  children,
}: Props) => {
  const [contentSize, setContentSize] = useState<{ height: number, width: number }>(null);
  const [visible, setVisible] = useState(false);
  const [contentKey, setContentKey] = useState(null);
  const [touchStartPosision, setTouchStartPosision] = useState(null);
  const refContent = useRef(null);
  
  const onTouchStart = (event: React.TouchEvent) => {
    const { pageX, pageY } = event.changedTouches[0];
    setTouchStartPosision({ pageX, pageY });
  };
  const onTouchMove = (e: React.TouchEvent) => {
    const { pageY } = e.changedTouches[0];
    if ((pageY - touchStartPosision.pageY) < 0 && !isOpen) {
        onOpen();
    } else if ((pageY - touchStartPosision.pageY) > 0 && isOpen) {
        onClose();
    }
  };

  const _onOpen = () => {
    onOpen();
  }

  const _onClose = () => {
    const date = new Date();
    setTimeout(() => setContentKey(date), 500);
    onClose();
  } 
  useEffect(() => {
    if (refContent.current) {
      const { offsetHeight, offsetWidth } = refContent.current;
      setContentSize({ height: offsetHeight, width: offsetWidth });
    }
  }, [refContent]);

  useEffect(() => {
    setTimeout(() => setVisible(true), 500);
  }, []);
  
  return (
    <Root
      className={className}
      isVisible={visible}
      isOpen={isOpen}
      contentSize={contentSize}
      windowSize={{
        height: window.innerHeight,
      }}
    >
      <Handle onClick={isOpen ? _onClose : _onOpen } onTouchStart={onTouchStart} onTouchMove={onTouchMove} >
        <Icon color="white" variant={isOpen ? 'arrowDown' : 'arrowUp'} />
        <HandleLabel color="white" variant="body2">{isOpen ? '' : '編集'}</HandleLabel>
      </Handle>
      <Content key={contentKey} ref={refContent}>  
        {children}
      </Content>
    </Root>
  );
};

export default Drawer;