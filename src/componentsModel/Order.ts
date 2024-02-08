import { ProductsInOrders } from "./ProductsInOrders";
export class Order {
    id: number;
    numberOfOrder: string;
    idUser: string;
    name: string;
    email: string;
    phoneNumber: string;
    productsInOrders: ProductsInOrders[];
    totalPrice: number;
    comment: string;
    paymentMethod: string;
    orderData: string;
    city: string;
    department: string;
    isDone: boolean;
   
    constructor(
      id: number,
      numberOfOrder: string,
      idUser: string,
      name: string,
      email: string,
      phoneNumber: string,
      productsInOrders: ProductsInOrders[],
      totalPrice: number,
      comment: string,
      paymentMethod: string,
      orderData: string,
      city: string,
      department: string,
      isDone: boolean
      
      ) {
        this.id = id;
        this.numberOfOrder = numberOfOrder;
        this.idUser = idUser;
        this.name = name;
        this.email = email;
        this.phoneNumber = phoneNumber;
        this.productsInOrders = productsInOrders;
        this.totalPrice = totalPrice;
        this.comment = comment;
        this.paymentMethod = paymentMethod;
        this.orderData = orderData;
        this.city = city;
        this.department = department;
        this.isDone = isDone;

        console.log(this);
        
      }
   }