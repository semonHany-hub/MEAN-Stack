function getPosts() {
  return new Promise((res, rej) => {
    var req = new XMLHttpRequest();
    req.open("GET", "https://jsonplaceholder.typicode.com/posts"); //initialise(establish) connection
    req.send();
    req.addEventListener("readystatechange", () => {
      //   console.log("ready state: ", req.readyState);
      if (req.readyState == 4 && req.status == 200) {
        console.log("Posts: ", JSON.parse(req.response));
        res();
      } else if (req.readyState == 4 && req.status != 200) {
        rej();
      }
    });
  });
}

function getPizza(callBack) {
  var req = new XMLHttpRequest();
  req.open("GET", "https://forkify-api.herokuapp.com/api/search?q=pizza"); //initialise(establish) connection
  req.send();
  req.addEventListener("readystatechange", () => {
    // console.log("ready state: ", req.readyState);
    if (req.readyState == 4 && req.status == 200) {
      console.log("Pizza: ", JSON.parse(req.response));
      callBack();
    }
  });
}

function sayHi(callBack) {
  console.log("hiiiiii pizza!");
  callBack(end);
}

function end() {
  console.log("************");
}

function sayHello() {
  console.log("helooooo posts!");
  return new Promise(function (res, rej) {
    var test = true;
    if (test) {
      res();
    } else {
      rej();
    }
  });
}

// sayHi(getPizza); //callBack function

// sayHello().then(function () {
//   getPosts().then(() => {
//     end();
//   });
// }); //promise

async function getPasta() {
  var res = await fetch("https://forkify-api.herokuapp.com/api/search?q=pizza");
  // .then((res) => res.json())
  // .then(function (res) {
  //   console.log("pasta: ", res);
  // })
  // .catch((rej) => {
  //   console.error("reject: ", rej);
  // })
  // .finally(function () {
  //   console.log("finish fetching pasta!");
  // });
  res = await res.json();
  console.log("pasta: ", res);
  console.log("finish fetching pasta!");
}

// getPasta();

async function getAll() {
  sayHi(getPizza);
  await getPasta();
  sayHello().then(function () {
    getPosts().then(() => {
      end();
    });
  });
}

getAll();
