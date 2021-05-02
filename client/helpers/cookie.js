import cookies from 'react-cookies';
import { ENV } from '../../config/LocalEnvironment';

const expires = new Date();
expires.setDate(expires.getDate() + 60);

const option = {
  path: '/',
  expires,
  
  domain: ENV.domain,
};

// only production using https only, comment these below if you not willing to use https
if (process.env.NODE_ENV === 'production') {
  option.secure = true;
  option.httpOnly = true;
}

export const clearStorage = (name) => {
  cookies.remove(name, { path: '/' });
};

export const setStorage = (name, value, settings = option) => {
  console.log(settings, "setting");
  cookies.save(name, value, settings);
};

export const getStorage = (name) => {
  console.log("get token", name);
  return cookies.load(name);
};
