export function formatDisplayTime(timeValue: string) {
  const [hourPart, minutePart = '00'] = timeValue.split(':');
  const hour = Number(hourPart);
  const minute = Number(minutePart);

  if (
    Number.isNaN(hour) ||
    Number.isNaN(minute) ||
    hour < 0 ||
    hour > 23 ||
    minute < 0 ||
    minute > 59
  ) {
    return timeValue;
  }

  const period = hour >= 12 ? 'PM' : 'AM';
  const displayHour = hour % 12 || 12;

  return `${String(displayHour).padStart(2, '0')}:${String(minute).padStart(
    2,
    '0',
  )} ${period}`;
}
