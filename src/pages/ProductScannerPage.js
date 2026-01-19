import { BasePage } from "../core/BasePage.js";
import { DOM } from "../core/DOM.js";
import { t } from "../core/i18n.js";
import { ScannerView } from "../features/scanner/components/ScannerView.js";
import { scannerService } from "../features/scanner/services/scannerService.js";
import { ScannerState } from "../features/scanner/utils/ScannerHelpers.js";
import { Toast } from "../shared/components/Toast.js";

export class ProductScannerPage extends BasePage {
  constructor() {
    super();
    this.state = new ScannerState();
    this.setupGlobalHandlers();
  }

  setupGlobalHandlers() {
    window.logProduct = (id) => this.logProduct(id);
    window.handleScannerCategoryClick = (cat) => this.handleSearch(cat, false);
  }

  getMeta() {
    return {
      title: t("scanner"),
      subtitle: t("searchPackaged"),
    };
  }

  template() {
    return `<div id="scanner-page-container"></div>`;
  }

  onMount() {
    this.containerEl = DOM.query("#scanner-page-container", this.container);
    this.state.subscribe(() => this.render());
    this.render();
  }

  render() {
    if (!this.containerEl) return;
    const data = this.state.get();
    this.containerEl.innerHTML = ScannerView.page(data);
    this.attachEvents();
  }

  attachEvents() {
    const searchBtn = DOM.query("#search-btn", this.container);
    const lookupBtn = DOM.query("#lookup-btn", this.container);
    const searchInput = DOM.query("#product-search", this.container);
    const barcodeInput = DOM.query("#barcode-search", this.container);

    const doSearch = () => {
      const query = searchInput?.value;
      if (query) this.handleSearch(query, false);
    };

    if (searchBtn) DOM.on(searchBtn, "click", doSearch);
    if (searchInput) {
      DOM.on(searchInput, "keyup", (e) => {
        if (e.key === "Enter") doSearch();
      });
    }

    if (lookupBtn) {
      DOM.on(lookupBtn, "click", () => {
        const barcode = barcodeInput?.value;
        if (barcode) this.handleSearch(barcode, true);
      });
    }
  }

  async handleSearch(query, isBarcode) {
    this.state.update({
      search: query,
      lastSearchType: isBarcode ? "barcode" : "query",
      loading: true,
    });
    try {
      const products = await scannerService.search(query, isBarcode);
      this.state.update({ products, loading: false });
    } catch (e) {
      this.state.update({ loading: false });
    }
  }

  logProduct(id) {
    const product = scannerService.findProduct(this.state.get().products, id);
    if (scannerService.logProduct(product)) {
      this.showSuccess(id);
    }
  }

  showSuccess(productId) {
    const btn = DOM.query(`[data-product-btn="${productId}"]`);
    if (btn) {
      const originalText = btn.innerHTML;
      btn.classList.add("!bg-green-600", "!text-white");
      btn.innerHTML = `<i class="fa-solid fa-circle-check"></i> ${t("addedToLog")}`;

      setTimeout(() => {
        btn.classList.remove("!bg-green-600", "!text-white");
        btn.innerHTML = originalText;
      }, 2500);
    }

    Toast.show(`<i class="fa-solid fa-circle-check"></i> ${t("addedToLog")}`, {
      duration: 2500,
    });
  }

  cleanup() {
    window.logProduct = null;
    window.handleScannerCategoryClick = null;
  }
}
