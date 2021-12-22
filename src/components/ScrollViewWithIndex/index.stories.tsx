import * as React from 'react';
import ScrollViewWithIndex from '.';

export default {
  title: 'ScrollViewWithIndex',
};

const items = [
  {
    type: 'A',
    text: 'ああああああああああああああああああああああああああ',
  },
  {
    type: 'B',
    text: 'ああああああああああああああああああああああああああ',
  },
  {
    type: 'C',
    text: 'ああああああああああああああああああああああああああ',
  },
  {
    type: 'D',
    text: 'ああああああああああああああああああああああああああ',
  },
  {
    type: 'E',
    text: 'ああああああああああああああああああああああああああ',
  },
];

export const scrollViewWithIndex = () => <ScrollViewWithIndex items={items}/>;

scrollViewWithIndex.story = {
  name: 'ScrollViewWithIndex',
};
