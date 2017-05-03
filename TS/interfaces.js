function greetAgain(person) {
    console.log("Hello " + person.name);
}
var person = {
    name: "Jock",
    age: 31
};
var person2 = {
    firstName: "Nele",
    age: 32
};
greetAgain(person); // "Hello Jock"
greetAgain(person2); // Error {firstName: "Nele", age: 32 } is not assignable to { name: string, age: number }
