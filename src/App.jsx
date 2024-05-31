import { useEffect } from "react";
import { useRef } from "react";
import { useCallback } from "react";
import { useState } from "react";
import { FaCopy } from "react-icons/fa";
import { toast } from "react-toastify";

export default function App() {
  const [password, setPassword] = useState("");
  const [length, setLength] = useState(12);
  const [includeNumber, setIncludeNumber] = useState(true);
  const [includeSymbol, setIncludeSymbol] = useState(true);
  const passwordRef = useRef(null);

  const generatePassword = useCallback(() => {
    let pass = "";
    let str = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    if (includeNumber) str += "0123456789";
    if (includeSymbol) str += "!@#$%^&*()_+";

    for (let i = 0; i < length; i++) {
      pass += str.charAt(Math.floor(Math.random() * str.length));
    }

    setPassword(pass);
  }, [length, includeNumber, includeSymbol, setPassword]);

  const copyToClipboard = useCallback(() => {
    passwordRef.current?.select();
    window.navigator.clipboard.writeText(password);
    toast.success("Password copied to clipboard");
  }, [password]);

  useEffect(generatePassword, [
    length,
    includeNumber,
    includeSymbol,
    generatePassword,
  ]);
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <div className="my-3">
          <h1 className="text-2xl font-semibold text-gray-800 text-center">
            PassGen
          </h1>
        </div>
        <div className="mb-4 flex items-center">
          <input
            type="text"
            value={password}
            ref={passwordRef}
            readOnly
            className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={copyToClipboard}
            className="ml-2 p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          >
            <FaCopy />
          </button>
        </div>
        <div className="mb-4">
          <label className="block mb-2 text-gray-600">Password Length</label>
          <input
            type="number"
            value={length}
            onChange={(e) => setLength(Number(e.target.value))}
            className="w-full p-2 border rounded-lg mb-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            min="1"
            max="128"
          />
          <input
            type="range"
            min="1"
            max="128"
            value={length}
            onChange={(e) => setLength(Number(e.target.value))}
            className="w-full cursor-pointer"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-600 mb-2 cursor-pointer">
            <input
              type="checkbox"
              checked={includeNumber}
              onChange={(e) => setIncludeNumber(e.target.checked)}
              className="mr-2 u"
            />
            Include Numbers
          </label>
          <label className="block text-gray-600 cursor-pointer">
            <input
              type="checkbox"
              checked={includeSymbol}
              onChange={(e) => setIncludeSymbol(e.target.checked)}
              className="mr-2"
            />
            Include Symbols
          </label>
        </div>
      </div>
    </div>
  );
}
