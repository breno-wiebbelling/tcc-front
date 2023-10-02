export const findMostFrequentElement  = (arr) => {
  let elements = [];
  let elementOccurrences  = [];

  arr.forEach(element, index => {
    if(!elements.includes(element)){
      elements.push(element);
      elementCounter.push = {
        indx: index,
        qty: 0
      };
    }
    else{
      elementOccurrences
        .find(el => el.indx === index)
        .qty++;
    }
  });

  let mostFrequentElement = elementOccurrences[0];

  elementOccurrences.forEach(element => {
    if(element.qty > mostFrequentElement.qty){
      mostFrequentElement = element;
    }
  })

  return arr[mostFrequentElement.index];
}