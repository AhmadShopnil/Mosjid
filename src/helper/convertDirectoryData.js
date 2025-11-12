

export const convertDirectoryData = (datas) => {
  if (!Array.isArray(datas)) return [];

  return datas.map((data) => ({
    labelEn: data?.name || "",
    labelJp: data?.description || "",
    id:data?.id
  }));
};
