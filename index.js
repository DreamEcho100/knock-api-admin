require("dotenv").config();

const express = require("express");
const cors = require("cors");
const reviews = require("./src/utils/reviews");
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
        isAddToCartButton: false,
        disable: false,
      },
    });
  }
  return;
};

const initMainSection = async () => {
  const isMainSection = await prisma.main_section.findMany();
  const isKnockMainSection = await prisma.knock_main_section.findMany();
  const isDTKPage = await prisma.dtk_page.findMany();
  if (!isMainSection.length) {
    await prisma.main_section.create({
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
  if (!isKnockMainSection.length) {
    await prisma.knock_main_section.create({
      data: {
        h2: "MAKE YOUR DRUMS",
        tradeMark: "KNOCK",
        p: "Make your drums KNOCK and punch through the mix.",
        mainImageUrl: "/images/29f8b3dde3b1d7e7a476bf19c95536f1.png",
        buttonText: "Add To Cart",
      },
    });
  }
  if (!isDTKPage.length) {
    await prisma.main_section_dtk_page.create({
      data: {
        h2: ["DRUMS", "THAT"],
        p: [
          "Designed from scratch by DECAP.",
          "Premium quality, groundbreaking as always.",
          "These drums",
        ],
        tradeMark: "KNOCK",
      },
    });
  }
  return;
};

const initPopup = async () => {
  const isPopup = await prisma.popup.findMany();
  if (!isPopup.length) {
    await prisma.popup.create({
      data: {
        h2: "KNOCK CLIPPER",
        p: "Adjustable hard & soft clipper module from KNOCK.",
        h2Color: "#FFFFFF",
        pColor: "#FFFFFF",
        buttonText: "Explore it",
        buttonColor: "#7548FE",
        buttonLink: "/knock-clipper",
        mainImageUrl: "/images/abc59a63fe5ed68da58bff746fd14cce.png",
        disable: false,
      },
    });
  }
  return;
};

const initHomePage = async () => {
  const isHomePage = await prisma.home_page.findMany();
  if (isHomePage.length) {
    return;
  }
  await prisma.home_page.create({
    data: {
      second_section_home_page: {
        create: [
          {
            h2: "CLIPPER",
            tradeMark: "KNOCK",
            p: "Adjustable hard + soft clipper module from KNOCK.",
            button: "Explore It Now",
            buttonUrl: "/knock-clipper",
            buttonColor: "#7548FE",
            imageUrl: "/images/knock-clipper.png",
          },
        ],
      },
      third_section_home_page: {
        create: [
          {
            h2: "MAKE YOUR DRUMS",
            tradeMark: "KNOCK",
            p: "DECAP is a Billboard Top 10, platinum-certified producer, sound designer, and the creator of Drums That Knock. The series garnered over 5 million downloads, and it has helped shape the sound of modern rap, r&b, and pop music. Drums That Knock are being used on grammy winning songs, and trusted by producers all over the world.",
          },
        ],
      },
      forth_section_home_page: {
        create: [
          {
            h2: ["DRUMS THAT", "SAMPLE PACKS"],
            tradeMark: "KNOCK",
            p: [
              "Designed from scratch by DECAP.",
              "Premium quality, groundbreaking as always.",
            ],
            button: "Explore Them",
            buttonColor: "#7548FE",
            buttonUrl: "/drums-that-knock",
            itemOneHandle: "drums-that-knock-vol-9",
            itemTwoHandle: "drums-that-knock-x",
          },
        ],
      },
    },
  });
};

const initKnockPage = async () => {
  const isKnockPage = await prisma.knock_page.findMany();

  if (isKnockPage.length) {
    return;
  }
  await prisma.knock_page.create({
    data: {
      second_section_knock_page: {
        create: {
          p: "KNOCK is the last plugin you will ever need to make your drums slap and punch through your mix. This plugin was meticulously crafted by platinum producer & award winning sound designer, DECAP. It is inspired by the signature sound of his popular drum kit series DRUMS THAT KNOCK, which has helped shaped the sonics of modern music.      ",
        },
      },
      third_section_knock_page: {
        create: {
          h2: "HOW KNOCK SHAPES YOUR DRUMS",
          tradeMark: "",
          third_section_knock_page_content: {
            createMany: {
              data: [
                {
                  image: "/images/knock/I1_266x266 1.png",
                  h3: "PUNCH",
                  p: "Transient shaper, amplifies the attack of your drums, making them more snappy and punchy. Add a touch of Punch to bring your drum tracks to life. Great for drum loops or one shots.          ",
                },
                {
                  image: "/images/knock/Saturate_266x266 1.png",
                  h3: "SATURATE",
                  p: "Adds harmonic distortion while compensating perceived loudness volume. Choose from three selectable modes (soft, medium, hard). Perfect for 808s, one shots, or drum loops.",
                },
                {
                  image: "/images/knock/SUB_266x266 1.png",
                  h3: "SUB",
                  p: "Detects when a kick drum is present, and generates a layered sub frequency tone, giving your kick a deep low end presence. Select the pitch of your sub tone. Perfect for breakbeats, and tuning your kick drum to the key of your song.",
                },
                {
                  image: "/images/knock/AIR_266x266 1.png",
                  h3: "AIR",
                  p: "Adds smooth, transparent top end to your drum tracks without even a hint of harshness. There are two user selectable modes (vintage and clean).",
                },
                {
                  image: "/images/knock/CLERP_266x266 1.png",
                  h3: "CLIP",
                  p: "A user adjustable hard & soft clipper. Push your drums hard without clipping to give your drums a warm, aggressive tone reminiscent of pushing vintage analogue gear into 'the red'. Select a harder clip curve for a more aggressive tone, or a softer clip curve for a more rounded tone.",
                },
              ],
            },
          },
        },
      },
      forth_section_knock_page: {
        create: [
          {
            h2: "EASY TO USE",
            p: "KNOCK is optimized for extreme ease of use for beginners and professionals alike. Use KNOCK to make your drums slap, and take you to the next level. Whether you are new to producing, or a seasoned pro, KNOCK will seamlessly fit into your workflow. It's lightweight on your CPU too - use iton a bunch of tracks!",
            button: "Add to Cart",
            imageUrl: "/images/laptop final 1.png",
          },
        ],
      },
      fifth_section_knock_page: {
        create: [
          {
            imageUrl: "/images/29f8b3dde3b1d7e7a476bf19c95536f1.png",
            p: "This plugin includes every feature DECAP used in order to craft his signature sound heard in DRUMS THAT KNOCK, and has been optimized for the highest quality sound possible. Every feature has been fine tuned to perfection to DECAP's production standards. KNOCK also comes bundled with factory presets crafted by DECAP.",
            button: "Add To Cart",
            h2: "DRUMS THAT",
            tradeMark: "KNOCK",
          },
        ],
      },
      six_section_knock_page: {
        create: [
          {
            six_section_knock_page_content: {
              createMany: {
                data: reviews.reviews,
              },
            },
          },
        ],
      },
      seven_section_knock_page: {
        create: [
          {
            h2: "SYSTEM REQUIREMENTS",
            p: "Supported by all major DAWs in 64-bit VST3, AU and AAX format.",
            seven_section_knock_page_mac: {
              createMany: {
                data: [
                  {
                    li: "9 OSX 10.12+ - AU, VST3, AAX (Fully compatible with both Mac OS Ventura and Apple M1 & M2.)",
                  },
                  {
                    li: "Intel Core i5, i7, i9, Xeon, Apple M1",
                  },
                  {
                    li: "8GB RAM required, 16GB recommended",
                  },
                  {
                    li: "HDD Space requirements: Minimum of 500MB",
                  },
                ],
              },
            },
            seven_section_knock_page_pc: {
              createMany: {
                data: [
                  {
                    li: "Intel Core i5, i7, i9, Xeon (all Gen 5 and above), AMD Quad Core",
                  },
                  {
                    li: "Windows 8.1, 10 - 64 bit VST3, AAX",
                  },
                  {
                    li: "8GB RAM required, 16GB recommended",
                  },
                  {
                    li: "HDD Space requirements: Minimum of 500MB",
                  },
                ],
              },
            },
          },
        ],
      },
      eight_section_knock_page: {
        create: {
          h2: "TAKE YOUR DRUMS TO THE NEXT LEVEL",
          youtubeUrl: "https://www.youtube.com/embed/adhIJxIHzkg",
          youtubeImageUrl: "https://i.ytimg.com/vi/adhIJxIHzkg/sddefault.jpg",
          youtubeUrl2: "https://www.youtube.com/embed/LMOG2rvxqGk",
          youtubeImageUrl2:
            "https://i.ytimg.com/vi/LMOG2rvxqGk/sddefault.jpg?sqp=-oaymwEmCIAFEOAD8quKqQMa8AEB-AHUBoAC4AOKAgwIABABGGMgYyhjMA8=&rs=AOn4CLCBtGH38Chf3EaWBsf4pnHCWR6oQw",
          button: "Add To Cart",
        },
      },
      ios_section_knock_page: {
        create: {
          h2: "AVAILABLE ON IOS",
          tradeMark: "",
          p: "KNOCK is now available for both iPad and iPhone on the Apple Store. Use KNOCK in your favorite mobile DAW that supports AUv3 plugins.",
          button: "App Store",
          buttonUrl: "https://apps.apple.com/us/app/knock/id6443654114",
          buttonColor: "",
          imageUrl: "/images/7f06f68fcc36f36e4fc8dee2d1991a8ad6be59e0.png",
        },
      },
    },
  });
};

const initKnockClipperPage = async () => {
  const isKnockPage = await prisma.knock_clipper_page.findMany();
  if (isKnockPage.length) {
    return;
  }

  await prisma.knock_clipper_main_section.create({
    data: {
      h2: "CLIPPER",
      p: "Adjustable hard & soft clipper module from KNOCK.",
      tradeMark: "KNOCK",
      mainImageUrl: "/images/abc59a63fe5ed68da58bff746fd14cce.png",
      buttonText: "Add To Cart",
    },
  });

  await prisma.knock_clipper_page.create({
    data: {
      second_section_knock_clipper_page: {
        create: {
          p: "KNOCK Clipper is a premium quality, user adjustable hard / soft clipper designed by DECAP. It is the CLIP module from his acclaimed plugin, KNOCK. It is inspired by the signature sound of his popular drum kit series DRUMS THAT KNOCK, which has helped shaped the sonics of modern music.",
        },
      },
      third_section_knock_clipper_page: {
        create: {
          h2: "CLIPPER",
          tradeMark: "KNOCK",
          p: 'Push your drums hard without ever going above 0db to give your drums a warm, aggressive tone reminiscent of pushing vintage analogue gear into "the red". Select a harder clip curve for a more aggressive tone, or a softer clip curve for a rounder tone. KNOCK Clipper has an optional high quality mode to enable oversampling.',
          imageUrl: "/images/f53123f1bc1e263458b5926c1b1422c3.png",
          button: "Add To Cart",
        },
      },
      forth_section_knock_clipper_page: {
        create: {
          h2: "SYSTEM REQUIREMENTS",
          p: "Supported by all major DAWs in 64-bit VST3, AU and AAX format.",
          forth_section_knock_clipper_page_mac: {
            createMany: {
              data: [
                {
                  li: "9 OSX 11+ - AU, VST3, AAX (Fully compatible with both Mac OS Ventura and Apple M1 & M2.)",
                },
                {
                  li: "Intel Core i5, i7, i9, Xeon, Apple M1",
                },
                {
                  li: "8GB RAM required, 16GB recommended",
                },
                {
                  li: "HDD Space requirements: Minimum of 500MB",
                },
              ],
            },
          },
          forth_section_knock_clipper_page_pc: {
            createMany: {
              data: [
                {
                  li: "Intel Core i5, i7, i9, Xeon (all Gen 5 and above), AMD Quad Core",
                },
                {
                  li: "Windows 8.1, 10 - 64 bit VST3, AAX",
                },
                {
                  li: "8GB RAM required, 16GB recommended",
                },
                {
                  li: "HDD Space requirements: Minimum of 500MB",
                },
              ],
            },
          },
        },
      },
      fifth_section_knock_clipper_page: {
        create: {
          h2: "TAKE YOUR DRUMS TO THE NEXT LEVEL",
          button: "Add To Cart",
          youtubeImageUrl: "https://i.ytimg.com/vi/0u4-MZiPtPI/sddefault.jpg",
          youtubeUrl: "https://www.youtube.com/embed/0u4-MZiPtPI",
          youtubeImageUrl2: "https://i.ytimg.com/vi/hM3IMIPc6DA/sddefault.jpg",
          youtubeUrl2: "https://www.youtube.com/embed/hM3IMIPc6DA",
        },
      },
    },
  });
};

const initDTKPage = async () => {
  const isDTKPage = await prisma.dtk_page.findMany();
  if (isDTKPage.length) {
    return;
  }
  await prisma.dtk_page.create({
    data: {
      artist_section_dtk_page: {
        create: {
          h2: "SOME ARTISTS WHO HAVE USED DRUMS THAT",
          tradeMark: "KNOCK",
          artist_section_dtk_page_content: {
            createMany: {
              data: reviews.artists,
            },
          },
        },
      },
      review_section_dtk_page: {
        create: {
          review_section_dtk_page_content: {
            createMany: {
              data: reviews.reviewsDTKPage,
            },
          },
        },
      },
      last_section_dtk_page: {
        create: {
          tradeMark: "KNOCK",
          p: "This is the last plugin you will ever need to make your drums KNOCK and punch through your mix. This plugin was meticulously crafted by DECAP. It is inspired by the signature sound of Drums That Knock, which has helped shaped the sonics of modern music.",
          button: "Learn More",
          buttonUrl: "/knock",
          h2: "",
          imageUrl:
            "/images/Knock-Hero_640eb224-a363-45df-a1b0-7adf680e8473.webp",
        },
      },
    },
  });
};

const initFAQPage = async () => {
  const isFAQ = await prisma.faq_page.findMany();

  if (isFAQ.length) {
    return;
  }

  await prisma.faq_page.create({
    data: {
      h2: "DOES KNOCK COME WITH PRESETS?",
      p: "Yes! KNOCK comes bundled with factory presets crafted by DECAP.",
      answer_type: "answer",
    },
  });
  await prisma.faq_page.create({
    data: {
      h2: "ARE YOUR PLUGINS COMPATIBLE WITH MY DAW?",
      p: "Our plugins are compatible with every DAW that supports VST3, AU or AAX plugin formats. Please note that VST2 is not supported. This includes the latest versions of: Ableton Live, FL Studio, Pro Tools, Logic Studio, Reaper, Studio One, and others.",
      answer_type: "answer",
    },
  });
  await prisma.faq_page.create({
    data: {
      h2: "WHAT ARE THE SYSTEM REQUIREMENTS / COMPATIBILITY?",
      p: "Supported by all major DAWs in 64-bit VST3, AU and AAX format.",
      h3: "OS/Processor:",
      faq_list: {
        createMany: {
          data: [
            {
              li: "Mac: Intel Core i5, i7, i9, Xeon, Apple M1 - OSX 11+ - AU, VST3, AAX",
            },
            {
              li: "Windows: Intel Core i5, i7, i9, Xeon (all Gen 5 and above), AMD Quad Core - WIN 8.1, 10 - 64 bit VST3, AAX",
            },
            {
              li: "HDD Space requirements: Minimum of 500MB - 8GB RAM required, 16GB recommended",
            },
          ],
        },
      },
      answer_type: "opening_and_lists",
    },
  });

  await prisma.faq_page.create({
    data: {
      h2: "DO YOU OFFER A DEMO VERSION?",
      p: "At the moment, there are no demo versions.",
      answer_type: "answer",
    },
  });

  await prisma.faq_page.create({
    data: {
      h2: "DO YOU SUPPORT MAC OS VENTURA & APPLE SILICON M1 & M2?",
      p: "Our plugins are fully compatible with both Mac OS Ventura and Apple M1 & M2 processors.",
      answer_type: "answer",
    },
  });

  await prisma.faq_page.create({
    data: {
      h2: "IS PRO TOOLS / AAX SUPPORTED?",
      p: "Yes! Our plugins are compatible with Pro Tools / AAX.",
      answer_type: "answer",
    },
  });
};

const initDTKproduct = async () => {
  const isDTKproduct = await prisma.dtk_product.findMany();

  if (isDTKproduct.length) {
    return;
  }

  await prisma.dtk_product.create({
    data: {
      handle: "melodies-that-knock-vol-1",
      fileCount: 0,
      description: {
        create: {
          text: "DECAP - Melodies That Knock Vol. 1 melodic sample pack. This kit is perfectly paired with Drums That Knock.",
        },
      },
      youtubeVideo: {
        createMany: {
          data: [
            {
              src: "https://www.youtube.com/embed/du81OLTutOc",
              srcImage:
                "https://img.youtube.com/vi/du81OLTutOc/maxresdefault.jpg",
              title: "",
            },
          ],
        },
      },
      features: {
        createMany: {
          data: [
            {
              li: "14 original samples composed by DECAP",
            },
            {
              li: "Every sound from each sample is isolated into individual stems (73 total stems)",
            },
            {
              li: "All samples are labeled with tempo, and key, and ready to drop right into your DAW. No editing required.",
            },
            {
              li: "All samples can be re-arranged, chopped, flipped, stretched, etc",
            },
            {
              li: "Samples and stems are in high quality 44.1kHz/32bit format",
            },
            {
              li: "2.48gb of top notch content",
            },
            {
              li: "Compatible with any DAW software or beat machine (Ableton, FL Studio, Logic, Reason, MPC, Maschine, Studio One, etc)",
            },
            {
              li: "Contact info for sample clearance contained in download file. Clearance is guaranteed.",
            },
          ],
        },
      },
    },
  });
  await prisma.dtk_product.create({
    data: {
      handle: "melodies-that-knock-vol-2-free-download",
      fileCount: 0,
      description: {
        create: {
          text: "DECAP - Melodies That Knock Vol. 2 melodic sample pack. This kit is perfectly paired with Drums That Knock.",
        },
      },
      youtubeVideo: {
        createMany: {
          data: [
            {
              src: "https://www.youtube.com/embed/T64PcrQaC-A",
              srcImage:
                "https://img.youtube.com/vi/T64PcrQaC-A/maxresdefault.jpg",
              title: "",
            },
          ],
        },
      },
      features: {
        createMany: {
          data: [
            {
              li: "10 original samples composed by DECAP",
            },
            {
              li: "All samples are labeled with tempo, and key, and ready to drop right into your DAW. No editing required.",
            },
            {
              li: "All samples can be re-arranged, chopped, flipped, stretched, etc",
            },
            {
              li: "Samples and stems are in high quality 44.1kHz/24bit format",
            },
            {
              li: "Compatible with any DAW software or beat machine (Ableton, FL Studio, Logic, Reason, MPC, Maschine, Studio One, etc)",
            },
            {
              li: "Contact info for sample clearance contained in download file. Clearance is guaranteed.",
            },
          ],
        },
      },
    },
  });
  await prisma.dtk_product.create({
    data: {
      handle: "drums-that-knock-vol-1",
      fileCount: 95,
      description: {
        create: {
          text: "DECAP - Drums That Knock Vol. 1",
        },
      },
      youtubeVideo: {
        createMany: {
          data: [
            {
              src: "https://www.youtube.com/embed/EduPz5KmANk",
              srcImage:
                "https://img.youtube.com/vi/EduPz5KmANk/maxresdefault.jpg",
              title: "",
            },
          ],
        },
      },
      features: {
        createMany: {
          data: [
            {
              li: "All sounds and loops are 100% royalty free",
            },
            {
              li: "All sounds are crafted, sculpted, specially designed to KNOCK / punch through your mix",
            },
            {
              li: "All sounds are 100% original (no recycled sounds)",
            },
            {
              li: "All loops are labeled with the tempo and ready to drop right into your DAW with no editing required",
            },
            {
              li: "All sounds are 24bit/44.1kHz format",
            },
            {
              li: "Drums That Knock is compatible with any DAW software or beat machine (Ableton, FL Studio, Logic, Reason, MPC, Maschine, Studio One, etc)",
            },
          ],
        },
      },
      filesIncluded: {
        createMany: {
          data: [
            {
              li: "10 808s",
            },
            {
              li: "14 Kicks",
            },
            {
              li: "14 Snares",
            },
            {
              li: "12 Hihats",
            },
            {
              li: "20 Loops",
            },
            {
              li: "25 Percussion + Other",
            },
          ],
        },
      },
    },
  });
  await prisma.dtk_product.create({
    data: {
      handle: "drums-that-knock-vol-2",
      fileCount: 105,
      description: {
        create: {
          text: "DECAP - Drums That Knock Vol. 2",
        },
      },
      features: {
        createMany: {
          data: [
            {
              li: "All sounds and loops are 100% royalty free",
            },
            {
              li: "All sounds are crafted, sculpted, specially designed to KNOCK / punch through your mix",
            },
            {
              li: "All sounds are 100% original (no recycled sounds)",
            },
            {
              li: "All loops are labeled with the tempo and ready to drop right into your DAW with no editing required",
            },
            {
              li: "All sounds are 24bit/44.1kHz format",
            },
            {
              li: "Drums That Knock is compatible with any DAW software or beat machine (Ableton, FL Studio, Logic, Reason, MPC, Maschine, Studio One, etc)",
            },
          ],
        },
      },
      filesIncluded: {
        createMany: {
          data: [
            {
              li: "10 808s",
            },
            {
              li: "20 Kicks",
            },
            {
              li: "20 Snares",
            },
            {
              li: "25 loopsforbeats",
            },
            {
              li: "20 Hihats",
            },
            {
              li: "25 Shouts",
            },
            {
              li: "25 Textures",
            },
          ],
        },
      },
    },
  });
  await prisma.dtk_product.create({
    data: {
      handle: "drums-that-knock-vol-3",
      fileCount: 154,
      description: {
        create: {
          text: "DECAP - Drums That Knock Vol. 3",
        },
      },
      youtubeVideo: {
        createMany: {
          data: [
            {
              src: "https://www.youtube.com/embed/23e9wz11lqA",
              srcImage:
                "https://img.youtube.com/vi/23e9wz11lqA/maxresdefault.jpg",
              title: "",
            },
          ],
        },
      },
      features: {
        createMany: {
          data: [
            {
              li: "All sounds and loops are 100% royalty free",
            },
            {
              li: "All sounds are crafted, sculpted, specially designed to KNOCK / punch through your mix",
            },
            {
              li: "All sounds are 100% original (no recycled sounds)",
            },
            {
              li: "All loops are labeled with the tempo and ready to drop right into your DAW with no editing required",
            },
            {
              li: "All sounds are 24bit/44.1kHz format",
            },
            {
              li: "Drums That Knock is compatible with any DAW software or beat machine (Ableton, FL Studio, Logic, Reason, MPC, Maschine, Studio One, etc)",
            },
          ],
        },
      },
      filesIncluded: {
        createMany: {
          data: [
            {
              li: "10 808s",
            },
            {
              li: "20 Kicks",
            },
            {
              li: "20 Snares",
            },
            {
              li: "25 loopsforbeats",
            },
            {
              li: "20 Hihats",
            },
            {
              li: "25 Shouts",
            },
            {
              li: "25 Textures",
            },
          ],
        },
      },
    },
  });
  await prisma.dtk_product.create({
    data: {
      handle: "drums-that-knock-vol-4",
      fileCount: 132,
      description: {
        create: {
          text: "DECAP - Drums That Knock Vol. 4",
        },
      },
      youtubeVideo: {
        createMany: {
          data: [
            {
              src: "https://www.youtube.com/embed/zXklcm6yYdk",
              srcImage:
                "https://img.youtube.com/vi/zXklcm6yYdk/maxresdefault.jpg",
              title: "",
            },
          ],
        },
      },
      features: {
        createMany: {
          data: [
            {
              li: "All sounds and loops are 100% royalty free",
            },
            {
              li: "All sounds are crafted, sculpted, specially designed to KNOCK / punch through your mix",
            },
            {
              li: "All sounds are 100% original (no recycled sounds)",
            },
            {
              li: "All loops are labeled with the tempo and ready to drop right into your DAW with no editing required",
            },
            {
              li: "All sounds are 24bit/44.1kHz format",
            },
            {
              li: "Drums That Knock is compatible with any DAW software or beat machine (Ableton, FL Studio, Logic, Reason, MPC, Maschine, Studio One, etc)",
            },
          ],
        },
      },
      filesIncluded: {
        createMany: {
          data: [
            {
              li: "13 Analog 808s",
            },
            {
              li: "23 Kicks",
            },
            {
              li: "19 Snares",
            },
            {
              li: "8 Hihats",
            },
            {
              li: "19 Melodic Loops",
            },
            {
              li: "14 Percussion One Shots",
            },
            {
              li: "22 Shouts",
            },
            {
              li: "14 Textures",
            },
          ],
        },
      },
    },
  });
  await prisma.dtk_product.create({
    data: {
      handle: "drums-that-knock-vol-5",
      fileCount: 190,
      description: {
        create: {
          text: "DECAP - Drums That Knock Vol. 5",
        },
      },
      youtubeVideo: {
        createMany: {
          data: [
            {
              src: "https://www.youtube.com/embed/Vrn2jOXbtXU",
              srcImage:
                "https://img.youtube.com/vi/Vrn2jOXbtXU/maxresdefault.jpg",
              title: "",
            },
          ],
        },
      },
      features: {
        createMany: {
          data: [
            {
              li: "All sounds and loops are 100% royalty free",
            },
            {
              li: "All sounds are crafted, sculpted, specially designed to KNOCK / punch through your mix",
            },
            {
              li: "All sounds are 100% original (no recycled sounds)",
            },
            {
              li: "All loops are labeled with the tempo and ready to drop right into your DAW with no editing required",
            },
            {
              li: "All sounds are 24bit/44.1kHz format",
            },
            {
              li: "Drums That Knock is compatible with any DAW software or beat machine (Ableton, FL Studio, Logic, Reason, MPC, Maschine, Studio One, etc)",
            },
          ],
        },
      },
      filesIncluded: {
        createMany: {
          data: [
            {
              li: "16 808s and Bass Sounds",
            },
            {
              li: "18 Kicks",
            },
            {
              li: "24 Snares",
            },
            {
              li: "13 Hihats",
            },
            {
              li: "35 Shouts",
            },
            {
              li: "9 Hihat Loops",
            },
            {
              li: "23 Percussion Loops",
            },
            {
              li: "29 One Shots + Textures",
            },
            {
              li: "17 Melodic Loops",
            },
            {
              li: "6 Drum Loops",
            },
          ],
        },
      },
    },
  });
  await prisma.dtk_product.create({
    data: {
      handle: "drums-that-knock-vol-6",
      fileCount: 229,
      description: {
        create: {
          text: "DECAP - Drums That Knock Vol. 6",
        },
      },
      youtubeVideo: {
        createMany: {
          data: [
            {
              src: "https://www.youtube.com/embed/aDbjb5wlos0",
              srcImage:
                "https://img.youtube.com/vi/aDbjb5wlos0/maxresdefault.jpg",
              title: "",
            },
          ],
        },
      },
      features: {
        createMany: {
          data: [
            {
              li: "All sounds and loops are 100% royalty free",
            },
            {
              li: "All sounds are crafted, sculpted, specially designed to KNOCK / punch through your mix",
            },
            {
              li: "All sounds are 100% original (no recycled sounds)",
            },
            {
              li: "All loops are labeled with the tempo and ready to drop right into your DAW with no editing required",
            },
            {
              li: "All sounds are 24bit/44.1kHz format",
            },
            {
              li: "Drums That Knock is compatible with any DAW software or beat machine (Ableton, FL Studio, Logic, Reason, MPC, Maschine, Studio One, etc)",
            },
          ],
        },
      },
      filesIncluded: {
        createMany: {
          data: [
            {
              li: "13 808s",
            },
            {
              li: "21 Kicks",
            },
            {
              li: "28 Snares + Claps",
            },
            {
              li: "26 Hihats",
            },
            {
              li: "41 Shouts + Chants + Rap Vocal Loops",
            },
            {
              li: "15 Hihat + Percussion Loops",
            },
            {
              li: "22 Melodic Loops",
            },
            {
              li: "11 MIDI Files",
            },
            {
              li: "34 Melodic + Percussive One Shots",
            },
            {
              li: "12 Textures",
            },
            {
              li: "6 Drum Loops",
            },
          ],
        },
      },
    },
  });
  await prisma.dtk_product.create({
    data: {
      handle: "drums-that-knock-vol-7",
      fileCount: 337,
      description: {
        create: {
          text: "DECAP - Drums That Knock Vol.7 is now available, with top notch original sounds for use in your production.",
        },
      },
      youtubeVideo: {
        createMany: {
          data: [
            {
              src: "https://www.youtube.com/embed/OrXT2MpwHEg",
              srcImage:
                "https://img.youtube.com/vi/OrXT2MpwHEg/maxresdefault.jpg",
              title: "",
            },
          ],
        },
      },
      features: {
        createMany: {
          data: [
            {
              li: "All sounds and loops are 100% royalty free",
            },
            {
              li: "All sounds are crafted, sculpted, specially designed to KNOCK / punch through your mix",
            },
            {
              li: "All sounds are 100% original (no recycled sounds)",
            },
            {
              li: "All loops are labeled with the tempo and ready to drop right into your DAW with no editing required",
            },
            {
              li: "All sounds are 24bit/44.1kHz format",
            },
            {
              li: "Drums That Knock is compatible with any DAW software or beat machine (Ableton, FL Studio, Logic, Reason, MPC, Maschine, Studio One, etc)",
            },
          ],
        },
      },
      filesIncluded: {
        createMany: {
          data: [
            {
              li: "15 808s + Bass",
            },
            {
              li: "12 Drum loops",
            },
            {
              li: "17 Fills",
            },
            {
              li: "16 Hihat loops",
            },
            {
              li: "25 Hihats + Shakers + Crashes",
            },
            {
              li: "27 Kicks",
            },
            {
              li: "16 Melodic loops",
            },
            {
              li: "6 MIDI files",
            },
            {
              li: "52 Melodic one shots",
            },
            {
              li: "70 Percussive one shots",
            },
            {
              li: "20 Percussion loops",
            },
            {
              li: "2 Rap vocal loops",
            },
            {
              li: "36 Shouts + ad-libs",
            },
            {
              li: "23 Snares + claps",
            },
          ],
        },
      },
    },
  });
  await prisma.dtk_product.create({
    data: {
      handle: "drums-that-knock-vol-8",
      fileCount: 361,
      description: {
        create: {
          text: "DECAP - Drums That Knock Vol. 8 is now available, with top notch original sounds for your production.",
        },
      },
      youtubeVideo: {
        createMany: {
          data: [
            {
              src: "https://www.youtube.com/embed/YNKkxd2aPzI",
              srcImage:
                "https://img.youtube.com/vi/YNKkxd2aPzI/maxresdefault.jpg",
              title: "",
            },
          ],
        },
      },
      features: {
        createMany: {
          data: [
            {
              li: "All sounds and loops are 100% royalty free",
            },
            {
              li: "All sounds are crafted, sculpted, specially designed to KNOCK / punch through your mix",
            },
            {
              li: "All sounds are 100% original (no recycled sounds)",
            },
            {
              li: "All loops are labeled with the tempo and ready to drop right into your DAW with no editing required",
            },
            {
              li: "All sounds are 24bit/44.1kHz format",
            },
            {
              li: "Drums That Knock is compatible with any DAW software or beat machine (Ableton, FL Studio, Logic, Reason, MPC, Maschine, Studio One, etc)",
            },
          ],
        },
      },
      filesIncluded: {
        createMany: {
          data: [
            {
              li: "23 808s + Bass",
            },
            {
              li: "26 Drum loops",
            },
            {
              li: "28 FX",
            },
            {
              li: "23 Hihat loops",
            },
            {
              li: "17 Hihats",
            },
            {
              li: "28 Kicks",
            },
            {
              li: "21 Melodic loops",
            },
            {
              li: "10 MIDI files",
            },
            {
              li: "30 Melodic one shots",
            },
            {
              li: "36 Percussive one shots",
            },
            {
              li: "41 Percussion loops",
            },
            {
              li: "11 Rap vocal loops",
            },
            {
              li: "24 Shouts + ad-libs",
            },
            {
              li: "30 Snares + claps",
            },
            {
              li: "Rimshots",
            },
            {
              li: "5  Textures",
            },
            {
              li: "8  Toms",
            },
          ],
        },
      },
    },
  });
  await prisma.dtk_product.create({
    data: {
      handle: "drums-that-knock-vol-9",
      fileCount: 453,
      description: {
        create: {
          text: "DECAP - Drums That Knock Vol. 8 is now available, with top notch original sounds for your production.",
        },
      },
      youtubeVideo: {
        createMany: {
          data: [
            {
              src: "https://www.youtube.com/embed/j1Fj0gm2GXE",
              srcImage:
                "https://img.youtube.com/vi/j1Fj0gm2GXE/maxresdefault.jpg",
              title: "",
            },
          ],
        },
      },
      features: {
        createMany: {
          data: [
            {
              li: "All sounds and loops are 100% royalty free",
            },
            {
              li: "All sounds are crafted, sculpted, specially designed to KNOCK / punch through your mix",
            },
            {
              li: "All sounds are 100% original (no recycled sounds)",
            },
            {
              li: "All loops are labeled with the tempo and ready to drop right into your DAW with no editing required",
            },
            {
              li: "All sounds are 24bit/44.1kHz format",
            },
            {
              li: "Drums That Knock is compatible with any DAW software or beat machine (Ableton, FL Studio, Logic, Reason, MPC, Maschine, Studio One, etc)",
            },
          ],
        },
      },
      filesIncluded: {
        createMany: {
          data: [
            {
              li: "23 808s + Bass",
            },
            {
              li: "27 Kicks",
            },
            {
              li: "32 Snares + Claps",
            },
            {
              li: "Rimshots",
            },
            {
              li: "38 Hihats",
            },
            {
              li: "28 Drum Loops",
            },
            {
              li: "54 Percussive One Shots",
            },
            {
              li: "40 Percussion Loops",
            },
            {
              li: "28 Melodic One Shots",
            },
            {
              li: "31 Melodic Loops",
            },
            {
              li: "36 FX One Shots",
            },
            {
              li: "7 MIDI Files",
            },
            {
              li: "16 Risers + Falls",
            },
            {
              li: "9 Fills",
            },
            {
              li: "22 Hihat Loops",
            },
            {
              li: "8 Rap Vocal Loops",
            },
            {
              li: "52 Shouts + Adlibs",
            },
          ],
        },
      },
    },
  });
  await prisma.dtk_product.create({
    data: {
      handle: "drums-that-knock-free-download",
      fileCount: 453,
      description: {
        create: {
          text: "",
        },
      },
      features: {
        createMany: {
          data: [
            {
              li: "All sounds and loops are 100% royalty free - no clearance required",
            },
            {
              li: "All sounds are crafted, sculpted, specially designed to KNOCK / punch through your mix",
            },
            {
              li: "All sounds are 100% original and crafted from scratch (no recycled sounds)",
            },
            {
              li: "All loops are labeled with tempo, key, and ready to drop right into your DAW with no editing required",
            },
            {
              li: "All sounds are in 24bit/44.1kHz format",
            },
            {
              li: "All sounds and loops are compatible with any DAW software or beat machine (Ableton, FL Studio, Logic, Reason, MPC, Maschine, Studio One, etc)",
            },
          ],
        },
      },
      filesIncluded: {
        createMany: {
          data: [
            {
              li: "808s + Bas",
            },
            {
              li: "Drum loops",
            },
            {
              li: "Hihat loops",
            },
            {
              li: "Hihats",
            },
            {
              li: "Kicks",
            },
            {
              li: "Melodic loops",
            },
            {
              li: "Percussion loops",
            },
            {
              li: "Risers",
            },
            {
              li: "Shouts",
            },
            {
              li: "Snares + Claps + Rimshots",
            },
          ],
        },
      },
    },
  });
  await prisma.dtk_product.create({
    data: {
      handle: "drums-that-knock-x",
      fileCount: 693,
      description: {
        create: {
          text: "",
        },
      },
      youtubeVideo: {
        createMany: {
          data: [
            {
              src: "https://www.youtube.com/embed/p-wek5z59IA",
              srcImage:
                "https://img.youtube.com/vi/p-wek5z59IA/maxresdefault.jpg",
              title: "",
            },
            {
              src: "https://www.youtube.com/embed/KG1q81qR_b4",
              srcImage:
                "https://img.youtube.com/vi/KG1q81qR_b4/maxresdefault.jpg",
              title: "",
            },
          ],
        },
      },
      features: {
        createMany: {
          data: [
            {
              li: "All sounds and loops are 100% royalty free - no clearance required",
            },
            {
              li: "All sounds are crafted, sculpted, specially designed to KNOCK / punch through your mix",
            },
            {
              li: "All sounds are 100% original and crafted from scratch (no recycled sounds)",
            },
            {
              li: "All loops are labeled with tempo, key, and ready to drop right into your DAW with no editing required",
            },
            {
              li: "All sounds are in 24bit/44.1kHz format",
            },
            {
              li: "All sounds and loops are compatible with any DAW software or beat machine (Ableton, FL Studio, Logic, Reason, MPC, Maschine, Studio One, etc)",
            },
            {
              li: "All 808s and One Shots are tuned to C for easy playability",
            },
            {
              li: "Includes more sounds than any DTK kit ever!",
            },
          ],
        },
      },
      filesIncluded: {
        createMany: {
          data: [
            {
              li: "40 808's + Bass",
            },
            {
              li: "13 Breakbeats",
            },
            {
              li: "27 Drum Loops",
            },
            {
              li: "15 Fills",
            },
            {
              li: "23 Hihat Loops",
            },
            {
              li: "43 Hihats",
            },
            {
              li: "43 Kicks",
            },
            {
              li: "15 KNOCK Presets",
            },
            {
              li: "38 Melodic Loops",
            },
            {
              li: "7 MIDI Files",
            },
            {
              li: "36 Melodic One Shots",
            },
            {
              li: "200 Percussive One Shots",
            },
            {
              li: "76 Percussion Loops",
            },
            {
              li: "6 Rap Vocal Loops",
            },
            {
              li: "18 Risers + Falls",
            },
            {
              li: "53 Shouts + Ad-libs",
            },
            {
              li: "40 Snares + Claps ",
            },
            {
              li: "Rimshots",
            },
          ],
        },
      },
    },
  });
  await prisma.dtk_product.create({
    data: {
      handle: "complete-knock-bundle-v2-all-digital-products",
      fileCount: 0,
      description: {
        createMany: {
          data: [
            {
              h3: "This is truly the last drum kit bundle you'll ever need!",
              text: [
                "This bundle features every digital product available on the Drums That Knock store, including Drums That Knock Limited Edition, which was previously only available for a short time during Black Friday 2021. You get 15 total products!",
              ],
            },
          ],
        },
      },
      filesIncluded: {
        createMany: {
          data: [
            {
              li: "Drums That Knock Vol. 1",
            },
            {
              li: "Drums That Knock Vol. 2",
            },
            {
              li: "Drums That Knock Vol. 3",
            },
            {
              li: "Drums That Knock Vol. 4",
            },
            {
              li: "Drums That Knock Vol. 5",
            },
            {
              li: "Drums That Knock Vol. 6",
            },
            {
              li: "Drums That Knock Vol. 7",
            },
            {
              li: "Drums That Knock Vol. 8",
            },
            {
              li: "Drums That Knock Vol. 9",
            },
            {
              li: "Drums That Knock X",
            },
            {
              li: "Drums That Knock Free Vol. 1",
            },
            {
              li: "Melodies That Knock Vol. 1",
            },
            {
              li: "Melodies That Knock Vol. 2",
            },
            {
              li: "DECAP Ableton Live Masterclass",
            },
            {
              li: "Drums That Knock Limited Edition",
            },
          ],
        },
      },
    },
  });
  await prisma.dtk_product.create({
    data: {
      handle: "decap-ableton-live-masterclass",
      fileCount: 0,
      description: {
        createMany: {
          data: [
            {
              h3: "DECAP - Ableton Masterclass",
              text: [
                "Level: Intermediate / Advanced",
                "In this live 47 minute deep dive Masterclass, DECAP (Billboard Top 10, Platinum Certified Producer) dives into some intermediate / advanced production and sound design techniques during the track breakdown of his release 'Who's There?!'.",
              ],
            },
          ],
        },
      },
      youtubeVideo: {
        create: {
          src: "https://www.youtube.com/embed/LwIgcY5CpjI",
          srcImage: "https://img.youtube.com/vi/LwIgcY5CpjI/maxresdefault.jpg",
          title: "Free Preview",
        },
      },
      filesIncluded: {
        createMany: {
          data: [
            {
              li: "0:00-4:00 Introduction",
            },
            {
              li: "4:17-10:50 Kick sound design from scratch, Hi hat sound design from scratch in operator, drum arrangement",
            },
            {
              li: "10:50-15:54 808 bass sound design in wavetable, 808 processing",
            },
            {
              li: "15:54-17:13 Going with the creative flow, feel the energy",
            },
            {
              li: "17:20-18:05 Add width to 808",
            },
            {
              li: "18:20-21:28 Making sound fx in wavetable",
            },
            {
              li: "21:28-24:41 Finding the sweet spot, creative sound design, no limits",
            },
            {
              li: "24:54-25:43 Vocal chops",
            },
            {
              li: "25:43-28:34 Pluck sound design from scratch in Wavetable",
            },
            {
              li: "28:45-30:58 Bridge section, pitching vocals, rhodes fx, sidechain compression",
            },
            {
              li: "30:58-32:44 Vocal chain: How to make a bad vocal sound good",
            },
            {
              li: "32:44-35:48 Building up the intro with FX, frequency shifter",
            },
            {
              li: "35:55-38:24 Master chain + explanation",
            },
            {
              li: "38:35-41:24 Proper stereo imaging explained",
            },
            {
              li: "41:39-43:36 Balancing productivity and creative sound design",
            },
            {
              li: "43:46-44:44 Why I don't layer drums, how to layer properly if you do",
            },
            {
              li: "44:44-End Learn the rules to break them",
            },
          ],
        },
      },
    },
  });
};

const initDtkMainSection = async () => {
  const DtkMainSection = await prisma.dtk_main_section.findMany();

  if (DtkMainSection.length) {
    return;
  }

  await prisma.dtk_main_section.create({
    data: {
      br: "DRUMS",
      h2: "THAT",
      tradeMark: "KNOCK",
      p: {
        createMany: {
          data: [
            {
              text: "Designed from scratch by DECAP.",
            },
            {
              text: "Premium quality, groundbreaking as always.",
            },
            {
              text: "These drums",
              tradeMark: "KNOCK",
            },
          ],
        },
      },
    },
  });
};

const initTermsOfService = async () => {
  const isTermsOfService = await prisma.terms_of_service.findMany();

  if (isTermsOfService.length) {
    return;
  }

  await prisma.terms_of_service.create({
    data: {
      h3: "OVERVIEW",
      p: {
        createMany: {
          data: [
            {
              text: "This website is operated by Drums That Knock. Throughout the site, the terms 'we', 'us' and 'our' refer to Drums That Knock. Drums That Knock offers this website, including all information, tools and services available from this site to you, the user, conditioned upon your acceptance of all terms, conditions, policies and notices stated here.",
            },
            {
              text: "By visiting our site and/ or purchasing something from us, you engage in our 'Service' and agree to be bound by the following terms and conditions ('Terms of Service', 'Terms'), including those additional terms and conditions and policies referenced herein and/or available by hyperlink. These Terms of Service apply to all users of the site, including without limitation users who are browsers, vendors, customers, merchants, and/ or contributors of content.",
            },
            {
              text: "Please read these Terms of Service carefully before accessing or using our website. By accessing or using any part of the site, you agree to be bound by these Terms of Service. If you do not agree to all the terms and conditions of this agreement, then you may not access the website or use any services. If these Terms of Service are considered an offer, acceptance is expressly limited to these Terms of Service.",
            },
            {
              text: "Any new features or tools which are added to the current store shall also be subject to the Terms of Service. You can review the most current version of the Terms of Service at any time on this page. We reserve the right to update, change or replace any part of these Terms of Service by posting updates and/or changes to our website. It is your responsibility to check this page periodically for changes. Your continued use of or access to the website following the posting of any changes constitutes acceptance of those changes.",
            },
            {
              text: "Our store is hosted on Shopify Inc. They provide us with the online e-commerce platform that allows us to sell our products and services to you.",
            },
          ],
        },
      },
    },
  });

  await prisma.terms_of_service.create({
    data: {
      h3: "SECTION 1 - ONLINE STORE TERMS",
      p: {
        createMany: {
          data: [
            {
              text: "By agreeing to these Terms of Service, you represent that you are at least the age of majority in your state or province of residence, or that you are the age of majority in your state or province of residence and you have given us your consent to allow any of your minor dependents to use this site.",
            },
            {
              text: "You may not use our products for any illegal or unauthorized purpose nor may you, in the use of the Service, violate any laws in your jurisdiction (including but not limited to copyright laws).",
            },
            {
              text: "You must not transmit any worms or viruses or any code of a destructive nature.",
            },
            {
              text: "A breach or violation of any of the Terms will result in an immediate termination of your Services.",
            },
          ],
        },
      },
    },
  });

  await prisma.terms_of_service.create({
    data: {
      h3: "SECTION 2 - GENERAL CONDITIONS",
      p: {
        createMany: {
          data: [
            {
              text: "We reserve the right to refuse service to anyone for any reason at any time.",
            },
            {
              text: "You understand that your content (not including credit card information), may be transferred unencrypted and involve (a) transmissions over various networks; and (b) changes to conform and adapt to technical requirements of connecting networks or devices. Credit card information is always encrypted during transfer over networks.",
            },
            {
              text: "You agree not to reproduce, duplicate, copy, sell, resell or exploit any portion of the Service, use of the Service, or access to the Service or any contact on the website through which the service is provided, without express written permission by us.",
            },
            {
              text: "The headings used in this agreement are included for convenience only and will not limit or otherwise affect these Terms.",
            },
          ],
        },
      },
    },
  });

  await prisma.terms_of_service.create({
    data: {
      h3: "SECTION 3 - ACCURACY, COMPLETENESS AND TIMELINESS OF INFORMATION",
      p: {
        createMany: {
          data: [
            {
              text: "We are not responsible if information made available on this site is not accurate, complete or current. The material on this site is provided for general information only and should not be relied upon or used as the sole basis for making decisions without consulting primary, more accurate, more complete or more timely sources of information. Any reliance on the material on this site is at your own risk.",
            },
            {
              text: "This site may contain certain historical information. Historical information, necessarily, is not current and is provided for your reference only. We reserve the right to modify the contents of this site at any time, but we have no obligation to update any information on our site. You agree that it is your responsibility to monitor changes to our site.",
            },
          ],
        },
      },
    },
  });
  await prisma.terms_of_service.create({
    data: {
      h3: "SECTION 4 - MODIFICATIONS TO THE SERVICE AND PRICES",
      p: {
        createMany: {
          data: [
            {
              text: "Prices for our products are subject to change without notice.",
            },
            {
              text: "We reserve the right at any time to modify or discontinue the Service (or any part or content thereof) without notice at any time.",
            },
            {
              text: "We shall not be liable to you or to any third-party for any modification, price change, suspension or discontinuance of the Service.",
            },
          ],
        },
      },
    },
  });
  await prisma.terms_of_service.create({
    data: {
      h3: "SECTION 5 - PRODUCTS OR SERVICES (if applicable)",
      p: {
        createMany: {
          data: [
            {
              text: "Certain products or services may be available exclusively online through the website. These products or services may have limited quantities and are subject to return or exchange only according to our Return Policy.",
            },
            {
              text: "We have made every effort to display as accurately as possible the colors and images of our products that appear at the store. We cannot guarantee that your computer monitor's display of any color will be accurate.",
            },
            {
              text: "We reserve the right, but are not obligated, to limit the sales of our products or Services to any person, geographic region or jurisdiction. We may exercise this right on a case-by-case basis. We reserve the right to limit the quantities of any products or services that we offer. All descriptions of products or product pricing are subject to change at anytime without notice, at the sole discretion of us. We reserve the right to discontinue any product at any time. Any offer for any product or service made on this site is void where prohibited.",
            },
            {
              text: "We do not warrant that the quality of any products, services, information, or other material purchased or obtained by you will meet your expectations, or that any errors in the Service will be corrected.",
            },
          ],
        },
      },
    },
  });
  await prisma.terms_of_service.create({
    data: {
      h3: "SECTION 6 - ACCURACY OF BILLING AND ACCOUNT INFORMATION",
      p: {
        createMany: {
          data: [
            {
              text: "We reserve the right to refuse any order you place with us. We may, in our sole discretion, limit or cancel quantities purchased per person, per household or per order. These restrictions may include orders placed by or under the same customer account, the same credit card, and/or orders that use the same billing and/or shipping address. In the event that we make a change to or cancel an order, we may attempt to notify you by contacting the e‑mail and/or billing address/phone number provided at the time the order was made. We reserve the right to limit or prohibit orders that, in our sole judgment, appear to be placed by dealers, resellers or distributors.",
            },
            {
              text: "You agree to provide current, complete and accurate purchase and account information for all purchases made at our store. You agree to promptly update your account and other information, including your email address and credit card numbers and expiration dates, so that we can complete your transactions and contact you as needed.",
            },
            {
              text: "For more detail, please review our Returns Policy.",
            },
          ],
        },
      },
    },
  });
  await prisma.terms_of_service.create({
    data: {
      h3: "SECTION 7 - OPTIONAL TOOLS",
      p: {
        createMany: {
          data: [
            {
              text: "We may provide you with access to third-party tools over which we neither monitor nor have any control nor input.",
            },
            {
              text: "You acknowledge and agree that we provide access to such tools 'as is' and 'as available' without any warranties, representations or conditions of any kind and without any endorsement. We shall have no liability whatsoever arising from or relating to your use of optional third-party tools.",
            },
            {
              text: "Any use by you of optional tools offered through the site is entirely at your own risk and discretion and you should ensure that you are familiar with and approve of the terms on which tools are provided by the relevant third-party provider(s).",
            },
            {
              text: "We may also, in the future, offer new services and/or features through the website (including, the release of new tools and resources). Such new features and/or services shall also be subject to these Terms of Service.",
            },
          ],
        },
      },
    },
  });
  await prisma.terms_of_service.create({
    data: {
      h3: "SECTION 8 - THIRD-PARTY LINKS",
      p: {
        createMany: {
          data: [
            {
              text: "Certain content, products and services available via our Service may include materials from third-parties.",
            },
            {
              text: "Third-party links on this site may direct you to third-party websites that are not affiliated with us. We are not responsible for examining or evaluating the content or accuracy and we do not warrant and will not have any liability or responsibility for any third-party materials or websites, or for any other materials, products, or services of third-parties.",
            },
            {
              text: "We are not liable for any harm or damages related to the purchase or use of goods, services, resources, content, or any other transactions made in connection with any third-party websites. Please review carefully the third-party's policies and practices and make sure you understand them before you engage in any transaction. Complaints, claims, concerns, or questions regarding third-party products should be directed to the third-party.",
            },
          ],
        },
      },
    },
  });
  await prisma.terms_of_service.create({
    data: {
      h3: "SECTION 9 - USER COMMENTS, FEEDBACK AND OTHER SUBMISSIONS",
      p: {
        createMany: {
          data: [
            {
              text: "If, at our request, you send certain specific submissions (for example contest entries) or without a request from us you send creative ideas, suggestions, proposals, plans, or other materials, whether online, by email, by postal mail, or otherwise (collectively, 'comments'), you agree that we may, at any time, without restriction, edit, copy, publish, distribute, translate and otherwise use in any medium any comments that you forward to us. We are and shall be under no obligation (1) to maintain any comments in confidence; (2) to pay compensation for any comments; or (3) to respond to any comments.",
            },
            {
              text: "We may, but have no obligation to, monitor, edit or remove content that we determine in our sole discretion are unlawful, offensive, threatening, libelous, defamatory, pornographic, obscene or otherwise objectionable or violates any party’s intellectual property or these Terms of Service.",
            },
            {
              text: "You agree that your comments will not violate any right of any third-party, including copyright, trademark, privacy, personality or other personal or proprietary right. You further agree that your comments will not contain libelous or otherwise unlawful, abusive or obscene material, or contain any computer virus or other malware that could in any way affect the operation of the Service or any related website. You may not use a false e‑mail address, pretend to be someone other than yourself, or otherwise mislead us or third-parties as to the origin of any comments. You are solely responsible for any comments you make and their accuracy. We take no responsibility and assume no liability for any comments posted by you or any third-party.",
            },
          ],
        },
      },
    },
  });
  await prisma.terms_of_service.create({
    data: {
      h3: "SECTION 10 - PERSONAL INFORMATION",
      p: {
        createMany: {
          data: [
            {
              text: "Your submission of personal information through the store is governed by our Privacy Policy. To view our Privacy Policy.",
            },
          ],
        },
      },
    },
  });
  await prisma.terms_of_service.create({
    data: {
      h3: "SECTION 11 - ERRORS, INACCURACIES AND OMISSIONS",
      p: {
        createMany: {
          data: [
            {
              text: "Occasionally there may be information on our site or in the Service that contains typographical errors, inaccuracies or omissions that may relate to product descriptions, pricing, promotions, offers, product shipping charges, transit times and availability. We reserve the right to correct any errors, inaccuracies or omissions, and to change or update information or cancel orders if any information in the Service or on any related website is inaccurate at any time without prior notice (including after you have submitted your order).We undertake no obligation to update, amend or clarify information in the Service or on any related website, including without limitation, pricing information, except as required by law. No specified update or refresh date applied in the Service or on any related website, should be taken to indicate that all information in the Service or on any related website has been modified or updated.",
            },
          ],
        },
      },
    },
  });
  await prisma.terms_of_service.create({
    data: {
      h3: "SECTION 12 - PROHIBITED USES",
      p: {
        createMany: {
          data: [
            {
              text: "In addition to other prohibitions as set forth in the Terms of Service, you are prohibited from using the site or its content: (a) for any unlawful purpose; (b) to solicit others to perform or participate in any unlawful acts; (c) to violate any international, federal, provincial or state regulations, rules, laws, or local ordinances; (d) to infringe upon or violate our intellectual property rights or the intellectual property rights of others; (e) to harass, abuse, insult, harm, defame, slander, disparage, intimidate, or discriminate based on gender, sexual orientation, religion, ethnicity, race, age, national origin, or disability; (f) to submit false or misleading information; (g) to upload or transmit viruses or any other type of malicious code that will or may be used in any way that will affect the functionality or operation of the Service or of any related website, other websites, or the Internet; (h) to collect or track the personal information of others; (i) to spam, phish, pharm, pretext, spider, crawl, or scrape; (j) for any obscene or immoral purpose; or (k) to interfere with or circumvent the security features of the Service or any related website, other websites, or the Internet. We reserve the right to terminate your use of the Service or any related website for violating any of the prohibited uses.",
            },
          ],
        },
      },
    },
  });
  await prisma.terms_of_service.create({
    data: {
      h3: "SECTION 13 - DISCLAIMER OF WARRANTIES; LIMITATION OF LIABILITY",
      p: {
        createMany: {
          data: [
            {
              text: "We do not guarantee, represent or warrant that your use of our service will be uninterrupted, timely, secure or error-free.",
            },
            {
              text: "We do not warrant that the results that may be obtained from the use of the service will be accurate or reliable.",
            },
            {
              text: "You agree that from time to time we may remove the service for indefinite periods of time or cancel the service at any time, without notice to you.",
            },
            {
              text: "You expressly agree that your use of, or inability to use, the service is at your sole risk. The service and all products and services delivered to you through the service are (except as expressly stated by us) provided 'as is' and 'as available' for your use, without any representation, warranties or conditions of any kind, either express or implied, including all implied warranties or conditions of merchantability, merchantable quality, fitness for a particular purpose, durability, title, and non-infringement.",
            },
            {
              text: "In no case shall Drums That Knock, our directors, officers, employees, affiliates, agents, contractors, interns, suppliers, service providers or licensors be liable for any injury, loss, claim, or any direct, indirect, incidental, punitive, special, or consequential damages of any kind, including, without limitation lost profits, lost revenue, lost savings, loss of data, replacement costs, or any similar damages, whether based in contract, tort (including negligence), strict liability or otherwise, arising from your use of any of the service or any products procured using the service, or for any other claim related in any way to your use of the service or any product, including, but not limited to, any errors or omissions in any content, or any loss or damage of any kind incurred as a result of the use of the service or any content (or product) posted, transmitted, or otherwise made available via the service, even if advised of their possibility. Because some states or jurisdictions do not allow the exclusion or the limitation of liability for consequential or incidental damages, in such states or jurisdictions, our liability shall be limited to the maximum extent permitted by law.",
            },
          ],
        },
      },
    },
  });
  await prisma.terms_of_service.create({
    data: {
      h3: "SECTION 14 - INDEMNIFICATION",
      p: {
        createMany: {
          data: [
            {
              text: "You agree to indemnify, defend and hold harmless Drums That Knock and our parent, subsidiaries, affiliates, partners, officers, directors, agents, contractors, licensors, service providers, subcontractors, suppliers, interns and employees, harmless from any claim or demand, including reasonable attorneys’ fees, made by any third-party due to or arising out of your breach of these Terms of Service or the documents they incorporate by reference, or your violation of any law or the rights of a third-party.",
            },
          ],
        },
      },
    },
  });
  await prisma.terms_of_service.create({
    data: {
      h3: "SECTION 15 - SEVERABILITY",
      p: {
        createMany: {
          data: [
            {
              text: "In the event that any provision of these Terms of Service is determined to be unlawful, void or unenforceable, such provision shall nonetheless be enforceable to the fullest extent permitted by applicable law, and the unenforceable portion shall be deemed to be severed from these Terms of Service, such determination shall not affect the validity and enforceability of any other remaining provisions.",
            },
          ],
        },
      },
    },
  });
  await prisma.terms_of_service.create({
    data: {
      h3: "SECTION 16 - TERMINATION",
      p: {
        createMany: {
          data: [
            {
              text: "The obligations and liabilities of the parties incurred prior to the termination date shall survive the termination of this agreement for all purposes.",
            },
            {
              text: "These Terms of Service are effective unless and until terminated by either you or us. You may terminate these Terms of Service at any time by notifying us that you no longer wish to use our Services, or when you cease using our site.",
            },
            {
              text: "If in our sole judgment you fail, or we suspect that you have failed, to comply with any term or provision of these Terms of Service, we also may terminate this agreement at any time without notice and you will remain liable for all amounts due up to and including the date of termination; and/or accordingly may deny you access to our Services (or any part thereof).",
            },
          ],
        },
      },
    },
  });
  await prisma.terms_of_service.create({
    data: {
      h3: "SECTION 17 - ENTIRE AGREEMENT",
      p: {
        createMany: {
          data: [
            {
              text: "The failure of us to exercise or enforce any right or provision of these Terms of Service shall not constitute a waiver of such right or provision.",
            },
            {
              text: "These Terms of Service and any policies or operating rules posted by us on this site or in respect to The Service constitutes the entire agreement and understanding between you and us and govern your use of the Service, superseding any prior or contemporaneous agreements, communications and proposals, whether oral or written, between you and us (including, but not limited to, any prior versions of the Terms of Service).",
            },
            {
              text: "Any ambiguities in the interpretation of these Terms of Service shall not be construed against the drafting party.",
            },
          ],
        },
      },
    },
  });
  await prisma.terms_of_service.create({
    data: {
      h3: "SECTION 18 - GOVERNING LAW",
      p: {
        createMany: {
          data: [
            {
              text: "These Terms of Service and any separate agreements whereby we provide you Services shall be governed by and construed in accordance with the laws of United States.",
            },
          ],
        },
      },
    },
  });
  await prisma.terms_of_service.create({
    data: {
      h3: "SECTION 19 - CHANGES TO TERMS OF SERVICE",
      p: {
        createMany: {
          data: [
            {
              text: "You can review the most current version of the Terms of Service at any time at this page.We reserve the right, at our sole discretion, to update, change or replace any part of these Terms of Service by posting updates and changes to our website. It is your responsibility to check our website periodically for changes. Your continued use of or access to our website or the Service following the posting of any changes to these Terms of Service constitutes acceptance of those changes.",
            },
          ],
        },
      },
    },
  });
  await prisma.terms_of_service.create({
    data: {
      h3: "SECTION 20 - CONTACT INFORMATION",
      p: {
        createMany: {
          data: [
            {
              text: "Questions about the Terms of Service should be sent to us at decap@drumsthatknock.com.",
            },
          ],
        },
      },
    },
  });
};

const initShippingPolicy = async () => {
  const isShippingPolicy = await prisma.shipping_policy.findMany();
  if (isShippingPolicy.length) {
    return;
  }

  await prisma.shipping_policy.create({
    data: {
      h2: "Digital Products",
      h2s: "Physical Products",
      p: "You will be emailed a link to download the product you purchased after you complete checkout.",
      p2: "Usually, it takes 3-7 days to fulfill an order, after which it's shipped out. The shipping time depends on your location, but can be estimated as follows:",
      ul: {
        createMany: {
          data: [
            {
              li: "USA: 3-4 business days",
            },
            {
              li: "Europe: 6-8 business days",
            },
            {
              li: "Australia: 2-14 business days",
            },
            {
              li: "Japan: 4-8 business days",
            },
            {
              li: "International: 10-20 business days",
            },
            {
              li: "Our fulfillment times may be longer than usual and may continue toincrease until things get back to normal. Were seeing delays inour supply chain, including distributors and shipping carriers as theentire industry is grappling with challenges.",
            },
          ],
        },
      },
    },
  });
};

const initRefundPolicy = async () => {
  const isRefundPolicy = await prisma.refund_policy.findMany();
  if (isRefundPolicy.length) {
    return;
  }

  await prisma.refund_policy.create({
    data: {
      h2: "What's Your Return Policy?",
      p: "We don't offer returns and exchanges, but if there's something wrong with your order, please let us know by contacting us at support@pluginsthatknock.com",
    },
  });
};

const initPrivacyPolicy = async () => {
  const isRefundPolicy = await prisma.privacy_policy.findMany();
  if (isRefundPolicy.length) {
    return;
  }

  await prisma.privacy_policy.create({
    data: {
      head: "This Privacy Policy describes how pluginsthatknock.com (the 'Site' or 'we')",
      head2:
        "collects, uses, and discloses your Personal Information when you visit or make a purchase from the Site.",
      collecting: {
        create: {
          h2: "Collecting Personal Information",
          p: "When you visit the Site, we collect certain information about your device, your interaction with the Site, and information necessary to process your purchases. We may also collect additional information if you contact us for customer support. In this Privacy Policy, we refer to any information that can uniquely identify an individual (including the information below) as ''Personal Information''. See the list below for more information about what Personal Information we collect and why.",
          u: "Device information",
          li: {
            createMany: {
              data: [
                {
                  strong: "Examples of Personal Information collected:",
                  text: "version of web browser, IP address, time zone, cookie information, what sites or products you view, search terms, and how you interact with the Site.",
                },
                {
                  strong: "Purpose of collection:",
                  text: "to load the Site accurately for you, and to perform analytics on Site usage to optimize our Site.",
                },
                {
                  strong: "Source of collection:",
                  text: "Collected automatically when you access our Site using cookies, log files, web beacons, tags, or pixels.",
                },
                {
                  strong: "Disclosure for a business purpose:",
                  text: "shared with our processor Shopify.",
                },
              ],
            },
          },
          u2: "Order information",
          li2: {
            createMany: {
              data: [
                {
                  strong: "Examples of Personal Information collected:",
                  text: "name, billing address, shipping address, payment information (including credit card numbers), email address, and phone number.",
                },
                {
                  strong: "Purpose of collection:",
                  text: "to provide products or services to you to fulfill our contract, to process your payment information, arrange for shipping, and provide you with invoices and/or order confirmations, communicate with you, screen our orders for potential risk or fraud, and when in line with the preferences you have shared with us, provide you with information or advertising relating to our products or services.",
                },
                {
                  strong: "Source of collection:",
                  text: "collected from you.",
                },
                {
                  strong: "Disclosure for a business purpose:",
                  text: "shared with our processor Shopify.",
                },
              ],
            },
          },
        },
      },
      minors: {
        create: {
          h3: "Minors",
          p: "The Site is not intended for individuals under the age of 18. We do not intentionally collect Personal Information from children. If you are the parent or guardian and believe your child has provided us with Personal Information, please contact us at the address below to request deletion.",
        },
      },
      sharing: {
        create: {
          h2: "Sharing Personal Information",
          p: "We share your Personal Information with service providers to help us provide our services and fulfill our contracts with you, as described above. For example:",
          ul: {
            createMany: {
              data: [
                {
                  li: "We use Shopify to power our online store. You can read more about how Shopify uses your Personal Information here:",
                  a: "https://www.shopify.com/legal/privacy",
                },
                {
                  li: "We may share your Personal Information to comply with applicable laws and regulations, to respond to a subpoena, search warrant or other lawful request for information we receive, or to otherwise protect our rights.",
                  a: "",
                },
              ],
            },
          },
        },
      },
      behavioural: {
        create: {
          h3: "Behavioural Advertising",
          a: "",
          p: {
            createMany: {
              data: [
                {
                  text: "As described above, we use your Personal Information to provide you with targeted advertisements or marketing communications we believe may be of interest to you. For example:",
                  a: "",
                },
                {
                  text: `For more information about how targeted advertising works, you can visit
                  the Network Advertising Initiative's NAI educational page at `,
                  a: "http://www.networkadvertising.org/understanding-online-advertising/how-does-it-work",
                },
                {
                  text: `Additionally, you can opt out of some of these services by visiting the
                  Digital Advertising Alliance's opt-out portal at:`,
                  a: "http://optout.aboutads.info/",
                },
              ],
            },
          },
          ul: {
            createMany: {
              data: [
                {
                  li: "We use Google Analytics and Facebook Pixel to help us understand howour customers use the Site. You can read more about how Google uses your Personal Information here:",
                  a: "https://policies.google.com/privacy?hl=en",
                },
                {
                  li: ".You can also opt-out of Google Analytics here:",
                  a: "https://tools.google.com/dlpage/gaoptout",
                },
                {
                  li: `We share information about your use of the Site, your purchases, and your interaction with our ads on other websites with our advertising
					partners. We collect and share some of this information directly with
					our advertising partners, and in some cases through the use of cookies
					or other similar technologies (which you may consent to, depending on
					your location).`,
                  a: "",
                },
              ],
            },
          },
          p2: "You can opt out of targeted advertising by:",
          ul2: {
            createMany: {
              data: [
                {
                  em: "FACEBOOK -",
                  li: "https://www.facebook.com/settings/?tab=ads",
                },
                {
                  em: "GOOGLE -",
                  li: "https://www.google.com/settings/ads/anonymous",
                },
              ],
            },
          },
        },
      },
      personal: {
        create: {
          h2: "Using Personal Information",
          p: "We use your personal Information to provide our services to you, which includes: offering products for sale, processing payments, shipping and fulfillment of your order, and keeping you up to date on new products, services, and offers.",
        },
      },
      lawfulBasis: {
        create: {
          h3: "Lawful basis",
          p: "Pursuant to the General Data Protection Regulation (''GDPR''), if you are a resident of the European Economic Area (''EEA''), we process your personal information under the following lawful bases:",
          ul: {
            createMany: {
              data: [
                {
                  li: "Your consent;",
                },
                {
                  li: "The performance of the contract between you and the Site;",
                },
                {
                  li: "Compliance with our legal obligations;",
                },
                {
                  li: "To protect your vital interests;",
                },
                {
                  li: "To perform a task carried out in the public interest;",
                },
                {
                  li: "For our legitimate interests, which do not override your fundamental rights and freedoms.",
                },
              ],
            },
          },
        },
      },
      retention: {
        create: {
          h3: "Retention",
          p: "When you place an order through the Site, we will retain your Personal Information for our records unless and until you ask us to erase this information. For more information on your right of erasure, please see the Your rights section below.",
        },
      },
      automatic: {
        create: {
          h3: "Automatic decision-making",
          p: {
            createMany: {
              data: [
                {
                  text: `If you are a resident of the EEA, you have the right to object to processing based solely on automated decision-making (which includes
              profiling), when that decision-making has a legal effect on you or
              otherwise significantly affects you.`,
                },
                {
                  text: "We do not engage in fully automated decision-making that has alegal or otherwise significant effect using customer data.",
                },
                {
                  text: "Our processor Shopify uses limited automated decision-making to prevent fraud that does not have a legal or otherwise significant effect on you.",
                },
                {
                  text: "Services that include elements of automated decision-making include:",
                },
              ],
            },
          },
          ul: {
            createMany: {
              data: [
                {
                  text: "Temporary denylist of IP addresses associated with repeated failed transactions. This denylist persists for a small number of hours.",
                },
                {
                  text: "Temporary denylist of credit cards associated with denylisted IP addresses. This denylist persists for a small number of days.",
                },
              ],
            },
          },
        },
      },
      yourRights: {
        create: {
          h2: "Your rights",
          h3: "GDPR",
          p: {
            createMany: {
              data: [
                {
                  text: "If you are a resident of the EEA, you have the right to access the Personal Information we hold about you, to port it to a new service, and to ask that your Personal Information be corrected, updated, or erased. If you would like to exercise these rights, please contact us through the contact information below",
                  em: "OR INSERT ALTERNATIVE INSTRUCTIONS FOR SENDING ACCESS, ERASURE, CORRECTION, AND PORTABILITY REQUESTS",
                  a: "",
                },
                {
                  text: "Your Personal Information will be initially processed in Ireland and then will be transferred outside of Europe for storage and further processing, including to Canada and the United States. For more information on how data transfers comply with the GDPR, see Shopify's GDPR Whitepaper:",
                  em: "",
                  a: "https://help.shopify.com/en/manual/your-account/privacy/GDPR",
                },
              ],
            },
          },
        },
      },
      ccpa: {
        create: {
          p: {
            createMany: {
              data: [
                {
                  text: `If you are a resident of California, you have the right to access the Personal Information we hold about you (also known as the 'Right to Know'), to port it to a new service, and to ask that your Personal Information be corrected, updated, or erased. If you would like to exercise these rights, please contact us through the contact information below.`,
                },
                {
                  text: "If you would like to designate an authorized agent to submit these requests on your behalf, please contact us at the address below.",
                },
              ],
            },
          },
          h3: "CCPA",
        },
      },
      cookies: {
        create: {
          h2: "Cookies",
          p: {
            createMany: {
              data: [
                {
                  text: "A cookie is a small amount of information that's downloaded to your computer or device when you visit our Site. We use a number of different cookies, including functional, performance, advertising, and social media or content cookies. Cookies make your browsing experience better by allowing the website to remember your actions and preferences (such as login and region selection). This means you don't have to re-enter this information each time you return to the site or browse from one page to another. Cookies also provide information on how people use the website, for instance whether it's their first time visiting or if they are a frequent visitor.",
                },
                {
                  text: "We use the following cookies to optimize your experience on our Site and to provide our services.",
                },
              ],
            },
          },
        },
      },
      necessary: {
        create: {
          h3: "Cookies Necessary For The Functioning Of The Store",
          table: {
            createMany: {
              data: [
                {
                  strong: "Name",
                  strong2: "Function",
                },
                {
                  em: "_ab",
                  td: "Used in connection with access to admin.",
                },
                {
                  em: "_secure_session_id",
                  td: "Used in connection with navigation through a storefront.",
                },
                {
                  em: "cart",
                  td: "Used in connection with shopping cart.",
                },
                {
                  em: "cart_sig",
                  td: "Used in connection with checkout.",
                },
                {
                  em: "cart_ts",
                  td: "Used in connection with checkout.",
                },
                {
                  em: "checkout_token",
                  td: "Used in connection with checkout.",
                },
                {
                  em: "secret",
                  td: "Used in connection with customer login.",
                },
                {
                  em: "storefront_digest",
                  td: "Used in connection with customer login.",
                },
                {
                  em: "_shopify_u",
                  td: "Used to facilitate updating customer account information.",
                },
              ],
            },
          },
        },
      },
      analytics: {
        create: {
          h3: "Reporting and Analytics",
          table: {
            createMany: {
              data: [
                {
                  strong: "Name",
                  strong2: "Function",
                },
                {
                  em: "_tracking_consent",
                  td: "Tracking preferences.",
                },
                {
                  em: "_landing_page",
                  td: "Track landing pages",
                },
                {
                  em: "_orig_referrer",
                  td: "Track landing pages",
                },
                {
                  em: "_s",
                  td: "Shopify analytics.",
                },
                {
                  em: "_shopify_fs",
                  td: "Shopify analytics.",
                },
                {
                  em: "_shopify_s",
                  td: "Shopify analytics.",
                },
                {
                  em: "_shopify_sa_p",
                  td: "Shopify analytics relating to marketing referrals.",
                },
                {
                  em: "_shopify_sa_t",
                  td: "Shopify analytics relating to marketing referrals.",
                },
                {
                  em: "_shopify_y",
                  td: "Shopify analytics.",
                },
                {
                  em: "_y",
                  td: "Shopify analytics.",
                },
              ],
            },
          },
          em: "INSERT OTHER COOKIES OR TRACKING TECHNOLOGIES THAT YOU USE",
          p: {
            createMany: {
              data: [
                {
                  p: "The length of time that a cookie remains on your computer or mobile device depends on whether it is a ''persistent'' or ''session'' cookie. Session cookies last until you stop browsing and persistent cookies last until they expire or are deleted. Most of the cookies we use are persistent and will expire between 30 minutes and two years from the date they are downloaded to your device.",
                  a: "",
                },
                {
                  p: "You can control and manage cookies in various ways. Please keep in mind that removing or blocking cookies can negatively impact your user experience and parts of our website may no longer be fully accessible.",
                  a: "",
                },
                {
                  p: "Most browsers automatically accept cookies, but you can choose whether or not to accept cookies through your browser controls, often found in your browser's ''Tools'' or ''Preferences'' menu. For more information on how to modify your browser settings or how to block, manage or filter cookies can be found in your browser's help file or through such sites as",
                  a: "www.allaboutcookies.org",
                },
                {
                  p: "Additionally, please note that blocking cookies may not completely prevent how we share information with third parties such as our advertising partners. To exercise your rights or opt-out of certain uses of your information by these parties, please follow the instructions in the ''Behavioural Advertising'' section above.",
                  a: "",
                },
              ],
            },
          },
        },
      },
      doNotTrack: {
        create: {
          h3: "Do Not Track",
          p: "Please note that because there is no consistent industry understanding of how to respond to ''Do Not Track'' signals, we do not alter our data collection and usage practices when we detect such a signal from your browser.",
        },
      },
      changes: {
        create: {
          h2: "Changes",
          p: "We may update this Privacy Policy from time to time in order to reflect, for example, changes to our practices or for other operational, legal, or regulatory reasons.",
        },
      },
      contact: {
        create: {
          h2: "Contact",
          p: {
            createMany: {
              data: [
                {
                  text: "For more information about our privacy practices, if you have questions, or if you would like to make a complaint, please contact us by e-mail at support@pluginsthatknock.com or by mail using the details provided below:",
                },
                {
                  text: "THAT KNOCK, INC, 2025 McKinnon Ave, San Francisco CA 94124, United States          ",
                },
              ],
            },
          },
          em: "Last updated: 10/13/21",
          p2: {
            create: {
              text: "If you are not satisfied with our response to your complaint, you have the right to lodge your complaint with the relevant data protection authority. You can contact your local data protection authority, or our supervisory authority here:",
              em: "ADD CONTACT INFORMATION OR WEBSITE FOR THE DATA PROTECTION AUTHORITY IN YOUR JURISDICTION. FOR EXAMPLE:",
              a: "https://ico.org.uk/make-a-complaint/",
            },
          },
        },
      },
    },
  });
};

const initUpSelling = async () => {
  const upselling = await prisma.upselling_popup.findMany();

  if (upselling.length) {
    return;
  } else {
    await prisma.upselling_popup.create({
      data: {
        handle: "knock-plugin",
        discount_code: "HKASGGWV381S",
        discount_percentage: 40,
      },
    });
  }
};

const initSettingsUpSell = async () => {
  const upselling_settings = await prisma.upselling_popup_settings.findMany();

  if (upselling_settings.length) {
    return;
  } else {
    await prisma.upselling_popup_settings.create({
      data: {
        buttonText: "Add To Cart",
        disable: true,
      },
    });
  }
};

createAdmin();
initBanner();
initMainSection();
initPopup();
initHomePage();
initKnockPage();
initKnockClipperPage();
initDTKPage();
initFAQPage();
initDTKproduct();
initTermsOfService();
initShippingPolicy();
initRefundPolicy();
initPrivacyPolicy();
initDtkMainSection();
initUpSelling();
initSettingsUpSell();
