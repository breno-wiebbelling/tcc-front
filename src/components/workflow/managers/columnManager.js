import { useState } from 'react';
import { idGenerator } from '../../common/idManager'

export default () => {
  const X_GAP = 300;

  let columnLibrary = {};
  columnLibrary.columns = [{ name: "central", gap: 400 }];
  columnLibrary.central_column_name = "central";

  columnLibrary.getColumn = (columnName) => {
    return columnLibrary.columns.filter(column => column.name === columnName)[0]
  }

  columnLibrary.getColumnPosition = (columnName) => {
    if(typeof columnName === "undefined"){
      console.log(columnName)
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

  columnLibrary.create = (currentIndex, totalLength, parentColumnName) => {
    let gapResult = columnLibrary.getColumnGap(currentIndex, totalLength)
    if (gapResult === 0) { return parentColumnName }

    let newColumnName = idGenerator();
    columnLibrary.columns.push({ name: newColumnName, baseColumn: parentColumnName, gap: gapResult })

    let columnAtTheSamePosition = columnLibrary.columns.filter(c => columnLibrary.getColumnPosition(c.name) === columnLibrary.getColumnPosition(newColumnName) && c.name !== newColumnName)[0]
    if (columnAtTheSamePosition) {

      let fixedColumns = columnLibrary.columns.map(column => {
        if (column.name === newColumnName) {
          column.baseColumn = columnAtTheSamePosition.name;
          column.gap = (column.gap > 0) ? -Math.abs(column.gap) : Math.abs(column.gap);
        }
        else if (column.name === parentColumnName) {
          column.baseColumn = newColumnName;
        }

        return column;
      })

      columnLibrary.columns = fixedColumns
    }

    return newColumnName;
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