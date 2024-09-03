const express = require("express");
const path = require("path");
const { connectToMongoDb } = require("./connect");
const { checkForAuthentication, restrictTo } = require("./middlewares/auth");
const cookieParser = require("cookie-parser");

const urlRouter = require("./routes/url");
const staticRouter = require("./routes/staticRoute");
const userRouter = require("./routes/user");

const URL = require("./models/url");

const app = express();
const PORT = 8001;

// connecting with mongodb(short-url-db is the name of database)
connectToMongoDb("mongodb://127.0.0.1:27017/short-url-db")
  .then(() => console.log("mongodb connected"))
  .catch((err) => console.log("error", err));

// setting up ejs
app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(checkForAuthentication);

// routes
app.use("/", staticRouter);
app.use("/url", restrictTo(["NORMAL", "ADMIN"]), urlRouter);
app.use("/user", userRouter);

// a route that should be in url router
app.get("/url/:shortId", async (req, res) => {
  let shortId = req.params.shortId;
  // push in visitHistory array an object in which timestamp is present
  const entry = await URL.findOneAndUpdate(
    { shortId },
    { $push: { visitHistory: { timestamps: Date.now() } } }
  );
  res.redirect(entry.redirectUrl);
});

app.listen(PORT, () => console.log(`Server started at port:${PORT}`));
