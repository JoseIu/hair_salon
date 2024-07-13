import { format, parseISO } from 'date-fns';

export const formatDateLocal = (date: Date) => {
  const dateToString = date.toString();
  const parseDate = parseISO(dateToString);

  console.log({ parseDate });

  return format(parseDate, "yyyy-MM-dd'T'HH:mm");
};
