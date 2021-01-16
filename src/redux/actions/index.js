export const selectStation = (name) => {
  return { type: 'SELECT_STATION', name };
}

export const resetSelection = () => {
  return { type: 'RESET_SELECTION' };
}