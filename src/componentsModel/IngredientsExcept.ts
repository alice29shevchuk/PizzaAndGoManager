export class IngredientsExcept {
   id:number;
   name:string;
   pizzaId:number
  
    constructor(id:number, name:string,pizzaId:number) {
      this.id = id;
      this.name = name;
      this.pizzaId = pizzaId;
    }
  }