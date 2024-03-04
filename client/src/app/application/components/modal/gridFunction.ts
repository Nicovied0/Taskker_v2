export function getPositionInEndTimeOptions(endTime: string, gridStart: number,endTimeOptions:any): number {
    for (let i = 0; i < endTimeOptions.length; i++) {
      if (endTimeOptions[i] === endTime) {
        return gridStart + i;
      }
    }
    return -1; 
  }
  

  export function  generateArrayToIDDate(gridStart: number, positionEnd: number): string[] {
    const arrayToIDDate: string[] = [];
  
    for (let i = gridStart; i <= positionEnd; i++) {
      arrayToIDDate.push(i.toString());
    }
  
    return arrayToIDDate;
  }
  