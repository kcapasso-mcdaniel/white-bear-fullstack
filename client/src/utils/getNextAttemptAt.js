import addDate from "date-fns/add";
import formatDate from "date-fns/format";

export default (level, lastAttemptAt) => {
   // dictionary - key value pairs that identity something in a search
   const levelDuration = {
      1: { minutes: 10 },
      2: { hours: 3 },
      3: { days: 1 },
      4: { days: 3 },
      5: { weeks: 1 },
      6: { weeks: 2 },
      7: { weeks: 5 },
      8: { weeks: 20 },
      9: { years: 1 },
      10: { years: 2 },
      11: { years: 4 },
      12: { years: 8 },
   };

   const nextAttemptAt = addDate(lastAttemptAt, levelDuration[level]);
   //    formatDate takes two arguments format(date, format)
   const timeStamp = Number(formatDate(nextAttemptAt, "T"));
   return timeStamp;
};
