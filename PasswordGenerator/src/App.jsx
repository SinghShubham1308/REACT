import { useState, useCallback } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";

function App() {
  const [length, setLength] = useState(9);
  const [numAllowed, setNumAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState("");
  console.log("numallowed ",numAllowed,"charAllowed",charAllowed)
  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (numAllowed) str = str + "0123456789";
    if (charAllowed) str = str + "!@#$%^&*(){}[]~";
    for (let i = 0; i < array.length; i++) {
      let char = Math.floor(Math.random() * str.length() + 1);
      pass += str.charAt(char);
    }
    setPassword(pass);
  }, [length, numAllowed, charAllowed, setPassword]);
  return (
    <>
      <div className="w-full max-w-md mx-auto shadow-md rounded-lg px-4 my-8 bg-gray-700 text-orange-50">
        <h1 className="text-white text-center text-xl font-bold my-4">
          Password Generator
        </h1>
        <div className="flex shadow rounded-lg overflow-hidden mb-4">
          <input
            type="text"
            value={password}
            className="outline-none w-full py-2 px-3 bg-gray-800 text-white"
            placeholder="Generated Password"
            readOnly
          />
          <button
            className="bg-blue-500 text-white px-4 py-2 hover:bg-blue-600 transition"
            // onClick={copyPasswordToClipboard}
          >
            Copy
          </button>
        </div>

        <div className="mb-4">
          <label
            className="block text-white text-sm mb-2"
            htmlFor="passwordLength"
          >
            Password Length: <span id="passwordLengthValue">{length}</span>
          </label>
          <input
            type="range"
            min="9"
            max="100"
            value={length}
            className="slider w-full"
            id="passwordLength"
            onChange={(e) => {
              setLength(e.target.value);
            }}
          />
        </div>
        <div className="flex flex-col space-y-2">
          <label className="flex items-center text-sm text-white">
            <input
              type="checkbox"
              id="number"
              name="number"
              value="number"
              className="mr-2"
              onChange={(e) =>
                setNumAllowed(e.target.checked == true ? true : false)
              }
            />
            Include Numbers
          </label>
          <label className="flex items-center text-sm text-white">
            <input
              type="checkbox"
              id="special"
              name="special"
              value="special"
              className="mr-2"
              onChange={(e) =>
                setCharAllowed(e.target.checked == true ? true : false)
              }
            />
            Include Special Characters
          </label>
        </div>
        <div className="text-center mt-4">
          <button
            className="bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600 transition"
            // onClick={generatePassword}
          >
            Generate Password
          </button>
        </div>
      </div>
    </>
  );
}

export default App;
