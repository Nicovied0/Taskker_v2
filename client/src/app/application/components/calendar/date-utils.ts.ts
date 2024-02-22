export function fixDateFormat(dateString: string): string {
    if (dateString.includes('T9:')) {
      return dateString.replace('T9:', 'T09:');
    }
    return dateString;
  }
  