import { useEffect, useState } from "react"

const App = () => {
  const [allUsers, setAllUsers] = useState([]);

  const [nameInput, setNameInput] = useState("");
  const [emailInput, setEmailInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const [avatarUrlInput, setAvatarUrlInput] = useState("");

  const [loginEmailInput, setLoginEmailInput] = useState("");
  const [loginPasswordInput, setLoginPasswordInput] = useState("");

  const [token, setToken] = useState("");

  useEffect(() => {
    const getUsers = async() => {
      try {
        const response = await fetch('https://api.escuelajs.co/api/v1/users');
        const users = await response.json();
        setAllUsers(users);
      } catch(err) {
        console.log(err);
      }
    }

    getUsers();
  }, []);


  const createUser = async(event) => {
    event.preventDefault();

    try {
      const response = await fetch('https://api.escuelajs.co/api/v1/users/', {
        method: 'POST',
        headers: {
          'Content-Type': "application/json"
        },
        body: JSON.stringify({
          name: nameInput,
          email: emailInput,
          password: passwordInput,
          avatar: avatarUrlInput
        })
      });

      const newUser = await response.json();
  
      setAllUsers([...allUsers, newUser]);

      setNameInput("");
      setEmailInput("");
      setPasswordInput("");
      setAvatarUrlInput("");

    } catch(err) {
      console.log(err);
    }
  }

  const login = async(event) => {
    event.preventDefault();
    try {
      const response = await fetch('https://api.escuelajs.co/api/v1/auth/login', {
        method: 'POST',
        headers: {
          "Content-Type": 'application/json'
        },
        body: JSON.stringify({
          email: loginEmailInput,
          password: loginPasswordInput
        })
      });

      const json = await response.json();
      const accessToken = json.access_token;
      console.log(accessToken);
      setToken(accessToken);
    } catch(err) {
      console.log(err);
    }
  }

  const fetchUser = async() => {
    try {
      const response = await fetch('https://api.escuelajs.co/api/v1/auth/profile', {
        mathod: 'GET',
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        }
      });

      const json = await response.json();
      console.log(json);
    } catch(err) {
      console.log(err);
    }
  }

  return (
    <>
      <h1>Users</h1>

      <h2>Log In</h2>

      <form onSubmit={login}>
        <input 
          value={loginEmailInput}
          onChange={(event) => { setLoginEmailInput(event.target.value) }}
          placeholder="email" 
        />
        <input
          value={loginPasswordInput}
          onChange={(event) => { setLoginPasswordInput(event.target.value) }}
          placeholder="password" 
        />
        <button>Log In</button>
      </form>


      <button onClick={fetchUser}>Find Me</button>


      <h2>Create a New User</h2>

      <form onSubmit={createUser}>
        <input 
          value={nameInput} 
          onChange={(event) => { setNameInput(event.target.value) }} 
          placeholder="name" 
        /> <br />
        <input 
          value={emailInput}
          onChange={(event) => { setEmailInput(event.target.value) }}
          placeholder="email" 
        /> <br />
        <input 
          value={passwordInput}
          onChange={(event) => { setPasswordInput(event.target.value) }}
          placeholder="password" 
        /> <br />
        <input
          value={avatarUrlInput}
          onChange={(event) => { setAvatarUrlInput(event.target.value) }}
          placeholder="avatar url" 
        /> <br />
        <button>Create User</button>
      </form>

      <h2>List of Users</h2>
      <ul>
      {
        allUsers.map((user) => {
          return <li key={user.id}>{user.name} - {user.email} - {user.password} - {user.role}</li>
        })
      }
      </ul>
    </>
  )
}

export default App
