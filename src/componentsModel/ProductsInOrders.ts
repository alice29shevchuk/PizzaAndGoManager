import { SelectedIngredient } from "./SelectedIngredient";
import { ExcludedIngredients } from "./ExcludedIngredients";
export class ProductsInOrders {
    id: number;
    title: string;
    selectedIngredients: SelectedIngredient[];
    excludedIngredients: ExcludedIngredients[];
    selectedSauce: string;
    price: number;
    count: number;
    ordersId: number;
  
    constructor(id: number, title: string, selectedIngredients: SelectedIngredient[], excludedIngredients: ExcludedIngredients[], selectedSauce: string, price: number, count: number, ordersId: number) {
      this.id = id;
      this.title = title;
      this.selectedIngredients = selectedIngredients;
      this.excludedIngredients = excludedIngredients;
      this.selectedSauce = selectedSauce;
      this.price = price;
      this.count = count;
      this.ordersId = ordersId;
    }
  }