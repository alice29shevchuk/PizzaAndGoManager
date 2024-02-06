import {Ingredient} from './Ingredient'
import {IngredientsAddItem} from './IngredientsAddItem'
import {IngredientsExcept} from './IngredientsExcept'
class Pizza
{
    id: number;
    imageUrl: string;
    title: string;
    price: number;
    category: number;
    rating: number;
    weight: number;
    ingredients: Ingredient[];
    sauce: string;
    ingredientsAdd: IngredientsAddItem[];
    ingredientsExcepts: IngredientsExcept[];
    isPopular: boolean;

    constructor(id: number,imageUrl: string,title: string,price: number, category: number,rating: number,weight: number,ingredients: Ingredient[],sauce: string,ingredientsAdd: IngredientsAddItem[],ingredientsExcepts: IngredientsExcept[],isPopular: boolean) {
        this.id = id;
        this.imageUrl = imageUrl;
        this.title = title;
        this.price = price;
        this.category = category;
        this.rating = rating;
        this.weight =weight;
        this.ingredients = ingredients;
        this.sauce = sauce;
        this.ingredientsAdd = ingredientsAdd;
        this.ingredientsExcepts = ingredientsExcepts;
        this.isPopular = isPopular;
    }

    setpizza(value: Pizza) {
        this.id = value.id;
        this.imageUrl = value.imageUrl;
        this.title = value.title;
        this.price = value.price;
        this.category = value.category;
        this.rating = value.rating;
        this.weight = value.weight;
        this.ingredients = value.ingredients;
        this.sauce = value.sauce;
        this.ingredientsAdd = value.ingredientsAdd;
        this.ingredientsExcepts = value.ingredientsExcepts;
        this.isPopular = value.isPopular;
      }

    UpdateIngredient(idIngredient: number, newTitle: string): void{
        this.ingredients.forEach(x => {
            if(x.id == idIngredient){
                x.name = newTitle;
            }
        });
    }

    AddNewIngredient(title:string): void{
        // const id:number = (this.ingredients[this.ingredients.length-1].id+1);
        const idPizza:number = this.id;
        console.log(title);
        
        this.ingredients.push({ id:0, name: title, pizzaId:idPizza });
    }

    AddNewIngredientAdd(title:string, price:number){
        // const id:number = (this.ingredients[this.ingredients.length-1].id+1);
        const idPizza:number = this.id;      
        const numericPrice: number = price;
        this.ingredientsAdd.push({ id:0, name: title,price:numericPrice, pizzaId:idPizza });
    }

    AddNewIngredientExcept(title:string): void{
        // const id:number = (this.ingredients[this.ingredients.length-1].id+1);
        const idPizza:number = this.id;
        this.ingredientsExcepts.push({ id:0, name: title, pizzaId:idPizza });
    }

    DeleteIngridient(id:number):void{
        this.ingredients = this.ingredients.filter(
            (ingredient) => ingredient.id !== id
        );
    }

    getIngredients(): Ingredient[] {
        return this.ingredients;
    }

    getPizza(): Pizza{
        return this
    }

    convertToJSON(){
        return JSON.stringify(this);
    }
}
export {Pizza};