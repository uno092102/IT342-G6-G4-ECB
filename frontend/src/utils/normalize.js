export const normalizeArrayResponse = (resData) => {
    if (Array.isArray(resData)) return resData;
    if (resData?.data && Array.isArray(resData.data)) return resData.data;
    return [];
  };
  