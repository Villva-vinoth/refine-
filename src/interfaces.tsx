// src/interfaces.ts

export interface IProduct {
    id?: number; // Optional for new products
    name: string;
    description: string;
    price: number;
    material: string;
    category: ICategory; // This should match the structure of your category data
  }
  
  export interface ICategory {
    id: number;
    title: string; // Assuming 'title' is the label displayed for the category
  }
  
  // You might also need these if you use status options
  export interface IStatus {
    id: string; // Unique identifier for the status
    label: string; // Label for the status
  }
  