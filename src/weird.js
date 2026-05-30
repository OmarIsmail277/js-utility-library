// ─── Weird JavaScript ─────────────────────────────────

// 13a. this — demonstrate how `this` changes based on call context

// Case 1 - regular function call

function greet() {
  console.log(this); // strict mode: undefined, non-strict mode: (window in browser)
}

// Case 2 - method on an object

const user = {
  name: "Omar",
  greet() {
    console.log(this.name);
  },
};

user.greet(); // "Omar" - Here "this" is "user" because the function was "called" as a method of user.

// Case 3 - Deattaching the function from object

const fn = user.greet;
fn(); // undefined - Why? When we detached the function from the object, it's just a regular function call.

// same as Case 1 👇
const fn = function greet() {
  console.log(this); // strict mode: undefined, non-strict mode: (window in browser)
};

// Case 4 - Arrow function

const user = {
  name: "Omar",
  greet: () => console.log(this.name),
};

user.greet(); // undefined

// Arrow functions don't have their own "this". Instead, they inherit it from where they were defined, which here is the outer scope,
// not user.
// At creation time, the arrow says:
// "I don't want my own this. I'll permanently capture the this from my surrounding scope."
// That's the key rule of arrow functions.

// When that is evaluated

const user = {
  name: "Omar",
  greet: () => {
    console.log(this.name);
  },
};

// it's conceptually similar to:
const greetFn = () => {
  console.log(this.name);
};

const user = {
  name: "Omar",
  greet: greetFn,
};

// The arrow function was not "born as a method".

// It was born as an arrow function in the surrounding scope and then assigned to a property

// But here is where arrows shine, a NESTED ARROW!

const user = {
  name: "Omar",

  greet() {
    const inner = () => {
      console.log(this.name);
    };

    inner();
  },
};

user.greet(); // Omar

// Why?

// 1- greet is a regular method.
// 2- user.greet() makes this = user.
// 3- inner is an arrow.
// 4- inner captures this from greet.
// 5- So inner also sees user.

// Regular function -> Own this ✅, Arrow Functions -> surrounding scope's this ✅

/// -------------------------------

// 13b. hoisting — show var vs let/const and function hoisting

// Function declarations are fully hoisted

saySalam(); // "Salam!" ✅ — works before the definition

function saySalam() {
  console.log("Salam!");
}

// var is hoisted ✅ but not initialized ❌

console.log(name); // undefined — not an error, but not the value either
var name = "Omar";
console.log(name); // "Omar"

// let and const — temporal dead zone (TDZ) ❌‼️⚠️⚠️⚠️
console.log(name); // ReferenceError 💥
let name = "Omar";

// let and const are hoisted too, but they're in a "dead zone" until the line where they're declared.
// Accessing them before that line throws an error. ❌

// 13c. closures in loops — the classic var-in-loop bug + fix

// The classic known bug
for (var i = 0; i < 3; i++) {
  setTimeout(function () {
    console.log(i);
  }, 1000);
}
// prints: 3, 3, 3 — not 0, 1, 2
// Why? Because var is function-scoped, not block-scoped.
// All three callbacks close over the same i — and by the time they run, the loop has finished and i is already 3.

// Fix 1 — use let
for (let i = 0; i < 3; i++) {
  setTimeout(function () {
    console.log(i);
  }, 1000);
}
// prints: 0, 1, 2 ✅
// let is block-scoped — each iteration gets its own separate i.

// 13d. bind / call / apply — demonstrate the difference between all three

function introduce(city, country) {
  console.log(`I'm ${this.name} from ${city}, ${country}`);
}

const person = { name: "Omar" };

// call — runs immediately, args one by one
introduce.call(person, "Alexandria", "Egypt");
// "I'm Omar from Alexandria, Egypt"

// apply — runs immediately, args as array
introduce.apply(person, ["Alexandria", "Egypt"]);
// "I'm Omar from Alexandria, Egypt"

// Same result as call, just a different way to pass arguments. Useful when your args are already in an array.

// bind — doesn't run, returns a new function

const boundIntroduce = introduce.bind(person, "Alexandria");
// nothing happens yet

boundIntroduce("Egypt"); // "I'm Omar from Alexandria, Egypt"
boundIntroduce("Germany"); // "I'm Omar from Alexandria, Germany"

// Notice that: "Alexandria" is not required to be locked.

// bind lets you lock zero, one, or many arguments.

/*
Method   | Runs Now? | Args Format | Call Time
---------|-----------|-------------|----------
call     | ✅ Yes    | One by one  | Immediately
apply    | ✅ Yes    | As an array | Immediately
bind     | ❌ No     | One by one  | Later (returns a new function)
*/
