'use strict';

// OOP in JS
// 1. Constructor techniques
//     new keyword

// 2. ES6 Classes
//  "syntactic sugar"
// in practice made with constructor

// 3. Object.create()
// easiest

// JS OOP
// You can use function declaration or function expression;
// Cannot use arrow function, as it doesn't have this keyword

// 1. Constructor method of creating classes
const Person = function (firstName, birthYear) {

    // Instance properties
    this.firstName = firstName;
    this.birthYear = birthYear;

    // Don't create method in constructor; it would be instance method; creates
    // copies of the function at every object; we want the method to be in
    // the prototype of the object
    // this.printName = function () {
    //     console.log(this.firstName, this.birthYear);
    // }

}

Person.prototype.printName = function () {
    console.log(this.firstName);
    return this.firstName;
}
Person.prototype.calcAge = function () {
    const today = new Date().getFullYear();
    return today - this.birthYear;
}

const petr = new Person('Petr', 1976);
const matilda = new Person('Matilda', 1919);
const jonas = new Person('Jonas', 1980);

// 1. New {} is created
// 2. Function is called, this = {}
// 3. {} linked to a prototype
// 4. function automatically returns {}
console.log('Person Prototype', Person.prototype);
console.log('Petr Object', petr);

console.log(`${petr.printName()} is ${petr.calcAge()} years old this year.`);
matilda.printName();

// Prototypes
console.log(matilda.__proto__ == Person.prototype);
console.log('Person is a prototype of Matilda?', Person.prototype.isPrototypeOf(matilda));
console.log('A prototype of Person?', Person.prototype.isPrototypeOf(Person));
// should be really called a prototypeOfInstances

Person.prototype.species = function () {
    return `Homo Sapiens`;
}
console.log('Petr species', petr.species());

// Create a method on a child of Person
petr.getBirthYear = function () {
    return this.birthYear;
};
console.log(petr.getBirthYear());

// Prototype chain
// Object <Object prototype < Constructor function Person() > Prototype
// Person.prototype > Object petr

console.log(petr.hasOwnProperty('name'));
console.log(petr.__proto__);
console.log(petr.__proto__.__proto__);
console.log(petr.__proto__.__proto__.__proto__); // Top of prototype chain
// Check prototype chain on Arrays
const arr = [1, 6, 2, 3, 3, 2, 1, 4, 5];
console.log(arr.__proto__);

// Extending a prototype of built-in method- be careful! Rather don't do it
Array.prototype.unique = function () {
    return [...new Set(this)];
}
console.log(arr.unique());

const h1 = document.querySelectorAll('h1');
console.log(h1);
const h1Mod = [].slice.call(h1);
console.dir(h1Mod);

// Class Inheritance from Person via constructor
const Student = function (firstName, birthYear, course) {
    // set this kw to this object
    Person.call(this, firstName, birthYear);
    this.course = course;
}

Student.prototype = Object.create(Person.prototype); // Needs to be declared
Student.prototype.constructor = Student;
// before any new methods
Student.prototype.introduce = function () {
    console.log(`Hi my name is ${this.firstName} and I study ${this.course}`);
}

const mike = new Student("Mike", 1991, "Computer design");
mike.introduce();
console.log(mike.calcAge());
console.log(mike.species());
console.dir(mike);

// 2. Classes in ES6
// Class expression
// 1.  Classes are not hoisted
// 2. Classes first class citizens, pass the to functions and return them from
// functions.
// 3. Classes are executed in strict mode
// const PersonCl = class{}

// class declaration
class PersonCl {
    constructor(fullName, birthYear, job) {
        this.fullName = fullName;
        this.birthYear = birthYear;
        this.job = job;
    }

    get fullName() {
        return this._fullName;
    }

// named the same as constructor; method will fire during creation
    set fullName(name) {

        if (name.includes(' ')) {
            this._fullName = name;
        } else {
            alert('Use full name!');
        }
    }

    get age() {
        return new Date().getFullYear() - this.birthYear;
    }

    get job() {
        return this._job[0].toUpperCase().concat(this._job.substring(1));
    }

    // Use Setter and Getter to fine tune the values or logic we want to set

    // on the constructor values or returned values
    set job(position) {
        this._job = position;
    }

    // constructor itself PersonCl.heyThere()
    static heyThere() {
        return `Hey there my hearties 🏴‍☠️`
    }

    //Static method; not available on the instance but on the class

    // Will be added to the prototype property
    calcAge() {
        return new Date().getFullYear() - this.birthYear;
    }
}

console.log(PersonCl.heyThere());
console.dir(PersonCl);

PersonCl.prototype.greet = function () {
    console.log(`Hey ${this.fullName}!`);

}
PersonCl.prototype.set = function schoolYear(year) {
    this.schoolYear = year;
}

