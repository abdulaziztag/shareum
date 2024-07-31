import moment from 'moment';

export const getWeekDates = (inputDate: Date) => {
  const date = moment(inputDate);
  const startOfWeek = date.clone().startOf('week').add(1, 'day');

  return Array.from({ length: 7 }, (_, i) =>
    startOfWeek.clone().add(i, 'days').format('YYYY-MM-DD')
  );
};
