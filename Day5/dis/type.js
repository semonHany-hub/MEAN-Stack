"use strict";
//singleton task
class satelliteShoot {
    constructor() {
        this.isShooted = false;
        this.shootInfo = "";
        console.log("instance created successfully!");
    }
    static getObj() {
        if (!satelliteShoot.obj) {
            satelliteShoot.obj = new satelliteShoot();
        }
        return satelliteShoot.obj;
    }
    shoot() {
        if (!this.isShooted) {
            this.isShooted = true;
            this.shootInfo = "source=NASA; destination=orbit56.8; speed=45km/h;";
            console.log("shooting done!");
        }
    }
} //class handled to enable creating only one object from.
let obj = satelliteShoot.getObj();
obj.shoot();
//enumenator is an interface used to access the elements using [index] notation or the indexes using .element notation
var weekDays;
(function (weekDays) {
    weekDays[weekDays["saturday"] = 0] = "saturday";
    weekDays[weekDays["sunday"] = 1] = "sunday";
    weekDays[weekDays["monday"] = 2] = "monday";
    weekDays[weekDays["tuesday"] = 3] = "tuesday";
    weekDays[weekDays["wednesday"] = 4] = "wednesday";
    weekDays[weekDays["thursday"] = 5] = "thursday";
    weekDays[weekDays["friday"] = 6] = "friday";
})(weekDays || (weekDays = {}));
console.log(weekDays[new Date("2004/11/1").getDay()]);
console.log(weekDays.tuesday, weekDays.saturday);
let thirdWeek = weekDays;
console.log(thirdWeek[5], thirdWeek.friday);
let today = weekDays.monday;
console.log("today order according to week days: " + today);
//generic type
function print(value) {
    return value;
}
console.log("my name: " + print("semon"), "\nage: " + print(20), "\ngraduated: " + print(false));
//abstract class
class Creature {
    distinctBehavior() { }
}
class Cat extends Creature {
    constructor() {
        super(...arguments);
        this.type = "cat";
    }
    distinctBehavior() {
        console.log("has 'naonao' language!");
    }
}
class Dog extends Creature {
    constructor() {
        super(...arguments);
        this.type = "dog";
    }
    distinctBehavior() {
        console.log("bark!");
    }
}
let cat = new Cat();
console.log(cat.type);
cat.distinctBehavior();
let dog = new Dog();
console.log(dog.type);
dog.distinctBehavior();
//different types
let mixedArr = [
    "semon",
    24,
    true,
    "hany",
    false,
];
function promise() {
    return new Promise((res, rej) => {
        res("promise done successfully!");
    });
}
promise().then((res) => console.log(res));
let std1 = { name: "semon", age: 20, level: "third", GPA: 3.4 };
let std2 = { name: "jon", level: "second", GPA: 3.0 };
console.log(std1, std2);
