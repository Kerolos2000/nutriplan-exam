class ApiClient {
  constructor() {
    this.baseUrl = "https://nutriplan-api.vercel.app/api";
  }

  async request(endpoint, options = {}) {
    try {
      const response = await fetch(`${this.baseUrl}${endpoint}`, options);
      if (!response.ok) {
        const error = await response.json();
        throw error;
      }
      return await response.json();
    } catch (error) {
      console.error("API Request Error:", error);
      throw error;
    }
  }

  async searchMeals(query = "") {
    const data = await this.request(`/meals/search?q=${query}`);
    return data.results;
  }

  async fetchCategories() {
    const data = await this.request("/meals/categories");
    return data.results;
  }

  async fetchAreas() {
    const data = await this.request("/meals/areas");
    return data.results;
  }

  async filterByCategory(category) {
    const data = await this.request(
      `/meals/filter?category=${category}&limit=12`,
    );
    return data.results;
  }

  async filterByArea(area) {
    const data = await this.request(`/meals/filter?area=${area}&limit=12`);
    return data.results;
  }

  async fetchMealById(id) {
    const data = await this.request(`/meals/${id}`);
    return data.result || null;
  }

  async fetchNutritionData(recipeName, ingredients) {
    return this.request("/nutrition/analyze", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": "xRGnhxcXrKuX8hJpeeQE5Rac9b7dyQDpaMs5fWFL",
      },
      body: JSON.stringify({ recipeName, ingredients }),
    });
  }

  async searchProducts(query, barcode = false) {
    const endpoint = barcode
      ? `/products/barcode/${query}`
      : `/products/search?q=${query}`;
    const data = await this.request(endpoint);
    return barcode ? (data.result ? [data.result] : []) : data.results;
  }
}

export const api = new ApiClient();
