const config = require('../config');

class AuthService {
  constructor() {
    this.accessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiZXhwIjoxNzQ4MDY3ODMzLCJpYXQiOjE3NDgwNjc1MzMsImlzcyI6IkFmZm9yZG1lZCIsImp0aSI6ImQ2Mjg2Zjc5LTk1N2ItNGY3Ny05ODMwLWQ0ZGU4YzQzYWZhYSIsInN1YiI6IjkyNzYyMmJpdDA1M0Bta2NlLmFjLmluIn0sImVtYWlsIjoiOTI3NjIyYml0MDUzQG1rY2UuYWMuaW4iLCJuYW1lIjoibWFub2oga3VtYXIgciIsInJvbGxObyI6IjkyNzYyMWJpdDA1MyIsImFjY2Vzc0NvZGUiOiJ3aGVRVXkiLCJjbGllbnRJRCI6ImQ2Mjg2Zjc5LTk1N2ItNGY3Ny05ODMwLWQ0ZGU4YzQzYWZhYSIsImNsaWVudFNlY3JldCI6IkVFa2JLVXBzeUJLbWtVd0IifQ.9AiPMF69bCp7I7NDq3RATkJRjmpM7fdtdQf2FvZ7y4Y';
  }

  async getToken() {
    return this.accessToken;
  }

  setToken(token) {
    this.accessToken = token;
  }
}

module.exports = new AuthService();