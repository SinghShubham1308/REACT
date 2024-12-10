import React, { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import App from './App.jsx'

// function MyApp(){
//     return (
//         <div>
//         <h1>this is my new  app test</h1>
//         </div>
//     )
// }

const ReactElement = {
  type: "a",
  props: {
    href: "https://www.google.com",
    target: "_blank",
  },
  children: "Click here to visit Google",
};

const username = "ke sath biscuit"

const newElement = (<a href="https://googke.com" target='_blank'>Visit google</a>)
const reactElement = React.createElement(
    'a',
    {href:"https://google.com", target:"_blank"},
    "click here to google",
    username
)
createRoot(document.getElementById('root')).render(

    // <App />
    // <MyApp/>
    // MyApp()
    // <NewElement/>
    // newElement
    reactElement

)
