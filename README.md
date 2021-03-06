# typescript-udemy

## Understanding the TS compiler

The Typescript compiler warns you about errors about your code but continues to compile it nonetheless to give you a chance to run your code in case it is not a real error (i.e. your code still works after it is compiled).

 This behaviour can be suppressed via the compiler options in tsconfig.json.

 ```json
 {
     "compilerOptions": {
         "module": "commonjs",
         "target": "es5",
         "noImplicitAny": false,
         "sourceMap": false
     },
     "exclude": [
         "node_modules"
     ]
 }
 ```

 This is a default file is created when we run 'tsc --init' in the command line. The base config is:

 1. "exclude" => Do not compile anything in the node_modules folder.
 2. "module" => We want to resolve our modules to be commonjs format.
 3. "target" => The target version to which we want to compile is ES5. ES5 is default because it runs in pretty much all browsers.
 4. "noImplicitAny" => Allows TS to implicitly define the 'any' type when no type is defined. Setting this to true may alert you to mistakes and help you to write better, more robust code.
 5. "sourceMap" => Do not create .js.map file upon compilation. Setting this to true will add a .ts file, which can be viewed through the source tab in dev tools. This can be helpful for debugging code as it allows you to put breakpoints directly into your TS code.

 To stop TS compiling code if it has errors we need to add "noEmitOnError": true; to the compilerOptions object. If you delete the .js file created from previous compilations, a new one will not be created until we run 'tsc' in the command line and have no errors returned.

 By adding "strictNullChecks": true to compilerOptions, the compiler will throw an error to any variables evaluating to null (not assigned to a value)

 By adding "noUnusedParameters": true to compilerOptions, the compiler will throw an error if any function parameters are defined but not used. Helpful for writing more succinct code.

 You can find a detailed documentation on the TypeScript Compiler Config File (tsconfig.json) here: http://www.typescriptlang.org/docs/handbook/tsconfig-json.html

 Details on the Compiler Options can be found here: http://www.typescriptlang.org/docs/handbook/compiler-options.html

## TypeScript & ES6

Not necessarily all ES6 Features are supported by TypeScript, but quite a lot of them are.

The following Compatibly Chart helps you find out if you're favorite Feature is supported: http://kangax.github.io/compat-table/es6/

### let and const

- The var keyword creates a global scope variable.
- The let keyword defines a block scope variable. Preferred way and better than var as only has advantages and no disadvantages.
- The const keyword defines a block scope variable that cannot be re-assigned. We should use the constant keyword when we know a value is not going to change. This makes it clear in our code and also gives us compilation support that will warn us if we try to change it by accident.

### Arrow functions

Change this:

```js
const myFunction = function(name: string): string {
    return "Hello" + name;
}
```

for this:

```js
const myFunction = (name: string): string => {
    return "Hello" + name;
}
```
or even better, this:

```js
const myFunction = (name: string): string => "Hello" + name;
```

### Default parameters

```js
const countdown = (start: number = 10): void => {
    while(start > 0) {
        start--;
    }
    console.log("Done", start);
}

countdown()
```

### Spread Operator

```js
const numbers = [1, 2, 43 , 45, 7, 8, 9, 93];
const allNumbers = [94, 5, 7, ...numbers];

// allNumbers = [94, 5, 7, 1, 2, 43 , 45, 7, 8, 9, 93]
```

### Rest Operator

```js
function makeArray(name: string, ...args: number) {
    return args
}

console.log(makeArray(1, 3, 4, 6, 8, 9, 0));
// Will log [1, 3, 4, 6, 8, 9, 0];
```

### Destructuring
```js
const myHobbies = ["Cooking", "Sports"];
const [hobby1, hobby2] = myHobbies;
console.log(hobby1, hobby2)
```

The destructuring example above will define two new constants and assign the first tow values in the myHobbies array to them.

### Destructuring Objects
```js
const userData = {userName: "Jock", age: 31};
const {userName, age} = userData
console.log(userName, age)
```

Important: When destructuring objects it is important your variable name matches the key names for the values you are trying to assign. You can assign new names in the definition as below.

