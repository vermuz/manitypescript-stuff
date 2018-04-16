// Variable is tied to type and is looked at during compilation
var someString = "cool";
someString = 24323;
// Functions
var coolFunc = function (a, b) { return a + b; };
coolFunc(someString, 3); // No complaints
coolFunc(someString, {}); // Passing an object to a function not expecting it
var userName = "Silver Surfer";
userName = ["Silver", "Surfer"];
// Inference happens from the bottom up
// UserId Function
var userId = function (a, b) { return a + b; };
// Remove annotation
var userId = function (a, b) { return a + b; };
// Problem (String + number is not a Number)
// Compiler knows whats the return type is  a + b (bottom) from the function
// (up)
var userId = function (a, b) { return a + b; };
// HTML Element
var target = document.getElementById("target");
target.onclick = function (event) { return event.button; };
// Annotating Variable with multiple types (Union type)
var thing;
var returnSomething = function (someThing) {
    return someThing;
};
var returnSomething = function (someThing) { return someThing; };
console.log(returnSomething);
