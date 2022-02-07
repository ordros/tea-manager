import * as React from 'react';
import { StyledComponent } from '~/common';
import { ColorName } from '~/palette';

import ArrowUpIcon from './svg/arrow_up.svg';
import ArrowDownIcon from './svg/arrow_down.svg';

enum IconSize {
  's' = '16px',
  'm' = '24px',
  'l' = '48px',
};

type IconSizeName = keyof typeof IconSize;

type IconType = 'arrowUp' | 'arrowDown';

type Props = StyledComponent & {
  size?: IconSizeName,
  variant: IconType,
};

const Icon: React.FC<Props> = ({
  className,
  size,
  variant,
}) => {
  switch (variant) {
    case 'arrowUp':
      return <ArrowUpIcon className={className} />;
    case 'arrowDown':
      return <ArrowDownIcon className={className} />
  }
};

export default Icon;