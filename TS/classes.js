// Exercise 1 - How was your TypeScript Class?
var Car = (function () {
    function Car(name) {
        this.name = name;
        this.acceleration = 0;
    }
    Car.prototype.honk = function () {
        console.log("Toooooooooot!");
    };
    ;
    Car.prototype.accelerate = function (speed) {
        this.acceleration = this.acceleration + speed;
    };
    return Car;
}());
var myCar = new Car("BMW");
myCar.honk();
console.log(myCar.acceleration); //0
myCar.accelerate(10);
console.log(myCar.acceleration); //10
// Exercise 2 - Two objects, based on each other ...
var BaseObject = (function () {
    function BaseObject(width, length) {
        this.width = width;
        this.length = length;
    }
    BaseObject.prototype.calcSize = function () {
        return this.width * this.length;
    };
    return BaseObject;
}());
var rectangle = new BaseObject(5, 2);
console.log(rectangle.calcSize()); // 10
// Exercise 3 - Make sure to compile to ES5 (set the target in tsconfig.json)
var Person = (function () {
    function Person() {
        this._firstName = "Jock";
    }
    Object.defineProperty(Person.prototype, "firstName", {
        get: function () {
            return this._firstName;
        },
        set: function (value) {
            if (value.length > 3) {
                this._firstName = value;
            }
            else {
                this._firstName = "Default";
            }
        },
        enumerable: true,
        configurable: true
    });
    ;
    ;
    return Person;
}());
;
var person = new Person();
console.log(person.firstName); // Jock
person.firstName = "Ma";
console.log(person.firstName); // Default
person.firstName = "Maximilian";
console.log(person.firstName); // Maximilian
