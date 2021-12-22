import * as React from 'react';
import { useEffect } from 'react';
import { useRef } from 'react';
import { useState } from 'react';
import styled, { css } from 'styled-components';

type Item = {
  type: string,
  text: string,
}
type Props = {
  items: Item[],
};

const VIEW_HEIGHT = 800;
const LABEL_HEIGHT = 60;

const Root = styled.div`
  width: 100%;
  height: ${VIEW_HEIGHT}px;
  background: #c2f0ff;
  display: flex;
`;

const ScrollWrapper = styled.div`
  width: 80%;
  overflow: scroll;
  
  &::-webkit-scrollbar {
    display:none;
  }
  padding-bottom: 500px;
`;

const IndexesWrapper = styled.div`
  width: 20%;
  background: gray;
`;

const IndexWrapper = styled.div`
  height: ${LABEL_HEIGHT}px;
  border-radius: 4px;
  margin: 4px;
  margin-bottom: ${({ marginBottom }) => (marginBottom ? `${marginBottom}px` : '4px')};
  transition: all 0.3s ease-out;
  display: flex;
  align-items: center;
  justify-content: center;
  background: white;
`;

const ScrollData = styled.div`
  height: 500px;
  background: white;
  margin: 4px;
`;

const ScrollViewWithIndex: React.FC<Props> = ({
  items,
}) => {
  const types = Array.from(new Set(items.map(({ type }) => type))) || [];
  const [top, setTop] = useState(types[0]);
  const [topDestination, setTopDestination] = useState({ position: 0, type: types[0] });
  const scrollWrapperRef = useRef(null);

  const getTopPosition = (index) => {
    const dataElements = scrollWrapperRef.current.children || [];
    let height = 0;
    dataElements.forEach((element, i) => {
      if (i < index) {
        height += element.offsetHeight;
      }
    });
    return height;
  };

  // useEffect(() => {
  //   const topPosition = getTopPosition(types.indexOf(top));
  //   scrollWrapperRef.current.scroll({ top: topPosition, behavior: 'smooth' });
  // }, [top]);

  const onClickIndex = (type) => {
    // setTop(type);
    const topPosition = getTopPosition(types.indexOf(type));
    setTopDestination({ position: topPosition, type });
    scrollWrapperRef.current.scroll({ top: topPosition, behavior: 'smooth' });
  };

  useEffect(() => {
    if (topDestination.position === scrollWrapperRef.current.scrollTop) {
      setTop(topDestination.type);
    }
  }, [topDestination]);

  const onScroll = (e) => {
    // const dataElements = scrollWrapperRef.current.children || [];
    // let topPosition = 0;
    // dataElements.forEach((element, i) => {
    //   if (
    //     topPosition <= e.target.scrollTop
    //     && e.target.scrollTop <= topPosition + element.offsetHeight
    //   ) {
    //     setTop(types[i]);
    //     console.log(i);
    //   }
    //   topPosition += element.offsetHeight;
    // });
    // console.log(Math.ceil(e.target.scrollTop / 500));
    setTop(types[Math.floor(e.target.scrollTop / 500)]);
  };

  const getMarginBottom = () => {
    const itemHeight = LABEL_HEIGHT + (4 * 2);
    return VIEW_HEIGHT - (itemHeight * types.length);
  };

  return (
    <Root>
      <ScrollWrapper onScroll={(e) => onScroll(e)} ref={scrollWrapperRef}>
        {types.map((type) => (
          <ScrollData key={type}>{type}</ScrollData>
        ))}
      </ScrollWrapper>
      <IndexesWrapper>
        {types.map((type) => (
          <IndexWrapper
            key={type}
            onClick={() => onClickIndex(type)}
            marginBottom={top === type ? getMarginBottom() : null}
          >
            {type}
          </IndexWrapper>
        ))}
      </IndexesWrapper>
    </Root>
  );
};

export default ScrollViewWithIndex;
