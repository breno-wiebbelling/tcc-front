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

  lineLibrary.last_line_name = last_line_name;
  lineLibrary.lines = lines;
  lineLibrary.setLines = setLines;

  lineLibrary.getLine = (lineName) => {
    return lines.filter(line => line.name === lineName)[0];
  }

  lineLibrary.getBaseLine = (currentLineName) => {
    let currentLine = lines.find(line => line.name === currentLineName);
    return lineLibrary.getLine(currentLine.baseLine);
  }

  lineLibrary.getNextLine = (lineName) => {
    return lineLibrary.lines.find(line => line.baseLine === lineName);
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

    if(parentLineName === last_line_name){
      parentLineName = lines.find(line => line.name === last_line_name).baseLine;
    }

    let nextLine = lineLibrary.lines.find(line => line.baseLine === parentLineName);

    if( nextLine.name === lineLibrary.last_line_name ){
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

  lineLibrary.processGhostLine = (currentLineName) => {
    let lastLine = lines.find(line => line.name === currentLineName);
    let prevLine = lines.find(line => line.name === lastLine.baseLine);
  
    let newLineName = idGenerator();
    lines.push({ name:newLineName, baseLine:prevLine.name, gap: Y_GAP})

    let fixedLines = lines.map(line => {
      if(line.name === currentLineName){ line.baseLine = newLineName}
    })

    setLines(fixedLines);
    return newLineName;
  }

  lineLibrary.processConditionalGhostLine = (currentLineName) => {
    let lineBasedOnCurrentLine = lines.find(line => line.baseLine === currentLineName);
    
    let newLineName = idGenerator();
    lines.push({ name:newLineName, baseLine:lineBasedOnCurrentLine.baseLine, gap: Y_GAP})

    let fixedLines = lines.map(line => {
      if(line.name === lineBasedOnCurrentLine.name){ line.baseLine = newLineName}
    })

    setLines(fixedLines);
    return newLineName;
  }

  lineLibrary.remove = (lineName) => {

    if(lineName === last_line_name){ return }

    let fixedLines = lines;
    let removedLineIndex = lineLibrary.lines.findIndex(line => line.name === lineName);

    let removedLine = lineLibrary.lines[removedLineIndex];
    fixedLines.splice(removedLineIndex, 1);

    let nextLine = lineLibrary.getNextLine(removedLine.name);
    nextLine.baseLine = removedLine.baseLine;

    lineLibrary.setLines(fixedLines)
  }

  return lineLibrary;
}

export default LineManager;