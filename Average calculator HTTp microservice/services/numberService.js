const fetch = require('node-fetch');
const config = require('../config');
const authService = require('./authService');

class NumberService {
  constructor() {
    this.windows = {
      p: [], 
      f: [], 
      e: [], 
      r: []  
    };
  }

  async fetchNumbers(type) {
    if (!config.apiEndpoints[type]) {
      console.warn(`No API endpoint mapped for type: ${type}`);
      return [];
    }

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), config.requestTimeout);

    try {
      const token = await authService.getToken();
      const url = `${config.apiBaseUrl}${config.apiEndpoints[type]}`;
      
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      clearTimeout(timeout);
      
      if (!response.ok) {
        throw new Error(`API request failed with status: ${response.status}`);
      }

      const data = await response.json();
      return data.numbers || [];
    } catch (err) {
      clearTimeout(timeout);
      
      if (err.name === 'AbortError') {
        console.warn(`Request for ${type} numbers timed out after ${config.requestTimeout}ms`);
      } else {
        console.error(`Error fetching ${type} numbers:`, err.message);
      }
      
      return [];
    }
  }

  updateWindow(type, newNumbers) {
    const prevWindow = [...this.windows[type]];
    
    for (const num of newNumbers) {
      if (!this.windows[type].includes(num)) {
        this.windows[type].push(num);
        
        if (this.windows[type].length > config.windowSize) {
          this.windows[type].shift();
        }
      }
    }
    
    return {
      prevWindow,
      currWindow: [...this.windows[type]],
      newNumbers
    };
  }

  calculateAverage(numbers) {
    if (numbers.length === 0) return 0.00;
    
    const sum = numbers.reduce((acc, num) => acc + num, 0);
    return parseFloat((sum / numbers.length).toFixed(2));
  }

  async processNumberRequest(type) {
    const newNumbers = await this.fetchNumbers(type);
    
    const { prevWindow, currWindow, newNumbers: fetchedNumbers } = this.updateWindow(type, newNumbers);
    
    const avg = this.calculateAverage(currWindow);
    
    return {
      windowPrevState: prevWindow,
      windowCurrState: currWindow,
      numbers: fetchedNumbers,
      avg
    };
  }
}

module.exports = new NumberService();