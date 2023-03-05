export const getPosition = (index: number, columns: number) => {
  return {
    x: index % columns,
    y: Math.floor(index / columns)
  }
}
