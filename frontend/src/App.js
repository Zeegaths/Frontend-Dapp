import React, { useState } from "react"
import "./index.css"
import contractABI from "./abi.json"
const { ethers } = require("ethers")

function App() {
  const [inputMovieTitle, setInputMovieTitle] = useState("")
  const [inputReleaseYear, setInputReleaseYear] = useState("")
  const [updatedDetails, setUpdatedDetails] = useState('')
  const [popMessage, setPopMessage] = useState(false)

  const contractAddress = "0x35447Cc3043FA6F88a761C2DA6bf7852Ea8BfB0e"
 

  async function requestAccount() {
    await window.ethereum.request({ method: 'eth_requestAccounts' });
  }
  
  async function updateTitle() {
    console.log("updateDetails function called")
    if (typeof window.ethereum !== 'undefined') {
      await requestAccount();

      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const contract = new ethers.Contract(contractAddress, contractABI, signer);
  
      try {
        const tx = await contract.updateTitle(inputMovieTitle);
        await tx.wait();
        setPopMessage(true)
        setInputMovieTitle("")
        setTimeout(() => {
          setPopMessage(false)
        }, 2000) 
      } catch (err) {
        console.error('Error:', err);
      }
    }
  }

  async function updateYear() {
    console.log("updateDetails function called")
    if (typeof window.ethereum !== 'undefined') {
      await requestAccount();

      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const contract = new ethers.Contract(contractAddress, contractABI, signer);
  
      try {
        const tx = await contract.updateYear(inputReleaseYear);
        await tx.wait();
        setPopMessage(true);
        setInputReleaseYear("")
        setTimeout(() => {
          setPopMessage(false)
        }, 2000) 
      } catch (err) {
        console.error('Error:', err);
      }
    }
  }

  async function getMovieLists () {
    if (typeof window.ethereum !== 'undefined') {
      await requestAccount();
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const contract = new ethers.Contract(contractAddress, contractABI, signer);
  
      try {
        const details = await contract.getMovieLists();
        const [movieTitle, releaseYear] = details;
        setUpdatedDetails(`${movieTitle}, ${releaseYear}`)
      } catch (err) {
        console.error('Error:', err);
      }
    }
  }

  return (
    <div className="h-[100vh] flex justify-center items-center">
      <div className="bg-gray-400 p-8 rounded-lg">
     <div>
      <input 
      type="text" 
      placeholder="Type movie title" 
      value={inputMovieTitle}
      onChange={(e) => {
        setInputMovieTitle(e.target.value)}}
      className="border rounded-md mb-4 outline-none px-4 py-2 block"
      />
      <button onClick={updateTitle} className="border bg-black block text-white px-6 py-2 rounded-md mb-4">Update</button>
     </div>
     <div>
     <input 
      type="text" 
      placeholder="Type release year" 
      value={inputReleaseYear}
      onChange={(e) => {
        setInputReleaseYear(e.target.value)}}
      className="border rounded-md mb-4 outline-none px-4 py-2 block"
      />
      <button onClick={updateYear} className="border bg-black block text-white px-6 py-2 rounded-md mb-4">Update</button>
     </div>
     <div>
      <button onClick={getMovieLists} className="border bg-black block text-white px-6 py-2 rounded-md mb-4">Get Details</button>
     </div>
     <p>{updatedDetails}</p>
    </div>
    {popMessage && ( <div className='absolute top-0 bg-black rounded-md p-4 text-white'>
      <p>Message has been set successfully</p>
     </div>
     )}
    </div>
  )  
}

export default App;
