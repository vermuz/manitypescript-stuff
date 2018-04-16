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

// Using Aliases
type thing = string | number | string[] | boolean;
let returnSomething = (someThing: thing) => someThing;
console.log(returnSomething);

// Type Guards
type thing = string | number | string[] | boolean;
let returnSomething = (someThing: thing) => {
    // typeof, instanceof are type guards
    if (typeof someThing === "string" ||
        typeof someThing === "number" ||
        typeof someThing === "boolean") {
            console.log("something = ", someThing);
    }
    if (someThing instanceof Array) {
        let joinedThings = "";
        someThing.forEach((thing) => {
            joinedThings += ` ${thing}`;
        });
        console.log("joinedThings", joinedThings);
    }
};

// Union typing object with not objects - is going to cause errors
type stuff = string | {name: string;};
let givemeStuff = (stuff: stuff) => {
    typeof stuff === "string";
    typeof stuff.name === "string"; // Not gonna happen since stuff is also a string
    // and string does not have a name property
};

// Union typing object literals that dont share a common type is going to cause errors
// Compiler will get mad because there is no common type
type coolStuff = {name: string;} | {id: number;}; // Two objects with different params
let giveCoolStuff = (thing: coolStuff) => {
    if (typeof thing.name === "string") { return thing.name; }
    if (typeof thing.id === "number") { return thing.id; }
};

// Compiler will let you get away with common properties
type coolStuff = {cool: string; meh: string;} | {cool: string; lame: string;};
let giveCoolStuff = (test: coolStuff) => {
    return test.cool || test.lame;
};

// Annotating variable as a string type
let unit: string;
// This can be set to anything
let unit: string = "Test1";
// String literal type
let miles: "MILES";
// This can only be set to
let miles: "MILES" = "MILES";
let miles: "MILES" = null;
let miles: "MILES" = undefined;

// Use string literals for type aliasing
type distanceMeteric = "MILES" | "KILOMETERS" | "METERS";
function movChar(distance: number, value: distanceMeteric) {
    console.log(`You moved ${distance} ${value}`);
};
movChar(1, "MILES");
movChar(1, "mani"); // will cause error

// Type Checking to describe shape of a value
let superHero: { secretIdentity: string; alias: string; health: number; };
let superVillain: { secretIdentity: string; alias: string; health: number; };
//--------------- Interface usage--------------------------------------------
// We want our characters to be able to attack but a character may not
// belong to the comic book and wants to be able to attack
// Interfaces describe the shape of a value

interface AttackFunction {
    // Inlining a type is still an interface
    (opponent: { alias: string; health: number; }, attackWith: number): number;
}

interface MegaTron {
    alias: string;
    health: number;
    attack: AttackFunction;
}

interface OptionalAttributes {
    strength?: number;
    insanity?: number;
    anger?: number;
    healingSpeed?: number;
}

interface BookCharacter extends OptionalAttributes {
    secretIdentity?: string; // ? -> optional
    alias: string;
    health: number;
    attack: AttackFunction;
}

function attackFunc(opponent, attackWith) {
    opponent.health -= attackWith;
    console.log(`${this.alias} attacked ${opponent.alias}, who's health = ${opponent.health}`);
    return opponent.health;
}

let superHero: BookCharacter = {
    alias: "Test Hero 1",
    health: 2000,
    attack: attackFunc
};
let superVillain: BookCharacter = {
    secretIdentity: "mumraa",
    alias: "Test Villia 1",
    health: 2000,
    attack: attackFunc
}

function getSecretId(character: BookCharacter) {
    if (character.secretIdentity) {
        console.log(`${character.alias} is ${character.secretIdentity}`);
    } else {
        console.log(`${character.alias} has no secrets.`);
    }
}

getSecretId(superHero);

// TypeScript class is a function
// Functions are objects
interface Opponent {
    alias: string;
    health: number;
}

