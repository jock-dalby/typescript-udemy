// Exercise 1 - How was your TypeScript Class?
class Car {
    acceleration: number = 0;

    constructor(
        public name: string
    ) {}

    honk(): void {
        console.log("Toooooooooot!");
    };

    accelerate(speed: number): void {
        this.acceleration = this.acceleration + speed;
    }
}

const myCar = new Car("BMW");
myCar.honk();
console.log(myCar.acceleration); //0
myCar.accelerate(10);
console.log(myCar.acceleration); //10

// Exercise 2 - Two objects, based on each other ...
class BaseObject {

    constructor(
        public width: number,
        public length: number,
    ) {}

    calcSize(): number {
        return this.width * this.length;
    }
}

const rectangle = new BaseObject(5, 2);
console.log(rectangle.calcSize()); // 10

// Exercise 3 - Make sure to compile to ES5 (set the target in tsconfig.json)
class Person {
    private _firstName: string = "Jock";

    get firstName() {
        return this._firstName
    };

    set firstName(value: string) {
        if (value.length > 3) {
            this._firstName = value;
        }
        else {
            this._firstName = "Default";
        }
    };
};

const person = new Person();
console.log(person.firstName); // Jock
person.firstName = "Ma";
console.log(person.firstName); // Default
person.firstName = "Maximilian";
console.log(person.firstName); // Maximilian