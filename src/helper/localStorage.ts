import { TeaPresetsByLeaf } from './../actions/teaPreset';

export const getAllTeaPreset = () => {
  const json = localStorage.getItem('allTeaPresets');
  if (!json) {
    return [];
  }
  return JSON.parse(json) as TeaPresetsByLeaf[];
}

export const getTeaPresetByLeafId = (leafId: string) => {
  const all = getAllTeaPreset();
  const presets = all.find((teaPresets) => teaPresets.leafId === leafId);
  if (!presets) {
    return null;
  }
  return presets;
};

export const upsertTeaPreset = (teaPreset: TeaPresetsByLeaf) => {
  const all = getAllTeaPreset();
  if (all.length === 0) {
    const data = JSON.stringify([teaPreset]);
    localStorage.setItem('allTeaPresets', data);
    return;
  }

  const restData = all.filter((preset) => preset.leafId !== teaPreset.leafId);
  restData.push(teaPreset);
  
  const data = JSON.stringify(restData);
  localStorage.setItem('allTeaPresets', data);
};

export const deleteTeaPreset = (leafId: string) => {
  const all = getAllTeaPreset();
  if (all.length === 0) {
    return;
  }
  const restData = all.filter((preset) => preset.leafId !== leafId);
  const data = JSON.stringify(restData);
  localStorage.setItem('allTeaPresets', data);
};