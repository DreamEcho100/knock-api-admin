require("dotenv").config();

const express = require("express");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(express.static("public"));
app.use(cors());

const authRouter = require("./src/routers/auth.router.js");
const adminRouter = require("./src/routers/admin.router.js");
const uiRouter = require("./src/routers/ui.router");
const { prisma } = require("./prisma/prisma.js");

app.use("/auth", authRouter);
app.use("/admin", adminRouter);
app.use("/ui", uiRouter);

const bcrypt = require("bcrypt");

app.listen(4500, () => {
  console.log("API is running on port 4500");
});

const createAdmin = async () => {
  const isAdminFound = await prisma.users.findMany({
    where: {
      email: {
        in: [process.env.EMAIL_ADMIN, process.env.MY_EMAIL_ADMIN],
      },
    },
  });

  const hashedPassword = await bcrypt.hash(process.env.PASSWORD_ADMIN, 10);

  if (!isAdminFound.length) {
    await prisma.users.createMany({
      data: [
        {
          lastName: "admin",
          firstName: "admin",
          email: process.env.EMAIL_ADMIN,
          password: hashedPassword,
          roles: "admin",
        },
        {
          lastName: "admin",
          firstName: "admin",
          email: process.env.MY_EMAIL_ADMIN,
          password: hashedPassword,
          roles: "admin",
        },
      ],
    });
  }
  return;
};

const initBanner = async () => {
  const isBannerFound = await prisma.banner.findMany();
  if (!isBannerFound.length) {
    await prisma.banner.create({
      data: {
        background: "#7548FE",
        text: "Check this out Knock Clipper",
        textColor: "white",
        bannerUrl: "/knock-clipper",
        bannerUrlText: "here",
        disable:false
      },
    });
  }
  return;
};

const initMainSection = async () => {
  const isMainSection = await prisma.main_section.findMany();
  if (!isMainSection.length) {
    const response = await prisma.main_section.create({
      data: {
        h2: "KNOCK",
        p: "Make your drums KNOCK and punch through the mix.",
        buttonText: "Explore It Now",
        buttonUrl: "/knock",
        h2Color: "#fff",
        pColor: "#c5c5c5",
        mainImageUrl: "/images/534aaf62a986c03ee09ee62a138d3845.gif",
      },
    });
  }
  return;
};

const initPopup = async () => {
  const isPopup = await prisma.popup.findMany();
  if (!isPopup.length) {
    const response = await prisma.popup.create({
      data: {
        h2: "KNOCK CLIPPER",
        p: "Adjustable hard & soft clipper module from KNOCK.",
        h2Color: "#FFFFFF",
        pColor: "#FFFFFF",
        buttonText: "Explore it",
        buttonColor: "#7548FE",
        buttonLink: "/knock-clipper",
        mainImageUrl: "/images/abc59a63fe5ed68da58bff746fd14cce.png",
        disable:false
      },
    });
  }
  return;
};

createAdmin();
initBanner();
initMainSection();
initPopup()
