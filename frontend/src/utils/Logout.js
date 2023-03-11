const Logout = () => {
    localStorage.removeItem('username');
    localStorage.removeItem('userId');
    localStorage.removeItem('token');
    localStorage.removeItem('year');
    localStorage.removeItem('email');
    localStorage.removeItem('isAuth');
    localStorage.removeItem('isAuthAdmin');
    localStorage.removeItem('lineChartData');
    window.location.replace('https://interax.netlify.app/');
}

export default Logout; 
