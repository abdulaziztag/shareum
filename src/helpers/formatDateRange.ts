import moment from 'moment';

export const formatDateRange = (dates: string[]) => {
  const startDate = moment(dates[0]);
  const endDate = moment(dates[dates.length - 1]);

  const startMonth = startDate.format('MMM');
  const endMonth = endDate.format('MMM');

  const startDay = startDate.date();
  const endDay = endDate.date();

  return startMonth === endMonth
    ? `${startMonth} ${startDay}-${endDay}`
    : `${startMonth} ${startDay} - ${endDay} ${endMonth}`;
};
