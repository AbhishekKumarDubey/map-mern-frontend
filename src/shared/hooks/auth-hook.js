import { useState, useCallback, useEffect } from 'react';
//import { useHistory } from 'react-router';

let logoutTimer;

export const useAuth = () => {
  const [token, setToken] = useState();
  const [userId, setUserId] = useState();
  const [tokenExpirationDate, setTokenExpirationDate] = useState();

  //const history = useHistory();

  const login = useCallback((uid, token, expirationDate) => {
    setToken(token);
    setUserId(uid);
    const expDate =
      expirationDate || new Date(new Date().getTime() + 1000 * 60 * 60);
    setTokenExpirationDate(expDate);

    localStorage.setItem(
      'userData',
      JSON.stringify({
        uid,
        token,
        expiration: new Date(expDate).toISOString()
      })
    );
  }, []);

  const logout = useCallback(() => {
    setToken(null);
    setUserId(null);
    setTokenExpirationDate(null);
    localStorage.removeItem('userData');
    //if (history) history.push('/');
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (token && tokenExpirationDate) {
      const remainingTime =
        new Date(tokenExpirationDate).getTime() - new Date().getTime();
      logoutTimer = setTimeout(logout, remainingTime);
    } else {
      clearTimeout(logoutTimer);
    }
  }, [token, tokenExpirationDate, logout]);

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('userData'));

    if (
      userData &&
      userData.token &&
      new Date(userData.expiration) > new Date()
    ) {
      login(userData.uid, userData.token, userData.expiration);
    }
  }, [login]);

  return { token, login, logout, userId };
};
