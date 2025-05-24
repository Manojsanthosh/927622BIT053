const numberService = require('../services/numberService');
const authService = require('../services/authService');

const numberController = {
  async getNumbers(req, res) {
    try {
      const { numberid } = req.params;
      const { token } = req.headers;
      const validTypes = ['p', 'f', 'e', 'r'];
      
      if (!validTypes.includes(numberid)) {
        return res.status(400).json({ 
          error: 'Invalid number type',
          message: 'Number type must be one of: p (prime), f (fibonacci), e (even), r (random)'
        });
      }

      if (token) {
        authService.setToken(token);
      }
      
      const result = await numberService.processNumberRequest(numberid);
      
      res.json(result);
    } catch (error) {
      console.error('Error in number controller:', error);
      res.status(500).json({ 
        error: 'Internal server error',
        message: 'An unexpected error occurred while processing your request'
      });
    }
  }
};

module.exports = numberController;