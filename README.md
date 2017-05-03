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
- protected properties are only accessible from classes which inherit from this class (i.e. child classes).
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
    }
}

const jock = new Jock("jock")
console.log(jock) // logs {name: "Jock", username: "Jock"}
```