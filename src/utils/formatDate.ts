type DateFormat = 'd-MM-yyyy' | 'hh:mm' | 'd-MM-yyyy hh:mm';

function formatDateInstance(date: Date, format: DateFormat) {
  let d: string = '';
  let MM: string = '';
  let yyyy: string = '';
  let hh: string = '';
  let mm: string = '';

  if (format.includes('hh:mm')) {
    hh = String(date.getHours()).padStart(2, '0');
    mm = String(date.getMinutes()).padStart(2, '0');
  }

  if (format.includes('d-MM-yyyy')) {
    d = String(date.getDate());
    MM = String(date.getMonth() + 1).padStart(2, '0');
    yyyy = String(date.getFullYear());
  }

  return format.replace('d-MM-yyyy', `${d}-${MM}-${yyyy}`).replace('hh:mm', `${hh}:${mm}`);
}

function formatDateString(string: string, format: DateFormat) {
  return formatDateInstance(new Date(string), format);
}

function formatDate(date: string | Date, format: DateFormat) {
  if (date instanceof Date) {
    return formatDateInstance(date, format);
  }

  return formatDateString(date, format);
}

export default formatDate;
