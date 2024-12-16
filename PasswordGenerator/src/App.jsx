import { useState, useCallback, useEffect, useRef } from "react";

function App() {
  const [length, setLength] = useState(9);
  const [numAllowed, setNumAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState("");
  const [copy,setCopy] = useState("Copy");

  const passwordRef = useRef(null);

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (numAllowed) str += "0123456789";
    if (charAllowed) str += "!@#$%^&*(){}[]~";

    for (let i = 0; i < length; i++) {
      const char = Math.floor(Math.random() * str.length);
      pass += str.charAt(char);
    }
    setPassword(pass);
    setCopy("Copy"); // Reset the label when a new password is generated
  }, [length, numAllowed, charAllowed]);

  const copyPasswordToClipboard = useCallback(() => {
    if (passwordRef.current) {
      passwordRef.current.select(); // Select the input text
      passwordRef.current.setSelectionRange(0, password.length); // Ensure the full range is selected
      window.navigator.clipboard.writeText(password).then(() => {
        setCopy("Copied!")
        // alert("Password copied to clipboard!");
        setTimeout(() => setCopy("Copy"), 2000);
      });
    } 
  }, [password]);

  useEffect(() => {
    passwordGenerator();
  }, [length, numAllowed, charAllowed, passwordGenerator]);

  return (
    <>
      <div className="w-full max-w-md mx-auto shadow-md rounded-lg px-4 my-8 bg-gray-700 text-orange-50">
        <h1 className="text-white text-center text-xl font-bold my-4">
          Password Generator
        </h1>
        <div className="flex shadow rounded-lg overflow-hidden mb-4">
          <input
            type="text"
            ref={passwordRef} // Assign the ref here
            value={password}
            className="outline-none w-full py-2 px-3 bg-gray-800 text-white"
            placeholder="Generated Password"
            readOnly
          />
          <button
            className="bg-blue-500 text-white px-4 py-2 hover:bg-blue-600 transition"
            onClick={copyPasswordToClipboard}
          >
            {copy}
          </button>
        </div>

        <div className="mb-4">
          <label className="block text-white text-sm mb-2" htmlFor="passwordLength">
            Password Length: <span id="passwordLengthValue">{length}</span>
          </label>
          <input
            type="range"
            min="9"
            max="20"
            value={length}
            className="slider w-full"
            id="passwordLength"
            onChange={(e) => setLength(parseInt(e.target.value, 10))}
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
              onChange={(e) => setNumAllowed(e.target.checked)}
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
              onChange={(e) => setCharAllowed(e.target.checked)}
            />
            Include Special Characters
          </label>
        </div>

        <div className="text-center mt-4">
          <button
            className="bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600 transition"
            onClick={passwordGenerator}
          >
            Generate Password
          </button>
        </div>
      </div>
    </>
  );
}

export default App;
