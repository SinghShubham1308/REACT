import { useEffect, useState } from "react";

function UseCurrency(currency) {
  const [data, setData] = useState({}); // State for storing API data
  useEffect(() => {
    fetch(
      `https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/${currency}.json`
    )
      .then((res) => res.json())
      .then((res) => setData(res[currency]))
      console.log("response ",data)
  }, [currency]) // Dependency array ensures the effect runs when `currency` changes
  console.log("data is ",data);
  
  return data; // Return the data for the calling component
}
export default UseCurrency;
