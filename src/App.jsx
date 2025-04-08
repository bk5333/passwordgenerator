import { useState, useCallback, useEffect, useRef } from "react";
// import "./App.css";

function App() {
  const [length, setLength] = useState(8);
  const [numberAllow, setNumberAllow] = useState(false);
  const [charAllow, setCharAllow] = useState(false);
  const [password, setPassword] = useState("");

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (numberAllow) str += "0123456789";
    if (charAllow) str += "!@#$%^&*()_+[]{}|;:,.<>?`~-=/";

    for (let i = 0; i < length; i++) {
      pass += str.charAt(Math.floor(Math.random() * str.length));
    }
    setPassword(pass);
  }, [length, numberAllow, charAllow, setPassword]);

  useEffect(() => {
    passwordGenerator();
  }, [length, numberAllow, charAllow, passwordGenerator]);

  const passwordRef = useRef(null);

  const copyPasswordToClipboard = useCallback(() => {
    passwordRef.current.select();
    passwordRef.current.setSelectionRange(0, 99999); // For mobile devices
    window.navigator.clipboard.writeText(password);
  }, [password]);

  return (
    <>
      <div className="h-screen flex items-center justify-center bg-gray-900">
        <div className="w-full max-w-max mx-auto shadow-md rounded-lg p-8 m-4 font-bold text-orange-500 bg-gray-800">
          <h1 className="text-3xl text-center text-white mb-5">
            Password Generator
          </h1>
          <div className="flex shadow rounded-lg overflow-hidden mb-4">
            <input
              type="text"
              value={password}
              className="w-full py-1 px-3 text-gray-900 font-medium bg-white"
              placeholder="Password"
              readOnly
              ref={passwordRef}
            />
            <button
              className="outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0 cursor-pointer hover:bg-blue-600 transition duration-200"
              onClick={copyPasswordToClipboard}
            >
              Copy
            </button>
          </div>
          <div className="flex text-sm gap-x-2">
            <div className="flex items-center gap-x-1">
              <input
                type="range"
                min={8}
                max={30}
                value={length}
                className="cursor-pointer"
                onChange={(e) => {
                  setLength(e.target.value);
                }}
              />
              <label>Length : {length}</label>
            </div>
            <div className="flex items-center gap-x-1">
              <input
                type="checkbox"
                defaultChecked={numberAllow}
                id="numberInput"
                className="cursor-pointer"
                onChange={() => {
                  setNumberAllow((prev) => !prev);
                }}
              />
              <label htmlFor="numberInput">Numbers</label>
            </div>
            <div className="flex items-center gap-x-1">
              <input
                type="checkbox"
                defaultChecked={charAllow}
                id="charInput"
                className="cursor-pointer"
                onChange={() => {
                  setCharAllow((prev) => !prev);
                }}
              />
              <label htmlFor="charInput">Special Characters</label>
            </div>
          </div>
          {/* <button
            className="bg-blue-700 text-white px-3 py-1 mt-5 rounded-lg cursor-pointer hover:bg-blue-600 transition duration-200 flex items-center gap-x-1 mx-auto"
            onClick={passwordGenerator}
          >
            Generate
          </button> */}
        </div>
      </div>
    </>
  );
}

export default App;
