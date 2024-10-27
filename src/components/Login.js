import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = () => {
    const user = JSON.parse(localStorage.getItem('user'));

    if (user && user.email === email && user.password === password) {
      navigate('/home'); // به صفحه اصلی هدایت شوید
    } else {
      alert('ایمیل یا رمز عبور اشتباه است.');
    }
  };

  return (
    <div style={{ color: 'white', textAlign: 'center' }}>
      <h2>Login</h2>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        style={{ display: 'block', margin: '10px auto' }}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        style={{ display: 'block', margin: '10px auto' }}
      />
      <button onClick={handleLogin} style={{ marginTop: '20px' }}>Login</button>
    </div>
  );
}

export default Login;