class BookCharacter {
    // Properties (they are public by default)
    alias: string;
    health: number;
    strength: number;
    private secretIdentity: string;
    // Methods
    attackFunc(opponent: Opponent, attackWith: number) {
        opponent.health -= attackWith;
        console.log(`${this.alias} attacked ${opponent.alias} who has now health ${opponent.health}`);
    }

    // To ensure private property got set, method to retrieve it
    getSecretIdentity() { console.log(`${this.secretIdentity}`); }

    constructor(alias: string, health: number, strength: number, secretIdentity: number) {
        this.alias = alias;
        this.health = health;
        this.strength = strength;
        this.secretIdentity = secretIdentity;
    }
}

let spiderMan = new BookCharacter("spidey", 100, 100, "ooo aaa");
// spiderMan.alias = "spidey";
// spiderMan.health = 100;
// spiderMan.strength = 100;
// spiderMan.secretIdentity = "ooo aaa";

let xMan = new BookCharacter("x MAN!!!", 100, 100, "Mercury");
// xMan.alias = "x MAN!!!";
// xMan.health = 100;
// xMan.strength = 100;
// xMan.secretIdentity = "Mercury";

// Lets play with it
spiderMan.attackFunc(xMan, spiderMan.health);
spiderMan.getSecretIdentity();
// **********************
// SHORTHAND CONSTRUCTOR
// **********************
interface Opponent {
    alias: string;
    health: number;
}
// Class Book Character
class BookCharacter {
    // Private class property
    private team: {
        name: string,
        members: BookCharacter[]
    };
    attackFunc(opponent: Opponent, attackWith: number) {
        opponent.health -= attackWith;
        console.log(`${this.alias} attacked ${opponent.alias} who has now health ${opponent.health}`);
    }
    // To ensure private property got set, method to retrieve it
    getSecretIdentity() { console.log(`${this.secretIdentity}`); }
    // Shorthand constructor in TS
    // Adding access params to constructor let the class know that
    // that they are properties of a class
    constructor(
        public alias: string, public health: number, public strength: number,
        private secretIdentity: string
    ) {}

    // Static properties are associated with class not the instance
    // This method will return an object
    static createAndAssignTeam(teamName: string, members: BookCharacter[]) {
        let team = {
            name: teamName,
            members: members
        };
        members.forEach((member) => {
            member.team = team;
        });
    }
    // Get Team name
    getTeamName() { console.log(`${this.alias} is on ${this.team.name}`);}
}
let spiderMan = new BookCharacter("spidey", 100, 100, "ooo aaa");
let xMan = new BookCharacter("x MAN!!!", 100, 100, "Mercury");
spiderMan.attackFunc(xMan, spiderMan.health);
spiderMan.getSecretIdentity();
// Cannot call static method via instance.
// spiderMan.createTeam(); // Not possible
BookCharacter.createAndAssignTeam("oddExample", [spiderMan, xMan]);
// Static methods cannot be called by instances but they can update
// Instance private members

//----------------------------------------------------------------------------
// Sharing Class Behavior with inheritance
//----------------------------------------------------------------------------
class BookCharacter {
    // Note we are using the shorthand
    // Constructor with public properties and one private property
    constructor(
        public alias: string, public health: number, public strength: number,
        protected secretIdentity: string
    ) {}
}

class SuperHero extends BookCharacter {
    pros = ["kind", "moral"];
    // Protected can be accessed inside a derived class
    getSecretIdentity() { console.log(this.secretIdentity); }
}
class SuperVillain extends BookCharacter {
    cons = ["evil", "pats a cat constantly"];

    constructor(a, b, c, d) {
        // Reference to parent constructor
        // These values are set at instantiation and then the super class
        // gets all it needs
        super(a, b, c, d);
        console.log(`${this.alias} eats bugs!!!`)
    }
}

let x1 = new SuperHero("XXX", 23, 3, "HH");
let x2 = new SuperVillain("XXX1", 33, 4, "HHH1");

console.log(x1);
console.log(x2);
console.log(x2.getSecretIdentity());


