import { idGenerator } from '../../common/idManager'

export default () => {
  const X_GAP = 220;

  let columnLibrary = {};
  columnLibrary.columns = [{ name: "central", gap: X_GAP }];
  columnLibrary.central_column_name = "central";

  columnLibrary.getColumn = (columnName) => {
    return columnLibrary.columns.filter(column => column.name === columnName)[0]
  }

  columnLibrary.getColumnPosition = (columnName) => {
    if(typeof columnName === "undefined"){
      return 0
    }

    let currentColumn = columnLibrary.getColumn(columnName)

    return (columnName === "central") ? currentColumn.gap : (columnLibrary.getColumnPosition(currentColumn.baseColumn) + currentColumn.gap)
  }

  columnLibrary.getColumnGap = (currentIndex, totalLength) => {
    let middlePosition = Math.ceil((totalLength / 2))
    let currentPosition = currentIndex + 1;

    if (currentPosition < middlePosition) {
      return -Math.abs(X_GAP);
    }
    else if (currentPosition === middlePosition) {
      return (totalLength % 2 === 0) ? -Math.abs(X_GAP) : 0;
    }

    return X_GAP;
  }

  columnLibrary.create = (currentIndex, totalLength, parentColumnName, ifFoundCreate) => {
    let gapResult = columnLibrary.getColumnGap(currentIndex, totalLength)
    if (gapResult === 0) { return parentColumnName }

    let parentPosition = columnLibrary.getColumnPosition(parentColumnName);
    let columnPosition = parentPosition+gapResult;
    let newColumn = ({ name: idGenerator(), baseColumn: parentColumnName, gap: gapResult })
    let columnAtTheSamePosition = columnLibrary.columns.find(c => (columnLibrary.getColumnPosition(c.name) === columnLibrary.getColumnPosition(parentColumnName)+gapResult))

    if(columnAtTheSamePosition){

      if(typeof ifFoundCreate !== "undefined" && !ifFoundCreate){
        return columnAtTheSamePosition.name;
      }

      if(typeof columnAtTheSamePosition.baseColumn !== "undefined"){
        if(columnPosition <= 0){
          if(parentPosition <= columnPosition){
            newColumn.baseColumn = columnAtTheSamePosition.name;
            newColumn.gap = (newColumn.gap > 0) ? -Math.abs(newColumn.gap) : -Math.abs(newColumn.gap);
  
            columnLibrary.columns.map(c => {
              if(c.baseColumn === columnAtTheSamePosition.name){
                c.baseColumn = newColumn.name ;
              }
    
              return c;
            })
          }       
          else{
            newColumn.gap = (newColumn.gap > 0) ? -Math.abs(newColumn.gap) : -Math.abs(newColumn.gap);
  
            columnLibrary.columns.map(c => {
              if(c.name === columnAtTheSamePosition.name){
                c.baseColumn = newColumn.name ;
              }
    
              return c;
            })
          }
        }
        else{
          if(parentPosition >= columnPosition){
            newColumn.baseColumn = columnAtTheSamePosition.name;
            newColumn.gap = (newColumn.gap > 0) ? +Math.abs(newColumn.gap) : +Math.abs(newColumn.gap);
  
            columnLibrary.columns.map(c => {
              if(c.baseColumn === columnAtTheSamePosition.name){
                c.baseColumn = newColumn.name ;
              }
    
              return c;
            })
          }
          else{
            newColumn.gap = (newColumn.gap > 0) ? +Math.abs(newColumn.gap) : +Math.abs(newColumn.gap);
  
            columnLibrary.columns.map(c => {
              if(c.name === columnAtTheSamePosition.name){
                c.baseColumn = newColumn.name ;
              }
    
              return c;
            })
          }   
        }
      }
      else{
        
        columnLibrary.columns.map(c => {
          if(c.baseColumn === columnAtTheSamePosition.name && 
            (
              (parentPosition <= 0 && c.gap < 0) || (parentPosition >= 0 && c.gap > 0) 
            )
          ){
            c.baseColumn = newColumn.name;
          }

          return c;
        })

        newColumn.baseColumn = columnAtTheSamePosition.name;
        newColumn.gap = (newColumn.gap > 0) ? -Math.abs(newColumn.gap) : Math.abs(newColumn.gap);
      }
    }

    columnLibrary.columns.push(newColumn)
    return newColumn.name;
  }

  columnLibrary.getCentralColumn = (listOfColumns) => {
    try{
      const givenColumnsPositions = listOfColumns.map(cName => {
        return { name: cName, position: columnLibrary.getColumnPosition(cName) };
      });
      const positionsB = givenColumnsPositions.map(column => column.position);
      const averageB = positionsB.reduce((acc, pos) => acc + pos, 0) / positionsB.length;

      let closestPosition;
      let minDifference = Infinity;

      columnLibrary.columns.forEach((column) => {
        const difference = Math.abs( columnLibrary.getColumnPosition(column.name) - averageB);
        if (difference < minDifference) {
          minDifference = difference;
          closestPosition = column;
        }
      })
      return closestPosition;
    }catch(e){
      console.log(e)
      return null;
    }
    
  }

  columnLibrary.reset = () => {
    columnLibrary.columns = [{ name: "central", gap: 400 }]
  }
  
  return columnLibrary;
}