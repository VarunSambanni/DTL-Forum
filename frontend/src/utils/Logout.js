const Logout = () => {
    localStorage.removeItem('username');
    localStorage.removeItem('userId');
    localStorage.removeItem('token');
    localStorage.removeItem('year');
    localStorage.removeItem('email');

    window.location.replace('http://localhost:3000/');
}

export default Logout; 