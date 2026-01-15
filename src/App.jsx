import { useEffect, useState } from 'react'
import './App.css'
import './index.css'


function App() {
  const [password, setPassword] = useState("");
  const [passwordLength, setPasswordLength] = useState(8);
  const [useSymbols, setUseSymbols] = useState(true);
  const [useNumbers, setUseNumbers] = useState(true);
  const [useUpperCase, setUseUpperCase] = useState(true);
  const [useLowerCase, setUseLowerCase] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const strengthCount  = [useNumbers, useSymbols, useLowerCase, useUpperCase].filter(Boolean).length;
  let strength = "";
  let strengthColor = "";
  if (strengthCount === 4 || passwordLength >= 30){
    strength = "STRONG"
    strengthColor = "green";
  } 
  else if (strengthCount === 3 || passwordLength >= 20) {
    strength = "MEDIUM"
    strengthColor = "yellow";
  }
  else if (strengthCount === 2 || passwordLength >= 10){ 
    strength = "WEAK"
    strengthColor = "orange";
  }
  else if (strengthCount === 1 || passwordLength >= 0) {
    strength = "VERY WEAK"
    strengthColor = "red";
  }
  // const randomValue = () => String.fromCharCode(Math.random() * 26 + 65) + Math.floor((Math.random() * 10))
  const generatePassword = () => {
  let charset = "";
  let newPassword = "";

  if (useNumbers) charset += "0123456789";
  if (useUpperCase) charset += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  if (useLowerCase) charset += "abcdefghijklmnopqrstuvwxyz";
  if (useSymbols) charset += "!@#$%^&*()";

  if (!charset) return;

  for (let i = 0; i < passwordLength; i++) {
    newPassword += charset.charAt(
      Math.floor(Math.random() * charset.length)
    );
  }

  setPassword(newPassword);
};

useEffect(() => {
  document.body.className = isDarkMode ? "dark" : "light"
})


  return (
    <>
    <div>
    <button className='toggle-theme bg-gray-400 p-1 rounded-full m-2'>
      <span onClick={() => setIsDarkMode(true)}  className={`inline-block m-1 p-2 rounded-full cursor-pointer transition ${isDarkMode ? "bg-black text-white" : "bg-white text-black opacity-50"}`}>
        <svg  width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M22 15.8442C20.6866 16.4382 19.2286 16.7688 17.6935 16.7688C11.9153 16.7688 7.23116 12.0847 7.23116 6.30654C7.23116 4.77135 7.5618 3.3134 8.15577 2C4.52576 3.64163 2 7.2947 2 11.5377C2 17.3159 6.68414 22 12.4623 22C16.7053 22 20.3584 19.4742 22 15.8442Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </span>
      <span onClick={() => setIsDarkMode(false)}  className={`inline-block  m-1 p-2 rounded-full cursor-pointer transition ${!isDarkMode ?"bg-black text-white" : "bg-white text-black opacity-50"}`}>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
              d="M12 2V4M12 20V22M4 12H2M6.31412 6.31412L4.8999 4.8999M17.6859 6.31412L19.1001 4.8999M6.31412 17.69L4.8999 19.1042M17.6859 17.69L19.1001 19.1042M22 12H20M17 12C17 14.7614 14.7614 17 12 17C9.23858 17 7 14.7614 7 12C7 9.23858 9.23858 7 12 7C14.7614 7 17 9.23858 17 12Z"
              stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
          />
      </svg>
      </span>
    </button>
      
    <div className='container text-center mt-12.5 max-w-120 mx-auto my-0'>
      <div className="password-gen">
        <h2 className='text-[16px] font-bold'>Password Generator</h2>
        <div className="box px-[2.2rem] py-[1.4rem] m-6 text-left">
           <p className='text-[28px] font-medium'> {password || "P4$5W0rD!"} </p>
        </div>
        <div className="length px-[2.2rem] py-[1.4rem] m-6 text-left">
          <div className="pass-length flex justify-between p-1">
            <h2 className='text-[16px]'>Password Length</h2>
            <label className='text-[22px] font-semibold'>{passwordLength}</label>
          </div>
          <input type="range" name="" id="" min={2} max={32} value={passwordLength} onChange={(e) => setPasswordLength(e.target.value)} className='w-full'/>
          <div className="select-box flex flex-col gap-2">
            <label className='cursor-pointer'>
              <input type="checkbox" checked={useUpperCase} onChange={() => setUseUpperCase(!useUpperCase)} className='mr-2'/>
              Include UpperCase Letters
            </label>
            <label className='cursor-pointer'>
              <input type="checkbox" checked={useLowerCase} onChange={() => setUseLowerCase(!useLowerCase)} className='mr-2'/>
              Include Lowercase Letters
            </label>
            <label className='cursor-pointer'>
              <input type="checkbox" checked={useNumbers} onChange={() => setUseNumbers(!useNumbers)} className='mr-2'/>
              Include Numbers
            </label>
            <label className='cursor-pointer'>
              <input type="checkbox" checked={useSymbols} onChange={() => setUseSymbols(!useSymbols)} className='mr-2'/>
              Include Symbols
            </label>
          </div>
          <div className="strength flex justify-between items-center bg-[#8080804d] px-1.75 py-2.5 my-3">
          <span className='font-normal text-[14px]'>STRENGTH</span>
          <span className='font-bold text-[18px]' style={{color: strengthColor}}> {strength}</span>
          </div> 
          <button onClick={() => generatePassword()} className='w-full'>
            <div className="result text-center font-semibold p-2 m-auto  cursor-pointer">GENERATE</div></button>
        </div>
      </div>
    </div>
    </div>
    </>
  )
}

export default App