const kate = new PersonCl("Kate Faitl", 2010, "student");
console.log(`${kate.fullName}'s age is `, kate.calcAge());
console.dir(kate);
console.log("Kate's age is still:", kate.age);
kate.greet();
kate.schoolYear = 7;

console.log(kate.job);
console.dir(kate);

// Class inheritance ES6 Classes
/**
 * Child class that extends a parent class of PersonCl
 * Automati cally sets prototype
 */
class StudentCl extends PersonCl {
    /**
     * public field , available on object
     * @type {string}
     */
    university = "University of Salford";
    /**
     * private field (not accessible outside class)
     */
    #course;

    /**
     *
     * @param fullName
     * @param birthYear
     * @param startYear
     * @param job
     * @param course private field
     */
    constructor(fullName, birthYear, startYear, job, course) {
        // Call to parent; needs to happen first! or not at all if we're not
        // overriding a constructor and introducing new variables;
        super(fullName, birthYear, job);
        this.startYear = startYear;
        this.#course = course;
    }

    /**
     * Public method
     * @returns {StudentCl}
     */
    introduce() {
        console.log(`Hey there, my name is ${this._fullName} and I study ${this.course}.`);
        return this;
    }

    calcAge() {
        console.log(`My age is ${this.age} but I feel much younger;`);
        return this;
    }

}

const petrStudent = new StudentCl("Petr Czech", 1968, 'Football keeper', "JavaScript");
console.log(petrStudent);
petrStudent.introduce();
petrStudent.calcAge();
//
// Getters and setters
// use get and set and a name;
// Getters and setters behave like a method but appear as properties in the
// object

const jonas2 = {
    name: 'Jonas',
    birthYear: 1990,
    job: 'Teacher',

    get age() {
        return (new Date).getFullYear() - this.birthYear;
    },
    set newJob(position) {
        this.job = position;
    }

}
// setting getter and setter on a object

console.log('Jonas 2 age is: ', jonas2.age);
jonas2.newJob = 'Driver'; // set like a property
console.log(jonas2);

// setting getter and a setter on a class see above

// 3. Object.create
// const petr2 = Object.create({ firstName: 'Petr F', birthYear: 1876 });
// console.log(Person.prototype.calcAge.call(petr2));
// const petr3 = { firstName: 'Petr F', birthYear: 1776 };
// console.log(Person.prototype.calcAge.call(petr3));

const PersonProto = {
    calcAge() {
        return (new Date()).getFullYear() - this.birthYear;
    },

    // setting up prototype programmatically
    // this function can have any name
    init(firstName, birthYear) {
        this.firstName = firstName;
        this.birthYear = birthYear;
    }
}

const steven = Object.create(PersonProto);
steven.init("Steven", 1970); //init a name we chose
console.log(steven.calcAge());
// console.dir(steven);

// Inheritance of Classes in Object create
const StudentProto = Object.create(PersonProto);
StudentProto.greet = function () {
    console.log(`Hello World! from ${this.firstName}!`);
}
const teresa = Object.create(StudentProto);
teresa.init("Teresa", 1991);
console.log(teresa.calcAge());
teresa.greet();

//////////////////////////////////////////
//////////////////////////////////////////
//////////////////////////////////////////
// A few more  things about  classes
// Use _ underscore if you want to indicate that the method shouldn't be
// used outside a class

// Data privacy and data encapsulation
// 1) Public fields (properties)
// 2) Private fields
// 3) Public methods
// 4) Private methods
// 5) Static methods (only on a class, not on instanceof )
class Account {
    // 1) Public fields (instance)
    locale = navigator.language;

    // 2) Private fields (instance)
    #movements = [];
    #pin;

    constructor(owner, currency, pin) {
        this.owner = owner;
        this.currency = currency;
        this.#pin = pin;
        //protected property; only a convention but not hidden
        console.log(`Thanks for opening an account ${this.owner}`);
    }

    getMovements() {
        return this.#movements;
    }

    deposit(amount) {

        this.#movements.push(amount);
    }

    withdraw(amount) {
        this.deposit(-amount);

    }

    requestLoan(amount) {
        if (this.#approveLoan(amount)) {
            this.deposit(amount);
            console.log(`Loan has been approved!`);
        }
    }

    // 4) private method
    #approveLoan(val) {
        return true;
    }

    // 5) Static
    static helper() {
        console.log("I'm a helper call Account.helper() directly");

    }
}

const acc1 = new Account('Jonas', 'EUR', '1111');
console.log(acc1);
acc1.deposit(250);
acc1.withdraw(50);
acc1.requestLoan(1000);
console.log(acc1);
console.log(acc1.getMovements());
Account.helper();