import { api } from "../../../shared/services/api.js";
import { storageService } from "../../../shared/services/storage.js";
import { toProductLogEntry } from "../utils/productLogEntry.js";

export class ScannerService {
  async search(query, isBarcode) {
    return await api.searchProducts(query, isBarcode);
  }

  logProduct(product) {
    if (product) {
      storageService.addLog(toProductLogEntry(product));
      return true;
    }
    return false;
  }

  findProduct(products, id) {
    return products.find(
      (p) =>
        p &&
        ((p._id && p._id.toString() === id.toString()) ||
          (p.code && p.code.toString() === id.toString()) ||
          (p.id && p.id.toString() === id.toString()) ||
          (p.barcode && p.barcode.toString() === id.toString())),
    );
  }
}

export const scannerService = new ScannerService();
