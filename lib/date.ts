export const fromToday = (d: string): string => {

  const day = 24 * 60 * 60 * 1000;
  const now: any = new Date();
  const date: any = new Date(d).getSeconds();
  const timeDiff = now - date;
  const dayDiff = Math.round(timeDiff / day);
  if (dayDiff === 1) {
    return `${dayDiff} day ago`;
  } else if (dayDiff > 0) {
    return `${dayDiff} days ago`;
  }
  return "Today";
};