```js
const userData = {userName: "Jock", age: 31};
const {userName: myName, age: myAge} = userData
console.log(myName, myAge)
```

### Template Literals
```js
function logOut (name: string): void {
    console.log(`Hello ${name}!`);
}
```

## TS Classes

Classes allow us to create a blueprint for objects so later on we can create objects based on classes and it will have those properties and methods.

```js
class Person {
    name: string;
    public weight: number;
    private type: number;
    protected age: number = 31;

    constructor(name: string, public username: string) {
        this.name = name;
    }

    printAge() {
        console.log(this.age);
        this.setType("Old guy");
    }

    setType(type: string) {
        this.type = type;
        console.log(this.type);
    }
}

const person = new Person('Jock', 'jockdalby');

console.log(person.username) // log 'jockdalby'

person.printAge() // log 31

person.setType('Cool guy'); // Won't work because private
```

- public properties or methods are accessible from outside the class. This is the default setting.
- private properties or methods are only accessible from inside the class.
- protected properties are only accessible from inside the class and classes which inherit from this class (i.e. child classes).
- These are TS features that ES6 does not offer.

I the above example we declare the 'name' property and then in the constructor we assign the name parameter to it. The way in which the 'username' parameter is defined in the constructor achieves all this in one step.

The printAge() method allows us to access the age value but because it is protected it means the value cannot be changed.

The setType() method can update the type property because it is doing so from inside the class.

### Inheritance
```js
class Jock extends Person {
   name = "Jock"
}

const jock = new Jock("Anna", "jock")
console.log(jock) // logs {name: "Jock", username: "Jock"}
// Note we still need to use the Person constructor but because we overwrote the name property it will still be 'Jock', not 'Anna'.
```

Using the above syntax, the properties and methods from the Person class will now available the Jock class. Any properties or methods defined inside the Jock class will either be added to the existing Person properties and methods or overwrite them.

We can overwrite the person constructor by defining our ow constuctor in Jock class. When extending a class and defining a consturctor you always have to call super() first, which calls the constructor of the parent class

```js
class Jock extends Person {
    name = "Jock"

    constructor(username: string) {
        super("Jock", username);
        this.age = 99;
    }
}

const jock = new Jock("jock")
console.log(jock) // logs {name: "Jock", username: "Jock", age: 99}
```
Notice we can access the age property of the person class because it is protected but Jock is a child class of the Person class. NOTE: We cannot access the type property because it is a private property AND SO ONLY AVAILABLE FROM WITHIN THAT CLASS.


### Getters & Setters

Note: If a getter is defined but a setter is not then the property will become readonly. Another way to create readonly properties would be to add public readonly before definition.

```js
class Plant {
    private _species: string = "Default";

    get species() {
        return `Species is ${this._species}`;
    }

    set species(value: string) {
        if (value.length > 3) {
            this._species = value;
        } else {
            this._species = "Default";
        }
    }

}

let plant = new Plant();
console.log(plant.species); // 'Species is Default'
plant.species = "AB" // will fail because only 2 characters long
console.log(plant.species); // 'Species is Default'
plant.species = "Sunflower" //will pass and change the value of _species
console.log(plant.species); // 'Species is Sunflower'
```

### Static Properties and Methods
```js
class Helpers {
    PI: number = 3.14;

    static myPI: number = 3.14;

    static calcCircumference(diameter: number): number {
        return this.myPI * diameter;
    }
}

console.log(2 * Helpers.PI); // Will not work because Helpers is a class and not an instance of that class.

// By adding static methods and properties you can directly access them through the class.

console.log(2 * Helpers.myPI); // 6.28
console.log(Helpers.calcCircumference(8)); // 25.12
```

### Abstract Classes

Abstract Classes cannot be instantiated directly and must be extended. Abstract methods once the class is extended we need to implement a method called 'changeName' and the logic needs to be written in the child class.
```js
abstract class Project {
    projectName: string = "Default";
    budget: number = 1000;

    abstract changeName(name: string): void;

    calcBudget() {
        return this.budget * 2;
    }
}

class ITProject extends Project {
    // will get an error if do not implement inherited abstract method 'changeName'.
    // When implementing the method you must use the same function type - (name: string): void - defined in the abstract class.

    changeName(name: string): void {
        this.projectName = name;
    }
}

let newProject = new ITProject();
console.log(newProject.projectName) // "Default"
newProject.changeName('Super IT Project');
console.log(newProject.projectName) // "Super IT Project"
```

