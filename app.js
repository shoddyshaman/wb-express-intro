import express from "express";
import path from "path";
import url from "url";
import morgan from "morgan";
import nunjucks from "nunjucks";
import lodash from "lodash";

const rootDir = url.fileURLToPath(new URL(".", import.meta.url));

const app = express();

const compliments = [
  "awesome",
  "terrific",
  "fantastic",
  "neato",
  "fantabulous",
  "wowza",
  "brilliant",
  "ducky",
  "coolio",
  "incredible",
  "wonderful",
  "smashing",
  "lovely",
];

//middlewares
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(rootDir, "public")));
app.use(morgan("dev"));
nunjucks.configure("views", {
  autoescape: true,
  express: app,
});

function sayHello(req, res) {
  res.send("Hello!");
}

app.get("/hello", (req, res) => {
  res.send("Hello! Im an inline cb");
});

//homepage route
app.get("/", (req, res) => {
  res.render("home.html");
});

app.get("/form", (req, res) => {
  res.render("form.html");
});

app.get("/welcome", (req, res) => {
  // console.log(req.query)
  const { person } = req.query;
  res.send(`Welcome, ${person}`);
});

app.get("/number-form", (req, res) => {
  res.render("number-form.html");
});

app.post("/fav-number", (req, res) => {
  console.log(req.body);
  res.send(`you're fav number is ${req.body.favNumber}`);
});

app.get("/users/:username", (req, res) => {
  console.log(req.params);
  res.send(`Here is your profile page ${req.params.username}`);
});

//nunjuck routes
app.get("/template-demo", (req, res) => {
  const date = new Date();
  const formattedDate = `${date.toDateString()}, ${date.toLocaleTimeString()}`;
  console.log(formattedDate);
  res.render("template-demo.html.njk", {
    date: formattedDate,
  });
});

app.get("/greet", (req, res) => {
  //1.send them the template greet.html.njk 2. send name and compliment
  const { person,wantsCompliments } = req.query;
 //const wantsCompliments = req.query.wantsCompliments
  //get 3 compliments
  const complimentSamples = lodash.sampleSize(compliments, 3);
  console.log(wantsCompliments);
  res.render("greet.html.njk", {
    name: person,
    compliments:wantsCompliments ? complimentSamples : false,
  });
});

app.get("/inherit",(req,res) => {
  res.render("inherit.html.njk")
})
app.get('/about',(req,res) => {
  res.render("about.html.njk")
})

app.listen("8000", () => console.log(`running on 8000`));
