import {idGenerator} from '../../common/idManager'

const first_line_name = "first";
const last_line_name = "last";
const Y_GAP = 120;

export { first_line_name, last_line_name }
const LineManager =  () => {
  let lineLibrary = {};

  lineLibrary.first_line_name = first_line_name;
  lineLibrary.last_line_name = last_line_name;
  lineLibrary.lines = [
    { name:first_line_name, gap: 0 },
    { name:last_line_name, baseLine:first_line_name, gap: Y_GAP }
  ];

  lineLibrary.getLine = (lineName) => {
    return lineLibrary.lines.filter(line => line.name === lineName)[0];
  }

  lineLibrary.getBaseLine = (currentLineName) => {
    let currentLine = lineLibrary.lines.find(line => line.name === currentLineName);
    return lineLibrary.getLine(currentLine.baseLine);
  }

  lineLibrary.getNextLine = (lineName) => {
    return lineLibrary.lines.find(line => line.baseLine === lineName);
  }

  lineLibrary.getLinePosition = (lineName) => {
    let currentLine = lineLibrary.getLine(lineName);

    if(lineName === first_line_name){
      return currentLine.gap+200;
    }
    else{
      return currentLine.gap + lineLibrary.getLinePosition(currentLine.baseLine);
    }
  }

  lineLibrary.process = (parentLineName) => {
    if(parentLineName === last_line_name){
      parentLineName = lineLibrary.lines.find(line => line.name === last_line_name).baseLine;
    }

    let nextLine = lineLibrary.lines.find(line => line.baseLine === parentLineName);

    if( nextLine.name === last_line_name ){
      let newLineName = idGenerator('line');

      lineLibrary.lines.push({ 
        name: newLineName, 
        baseLine: parentLineName, 
        gap: Y_GAP  
      });

      let fixedLines = lineLibrary.lines.map(line => {
        if(line.name === last_line_name){ line.baseLine = newLineName }
        return line;
      })

      lineLibrary.lines = fixedLines;

      return newLineName;
    }
    else{
      return nextLine.name;
    }
  }

  lineLibrary.processGhostLine = (currentLineName) => {
    let lastLine = lineLibrary.lines.find(line => line.name === currentLineName);
    let prevLine = lineLibrary.lines.find(line => line.name === lastLine.baseLine);
    
    let newLineName = idGenerator('ghostline');
    lineLibrary.lines.push({ name:newLineName, baseLine:prevLine.name, gap: Y_GAP})

    let fixedLines = lineLibrary.lines.map(line => {
      if(line.name === currentLineName){ line.baseLine = newLineName}
      return line;
    })

    lineLibrary.lines = (fixedLines);
    return newLineName;
  }

  lineLibrary.processConditionalGhostLine = (currentLineName) => {
    let lineBasedOnCurrentLine = lineLibrary.lines.find(line => line.baseLine === currentLineName);
    if(lineBasedOnCurrentLine.name.includes('condGhostLine')){
      return lineBasedOnCurrentLine.name
    }

    let newLineName = idGenerator('condGhostLine');
    lineLibrary.lines.push({ name:newLineName, baseLine:lineBasedOnCurrentLine.baseLine, gap: Y_GAP})

    let fixedLines = lineLibrary.lines.map(line => {
      if(line.name === lineBasedOnCurrentLine.name){ line.baseLine = newLineName}
      return line;
    })

    lineLibrary.lines = (fixedLines);
    return newLineName;
  }

  lineLibrary.remove = (lineName) => {

    if(lineName === last_line_name){ return }

    let fixedLines = lineLibrary.lines;
    let removedLineIndex = lineLibrary.lines.findIndex(line => line.name === lineName);

    let removedLine = lineLibrary.lines[removedLineIndex];
    fixedLines.splice(removedLineIndex, 1);

    let nextLine = lineLibrary.getNextLine(removedLine.name);
    nextLine.baseLine = removedLine.baseLine;

    lineLibrary.lines = (fixedLines)
  }

  lineLibrary.reset = () => {
    lineLibrary.lines = [
      { name:first_line_name, gap: 0 },
      { name:last_line_name, baseLine:first_line_name, gap: Y_GAP }
    ];
  }

  return lineLibrary;
}

export default LineManager;