// a library to wrap and simplify api calls
import apisauce from 'apisauce';
import ResponseMiddleware from './ResponseMiddleware';


const create = (baseURL = 'http://localhost:3001/api/') => {
  // ------
  // STEP 1
  // ------
  //
  // Create and configure an apisauce-based api object.
  //
  const api = apisauce.create({
    // base URL is read from the "constructor"
    baseURL,
    // here are some default headers
    headers: {
      'Cache-Control': 'no-cache'
    },
    // 10 second timeout...
    timeout: 10000
  });

  /**
   * Middleware for manipulating API responses
   * @type {ResponseMiddleware}
   */
  const resMiddleware = new ResponseMiddleware(api);

  /**
   * Runs a method to handle API request before sending
   * via user friendly error messages
   */
  resMiddleware.handleRequest();

  /**
   * Runs a method to handle API response
   * via user friendly error messages
   */
  resMiddleware.handleResponse();

  // ------
  // STEP 2
  // ------
  //

  const login = data => api.post('accounts/login?include=user', data);

  // Account
  const getAccount = data => api.get(`/accounts/${data}`);
  const updateAccount = (userId, data) => api.patch(`/accounts/${userId}`, data);
  const changePasswordAccount = data => api.post('/accounts/change-password', data);

  // Register
  const Register = data => {
    api.post('accounts', { name: data.name, field: data.field, password: data.password, email: data.email, role: 'client', description: data.description })
      .catch(error => console.log('failed to insert '));
    api.get('accounts', { email: data.email }).then(response => {
      console.log(response.data);
      console.log('Found Email');
      for (const account of response.data) {
        console.log('here');
        if (account.email === data.email) {
          const Aid = account.id;
          console.log(account.id);
          console.log('found');
          api.post('Ratings', { userID: Aid })
            .catch(error => console.log('failed to insert '));
          break;
        }
      }
    });
  };
  const createTag = data => {
    api.post('tags', { name: data.Tag })
      .catch(error => console.log('failed to insert '));
  };
  const Rate = data => {
    let count = 1;
    let total = 5;
    let newRate = 5;
    api.post('Comments', { message: data.message, Report: data.Report, Rating: data.Rating, UserID: '5ae0a9f623fb3b08cc492334' })
      .catch(error => console.log('failed to insert '));
    api.get('Comments', { UserID: '5ae0a9f623fb3b08cc492334' }).then(response => {
      for (const comment of response.data) {
        if (comment.UserID === '5ae0a9f623fb3b08cc492334') {
          count += 1;
          total += comment.Rating;
          newRate = total / count;
        }
      }
      api.get('Ratings', { userID: '5ae0a9f623fb3b08cc492334' }).then(response1 => {
        console.log(response1.data);
        for (const rate of response1.data) {
          if (rate.userID === '5ae0a9f623fb3b08cc492334') {
            console.log(rate.userID);
            console.log(rate.id);
            api.put(`Ratings/${rate.id}`, { userID: rate.userID, rate: newRate })
              .catch(error => console.log('failed to insert '));
            break;
          }
        }
      });
    });
  };
  return {
  // a list of the API functions from step 2
    login,

    // Account
    getAccount,
    updateAccount,
    changePasswordAccount,
    createTag,
    // Register
    Register,
    // Rate
    Rate


  };
};

export default {
  create
};
