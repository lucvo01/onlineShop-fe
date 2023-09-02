function formatDate(isoDateString) {
  const date = new Date(isoDateString);

  // Options for formatting the date
  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
    timeZoneName: "short"
  };

  // Convert the ISO date to the desired format
  const formattedDate = date.toLocaleDateString(undefined, options);

  return formattedDate;
}

export default formatDate;
