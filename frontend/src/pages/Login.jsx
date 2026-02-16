import React, { useState } from 'react'

const Login = () => {
  // State to keep track if its Login or Sign Up
  const [currentState, setCurrentState] = useState('Login');

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async (event) => {
    event.preventDefault(); // Stop pageloading

    if (currentState === 'Sign Up') {
      try {
        const response = await fetch('http://localhost:8000/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            username: username,
            email: email,
            password: password, // Backend handels the hashing
            is_admin: false
          }),
        });

      const data = await response.json();

        if (response.ok) {
          console.log("Success:", data);
          alert("Account created")
          setCurrentState('Login'); // Switch to login part
        } else {
          console.error("Error:", data.details);
          alert(data.details || "ERROR")
        }
      } catch (error) {
        console.error("Network error:", error);
      }
    }
  };

  return (
    <form onSubmit={handleRegister} className='flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-14 gap-4 text-(--main-text-color)'>
      
      {/* HEADER */}
      <div className='inline-flex items-center gap-2 mb-10 mt-10'>
        <hr className='border-none h-[1.5px] w-8 bg-(--main-text-color)' />
        <p className='text-3xl uppercase font-semibold tracking-tighter'>
          {currentState}
        </p>
        <hr className='border-none h-[1.5px] w-8 bg-(--main-text-color)' />
      </div>

      {/* INPUT FIELD */}
      {/* Only show Name input when creating account */}
      {currentState === 'Login' ? '' : (
        <input 
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className='w-full px-4 py-3 border border-(--main-text-color) bg-transparent outline-none placeholder:uppercase placeholder:text-xs placeholder:tracking-widest' 
          placeholder='Name' 
          required 
        />
      )}

      <input 
        type="email" 
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className='w-full px-4 py-3 border border-(--main-text-color) bg-transparent outline-none placeholder:uppercase placeholder:text-xs placeholder:tracking-widest' 
        placeholder='Email' 
        required 
      />
      
      <input 
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className='w-full px-4 py-3 border border-(--main-text-color) bg-transparent outline-none placeholder:uppercase placeholder:text-xs placeholder:tracking-widest' 
        placeholder='Password' 
        required 
      />

      {/* HELP TEXT */}
      <div className='w-full flex justify-between text-xs -mt-2 uppercase tracking-tighter opacity-70'>
        <p className='cursor-pointer hover:text-(--hover-color)'>Forgot password?</p>
        
        {currentState === 'Login' 
          ? <p onClick={() => setCurrentState('Sign Up')} className='cursor-pointer hover:text-(--hover-color) font-bold'>Create account</p>
          : <p onClick={() => setCurrentState('Login')} className='cursor-pointer hover:text-(--hover-color) font-bold '>Login</p>
        }
      </div>

      {/* SIGN IN BUTTON */}
      <button type='submit' className='bg-(--main-text-color) text-(--second-text-color) font-bold uppercase px-10 py-3 mt-4 w-full hover:text-(--hover-color) active:scale-[0.98] transition-all'>
        {currentState === 'Login' ? 'Sign In' : 'Create Account'}
      </button>

    </form>
  );
}

export default Login;