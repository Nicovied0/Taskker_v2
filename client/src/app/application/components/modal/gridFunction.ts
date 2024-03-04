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
  
  // export function generateWeekTask(array: string[], days: string[]): string[] {
  //   const result: string[] = [];
  
  //   console.log(array)
  //   console.log(days)
  //   if (days.length === 0) {
  //     return result;
  //   }
  
  //   const firstDayIndex = getDayIndex(days[0]); // Obtener el índice del primer día de la semana
  //   if (firstDayIndex !== -1) {
  //     const startNumber = firstDayIndex * 100; // Calcular el número base para el primer día
  //     const blockLength = array.length; // Longitud del bloque de números
  
  //     console.log(startNumber)
  //     for (let i = 0; i < days.length; i++) {
  //       const currentDayIndex = getDayIndex(days[i]);
  //       if (currentDayIndex !== -1) {
  //         const currentStartNumber = currentDayIndex * 100; // Calcular el número base para el día actual
  //         for (let j = 0; j < blockLength; j++) {
  //           const num = parseInt(array[j], 10);
  //           result.push((currentStartNumber + num).toString());
  //         }
  //       }
  //     }
  //   }
  //   console.log(result)
  
  //   return result;
  // }
  
  // // Función para obtener el índice de un día de la semana
  // function getDayIndex(day: string): number {
  //   const daysOfWeek = ['Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado', 'Domingo'];
  //   return daysOfWeek.indexOf(day.charAt(0).toUpperCase() + day.slice(1).toLowerCase());
  // }
  
  

  export function generateWeekTask(array: string[], days: string[]): string[] {
    const result: string[] = [];
  
    if (days.length === 0) {
      return result;
    }
  
    const groupKeys = array.map(num => num.slice(-2)); // Obtener los últimos dos dígitos de cada elemento en el arreglo array
  
    days.forEach(day => {
      switch (day.toLowerCase()) {
        case 'lunes':
          result.push(...groupKeys.map(key => (parseInt(key)).toString()));
          break;
        case 'martes':
          result.push(...groupKeys.map(key => (100 + parseInt(key)).toString()));
          break;
        case 'miercoles':
          result.push(...groupKeys.map(key => (200 + parseInt(key)).toString()));
          break;
        case 'jueves':
          result.push(...groupKeys.map(key => (300 + parseInt(key)).toString()));
          break;
        case 'viernes':
          result.push(...groupKeys.map(key => (400 + parseInt(key)).toString()));
          break;
        case 'sabado':
          result.push(...groupKeys.map(key => (500 + parseInt(key)).toString()));
          break;
        case 'domingo':
          result.push(...groupKeys.map(key => (600 + parseInt(key)).toString()));
          break;
        default:
          break;
      }
    });
  
    console.log(result)
    return result;
}

