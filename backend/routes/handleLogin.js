const handleLogin = async (e) => {
  e.preventDefault();

  try {
    const response = await fetch('http://localhost:5000/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ username, password })
    });

    const data = await response.json();

    if (data.success) {
      alert('Login successful!');
      navigate('/home', { state: { username } }); // Go to home
    } else {
      alert('Invalid credentials');
    }
  } catch (error) {
    console.error('Login error:', error);
    alert('Something went wrong. Please try again.');
  }
};
