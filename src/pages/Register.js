import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();

  const handleRegister = () => {
    if (password !== confirmPassword) {
      alert('رمز عبور و تأیید رمز عبور یکسان نیستند.');
      return;
    }

    const user = { email, password };
    localStorage.setItem('user', JSON.stringify(user));
    alert('ثبت‌نام با موفقیت انجام شد.');

    navigate('/login'); // هدایت به صفحه ورود
  };

  return (
    <div style={{ color: 'white', textAlign: 'center' }}>
      <h2>Register</h2>
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
      <input
        type="password"
        placeholder="Confirm Password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        style={{ display: 'block', margin: '10px auto' }}
      />
      <button onClick={handleRegister} style={{ marginTop: '20px' }}>Register</button>
    </div>
  );
}

export default Register;
