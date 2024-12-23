import React, { useEffect, useState } from 'react'
import {  useLoaderData } from 'react-router'

export default function Github ()  {
    // const [data,setData]=useState({})
    // useEffect(() => {
    //   fetch('https://api.github.com/users/SinghShubham1308').then(response=>response.json().then(data=>{
    //     console.log(data);
    //     setData(data)
    //   }))
    // }, [])
    const data = useLoaderData();
    if (!data) {
        return <div>Loading...</div>;
    }
  return (
    <div className='text-center m-4 bg-gray-600 text-white p-4 text-3xl'>Github followers: {data.followers}
    <img src={data.avatar_url} alt="Git picture" width={300} />
    </div>
  )
}
export const githubInfoLoader = async () => {
    const response = await fetch('https://api.github.com/users/SinghShubham1308');
    if (!response.ok) {
        throw new Error('Failed to fetch GitHub data');
    }
    return response.json();
};


