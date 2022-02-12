export const REQUEST_GET_TEA_PRESETS = 'REQUEST_GET_TEA_PRESETS' as const;
export const REQUEST_GET_TEA_PRESETS_SUCCESS = 'REQUEST_GET_TEA_PRESETS_SUCCESS' as const;
export const REQUEST_GET_TEA_PRESETS_FAILURE = 'REQUEST_GET_TEA_PRESETS_FAILURE' as const;

export const SAVE_TEA_PRESETS = 'SAVE_TEA_PRESETS' as const;
export const SAVE_TEA_PRESETS_SUCCESS = 'SAVE_TEA_PRESETS_SUCCESS' as const;
export const SAVE_TEA_PRESETS_FAILURE = 'SAVE_TEA_PRESETS_FAILURE' as const;

export const RESET_TEA_PRESET_EDIT = 'RESET_TEA_PRESET_EDIT' as const;

export const requestTeaPresets = (leafId: string) => {
  return {
    type: REQUEST_GET_TEA_PRESETS,
    payload: {
      leafId,
    },
  };
};

export const requestTeaPresetsSuccess = () => {
  return {
    type: REQUEST_GET_TEA_PRESETS_SUCCESS,
  };
};

export const requestTeaPresetsFailure = () => {
  return {
    type: REQUEST_GET_TEA_PRESETS_FAILURE,
  };
};

export type TeaPreset = {
  waterAmount: number,
  leafAmount: number,
  brew: {
    minute: string,
    second: string,
  },
};

interface TeaPresets {
  [teaType: string]: TeaPreset
}

export type TeaPresetsByLeaf = {
  leafId: string,
  leafName: string,
  presets: TeaPresets,
  createdAt: number,
};

export const saveTeaPresets = (teaPresetsByLeaf: TeaPresetsByLeaf) => {
  return {
    type: SAVE_TEA_PRESETS,
    payload: {
      teaPresetsByLeaf,
    },
  };
};

export const saveTeaPresetsSuccess = () => {
  return {
    type: SAVE_TEA_PRESETS_SUCCESS,
  };
};

export const saveTeaPresetsFailure = () => {
  return {
    type: SAVE_TEA_PRESETS_FAILURE,
  };
};

export const resetTeaPresets = () => {
  return {
    type: RESET_TEA_PRESET_EDIT,
  }
}

export type TeaPresetActions = (
  | ReturnType<typeof requestTeaPresets>
  | ReturnType<typeof requestTeaPresetsSuccess>
  | ReturnType<typeof requestTeaPresetsFailure>
  | ReturnType<typeof saveTeaPresets>
  | ReturnType<typeof saveTeaPresetsSuccess>
  | ReturnType<typeof saveTeaPresetsFailure>
  | ReturnType<typeof resetTeaPresets>
)

export const getTeaPresets = (leafId: string) => {
  return (dispatch) => {
    dispatch(requestTeaPresets(leafId));
    // TODO: データ取得
  };
};

export const saveTeaPresetsByLeaf = (teaPresetsByLeaf: TeaPresetsByLeaf) => {
  return (dispatch) => {
    dispatch(saveTeaPresets(teaPresetsByLeaf));
    return null;
    // TODO: データ保存
  };
};


