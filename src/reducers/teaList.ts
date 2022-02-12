import { TeaPresetsByLeaf } from './../actions/teaPreset';
import { DELETE_TEA_PRESET, REQUEST_GET_ALL_TEA_PRESETS } from './../actions/teaList';
import { TeaListActions } from '~/actions/teaList';
import { deleteTeaPreset, getAllTeaPreset } from '~/helper/localStorage';


const initialState: TeaPresetsByLeaf[] = [];

export default function teaList(state = initialState, action: TeaListActions) {
  switch(action.type) {
    case REQUEST_GET_ALL_TEA_PRESETS: {
      const presets = getAllTeaPreset();
      return presets;
    }
    case DELETE_TEA_PRESET: {
      const { leafId } = action.payload;
      deleteTeaPreset(leafId);
      const presets = getAllTeaPreset();
      return presets;
    }
    default:
      return state;
  }
};