### Private Constructors and Singletons (TS 2.0)
```js
class OnlyOne {
    private static instance: OnlyOne;
    public readonly age: number = 31

    private constructor(
        public name: string
        ) {}

    static getInstance() {
        if (!OnlyOne.instance) {
            OnlyOne.instance = new OnlyOne('The Only One');
        }
        return OnlyOne.instance;
    }
}

let wrong = new OnlyOne('The Only One');
let right = OnlyOne.instance;
right.name = "something else"; // name is a public property
right.age = 32; // age is a readonly property
console.log(right.name); // "something else"
```
This class can not be instantiated from outside this class because the constructor is private. We can access the getInstance method because it is static but cannot create an instance.

## Namespaces & Modules

Namespaces and modules help us to split up our code into more separate, smaller, more manageable files.

### Namespaces

Handy for making good use of the global namespace which on big projects can get pretty populated quite quickly. As you can see it is possible to have nested namespaces.
```js
namespace MyMath {
    const PI = 3.14;

    export function calcCircumference(diameter: number): number {
        return diameter * PI;
    }

    export function calcRectangleArea(width: number, height: number): number {
        return width * height;
    }

    export namespace Rectangle {
        export function calcRectangleArea(width: number, height: number): number {
            return width * height;
        }
    }
}

const PI = 2.99;

console.log(MyMath.calculateCircumference(3)) // 9.42
console.log(MyMath.Rectangle.calculateRectangleArea(10, 20)) // 200
console.log(MyMath.PI) // ERROR: Because PI is not an exported property of the MyMath namespace
console.log(PI) // 2.99 NO ERROR Because only defined once in global namespace
```

### Importing namespaces

With bigger files/namespaces we may wish to break it up over multiple files and using import statements, there are two ways to do this.

1. Typescript has it's own import syntax for namespaces, add the below syntax to the file you wish to import
```js
// TS/type.ts. Keep /// in import statments

/// <reference path="es6.ts"/>
/// <reference path="classes.ts"/>
```
Then in the command line run 'tsc <input filename> --outFile <output filename>' e.g. 'tsc TS/types.ts --outFile app.js' and then just add <script src="app.js"></script> to our index.html

2. Another way to combine multiple files on compilation is by setting the compiler through command line:

'tsc --outFile <name of bundled file> <files to be bundled in particular order'

Example:

'tsc --outFile app.js TS/types.ts TS/es6.ts TS/classes.ts' and then just add <script src="app.js"></script> to our index.html

***NOTE***:
One disadvantage of namespaces is they are not very declarative about what is being imported and used where and this is why it is more common to use separate files to modularise projects. Namespaces are ok for smaller projects but for medium of large projects it is better to use modules

### Modules
```js
// myMath.js

export const PI = 3.14;

export function calcCircumference(diameter: number): number {
    return diameter * PI;
}

// app.js

import {PI, calcCircumference } from './myMath';

console.log(PI); // 3.14
console.log(calcCircumference(2)); // 6.28
```
or

```js
// app.js

import * as MyMath from './myMath';

console.log(MyMath.PI); // 3.14
console.log(MyMath.calcCircumference(2)); // 6.28
```

Because import statements are ES6 and we are compiling to ES5 so to get them to work we must add a module loader (e.g. SystemJS) which adds the logic the browser needs to work with these ES6 commands. See systemJS docs.

### Namespaces vs Modules

Namespaces allow us to organise our application using JS objects, can be split over multiple files and do not require a Module Loader. However dependencies are difficult to manage in bigger Applications as import statements are not strictly declarative.

Modules allow us to organise our applications using real modules with their own scope and files and explicit dependency declarations. However loading them does require a Module Loader.

## Interfaces

