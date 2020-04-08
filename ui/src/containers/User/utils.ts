export const toListTableData = (data: any, theadList: Object) => {
  return Object.values(theadList).reduce(
    (acc, key) => ({
      ...acc,
      [key]: data[key]
    }),
    {} as any
  )
}
