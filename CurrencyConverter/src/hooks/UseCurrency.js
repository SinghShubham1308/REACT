import { useEffect, useState } from "react";

function UseCurrency(currency) {
  const [data, setData] = useState({}); // State for storing API data

  console.log("currency:", currency); // Logs the currency value

  useEffect(() => {
    fetch(
      `https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/${currency}.json`
    )
      .then((res) => res.json())
      .then((res) => {
        console.log("Full API response:", res); // Log full response
        console.log("Fetched data:", res[currency]); // Log the specific currency data
        setData(res[currency]); // Update state with currency data
      })
      .catch((err) => {
        console.error("Fetch error:", err); // Log any errors
      });
  }, [currency]); // Dependency array ensures the effect runs when `currency` changes

  // Observe changes to the `data` state
  useEffect(() => {
    console.log("Updated data:", data); // Log the updated `data` state
  }, [data]);

  return data; // Return the data for the calling component
}

export default UseCurrency;
