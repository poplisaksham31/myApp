export const changeCount = (count) => ({
    type: "ACTIVE_COUNT",
    count: count,
});
  
export const filters = (filter) => ({
    type: "FILTER_TYPE",
    value: filter,
})