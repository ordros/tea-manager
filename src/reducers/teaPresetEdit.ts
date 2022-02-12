import { getAllTeaPreset, getTeaPresetByLeafId, upsertTeaPreset } from '~/helper/localStorage';
import {
  TeaPresetsByLeaf,
  TeaPresetActions,
  REQUEST_GET_TEA_PRESETS,
  REQUEST_GET_TEA_PRESETS_SUCCESS,
  REQUEST_GET_TEA_PRESETS_FAILURE,
  SAVE_TEA_PRESETS,
} from '~/actions/teaPreset';
import { ulid } from 'ulid';

const firstState: TeaPresetsByLeaf = {
  leafId: ulid(),
  leafName: 'ダージリン',
  presets: {
    'black': {
      waterAmount: 100,
      leafAmount: 2.0,
      brew: {
        minute: '05',
        second: '30'
      },    
    },
  },
  createdAt: Date.now(),
};

let stateFromLocalStorage = getAllTeaPreset();
if (stateFromLocalStorage.length === 0) {
  upsertTeaPreset(firstState);
  stateFromLocalStorage = getAllTeaPreset();
}

const initialState: TeaPresetsByLeaf = null;

export default function teaPresetEdit(state = initialState, action: TeaPresetActions) {
  switch(action.type) {
    case REQUEST_GET_TEA_PRESETS:
      const { leafId } = action.payload;
      const presets = getTeaPresetByLeafId(leafId);
      if (!presets) {
        return null;
      }
      return {...presets};
    case REQUEST_GET_TEA_PRESETS_SUCCESS:
    case REQUEST_GET_TEA_PRESETS_FAILURE:
      return {...state};
    case SAVE_TEA_PRESETS:
      const { teaPresetsByLeaf } = action.payload;
      teaPresetsByLeaf.createdAt = Date.now();
      upsertTeaPreset(teaPresetsByLeaf);
      return {...teaPresetsByLeaf};
    default:
      return state;
  }
};