An interface basically is a contract signed by an Object which says I guarantee you that I have a certain property/method setup.
```js
interface Person {
    name: string,
    age: number
}

function greetAgain(person: Person) {
    console.log(`Hello ${person.name}`)
}

const person = {
    name: "Jock",
    age: 31
};

const person2 = {
    firstName: "Nele",
    age: 32
};

greetAgain(person); // "Hello Jock"
greetAgain(person2); // Error {firstName: "Nele", age: 32 } is not assignable to { name: string, age: number }
```

### Interface properties

IMPORTANT TO KNOW: When calling a method and passing it an object literal, it gets checked more strictly than if you assigned it to a constant.

Example
```js
interface Person {
    name: string
}

function greetAgain(person: Person) {
    console.log(`Hello ${person.name}`)
}

const person = {
    name: "Jock",
    age: 31
};

greetAgain(person); // No error
greetAgain({name: "Jock", age: 31 }) // Error {firstName: "Jock", age: 31 } is not assignable to { name: string }
```
To prevent this from happening we can add age as an optional argument in our interface:
```js
interface Person {
    name: string,
    age?: number
}
```
If you are unsure of property names or types we can define the interface using flexible properties.
```js
interface Person {
    name: string,
    age?: number,
    [propName: string]: number
}
```

This tells the interface we can expect a property of type number but we are not sure of the name of the property (except that it is a string).

### Interface methods
```js
interface Person {
    greet(lastName: string):void;
}

const person: Person = {
    greet(lastName: string) {
        console.log(`Hello Mr. ${lastName}`);
    }
}

```

### Using interface with classes

It is also possible to use interfaces with classes, for example
```js
interface Car {
    make: string,
    model: number,
    colour?: string
}

class Hatchbacks implements Car {
    // Now Hatchbacks would HAVE to have a make and model property plus and optional colour property. Essentially, it has to match the type in the same way other declarations do.
}
```

### Interfaces for function types
```js
interface DoubleValueFunc {
    (num1: number, num2: number): number;
}

const myDoubleFunction: DoubleValueFunc = function (
    value1: number, value2: number) {
        return (value1 * value2);
}

console.log(myDoubleFunction(10, 20)); // 60
```

### Interface Inheritance
```js

interface NamedPerson {
    firstName: string,
    lastName?: string,
    [propName: string]: string;
    greet(lastName:string):void;
}


interface AgedPerson extends NamedPerson {
    age: number;
}

const oldPerson : AgedPerson = {
    age: 27,
    firstName: 'Jock',
    greet(lastName: string) {
        console.log(`Hello ${string}`);
    }
}

console.log(oldPerson) // oldPerson will be successfully created because it has all the props and methods of AgedPerson (and NamedPerson because AgedPerson extended that interface) and the optional properties and flexible properties ([propName: string]: string;) do not NEED to be present.
```

## Generics

Generics are a powerful tool for writing dynamic and flexible code. They use the power of TS (and the fact it needs to know what type a certain property/variable has) whilst giving a lot of flexibility in writing certain functions.

### Simple Generic
```js
function echo(data: any) {
    return data;
}

console.log(echo("Jock")); // Jock
console.log(echo("Jock").length); // 4
console.log(echo(31)); // 31
console.log(echo(31).length); // undefined
console.log(echo({name: "Jock", age: 31})); // {name: "Jock", age: 31}
console.log(echo({name: "Jock", age: 31}).length); // undefined
```

### Better Generic
```js
function betterEcho<T>(data: T) {
    return data;
}

console.log(betterEcho("Jock")); // Jock
console.log(betterEcho("Jock").length); // 4
console.log(betterEcho<string>("Jock")); // Jock
console.log(betterEcho(31)); // 31
console.log(betterEcho<string>(31)); // WILL RAISE A COMPILATION ERROR
console.log(betterEcho(31).length); // WILL RAISE A COMPILATION ERROR
console.log(betterEcho({name: "Jock", age: 31})); // {name: "Jock", age: 31}
console.log(betterEcho({name: "Jock", age: 31}).length); // WILL RAISE A COMPILATION ERROR

// adding <T> (can be any letter or word) tells TS this is a generic function and asking when using this function that we assign the type to the variable T. When we define the data we get to be of type T, we know this will be correct because this type is reached by evaluating data.
```

