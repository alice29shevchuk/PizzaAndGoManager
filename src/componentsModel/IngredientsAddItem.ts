export class IngredientsAddItem {
   id:number;
   name:string;
   idPizza:number;
   price:number;
   

  
    constructor(id:number, name:string, idPizza:number,price:number) {
      this.id = id;
      this.name = name;
      this.idPizza = idPizza;
      this.price = price;
    }
  }