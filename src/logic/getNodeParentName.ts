export const getNodeParentName = (name: string) =>
  name.substring(0, name.search(/\.\d+(\.|$)/)) || name;
