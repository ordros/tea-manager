import * as React from 'react';
import { StyledComponentProps } from '~/common';

import ArrowUpIcon from './svg/arrow_up.svg';
import ArrowDownIcon from './svg/arrow_down.svg';
import WatchIcon from './svg/watch.svg';
import WaterIcon from './svg/water.svg';
import { ColorName, getColor } from '~/palette';

enum IconSize {
  's' = '16px',
  'm' = '24px',
  'l' = '48px',
};

type IconSizeName = keyof typeof IconSize;

type IconType = 'arrowUp' | 'arrowDown' | 'watch' | 'water';

type Props = StyledComponentProps & {
  size?: IconSizeName,
  color?: ColorName,
  variant: IconType,
};

const Icon: React.FC<Props> = ({
  className,
  size,
  color = 'transparent',
  variant,
}) => {
  switch (variant) {
    case 'arrowUp':
      return <ArrowUpIcon style={{fill: getColor(color)}} className={className} />;
    case 'arrowDown':
      return <ArrowDownIcon style={{fill: getColor(color)}}  className={className} />;
    case 'watch':
      return <WatchIcon style={{fill: getColor(color)}}  className={className} />;
    case 'water':
      return <WaterIcon style={{fill: getColor(color)}}  className={className} />;
  };
};

export default Icon;