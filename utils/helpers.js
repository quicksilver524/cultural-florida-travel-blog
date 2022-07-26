module.exports = {
    format_time: (date) => {
      return date.toLocaleTimeString();
    },
    format_date: (date) => {
      return `${new Date(date).getMonth() + 1}/${new Date(date).getDate()}/${
        new Date(date).getFullYear() + 5
      }`;
    },
    format_url: (url) => {
      return url;
    },
    format_plural: (attribute, val) => {
      return attribute + " " + val + " times";
    }
  };