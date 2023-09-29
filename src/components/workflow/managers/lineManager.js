import {useState} from 'react';
import {idGenerator} from '../../common/idManager'

const first_line_name = "first";
const last_line_name = "last";
const Y_GAP = 150;

export { first_line_name, last_line_name }
const LineManager =  () => {
  let lineLibrary = {};

  const [lines, setLines] = useState([
    { name:first_line_name, gap: 0 },
    { name:last_line_name, baseLine:first_line_name, gap: Y_GAP }
  ]);

  lineLibrary.getLines = () => {
    return lines;
  }

  lineLibrary.setLines = setLines;

  lineLibrary.getLine = (lineName) => {
    return lines.filter(line => line.name === lineName)[0];
  }

  lineLibrary.getNextLine = (lineName) => {
    return lines.find(line => line.baseLine === lineName);
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

    let nextLine = lines.filter(line => line.baseLine === parentLineName)[0];
    
    if( nextLine.name === last_line_name ){
      let newLineName = idGenerator();

      lines.push({ 
        name: newLineName, 
        baseLine: parentLineName, 
        gap: Y_GAP  
      });

      let fixedLines = lines.map(line => {
        if(line.name === last_line_name){ line.baseLine = newLineName }
        return line;
      })

      lineLibrary.setLines(fixedLines);
      return newLineName;
    }
    else{
      return nextLine.name;
    }
  }

  lineLibrary.processGhostLine = () => {
    let lastLine = lines.find(line => line.name == last_line_name);
    let prevLine = lines.find(line => line.name == lastLine.baseLine);

    let newLineName = idGenerator();
    lines.push({ name:newLineName, baseLine:prevLine.name, gap: Y_GAP})

    let fixedLines = lines.map(line => {
      if(line.name == last_line_name){ line.baseLine = newLineName}
    })

    setLines(fixedLines);
    return newLineName;
  }

  lineLibrary.remove = (lineName) => {
    let fixedLines = lines;

    let removedLineIndex = lines.findIndex(line => line.name === lineName);
    let removedLine = lines[removedLineIndex];
    fixedLines.splice(removedLineIndex, 1);

    let nextLine = lineLibrary.getNextLine(removedLine.name);
    nextLine.baseLine = removedLine.baseLine;

    setLines(fixedLines)
  }

  return lineLibrary;
}

export default LineManager;