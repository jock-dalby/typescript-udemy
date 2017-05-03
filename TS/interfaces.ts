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