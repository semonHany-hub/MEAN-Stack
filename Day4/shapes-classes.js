export class Shape {
  #dimension; //use hash sign to encapsulate member class
  constructor(d) {
    if (this.constructor == Shape) {
      throw "invalid object creation!";
    } //this condition handle the class as abstract to prevent object creation directly from, but still inheritable by other classes.
    this.#dimension = d;
  }
  get dimension() {
    return this.#dimension;
  }
  toString() {}
}

class Square extends Shape {
  constructor(d) {
    super(d);
  }

  calcArea() {
    this.area = this.dimension * this.dimension;
  }

  toString() {
    return "\tsquare\nArea: " + this.area + "\nRipLength: " + this.dimension;
  }

  display() {
    console.log(this.toString());
  }
}

class Rectangle extends Square {
  constructor(d, d2) {
    super(d);
    this.dimension2 = d2;
  }

  calcArea() {
    this.area = this.dimension * this.dimension2;
  }

  toString() {
    return (
      "\trectangle\nArea: " +
      this.area +
      "\nLength: " +
      Math.max(this.dimension, this.dimension2) +
      ", width: " +
      Math.min(this.dimension, this.dimension2)
    );
  }

  display() {
    console.log(this.toString());
  }
}

class Circle extends Shape {
  constructor(d) {
    super(d);
  }

  calcArea() {
    this.area = Math.round(Math.PI * this.dimension * this.dimension);
  }

  toString() {
    return "\tcircle\nArea: " + this.area + "\nradius: " + this.dimension;
  }

  display() {
    console.log(this.toString());
  }
}

export { Rectangle, Circle, Square };
console.log("hello from module js file!"); //when we link this module to html file this statement will be executed as the whwole file will be read by the browser
//the concept of export and import is to enable use exported structures in other files
