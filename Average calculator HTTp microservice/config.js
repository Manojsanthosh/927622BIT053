const config = {
  port: process.env.PORT || 3000,
  windowSize: 10,
  requestTimeout: 500, 
  apiBaseUrl: 'http://20.244.56.144/evaluation-service',
  apiEndpoints: {
    p: '/primes',
    f: '/fibo',
    e: '/even',
    r: '/rand'
  }
};

module.exports = config;