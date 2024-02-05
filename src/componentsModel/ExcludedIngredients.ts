
export class ExcludedIngredients {
    id: number;
    title: string;
    productsInOrdersId: number;
  
    constructor(id: number, title: string, productsInOrdersId: number) {
      this.id = id;
      this.title = title;
      this.productsInOrdersId = productsInOrdersId;
    }
  }