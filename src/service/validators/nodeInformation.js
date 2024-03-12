export const validateNodeInformation = (nodeInformation) => {
  let nodeInformationErrors = { label: '' }

  if(nodeInformation.label === ''){
    nodeInformationErrors.label = 'Insira um título';
  }

  return nodeInformationErrors;
}