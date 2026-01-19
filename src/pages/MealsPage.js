import { BasePage } from "../core/BasePage.js";
import { t } from "../core/i18n.js";
import { MealsView } from "../features/meals/components/MealsView.js";
import { SearchInput } from "../features/meals/components/SearchInput.js";
import { mealsService } from "../features/meals/services/mealsService.js";
import { MealsPageState } from "../features/meals/utils/MealsPageHelpers.js";

export class MealsPage extends BasePage {
  constructor() {
    super();
    this.state = new MealsPageState();
    this.setupGlobalHandlers();
  }

  setupGlobalHandlers() {
    window.handleAreaFilterChange = (area) => this.handleAreaFilter(area);
    window.handleCategoryClick = (cat) => this.handleCategoryFilter(cat);
    window.handleViewModeChange = (mode) => this.handleViewMode(mode);
  }

  getMeta() {
    return {
      title: t("meals"),
      subtitle: t("findPerfectRecipe"),
    };
  }

  template() {
    return `<div id="meals-page-container"></div>`;
  }

  async onMount() {
    this.containerEl = this.container.querySelector("#meals-page-container");
    this.state.subscribe(() => this.render());
    this.renderLoading();
    await this.loadInitialData();
  }

  renderLoading() {
    if (this.containerEl) {
      this.containerEl.innerHTML = MealsView.loading();
    }
  }

  async loadInitialData() {
    try {
      this.state.update({ loading: true });
      const { areas, categories, meals } = await mealsService.getInitialData();
      this.state.update({ areas, categories, meals, loading: false });
    } catch (e) {
      console.error(e);
      this.state.update({ loading: false });
    }
  }

  render() {
    const data = this.state.get();
    if (data.loading && !data.meals.length) {
      this.renderLoading();
      return;
    }

    this.containerEl.innerHTML = MealsView.page(data);
    this.renderSearchInput();
  }

  renderSearchInput() {
    const searchContainer = this.container.querySelector("#search-container");
    if (searchContainer) {
      new SearchInput({
        onSearch: (q) => this.handleSearch(q),
        placeholder: t("searchRecipes"),
      }).mount(searchContainer);
    }
  }

  async handleSearch(query) {
    this.state.update({ search: query, activeCategory: null, loading: true });
    const meals = await mealsService.search(query);
    this.state.update({ meals, loading: false });
  }

  async handleAreaFilter(area) {
    this.state.update({
      activeArea: area,
      search: "",
      activeCategory: null,
      loading: true,
    });
    const meals = await mealsService.byArea(area);
    this.state.update({ meals, loading: false });
  }

  async handleCategoryFilter(category) {
    this.state.update({
      activeCategory: category,
      search: "",
      activeArea: "All",
      loading: true,
    });
    const meals = await mealsService.byCategory(category);
    this.state.update({ meals, loading: false });
  }

  handleViewMode(mode) {
    this.state.update({ viewMode: mode });
  }

  cleanup() {
    window.handleAreaFilterChange = null;
    window.handleCategoryClick = null;
    window.handleViewModeChange = null;
  }
}
