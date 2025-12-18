//singleton task
class satelliteShoot {
  private static obj: satelliteShoot;
  private isShooted: boolean = false;
  private shootInfo: string = "";
  private constructor() {
    console.log("instance created successfully!");
  }
  public static getObj() {
    if (!satelliteShoot.obj) {
      satelliteShoot.obj = new satelliteShoot();
    }
    return satelliteShoot.obj;
  }
  public shoot() {
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
enum weekDays {
  "saturday",
  "sunday",
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
}

console.log(weekDays[new Date("2004/11/1").getDay()]);
console.log(weekDays.tuesday, weekDays.saturday);
let thirdWeek = weekDays;
console.log(thirdWeek[5], thirdWeek.friday);
let today: weekDays = weekDays.monday;
console.log("today order according to week days: " + today);

//generic type
function print<T>(value: T): T {
  return value;
}
console.log(
  "my name: " + print<string>("semon"),
  "\nage: " + print<number>(20),
  "\ngraduated: " + print<boolean>(false)
);

//abstract class
abstract class Creature {
  abstract type: string;
  public distinctBehavior(): void {}
}

class Cat extends Creature {
  public type: string = "cat";
  public distinctBehavior(): void {
    console.log("has 'naonao' language!");
  }
}

class Dog extends Creature {
  public type: string = "dog";
  public distinctBehavior(): void {
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
let mixedArr: (string | number | boolean)[] = [
  "semon",
  24,
  true,
  "hany",
  false,
];

//type declaration
type num = number;
var age: num = Number(prompt("enter your age"));
console.log("entered age: ", age);

function promise(): Promise<string> {
  return new Promise((res, rej) => {
    res("promise done successfully!");
  });
}
promise().then((res) => console.log(res));

//interface-instances
interface student {
  name: string;
  age?: number;
  level: string;
  GPA: number;
}

let std1: student = { name: "semon", age: 20, level: "third", GPA: 3.4 };
let std2: student = { name: "jon", level: "second", GPA: 3.0 };
console.log(std1, std2);