// ----------------------------------------------
// Using assertion to convert types
// ----------------------------------------------

interface SuperHero {
    powers: string[];
    savesDay: () => void;
}

let jumper: SuperHero = {
    powers: ["time travler"],
    savesDay() { console.log(`Jumper ${this.powers} to save day`)};
}

interface SuperVillain {
    badActions: string[];
    getRandomBadAction: () => string;
    commitBadAction: () => void;
}

let baddie: SuperVillain = {
    badActions: ["Attacks anywhere, anytime", "Run around"],
    getRandomBadAction() { return this.badActions[Math.floor(Math.random() * this.badActions.length)]; },
    commitBadAction() { console.log(`Baddie ${this.getRandomBadAction()}`);}
};

function saveDayOrBadGuy(something: SuperHero | BadGuy) {
    // Assertion is our way of telling compiler that we know something
    // about a type that the compiler doesnt
    // Type Assertions are compile time assertion - only valid at compile time
    if ((something as SuperHero).powers) {
        (something as SuperHero).savesDay();
    } else {
        (something as SuperVillain).commitBadAction();
    }
}

// Notes for Type Assertion
// ------------------------
// Type Assertion way 1
// if ((something as SuperHero).powers) {}
// Type Assertion way 2
// if ((<SuperHero>something).powers) {}


// ----------------------
// Generics
// ----------------------
function pushSomethingIntoCollect(something, collection) {
    collection.push(something);
    console.log(collection);
}

// Two objects
let j1 = { name: "J1" };
let j2 = { name: "J2" };
// Two arrays
let superHeroes = [j1];
let powers = ["teleportation", "ss"];

pushSomethingIntoCollect(j2, superHeroes);
pushSomethingIntoCollect("claws", powers);

// ------------------
// Use Generics
// ------------------

// We want to be able to push to write something into the array
function pushSomethingIntoCollect<T>(something: T, collection: T[]) {
    collection.push(something);
    console.log(collection);
}

// Two objects
let j1 = { name: "J1" };
let j2 = { name: "J2" };
// Two arrays
let superHeroes = [j1];
let powers = ["teleportation", "ss"];

interface SuperHero { name: string; }

pushSomethingIntoCollect<SuperHero>(j2, superHeroes);
pushSomethingIntoCollect<string>("claws", powers);

//---------------------------------
// Practical Generics in Typescript
//---------------------------------

interface Croc { personality: string; }
interface Tax { year: number; }
// Generic Interface
interface Container<T> { unit: T; }

let crocContainer: Container<Croc> = {unit: { personality: "mean"}}
let taxContainer: Container<Tax> = {unit: {year: 2011}};

interface RedCroc extends Croc { color: "red"; }
interface BlueCroc extends Croc { color: "blue"; }

// Generic Constraint
// Constraint will change the generic from accepting anything
// to accepting something that contains
interface CrocContainer<T extends Croc> { crocUnit: T; }

let redCrocContainer: CrocContainer<RedCroc> = {crocUnit: {personality: "irate", color: "red"}};
let blueCrocContainer: CrocContainer<BlueCroc> = {crocUnit: {personality: "cool", color: "blue"}};

// --------------------------
// Class Generic Constraints
// --------------------------

class ClassContainer<T extends Croc> {
    // This is set after instantiation
    classCrocUnit: T;
}

let example1 = new ClassContainer();
example1.classCrocUnit = {personality: "classy"};
// This will cause errors as we are adding a property not in constraint
example1.classCrocUnit = {personality: "classy", teeth: "sharp"};


// Using Type Argument
let example1 = new ClassContainer<RedCroc>();
example1.classCrocUnit = {personality: "classy", color: "red"};

// Setting a value on instantiation
class BBB<T extends Croc> {
    constructor(public bbbUnit: T) {}
}

let bbb = new BBB({personality: "ultra evil", likesCheese: true });
let bbb = new BBB<BlueCroc>({personality: "ultra evil", likesCheese: true, color: "Blue" });
