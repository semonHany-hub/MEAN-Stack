//destructor
let names = ["semon", "ahmed", "mostafa", "flemon"];
let [std1, std2, std3] = names;
console.log(std2);

let emp = {
  name: "doaa",
  age: 34,
  salary: 5700,
  address: {
    street: "almazar3",
    city: "dishna",
    gov: "qena",
  },
};

let { name, salary } = emp;
console.log("emp: ", name, salary);

//arrays built-in functions
let ages = [7, 35, 86, 8];
let filtered = ages.filter(function (elem) {
  return elem > 25;
});
let reduced = ages.reduce((sum, age) => (sum += age), 0); //sum is the accumulator and the second parameter of reduce() is its initial value.
let maped = ages.map((age) => (age += 5));
let retired = ages.find((age) => age > 60);
let hasChildren = ages.some((age) => age < 15);
let areAllAdults = ages.every((age) => age >= 18 && age <= 60);

console.log("ages: ", ages, "\nsum: ", reduced, ", bigger than 25: ", filtered);
console.log(
  "after adding 5: ",
  maped,
  ", retired person current age: ",
  retired
);
console.log("has children: ", hasChildren, ", are all adults: ", areAllAdults);

//string prototype methods
let sStartingNames = names.filter((name) => name.toLowerCase().startsWith("s"));
let monEndingNames = names.filter((name) =>
  name.toLocaleLowerCase().endsWith("mon")
);
let aIncludingNames = names.filter((name) => name.toLowerCase().includes("a"));

console.log("names: ", names);
console.log("name starting with s: ", sStartingNames);
console.log("name ending with mon: ", monEndingNames);
console.log("name including a character: ", aIncludingNames);
