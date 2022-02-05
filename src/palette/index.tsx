enum Color {
  'tea-leaf1' = '#B69285',
  'water' = '#6563FF',
  'gray1' = '#757575',
}

export type ColorName = keyof typeof Color;

export const getColor = (colorName: ColorName) => {
  return Color[colorName]
};