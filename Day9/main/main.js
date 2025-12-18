const fs = require("fs");

fs.writeFileSync(
  "../ignored_modules/users.json",
  JSON.stringify([
    { id: 1, name: "ali", age: 34 },
    { id: 2, name: "mo", age: 24 },
    { id: 3, name: "semon", age: 26 },
  ])
); //this method create or overwrite the file content (file-path, content as string or buffer)

fs.writeFileSync(
  "../ignored_modules/posts.json",
  JSON.stringify([
    { id: 1, Uid: 1, content: "first post for u1" },
    { id: 2, Uid: 1, content: "second post for u1" },
    { id: 3, Uid: 2, content: "first post for u2" },
    { id: 4, Uid: 2, content: "second post for u2" },
    { id: 5, Uid: 3, content: "first post for u3" },
    { id: 6, Uid: 3, content: "second post for u3" },
  ])
);

const http = require("http");

const server = http.createServer(function (req, res) {
  console.log(req.url);

  if (req.url === "/html_text" && req.method === "GET") {
    const htmlContent = fs.readFileSync("./index.html");
    res.setHeader("Content-Type", "text/html");
    res.end(htmlContent);
  }

  // Users endpoint
  else if (req.url === "/users") {
    let users = JSON.parse(fs.readFileSync("../ignored_modules/users.json"));

    switch (req.method) {
      case "GET":
        res.end(JSON.stringify(users));
        break;

      case "POST":
        let postBody = "";
        req.on("data", (chunk) => (postBody += chunk)); //event listener on the event "data" where the request body will be received in the form of chunks
        req.on("end", () => {
          const addedUser = JSON.parse(postBody);
          const exist = users.find((user) => user.id == addedUser.id);
          if (exist) {
            res.end("already added!");
          } else {
            users.push(addedUser);
            fs.writeFileSync(
              "../ignored_modules/users.json",
              JSON.stringify(users)
            );
            res.end("user added successfully!");
          }
        }); //event listener on the event "end" where the whole request-body will be received
        break;

      case "PUT":
        let putBody = "";
        req.on("data", (chunk) => (putBody += chunk));
        req.on("end", () => {
          try {
            const updatedUser = JSON.parse(putBody);
            const index = users.findIndex((user) => user.id == updatedUser.id);
            //findIndex() = indexOf(find()).  return -1 if the element doesn't exist

            if (index !== -1) {
              users[index] = updatedUser;
              fs.writeFileSync(
                "../ignored_modules/users.json",
                JSON.stringify(users)
              );
              res.end("user updated successfully!"); //the command res.end()must be at the end of the scope
            } else {
              res.statusCode = 404;
              res.end("user not found!");
            }
          } catch (err) {
            res.statusCode = 400;
            res.end("Invalid JSON!");
          }
        });
        break;

      case "DELETE":
        let delBody = "";
        req.on("data", (chunk) => (delBody += chunk));
        req.on("end", () => {
          const { id } = JSON.parse(delBody); //object destruction
          users = users.filter((user) => user.id != id);
          fs.writeFileSync(
            "../ignored_modules/users.json",
            JSON.stringify(users)
          );
          res.end("user deleted successfully!");
        });
        break;

      default:
        res.end("this method isn't available!");
    }
  }

  // Posts endpoint
  else if (req.url === "/posts") {
    let posts = JSON.parse(fs.readFileSync("../ignored_modules/posts.json"));

    switch (req.method) {
      case "GET":
        res.end(JSON.stringify(posts));
        break;

      case "POST":
        let postBody = "";
        req.on("data", (chunk) => (postBody += chunk));
        req.on("end", () => {
          const addedPost = JSON.parse(postBody);
          const exist = posts.find((post) => post.id == addedPost.id);
          if (exist) {
            res.end("already added!");
          } else {
            posts.push(addedPost);
            fs.writeFileSync(
              "../ignored_modules/posts.json",
              JSON.stringify(posts)
            );
            res.end("post added successfully!");
          }
        });
        break;

      case "PUT":
        let putBody = "";
        req.on("data", (chunk) => (putBody += chunk));
        req.on("end", () => {
          const updatedPost = JSON.parse(putBody);
          const index = posts.findIndex((post) => post.id == updatedPost.id);
          if (index !== -1) {
            posts[index] = updatedPost;
            fs.writeFileSync(
              "../ignored_modules/posts.json",
              JSON.stringify(posts)
            );
            res.end("post updated successfully!");
          } else {
            res.statusCode = 404;
            res.end("post not found!");
          }
        });
        break;

      case "DELETE":
        let delBody = "";
        req.on("data", (chunk) => (delBody += chunk));
        req.on("end", () => {
          const { id } = JSON.parse(delBody);
          posts = posts.filter((post) => post.id != id);
          fs.writeFileSync(
            "../ignored_modules/posts.json",
            JSON.stringify(posts)
          );
          res.end("post deleted successfully!");
        });
        break;

      default:
        res.end("this method isn't available!");
    }
  } else {
    res.end("this end point isn't available in this database!");
  }
});

server.listen(3000, () => {
  console.log("server running!");
});
