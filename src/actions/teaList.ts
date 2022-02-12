export const REQUEST_GET_ALL_TEA_PRESETS = 'REQUEST_GET_ALL_TEA_PRESETS' as const;
export const DELETE_TEA_PRESET = 'DELETE_TEA_PRESET' as const;

export const requestAllTeaPresets = () => {
  return {
    type: REQUEST_GET_ALL_TEA_PRESETS,
  };
};

export const deleteTeaPreset = (leafId: string) => {
  return {
    type: DELETE_TEA_PRESET,
    payload: {
      leafId,
    },
  };
};

export type TeaListActions = (
  | ReturnType<typeof requestAllTeaPresets>
  | ReturnType<typeof deleteTeaPreset>
);

export const getAllTeaPresets = () => {
  return (dispatch) => {
    dispatch(requestAllTeaPresets());
    // TODO: データ取得
  };
};


