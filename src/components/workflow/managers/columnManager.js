import {useState} from 'react';

export default () => {
  const X_GAP = 200;

  const [columns, setColumns]  = useState( [{name:"central", gap: 260 }] )

  let columnLibrary = {};
  columnLibrary.columns = columns;
  columnLibrary.setColumns = setColumns;
  columnLibrary.central_column_name = "central";

  columnLibrary.getColumn = (columnName) => {
    return columns.filter(column => column.name === columnName)[0]
  }

  columnLibrary.getColumnPosition = (columnName) => {
    let currentColumn = columnLibrary.getColumn(columnName)

    return (columnName === "central") ? currentColumn.gap : (columnLibrary.getColumnPosition(currentColumn.baseColumn) + currentColumn.gap)
  }

  columnLibrary.getColumnGap = (currentIndex, totalLength) => {
    let middlePosition  = Math.ceil((totalLength/2))
    let currentPosition = currentIndex+1;
  
    if( currentPosition <  middlePosition){ 
      return -Math.abs(X_GAP); 
    }
    else if( currentPosition == middlePosition ){
      return (totalLength%2 === 0) ? -Math.abs(X_GAP) : 0;
    }   
  
    return X_GAP;
  } 

  columnLibrary.create = (currentIndex, totalLength, parentColumnName) => {
    let gapResult = columnLibrary.getColumnGap(currentIndex, totalLength)
    if(gapResult === 0) { return parentColumnName}
    
    let newColumnName = Math.random().toString(36).substring(2, 8);
    columns.push({name: newColumnName, baseColumn: parentColumnName, gap: gapResult})
    
    let columnAtTheSamePosition = columns.filter(c => columnLibrary.getColumnPosition(c.name) === columnLibrary.getColumnPosition(newColumnName) && c.name !== newColumnName)[0]
    if( columnAtTheSamePosition ){
      
      let fixedColumns = columns.map(column => {
        if( column.name === newColumnName ){
          column.baseColumn = columnAtTheSamePosition.name;
          column.gap = (column.gap > 0) ? -Math.abs(column.gap) : Math.abs(column.gap); 
        }
        else if( column.name === parentColumnName ){
          column.baseColumn = newColumnName;
        }

        return column;
      })

      setColumns(fixedColumns)
    }

    return newColumnName;
  }


  return columnLibrary;
}