### Built-in Generics

Array is a generic type by default.

Example 1:
```js
const testResults: Array<number> = [1.94, 2.33];
testResults.push(-4.65); // OK
testResults.push("Word"); // ERROR
```

Example 2:
```js
function printAll<T>(args: T[]) {
    args.forEach((element) => console.log(element));
}

printAll<string>(["Apple", "Banana"]);

// or

function printAll<T>(args: T) {
    args.forEach((element) => console.log(element));
}

printAll<string[]>(["Apple", "Banana"]);
```

### Generic Types
```js
function betterEcho<T>(data: T) {
    return data;
}

const echo2: <T>(data: T) => T = echo;
```

In the above declaration, we are creating a new constant and assigning a type to it (<T>(data: T) => T). We can identify this because everything after the colon but before the equals sign is a type assignment. This constant will be a generic function that will take one argument of type the user specifies and return something of the same type. We then assign the constant to the echo function which fits the type description.

### Generic Classes
```js
class SimpleMath<T extends number | string> {
    baseValue: T;
    multiplyValue: T;
    calculate(): number {
        return +this.baseValue * +this.multiplyValue;
    }
}

const simpleMath = new SimpleMath<number>();
simpleMath.baseValue = 10;
simpleMath.multiplyValue = 20;

console.log(simpleMath.calculate()); // 200

const simpleMath2 = new SimpleMath<string>();
simpleMath2.baseValue = "10";
simpleMath2.multiplyValue = "20";

console.log(simpleMath2.calculate()); // 200

const simpleMath2 = new SimpleMath<boolean>(); // ERROR: Type 'boolean' does not satisfy the constraint 'number | string'
```

In the above example because the SimpleMath class has all properties of type T we cannot pass a string and a number. Do define a generic class which accepts mixed types we must use the below syntax.

```js
class SimpleMath<T extends number | string, U extends number | string> {
    baseValue: T;
    multiplyValue: U;
    calculate(): number {
        return +this.baseValue * +this.multiplyValue;
    }
}

const simpleMath = new SimpleMath<string, number>();
simpleMath.baseValue = "10";
simpleMath.multiplyValue = 20;

console.log(simpleMath.calculate()); // 200
```

Above both T and U must be a number or a string. Below U must be a number or a string and T must be the same type as U

```js
class SimpleMath<T extends U, U extends number | string> {
    baseValue: T;
    multiplyValue: U;
    calculate(): number {
        return +this.baseValue * +this.multiplyValue;
    }
}

const simpleMath = new SimpleMath<number, number>();
simpleMath.baseValue = 10;
simpleMath.multiplyValue = 20;

console.log(simpleMath.calculate()); // 200
```

## Decorators

Decorators are functions which can be attached to classes, methods and properties and then work with them or transform them. Decorators basically give the chance to extend a class and add extra functionality. Decorators attached to a class will automatically get one argument from TS, constructorFn. There is nothing special about a function that makes it a decorator, it only becomes a decorator when it is appended using the @ symbol.

NOTE: To use decorators without compilation errors you must add "experimentalDecorators": true; to compilerOptions in tsconfig.json.

Example 1:

```js
function logged(constructorFn: Function) {
    console.log(constructorFn)
}

@logged
class Person {
    constructor(console.log("Hello world"))
}

// run tsc and Person constructor function will be printed to the console.
```

### Decorator factory

```js
function logged(constructorFn: Function) {
    console.log(constructorFn)
}

function logging(value: boolean) {
    return value ? logged : null
}

@logging(true) // Attach the result of this function for execution. If true attach logged, if false, attach null.
class Bus {

}

// Only attach the logged function to the Bus class if logging decorator (factory) evaluates to true.
```

### Creating useful decorators
```js
function printable(constructorFn: Function) {
    constructorFn.prototype.print = function() {
        console.log(this);
    }
}

@printable
class Plant {
    name = "Green Plant";
}

const plant = new Plant();
(<any>plant).print();
```
When each instance of a class which has printable decorator is instantiated, it's contents are printed to the console.


