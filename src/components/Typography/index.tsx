import * as React from 'react';
import styled from 'styled-components';
import { StyledComponentProps } from '~/common';
import { ColorName, getColor } from '~/palette';

type TextStyles = 'body' | 'body2' | 'header'; 

type Props = StyledComponentProps & {
  children: React.ReactNode,
  variant: TextStyles
  bold?: boolean,
  color?: ColorName,
}

const getFontSize = (variant: TextStyles) => {
  switch(variant) {
    case 'body':
      return '34px';
    case 'body2':
    case 'header':
      return '20px';
  }
};

const StyledP = styled.p<{bold: boolean, color: ColorName, variant: TextStyles}>`
  font-family: "Work Sans";
  font-style: normal;
  font-weight: ${({ bold }) => bold ? 'bold' : 'normal'};
  font-size: ${({ variant }) => getFontSize(variant)};
  color: ${({ color }) => getColor(color)};
  line-height: 23px;
  display: flex;
  align-items: center;
  margin: 0;
`;

const Typography: React.FC<Props> = ({
  className,
  children,
  variant,
  bold,
  color = 'gray1',
}) => {
  return <StyledP className={className} bold={bold} variant={variant} color={color}>{children}</StyledP>
};

export default Typography;