export class IngredientsAddItem {
   id:number;
   name:string;
   pizzaId:number;
   price:number;
   

  
    constructor(id:number, name:string,price:number,idPizza:number) {
      this.id = id;
      this.name = name;
      this.pizzaId = idPizza;
      this.price = price;
    }
  }