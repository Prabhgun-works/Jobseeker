import {useState} from 'react';


export default function Login({onSubmit}) {
  const [userName, setUserName] = useState("");
  const [password , setPassword] = useState('');

  function handleSubmit() {
    onSubmit({userName , password})
  }
  return (
    <div className='container' >

        <h2>Login</h2>
        <form>
            <input placeholder='Enter UserName ' onChange={(e) => setUserName(e.target.value)}
                value={userName} type='text'></input>

            <input placeholder='Enter password' onChange={(e) => setPassword(e.target.value)}
            value={password} type='password'></input>
            <button onClick={(handleSubmit)}>Submit</button>
        </form>
    </div>
  )
}
// This Component is  a form that allows users to enter their username and password to log in.