import axios from 'axios'
import store from '../store/index';
import router from '../router/index';

const Api = axios.create({
  baseURL: 'http://localhost:8000/api'
})

Api.interceptors.response.use((response) => {

  if (response.status === 401 || response?.data?.message?.startsWith('Unauthenticated.')) {
    console.log("You are not authorized");
    store.dispatch('auth_logout')
    router.push({ name: 'Login' })
  }
  return response;
}, (error) => {
  if (error.response && error.response.data) {
    
    if(error.response.status === 401) {
      store.dispatch('logout')
      router.push({ name: 'Login' })
    }
    return Promise.reject(error.response.data);
  }
  return Promise.reject(error.message);
});

Api.defaults.withCredentials = true

export default Api





