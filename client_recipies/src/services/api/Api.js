import { base } from './base/base';

class Api {
  constructor() {
    this.headers = {
      'Content-Type': 'application/json',
    };
  }

  async login(data) {
    return await base.post('/users/login', data, {
      headers: this.headers,
    });
  }

  async register(data) {
    return await base.post('/users/register', data, {
      headers: this.headers,
    });
  }

  async getTopRecipes() {
    return await base.get('/recipies/top/ten/', {
      headers: this.headers,
    });
  }

  async getRecipes() {
    return await base.get('/recipies/', {
      headers: this.headers,
    });
  }

  async getRecipesByUser(token) {
    return await base.getWithoutEnsureJSON('/recipies/byUser/', {
      headers: {
        'x-access-token': `Bearer ${token}`,
      },
    });
  }

  async createRecipe(data, token) {
    return await base.post('/recipies', data, {
      headers: {
        ...this.headers,
        'x-access-token': `Bearer ${token}`,
      },
    });
  }

  async editRecipe(data, token, id) {
    return await base.put(`/recipies/${id}`, data, {
      headers: {
        ...this.headers,
        'x-access-token': `Bearer ${token}`,
      },
    });
  }

  async deleteRecipe(id, token) {
    return await base.delete(`/recipies/${id}`, {
      headers: {
        'x-access-token': `Bearer ${token}`,
      },
    });
  }

  async commentRecipe(id, data) {
    return await base.post(`/recipies/comment/${id}`, data, {
      headers: this.headers,
    });
  }

  async responseComment(rid, cid, data, token) {
    return await base.post(`/recipies/response/${rid}/${cid}/`, data, {
      headers: {
        ...this.headers,
        'x-access-token': `Bearer ${token}`,
      },
    });
  }

  async qualifyRecipe(id, data) {
    return await base.post(`/recipies/qualify/${id}/`, data, {
      headers: this.headers,
    });
  }
}

export const api = new Api();
