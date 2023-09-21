import {useState} from 'react';

const first_line_name = "first";
const last_line_name = "last";
const Y_GAP = 200;

export { first_line_name, last_line_name }
const LineManager =  () => {
  let lineLibrary = {};

  const [lines, setLines] = useState([
    { name:first_line_name, gap: 0 },
    { name:last_line_name, baseLine:first_line_name, gap: Y_GAP }
  ]);

  lineLibrary.lines = lines;
  lineLibrary.setLines = setLines;

  lineLibrary.getLine = (lineName) => {
    return lines.filter(line => line.name === lineName)[0];
  }

  lineLibrary.getLinePosition = (lineName) => {
    let currentLine = lineLibrary.getLine(lineName);

    if(lineName === first_line_name){
      return currentLine.gap;
    }
    else{
      return currentLine.gap + lineLibrary.getLinePosition(currentLine.baseLine);
    }

  }

  lineLibrary.process = (parentLineName) => {

    let nextLine = lineLibrary.lines.filter(line => line.baseLine === parentLineName)[0];
 
    if( nextLine.name === last_line_name ){
      let newLineName = Math.random().toString(36).substring(2, 8);

      lineLibrary.lines.push({ name: newLineName, baseLine:parentLineName, gap: Y_GAP });

      //TODO 
      let fixedLines = lines.map(line => {
        if(line.name === nextLine.name){ line.baseLine = newLineName }
        
        return line;
      })

      lineLibrary.setLines(fixedLines);
      return newLineName;
    }
    else{
      return nextLine.name;
    }

  }

  return lineLibrary;
}

export default LineManager;