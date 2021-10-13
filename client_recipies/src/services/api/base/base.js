import axios from 'axios';

class Base {
  constructor() {
    this.url = 'http://localhost:4000/api';
    this.service = axios.create({
      baseURL: this.url,
    });
  }

  async apiCall(request) {
    try {
      return (await request()).data;
    } catch (e) {
      console.error(e);
      return e?.response?.data;
    }
  }

  async get(to, config) {
    return await this.apiCall(() => this.service.get(to, { data: {} }, config));
  }

  async getWithoutEnsureJSON(to, config) {
    return await this.apiCall(() => this.service.get(to, config));
  }

  async post(to, data, config) {
    return await this.apiCall(() => this.service.post(to, data, config));
  }

  async put(to, data, config) {
    return await this.apiCall(() => this.service.put(to, data, config));
  }

  async delete(to, config) {
    return await this.apiCall(() => this.service.delete(to, config));
  }
}

export const base = new Base();
