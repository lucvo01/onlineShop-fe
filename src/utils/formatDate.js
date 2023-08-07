// import React from "react";

function formatDate(isoDateString) {
  // const isoDateString = "2023-08-05T21:23:52.134Z";
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

  return (
     formattedDate
    
  );
}

export default formatDate;
