import moment from "moment";
// eslint-disable-next-line
export default {
  track: {
    distKM: (d) => {
      return d.toFixed(2) + " Km";
    },

    averageSpeed: (dist, h) => {
      var x = (dist * 3600) / h;
      return x.toFixed(2) + " Km/h";
    },

    secondsToHms: (d) => {
      if(d === 0) return "0 seconds"
      d = Number(d);
      var h = Math.floor(d / 3600);
      var m = Math.floor((d % 3600) / 60);
      var s = Math.floor((d % 3600) % 60);

      var hDisplay = h > 0 ? h + (h === 1 ? " hour, " : " hours, ") : "";
      var mDisplay = m > 0 ? m + (m === 1 ? " minute, " : " minutes, ") : "";
      var sDisplay = s > 0 ? s + (s === 1 ? " second" : " seconds") : "";
      return hDisplay + mDisplay + sDisplay;
    },
  },
  tracks: {
    filterTracksByDate: (records, dates) => {
      records.sort(function (a, b) {
        // Turn your strings into dates, and then subtract them
        // to get a value that is either negative, positive, or zero.
        return new Date(a.attributes.date) - new Date(b.attributes.date);
      });

      var filteredTracks = records.filter(
        (el) =>
          moment(dates.dateFrom).isBefore(moment(el.attributes.date)) &&
          moment(el.attributes.date).isBefore(moment(dates.dateTo))
      );

      return filteredTracks;
    },
  },
};
