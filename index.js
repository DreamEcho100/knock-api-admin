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
              srcImage: "https://img.youtube.com/vi/T64PcrQaC-A/maxresdefault.jpg",
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
              srcImage: "https://img.youtube.com/vi/EduPz5KmANk/maxresdefault.jpg",
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
              srcImage: "https://img.youtube.com/vi/23e9wz11lqA/maxresdefault.jpg",
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
              srcImage: "https://img.youtube.com/vi/zXklcm6yYdk/maxresdefault.jpg",
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
              srcImage: "https://img.youtube.com/vi/Vrn2jOXbtXU/maxresdefault.jpg",
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
              srcImage: "https://img.youtube.com/vi/aDbjb5wlos0/maxresdefault.jpg",
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
              srcImage: "https://img.youtube.com/vi/OrXT2MpwHEg/maxresdefault.jpg",
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
              srcImage: "https://img.youtube.com/vi/YNKkxd2aPzI/maxresdefault.jpg",
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
              srcImage: "https://img.youtube.com/vi/j1Fj0gm2GXE/maxresdefault.jpg",
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
              srcImage: "https://img.youtube.com/vi/p-wek5z59IA/maxresdefault.jpg",
              title: "",
            },
            {
              src: "https://www.youtube.com/embed/KG1q81qR_b4",
              srcImage: "https://img.youtube.com/vi/KG1q81qR_b4/maxresdefault.jpg",
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
