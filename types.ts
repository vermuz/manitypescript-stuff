// Variable is tied to type and is looked at during compilation
let someString: string = "cool";
someString = 24323;

// Functions
let coolFunc = (a: string, b:number) => a + b;
coolFunc(someString, 3); // No complaints
coolFunc(someString, {}); // Passing an object to a function not expecting it

let userName: string = "Silver Surfer";
userName = ["Silver", "Surfer"];

// Inference happens from the bottom up
// UserId Function
let userId = (a: string, b:number): string => a + b;
// Remove annotation
let userId = (a: string, b:number) => a + b;
// Problem (String + number is not a Number)
// Compiler knows whats the return type is  a + b (bottom) from the function
// (up)
let userId = (a: string, b:number): number => a + b;
// HTML Element
let target: HTMLElement = document.getElementById("target");
target.onclick = (event: MouseEvent) => event.button;

// Annotating Variable with multiple types (Union type)
let thing: string | number;

let returnSomething = (someThing: string | number | string[] | boolean) => {
    return someThing;
};