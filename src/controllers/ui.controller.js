const { prisma } = require("../../prisma/prisma");
const { calculatePercentageDecrease } = require("../utils/generator");
const { reviews, artists, reviewsDTKPage } = require("../utils/reviews");

// banner
exports.getBanner = async (req, res) => {
  try {
    const banner = await prisma.banner.findUnique({
      where: {
        id: 3,
      },
    });

    return res.status(200).json({
      success: true,
      message: "",
      banner,
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.changeBanner = async (req, res) => {
  try {
    const data = req.body;

    const update = await prisma.banner.update({
      where: {
        id: 3,
      },
      data,
    });

    return res.status(200).json({
      success: true,
      message: "Banner changed Successfully!",
      banner: update,
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// main
exports.getMainSection = async (req, res) => {
  try {
    const main = await prisma.main_section.findUnique({
      where: {
        id: 1,
      },
    });

    return res.status(200).json({
      success: true,
      message: "",
      main,
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.changeMainSection = async (req, res) => {
  try {
    let data = req.body;

    delete data.mainImageUrl;
    delete req.body.imageUrl;
    delete req.body.tradeMark;

    await prisma.main_section.update({
      where: {
        id: 1,
      },
      data,
    });

    return res.status(200).json({
      success: true,
      message: "Main section changed Successfully!",
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.resetMainSection = async (req, res) => {
  try {
    const { sectionId, pageId } = req.query;

    let update;

    switch (pageId) {
      case "main-section":
        update = await prisma.main_section.update({
          where: {
            id: 1,
          },
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
        break;

        update = await prisma.second_section_home_page.update({
          where: {
            id: 1,
          },
          data: {
            h2: "CLIPPER",
            tradeMark: "KNOCK",
            p: "Adjustable hard + soft clipper module from KNOCK.",
            button: "Explore It Now",
            buttonUrl: "/knock-clipper",
            buttonColor: "#7548FE",
            imageUrl: "/images/knock-clipper.png",
          },
        });
        break;
      case "knock-main-section":
        if (sectionId === "main-section") {
          update = await prisma.knock_main_section.update({
            where: {
              id: 1,
            },
            data: {
              h2: "MAKE YOUR DRUMS",
              tradeMark: "KNOCK",
              p: "Make your drums KNOCK and punch through the mix.",
              mainImageUrl: "/images/29f8b3dde3b1d7e7a476bf19c95536f1.png",
              buttonText: "Add To Cart",
            },
          });
        }
        if (sectionId === "fifth-section") {
          update = await prisma.fifth_section_knock_page.update({
            where: {
              id: 1,
            },
            data: {
              imageUrl: "/images/29f8b3dde3b1d7e7a476bf19c95536f1.png",
              p: "This plugin includes every feature DECAP used in order to craft his signature sound heard in DRUMS THAT KNOCK, and has been optimized for the highest quality sound possible. Every feature has been fine tuned to perfection to DECAP's production standards. KNOCK also comes bundled with factory presets crafted by DECAP.",
              button: "Add To Cart",
              h2: "DRUMS THAT",
              tradeMark: "KNOCK",
            },
          });
        }
        break;
      case "knock-clipper-main-section":
        update = await prisma.knock_clipper_main_section.update({
          where: {
            id: 1,
          },
          data: {
            h2: "CLIPPER",
            p: "Adjustable hard & soft clipper module from KNOCK.",
            tradeMark: "KNOCK",
            mainImageUrl: "/images/abc59a63fe5ed68da58bff746fd14cce.png",
            buttonText: "Add To Cart",
          },
        });
        break;
      default:
        break;
    }

    return res.status(200).json({
      success: true,
      message: "Main section changed Successfully!",
      main: update,
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.uploadImageMainSection = async (req, res) => {
  try {
    if (req.file) {
      const path = req.file.path.split("public");
      await prisma.main_section.update({
        where: {
          id: 1,
        },
        data: {
          mainImageUrl: path[1],
        },
      });

      return res.status(200).json({
        success: true,
        message: "Main image uploaded successfully",
      });
    }
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// knock main
exports.getKnockMainSection = async (req, res) => {
  try {
    const main = await prisma.knock_main_section.findUnique({
      where: {
        id: 1,
      },
    });

    return res.status(200).json({
      success: true,
      message: "",
      main,
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.changeKnockMainSection = async (req, res) => {
  try {
    let data = req.body;

    delete data.buttonUrl;
    delete data.h2Color;
    delete data.pColor;
    delete data.mainImageUrl;
    delete req.body.imageUrl;

    switch (data.sectionId) {
      case "main-section":
        delete data.sectionId;
        await prisma.knock_main_section.update({
          where: {
            id: 1,
          },
          data,
        });
        break;
      case "fifth-section":
        delete data.sectionId;
        await prisma.fifth_section_knock_page.update({
          where: {
            id: 1,
          },
          data,
        });
        break;

      default:
        break;
    }
    return res.status(200).json({
      success: true,
      message: "section changed Successfully!",
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.uploadKnockImageMainSection = async (req, res) => {
  try {
    if (req.file) {
      const path = req.file.path.split("public");
      const { sectionId } = req.body;
      switch (sectionId) {
        case "fifth-section":
          await prisma.fifth_section_knock_page.update({
            where: {
              id: 1,
            },
            data: {
              imageUrl: path[1],
            },
          });
          break;
        default:
          await prisma.knock_main_section.update({
            where: {
              id: 1,
            },
            data: {
              mainImageUrl: path[1],
            },
          });
          break;
      }

      return res.status(200).json({
        success: true,
        message: "Main image uploaded successfully",
      });
    }
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.addSystemRequirmentsKnock = async (req, res) => {
  try {
    const { li, macOrPc } = req.body;

    if (!li) {
      throw new Error("Please provide a valid text");
    }
    if (!macOrPc) {
      throw new Error("Please provide a type mac or pc");
    }

    if (macOrPc === "mac") {
      await prisma.seven_section_knock_page_mac.create({
        data: {
          li,
          seven_section_knock_page: {
            connect: {
              id: 1,
            },
          },
        },
      });
    } else if (macOrPc === "pc") {
      await prisma.seven_section_knock_page_pc.create({
        data: {
          li,
          seven_section_knock_page: {
            connect: {
              id: 1,
            },
          },
        },
      });
    }

    return res.status(200).json({
      success: true,
      message: "Bullet added successfully!",
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.removeSystemRequirmentsKnock = async (req, res) => {
  try {
    const { bulletId, macOrPc } = req.query;

    const excludedIds = [1, 2, 3, 4];

    if (excludedIds.includes(parseInt(bulletId))) {
      throw new Error("You can't remove this requierment");
    }

    if (macOrPc === "mac") {
      await prisma.seven_section_knock_page_mac.delete({
        where: {
          id: parseInt(bulletId),
        },
      });
    } else if (macOrPc === "pc") {
      await prisma.seven_section_knock_page_pc.delete({
        where: {
          id: parseInt(bulletId),
        },
      });
    }

    return res.status(200).json({
      success: true,
      message: "Bullet removed successfully!",
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// knock clipper main
exports.getKnockClipperMainSection = async (req, res) => {
  try {
    const main = await prisma.knock_clipper_main_section.findUnique({
      where: {
        id: 1,
      },
    });

    return res.status(200).json({
      success: true,
      message: "",
      main,
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.changeKnockClipperMainSection = async (req, res) => {
  try {
    let data = req.body;

    delete data.buttonUrl;
    delete data.h2Color;
    delete data.pColor;
    delete data.mainImageUrl;
    delete req.body.imageUrl;
    delete req.body.sectionId;

    await prisma.knock_clipper_main_section.update({
      where: {
        id: 1,
      },
      data,
    });

    return res.status(200).json({
      success: true,
      message: "section changed Successfully!",
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.uploadKnockClipperImageMainSection = async (req, res) => {
  try {
    if (req.file) {
      const path = req.file.path.split("public");

      await prisma.knock_clipper_main_section.update({
        where: {
          id: 1,
        },
        data: {
          mainImageUrl: path[1],
        },
      });

      return res.status(200).json({
        success: true,
        message: "Main image uploaded successfully",
      });
    }
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// popup
exports.getPopUp = async (req, res) => {
  try {
    const popup = await prisma.popup.findUnique({
      where: {
        id: 3,
      },
    });

    return res.status(200).json({
      success: true,
      message: "",
      popup,
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.resetPopUp = async (req, res) => {
  try {
    const update = await prisma.popup.update({
      where: {
        id: 3,
      },
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

    return res.status(200).json({
      success: true,
      message: "Popup changed Successfully!",
      popup: update,
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.changePopUp = async (req, res) => {
  try {
    let data = req.body;

    delete data.mainImageUrl;
    delete data.imageUrl;

    const update = await prisma.popup.update({
      where: {
        id: 3,
      },
      data,
    });
    return res.status(200).json({
      success: true,
      message: "Popup changed Successfully!",
      popup: update,
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.uploadImagePopUp = async (req, res) => {
  try {
    if (req.file) {
      const path = req.file.path.split("public");

      await prisma.popup.update({
        where: {
          id: 3,
        },
        data: {
          mainImageUrl: path[1],
        },
      });

      return res.status(200).json({
        success: true,
        message: "Popup image uploaded successfully",
      });
    }
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// home page

exports.getHomePage = async (req, res) => {
  try {
    const homePage = await prisma.home_page.findMany();

    const secondSection = await prisma.second_section_home_page.findUnique({
      where: { id: homePage[0].id },
    });

    const thirdSection = await prisma.third_section_home_page.findUnique({
      where: { id: homePage[0].id },
    });

    const forthSection = await prisma.forth_section_home_page.findUnique({
      where: { id: homePage[0].id },
    });

    return res.status(200).json({
      success: true,
      message: "",
      secondSection,
      thirdSection,
      forthSection,
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.editHomePage = async (req, res) => {
  try {
    const { sectionId } = req.body;
    delete req.body.imageUrl;
    switch (sectionId) {
      case "secondSection":
        delete req.body.sectionId;
        await prisma.second_section_home_page.update({
          where: { id: 1 },
          data: {
            ...req.body,
          },
        });
        break;
      case "thirdSection":
        delete req.body.sectionId;
        await prisma.third_section_home_page.update({
          where: { id: 1 },
          data: {
            ...req.body,
          },
        });
        break;
      case "forthSection":
        delete req.body.sectionId;
        await prisma.forth_section_home_page.update({
          where: { id: 1 },
          data: {
            ...req.body,
          },
        });
        break;

      default:
        break;
    }

    const homePage = await prisma.home_page.findMany();

    const secondSection = await prisma.second_section_home_page.findUnique({
      where: { id: homePage[0].id },
    });

    const thirdSection = await prisma.third_section_home_page.findUnique({
      where: { id: homePage[0].id },
    });

    const forthSection = await prisma.forth_section_home_page.findUnique({
      where: { id: homePage[0].id },
    });

    return res.status(200).json({
      success: true,
      message: "Section changed Successfully!",
      secondSection,
      thirdSection,
      forthSection,
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.changeSampleBox = async (req, res) => {
  try {
    let response;
    const { sampleBoxId, sampleBoxHandle } = req.body;
    switch (sampleBoxId) {
      case "itemOneHandle":
        response = await prisma.forth_section_home_page.update({
          where: { id: 1 },
          data: {
            itemOneHandle: sampleBoxHandle,
          },
        });
        break;

      case "itemTwoHandle":
        response = await prisma.forth_section_home_page.update({
          where: { id: 1 },
          data: {
            itemTwoHandle: sampleBoxHandle,
          },
        });
        break;
      default:
        break;
    }

    return res.status(200).json({
      success: true,
      message: "Sample box changed Successfully!",
      data: response,
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.uploadHomePageImages = async (req, res) => {
  try {
    if (req.file) {
      const path = req.file.path.split("public");
      const { sectionId } = req.body;
      switch (sectionId) {
        case "secondSection":
          await prisma.second_section_home_page.update({
            where: {
              id: 1,
            },
            data: {
              imageUrl: path[1],
            },
          });
          break;
        default:
          break;
      }

      return res.status(200).json({
        success: true,
        message: "image uploaded successfully",
      });
    }
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.resetHomePageSections = async (req, res) => {
  try {
    let update;
    const { sectionId } = req.query;
    switch (sectionId) {
      case "second-section-homepage":
        update = await prisma.second_section_home_page.update({
          where: {
            id: 1,
          },
          data: {
            h2: "CLIPPER",
            tradeMark: "KNOCK",
            p: "Adjustable hard + soft clipper module from KNOCK.",
            button: "Explore It Now",
            buttonUrl: "/knock-clipper",
            buttonColor: "#7548FE",
            imageUrl: "/images/knock-clipper.png",
          },
        });

        break;

      case "third-section-homepage":
        update = await prisma.third_section_home_page.update({
          where: {
            id: 1,
          },
          data: {
            h2: "MAKE YOUR DRUMS",
            tradeMark: "KNOCK",
            p: "DECAP is a Billboard Top 10, platinum-certified producer, sound designer, and the creator of Drums That Knock. The series garnered over 5 million downloads, and it has helped shape the sound of modern rap, r&b, and pop music. Drums That Knock are being used on grammy winning songs, and trusted by producers all over the world.",
          },
        });
        break;

      case "forth-section-homepage":
        update = await prisma.forth_section_home_page.update({
          where: {
            id: 1,
          },
          data: {
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
        });
        break;

      case "forth-section-knock":
        update = await prisma.forth_section_knock_page.update({
          where: {
            id: 1,
          },
          data: {
            h2: "EASY TO USE",
            p: "KNOCK is optimized for extreme ease of use for beginners and professionals alike. Use KNOCK to make your drums slap, and take you to the next level. Whether you are new to producing, or a seasoned pro, KNOCK will seamlessly fit into your workflow. It's lightweight on your CPU too - use iton a bunch of tracks!",
            button: "Add to Cart",
            imageUrl: "/images/laptop final 1.png",
          },
        });
        break;

      case "iosSection-section-knock":
        update = await prisma.ios_section_knock_page.update({
          where: {
            id: 1,
          },
          data: {
            h2: "AVAILABLE ON IOS",
            tradeMark: "",
            p: "KNOCK is now available for both iPad and iPhone on the Apple Store. Use KNOCK in your favorite mobile DAW that supports AUv3 plugins.",
            button: "App Store",
            buttonUrl: "https://apps.apple.com/us/app/knock/id6443654114",
            buttonColor: "",
            imageUrl: "/images/7f06f68fcc36f36e4fc8dee2d1991a8ad6be59e0.png",
          },
        });
        break;
      case "third-section-knockclipper":
        update = await prisma.third_section_knock_clipper_page.update({
          where: {
            id: 1,
          },
          data: {
            h2: "CLIPPER",
            tradeMark: "KNOCK",
            p: 'Push your drums hard without ever going above 0db to give your drums a warm, aggressive tone reminiscent of pushing vintage analogue gear into "the red". Select a harder clip curve for a more aggressive tone, or a softer clip curve for a rounder tone. KNOCK Clipper has an optional high quality mode to enable oversampling.',
            imageUrl: "/images/f53123f1bc1e263458b5926c1b1422c3.png",
            button: "Add To Cart",
          },
        });
        break;

      case "last-section-DTK":
        update = await prisma.last_section_dtk_page.update({
          where: {
            id: 1,
          },
          data: {
            tradeMark: "KNOCK",
            p: "This is the last plugin you will ever need to make your drums KNOCK and punch through your mix. This plugin was meticulously crafted by DECAP. It is inspired by the signature sound of Drums That Knock, which has helped shaped the sonics of modern music.",
            button: "Learn More",
            buttonUrl: "/knock",
            h2: "",
            imageUrl:
              "/images/Knock-Hero_640eb224-a363-45df-a1b0-7adf680e8473.webp",
          },
        });
        break;

      default:
        break;
    }
    return res.status(200).json({
      success: true,
      message: "Section changed Successfully!",
      section: update,
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// knock page

exports.getKnockPage = async (req, res) => {
  try {
    const knockPage = await prisma.knock_page.findMany();

    const secondSection = await prisma.second_section_knock_page.findUnique({
      where: { id: knockPage[0].id },
    });

    const thirdSection = await prisma.third_section_knock_page.findUnique({
      where: { id: knockPage[0].id },
      select: {
        id: true,
        h2: true,
        third_section_knock_page_content: {
          select: {
            id: true,
            image: true,
            h3: true,
            p: true,
            third_section_knock_page: true,
          },
          orderBy: {
            id: "asc",
          },
        },
      },
    });

    const forthSection = await prisma.forth_section_knock_page.findUnique({
      where: { id: knockPage[0].id },
    });
    const fifthSection = await prisma.fifth_section_knock_page.findUnique({
      where: { id: knockPage[0].id },
    });
    const sixSection = await prisma.six_section_knock_page.findUnique({
      where: { id: knockPage[0].id },
      select: {
        id: true,
        six_section_knock_page_content: {
          select: {
            id: true,
            imageUrl: true,
            review: true,
            reviewBy: true,
            priority: true,
            alt: true,
          },
          orderBy: {
            id: "asc",
          },
        },
      },
    });
    const sevenSection = await prisma.seven_section_knock_page.findUnique({
      where: { id: knockPage[0].id },
      select: {
        id: true,
        h2: true,
        p: true,
        seven_section_knock_page_mac: {
          select: {
            id: true,
            li: true,
          },
          orderBy: {
            id: "asc",
          },
        },
        seven_section_knock_page_pc: {
          select: {
            id: true,
            li: true,
          },
          orderBy: {
            id: "asc",
          },
        },
      },
    });
    const iosSection = await prisma.ios_section_knock_page.findUnique({
      where: { id: knockPage[0].id },
    });
    const eightSection = await prisma.eight_section_knock_page.findUnique({
      where: { id: knockPage[0].id },
    });

    return res.status(200).json({
      success: true,
      message: "",
      secondSection,
      thirdSection,
      forthSection,
      fifthSection,
      iosSection,
      sixSection,
      sevenSection,
      eightSection,
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.editKnockPage = async (req, res) => {
  try {
    const { sectionId } = req.body;
    const { shapesId, reviewId } = req.query;
    delete req.body.imageUrl;
    switch (sectionId) {
      case "secondSection":
        delete req.body.sectionId;
        await prisma.second_section_knock_page.update({
          where: { id: 1 },
          data: {
            ...req.body,
          },
        });
        break;
      case "thirdSection":
        if (shapesId) {
          await prisma.third_section_knock_page.update({
            where: { id: 1 },
            data: {
              third_section_knock_page_content: {
                update: {
                  where: {
                    id: parseInt(shapesId),
                  },
                  data: {
                    h3: req.body.h3,
                    p: req.body.p,
                  },
                },
              },
            },
          });
        } else {
          await prisma.third_section_knock_page.update({
            where: {
              id: 1,
            },
            data: {
              h2: req.body.h2,
            },
          });
        }
        break;
      case "forthSection-knock":
        delete req.body.sectionId;
        delete req.body.tradeMark;
        await prisma.forth_section_knock_page.update({
          where: { id: 1 },
          data: {
            ...req.body,
          },
        });
        break;
      case "sixSection-knock":
        delete req.body.sectionId;
        delete req.body.mainImageUrl;
        await prisma.six_section_knock_page.update({
          where: { id: 1 },
          data: {
            six_section_knock_page_content: {
              update: {
                where: {
                  id: parseInt(reviewId),
                },
                data: {
                  ...req.body,
                },
              },
            },
          },
        });
        break;
      case "sevenSection-knock":
        delete req.body.sectionId;
        delete req.body.mainImageUrl;
        delete req.body.isHeader;

        if (req.body.macOrPc === "mac") {
          await prisma.seven_section_knock_page_mac.update({
            where: {
              id: parseInt(req.body.requireId),
            },
            data: {
              li: req.body.li,
            },
          });
        }
        if (req.body.macOrPc === "pc") {
          await prisma.seven_section_knock_page_pc.update({
            where: {
              id: parseInt(req.body.requireId),
            },
            data: {
              li: req.body.li,
            },
          });
        }

        if (!req.body.macOrPc) {
          await prisma.seven_section_knock_page.update({
            where: { id: 1 },
            data: {
              ...req.body,
            },
          });
        }

        break;
      case "eightSection-knock":
        delete req.body.sectionId;
        await prisma.eight_section_knock_page.update({
          where: { id: 1 },
          data: {
            ...req.body,
          },
        });
        break;
      case "iosSection-knockpage":
        delete req.body.sectionId;
        await prisma.ios_section_knock_page.update({
          where: {
            id: 1,
          },
          data: {
            ...req.body,
          },
        });
        break;
      default:
        break;
    }

    return res.status(200).json({
      success: true,
      message: "Section changed Successfully!",
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.addKnockReview = async (req, res) => {
  try {
    const { sectionId, review, reviewBy, alt } = req.body;

    if (!review || !reviewBy) {
      throw new Error("Please fill information");
    }
    const path = req.file?.path.split("public");

    switch (sectionId) {
      case "sixSection-knock":
        await prisma.six_section_knock_page_content.create({
          data: {
            review,
            reviewBy,
            alt,
            imageUrl: path ? path[1] : "",
            six_section_knock_page_id: 1,
          },
        });
        break;

      default:
        break;
    }

    return res.status(200).json({
      success: true,
      message: "review was added successfully",
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.removeKnockReview = async (req, res) => {
  try {
    if (!req.query.id || !req.query.page) {
      throw new Error("review id not found");
    }

    switch (req.query.page) {
      case "knockpage":
        await prisma.six_section_knock_page_content.delete({
          where: {
            id: parseInt(req.query.id),
          },
        });
        break;

      case "dtk":
        await prisma.review_section_dtk_page_content.delete({
          where: {
            id: parseInt(req.query.id),
          },
        });
        break;

      default:
        break;
    }

    return res.status(200).json({
      success: true,
      message: "review was removed successfully",
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.resetKnockPageSection = async (req, res) => {
  try {
    const { sectionId, shapesId, requirdId, type } = req.query;
    let update;

    switch (sectionId) {
      case "secondSection":
        update = await prisma.second_section_knock_page.update({
          where: {
            id: 1,
          },
          data: {
            p: "KNOCK is the last plugin you will ever need to make your drums slap and punch through your mix. This plugin was meticulously crafted by platinum producer & award winning sound designer, DECAP. It is inspired by the signature sound of his popular drum kit series DRUMS THAT KNOCK, which has helped shaped the sonics of modern music.",
          },
        });
        break;
      case "thirdSection":
        if (shapesId) {
          let data = {
            image: "",
            h3: "",
            p: "",
          };

          if (shapesId === "1") {
            data = {
              image: "/images/knock/I1_266x266 1.png",
              h3: "PUNCH",
              p: "Transient shaper, amplifies the attack of your drums, making them more snappy and punchy. Add a touch of Punch to bring your drum tracks to life. Great for drum loops or one shots.          ",
            };
          }
          if (shapesId === "2") {
            data = {
              image: "/images/knock/Saturate_266x266 1.png",
              h3: "SATURATE",
              p: "Adds harmonic distortion while compensating perceived loudness volume. Choose from three selectable modes (soft, medium, hard). Perfect for 808s, one shots, or drum loops.",
            };
          }
          if (shapesId === "3") {
            data = {
              image: "/images/knock/SUB_266x266 1.png",
              h3: "SUB",
              p: "Detects when a kick drum is present, and generates a layered sub frequency tone, giving your kick a deep low end presence. Select the pitch of your sub tone. Perfect for breakbeats, and tuning your kick drum to the key of your song.",
            };
          }
          if (shapesId === "4") {
            data = {
              image: "/images/knock/AIR_266x266 1.png",
              h3: "AIR",
              p: "Adds smooth, transparent top end to your drum tracks without even a hint of harshness. There are two user selectable modes (vintage and clean).",
            };
          }
          if (shapesId === "5") {
            data = {
              image: "/images/knock/CLERP_266x266 1.png",
              h3: "CLIP",
              p: "A user adjustable hard & soft clipper. Push your drums hard without clipping to give your drums a warm, aggressive tone reminiscent of pushing vintage analogue gear into 'the red'. Select a harder clip curve for a more aggressive tone, or a softer clip curve for a more rounded tone.",
            };
          }

          update = await prisma.third_section_knock_page_content.update({
            where: {
              id: parseInt(shapesId),
            },
            data,
          });
        }

        update = await prisma.third_section_knock_page.update({
          where: {
            id: 1,
          },
          data: {
            h2: "HOW KNOCK SHAPES YOUR DRUMS",
            tradeMark: "",
          },
        });
        break;
      case "requirement-section":
        if (type === "mac") {
          let li;
          if (requirdId === "1") {
            li =
              "9 OSX 10.12+ - AU, VST3, AAX (Fully compatible with both Mac OS Ventura and Apple M1 & M2.)";
          }
          if (requirdId === "2") {
            li = "Intel Core i5, i7, i9, Xeon, Apple M1";
          }
          if (requirdId === "3") {
            li = "8GB RAM required, 16GB recommended";
          }
          if (requirdId === "4") {
            li = "HDD Space requirements: Minimum of 500MB";
          }

          await prisma.seven_section_knock_page_mac.update({
            where: {
              id: parseInt(requirdId),
            },
            data: {
              li,
            },
          });
        }

        if (type === "pc") {
          let li;
          if (requirdId === "1") {
            li =
              "Intel Core i5, i7, i9, Xeon (all Gen 5 and above), AMD Quad Core";
          }
          if (requirdId === "2") {
            li = "Windows 8.1, 10 - 64 bit VST3, AAX";
          }
          if (requirdId === "3") {
            li = "8GB RAM required, 16GB recommended";
          }
          if (requirdId === "4") {
            li = "HDD Space requirements: Minimum of 500MB";
          }

          await prisma.seven_section_knock_page_pc.update({
            where: {
              id: parseInt(requirdId),
            },
            data: {
              li,
            },
          });
        }

        update = await prisma.seven_section_knock_page.update({
          where: {
            id: 1,
          },
          data: {
            h2: "SYSTEM REQUIREMENTS",
            p: "Supported by all major DAWs in 64-bit VST3, AU and AAX format.",
          },
        });
        break;
      case "youtube-section":
        update = await prisma.eight_section_knock_page.update({
          where: {
            id: 1,
          },
          data: {
            h2: "TAKE YOUR DRUMS TO THE NEXT LEVEL",
            youtubeUrl: "https://www.youtube.com/embed/adhIJxIHzkg",
            youtubeImageUrl: "https://i.ytimg.com/vi/adhIJxIHzkg/sddefault.jpg",
            youtubeUrl2: "https://www.youtube.com/embed/LMOG2rvxqGk",
            youtubeImageUrl2:
              "https://i.ytimg.com/vi/LMOG2rvxqGk/sddefault.jpg?sqp=-oaymwEmCIAFEOAD8quKqQMa8AEB-AHUBoAC4AOKAgwIABABGGMgYyhjMA8=&rs=AOn4CLCBtGH38Chf3EaWBsf4pnHCWR6oQw",
            button: "Add To Cart",
          },
        });
        break;
      default:
        break;
    }

    return res.status(200).json({
      success: true,
      message: "Section changed Successfully!",
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.uploadKnockPageImages = async (req, res) => {
  try {
    if (req.file) {
      const path = req.file.path.split("public");
      const { sectionId, reviewId } = req.body;
      switch (sectionId) {
        case "forthSection-knock":
          await prisma.forth_section_knock_page.update({
            where: {
              id: 1,
            },
            data: {
              imageUrl: path[1],
            },
          });
          break;
        case "sixSection-knock":
          await prisma.six_section_knock_page.update({
            where: {
              id: 1,
            },
            data: {
              six_section_knock_page_content: {
                update: {
                  where: {
                    id: parseInt(reviewId),
                  },
                  data: {
                    imageUrl: path[1],
                  },
                },
              },
            },
          });
          break;
        case "iosSection-knockpage":
          await prisma.ios_section_knock_page.update({
            where: {
              id: 1,
            },
            data: {
              imageUrl: path[1],
            },
          });
          break;
        default:
          break;
      }

      return res.status(200).json({
        success: true,
        message: "image uploaded successfully",
      });
    }
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// knock clipper

exports.getKnockClipperPage = async (req, res) => {
  try {
    const knockPage = await prisma.knock_page.findMany();

    const secondSection =
      await prisma.second_section_knock_clipper_page.findUnique({
        where: { id: knockPage[0].id },
      });

    const thirdSection =
      await prisma.third_section_knock_clipper_page.findUnique({
        where: { id: knockPage[0].id },
        select: {
          id: true,
          p: true,
          imageUrl: true,
          tradeMark: true,
          h2: true,
          button: true,
        },
      });

    const forthSection =
      await prisma.forth_section_knock_clipper_page.findUnique({
        where: { id: knockPage[0].id },
        select: {
          id: true,
          h2: true,
          p: true,
          forth_section_knock_clipper_page_mac: {
            select: {
              id: true,
              li: true,
            },
            orderBy: {
              id: "asc",
            },
          },
          forth_section_knock_clipper_page_pc: {
            select: {
              id: true,
              li: true,
            },
            orderBy: {
              id: "asc",
            },
          },
        },
      });
    const fifthSection =
      await prisma.fifth_section_knock_clipper_page.findUnique({
        where: { id: knockPage[0].id },
      });

    return res.status(200).json({
      success: true,
      message: "",
      secondSection,
      thirdSection,
      forthSection,
      fifthSection,
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.editKnockClipperPage = async (req, res) => {
  try {
    const { sectionId } = req.body;
    delete req.body.imageUrl;
    switch (sectionId) {
      case "secondSection-knock-clipper":
        delete req.body.sectionId;
        await prisma.second_section_knock_clipper_page.update({
          where: { id: 1 },
          data: {
            ...req.body,
          },
        });

        break;
      case "thirdSection-knockclipper":
        delete req.body.sectionId;
        delete req.body.buttonUrl;
        await prisma.third_section_knock_clipper_page.update({
          where: { id: 1 },
          data: {
            ...req.body,
          },
        });
        break;
      case "forthSection-knockclipper":
        delete req.body.sectionId;
        delete req.body.mainImageUrl;
        delete req.body.isHeader;

        if (req.body.macOrPc === "mac") {
          await prisma.forth_section_knock_clipper_page_mac.update({
            where: {
              id: parseInt(req.body.requireId),
            },
            data: {
              li: req.body.li,
            },
          });
        }
        if (req.body.macOrPc === "pc") {
          await prisma.forth_section_knock_clipper_page_pc.update({
            where: {
              id: parseInt(req.body.requireId),
            },
            data: {
              li: req.body.li,
            },
          });
        }

        if (!req.body.macOrPc) {
          await prisma.forth_section_knock_clipper_page.update({
            where: { id: 1 },
            data: {
              ...req.body,
            },
          });
        }
        break;
      case "fifthSection-knockclipper":
        delete req.body.sectionId;
        await prisma.fifth_section_knock_clipper_page.update({
          where: { id: 1 },
          data: {
            ...req.body,
          },
        });
        break;
      default:
        break;
    }

    return res.status(200).json({
      success: true,
      message: "Section changed Successfully!",
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.uploadKnockClipperPageImages = async (req, res) => {
  try {
    if (req.file) {
      const path = req.file.path.split("public");
      const { sectionId, reviewId } = req.body;
      switch (sectionId) {
        case "thirdSection-knockclipper":
          const response = await prisma.third_section_knock_clipper_page.update(
            {
              where: {
                id: 1,
              },
              data: {
                imageUrl: path[1],
              },
            }
          );

        default:
          break;
      }

      return res.status(200).json({
        success: true,
        message: "image uploaded successfully",
      });
    }
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.resetKnockClipperPageSection = async (req, res) => {
  try {
    const { requirdId, sectionId, type } = req.query;

    let update;

    switch (sectionId) {
      case "secondSection":
        update = await prisma.second_section_knock_clipper_page.update({
          where: {
            id: 1,
          },
          data: {
            p: "KNOCK Clipper is a premium quality, user adjustable hard / soft clipper designed by DECAP. It is the CLIP module from his acclaimed plugin, KNOCK. It is inspired by the signature sound of his popular drum kit series DRUMS THAT KNOCK, which has helped shaped the sonics of modern music.",
          },
        });
        break;
      case "requirement-section":
        if (type === "mac") {
          let li;
          if (requirdId === "1") {
            li =
              "9 OSX 11+ - AU, VST3, AAX (Fully compatible with both Mac OS Ventura and Apple M1 & M2.)";
          }
          if (requirdId === "2") {
            li = "Intel Core i5, i7, i9, Xeon, Apple M1";
          }
          if (requirdId === "3") {
            li = "8GB RAM required, 16GB recommended";
          }
          if (requirdId === "4") {
            li = "HDD Space requirements: Minimum of 500MB";
          }

          await prisma.forth_section_knock_clipper_page_mac.update({
            where: {
              id: parseInt(requirdId),
            },
            data: {
              li,
            },
          });
        }

        if (type === "pc") {
          let li;
          if (requirdId === "1") {
            li =
              "Intel Core i5, i7, i9, Xeon (all Gen 5 and above), AMD Quad Core";
          }
          if (requirdId === "2") {
            li = "Windows 8.1, 10 - 64 bit VST3, AAX";
          }
          if (requirdId === "3") {
            li = "8GB RAM required, 16GB recommended";
          }
          if (requirdId === "4") {
            li = "HDD Space requirements: Minimum of 500MB";
          }

          await prisma.forth_section_knock_clipper_page_pc.update({
            where: {
              id: parseInt(requirdId),
            },
            data: {
              li,
            },
          });
        }

        update = await prisma.forth_section_knock_clipper_page.update({
          where: {
            id: 1,
          },
          data: {
            h2: "SYSTEM REQUIREMENTS",
            p: "Supported by all major DAWs in 64-bit VST3, AU and AAX format.",
          },
        });
        break;
      case "youtube-section":
        update = await prisma.fifth_section_knock_clipper_page.update({
          where: {
            id: 1,
          },
          data: {
            h2: "TAKE YOUR DRUMS TO THE NEXT LEVEL",
            button: "Add To Cart",
            youtubeImageUrl: "https://i.ytimg.com/vi/0u4-MZiPtPI/sddefault.jpg",
            youtubeUrl: "https://www.youtube.com/embed/0u4-MZiPtPI",
            youtubeImageUrl2:
              "https://i.ytimg.com/vi/hM3IMIPc6DA/sddefault.jpg",
            youtubeUrl2: "https://www.youtube.com/embed/hM3IMIPc6DA",
          },
        });
        break;
      default:
        break;
    }

    return res.status(200).json({
      success: true,
      message: "Section changed Successfully!",
      section: update,
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.addSystemRequirmentsKnockClipper = async (req, res) => {
  try {
    const { li, macOrPc } = req.body;

    if (!li) {
      throw new Error("Please provide a valid text");
    }
    if (!macOrPc) {
      throw new Error("Please provide a type mac or pc");
    }

    if (macOrPc === "mac") {
      await prisma.forth_section_knock_clipper_page_mac.create({
        data: {
          li,
          forth_section_knock_clipper_page: {
            connect: {
              id: 1,
            },
          },
        },
      });
    } else if (macOrPc === "pc") {
      await prisma.forth_section_knock_clipper_page_pc.create({
        data: {
          li,
          forth_section_knock_clipper_page: {
            connect: {
              id: 1,
            },
          },
        },
      });
    }

    return res.status(200).json({
      success: true,
      message: "Bullet added successfully!",
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.removeSystemRequirmentsKnockClipper = async (req, res) => {
  try {
    const { bulletId, macOrPc } = req.query;

    const excludedIds = [1, 2, 3, 4];

    if (excludedIds.includes(parseInt(bulletId))) {
      throw new Error("You can't remove this requierment");
    }

    if (macOrPc === "mac") {
      await prisma.forth_section_knock_clipper_page_mac.delete({
        where: {
          id: parseInt(bulletId),
        },
      });
    } else if (macOrPc === "pc") {
      await prisma.forth_section_knock_clipper_page_pc.delete({
        where: {
          id: parseInt(bulletId),
        },
      });
    }
    return res.status(200).json({
      success: true,
      message: "Bullet removed successfully!",
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// DTK

exports.getDTK = async (req, res) => {
  try {
    const DTKPage = await prisma.dtk_page.findMany();

    const main_section = await prisma.dtk_main_section.findUnique({
      where: {
        id: 1,
      },
      select: {
        h2: true,
        br: true,
        tradeMark: true,
        p: {
          select: {
            id: true,
            text: true,
            tradeMark: true,
          },
          orderBy: {
            id: "asc",
          },
        },
      },
    });

    const artist = await prisma.artist_section_dtk_page.findUnique({
      where: { id: DTKPage[0].id },
      select: {
        id: true,
        h2: true,
        tradeMark: true,
        artist_section_dtk_page_content: {
          select: {
            id: true,
            imageUrl: true,
            name: true,
          },
        },
      },
    });

    const reviews = await prisma.reviews_section_dtk_page.findUnique({
      where: { id: DTKPage[0].id },
      select: {
        id: true,
        review_section_dtk_page_content: {
          select: {
            id: true,
            review: true,
            reviewBy: true,
            alt: true,
            priority: true,
            imageUrl: true,
          },
        },
      },
    });

    const lastSection = await prisma.last_section_dtk_page.findUnique({
      where: { id: DTKPage[0].id },
      select: {
        id: true,
        tradeMark: true,
        p: true,
        button: true,
        imageUrl: true,
        buttonUrl: true,
        h2: true,
      },
    });

    return res.status(200).json({
      success: true,
      message: "",
      main_section,
      artist,
      reviews,
      lastSection,
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.editDTK = async (req, res) => {
  try {
    const { sectionId, id } = req.body;
    const { paragraphId } = req.query;

    delete req.body.imageUrl;
    delete req.body.mainImageUrl;
    switch (sectionId) {
      case "lastSection-dtkpage":
        delete req.body.sectionId;
        await prisma.last_section_dtk_page.update({
          where: {
            id: 1,
          },
          data: {
            ...req.body,
          },
        });
        break;
      case "reviewSection-dtkpage":
        delete req.body.sectionId;
        await prisma.reviews_section_dtk_page.update({
          where: {
            id: 1,
          },
          data: {
            review_section_dtk_page_content: {
              update: {
                where: {
                  id: parseInt(id),
                },
                data: {
                  ...req.body,
                },
              },
            },
          },
        });
        break;
      case "artistSection-dtkpage":
        delete req.body.sectionId;
        await prisma.artist_section_dtk_page.update({
          where: {
            id: 1,
          },
          data: {
            artist_section_dtk_page_content: {
              update: {
                where: {
                  id: parseInt(id),
                },
                data: {
                  ...req.body,
                },
              },
            },
          },
        });
        break;
      case "main-section":
        if (parseInt(paragraphId)) {
          await prisma.dtk_main_section_p.update({
            where: {
              id: parseInt(paragraphId),
            },
            data: {
              text: req.body.p,
              tradeMark: req.body.tradeMark || "",
            },
          });
        } else {
          await prisma.dtk_main_section.update({
            where: {
              id: 1,
            },
            data: {
              br: req.body.br,
              h2: req.body.h2,
              tradeMark: req.body.tradeMark,
            },
          });
        }

        break;
      default:
        break;
    }

    return res.status(200).json({
      success: true,
      message: "Section changed Successfully!",
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.uploadDTKImages = async (req, res) => {
  try {
    if (req.file) {
      const path = req.file.path.split("public");
      const { sectionId, reviewId, artistId } = req.body;
      switch (sectionId) {
        case "lastSection-dtkpage":
          await prisma.last_section_dtk_page.update({
            where: {
              id: 1,
            },
            data: {
              imageUrl: path[1],
            },
          });
          break;
        case "reviewSection-dtkpage":
          delete req.body.sectionId;
          await prisma.reviews_section_dtk_page.update({
            where: {
              id: 1,
            },
            data: {
              review_section_dtk_page_content: {
                update: {
                  where: {
                    id: parseInt(reviewId),
                  },
                  data: {
                    imageUrl: path[1],
                  },
                },
              },
            },
          });
          break;
        case "artistSection-dtkpage":
          delete req.body.sectionId;
          await prisma.artist_section_dtk_page.update({
            where: {
              id: 1,
            },
            data: {
              artist_section_dtk_page_content: {
                update: {
                  where: {
                    id: parseInt(artistId),
                  },
                  data: {
                    imageUrl: path[1],
                  },
                },
              },
            },
          });
          break;

        default:
          break;
      }

      return res.status(200).json({
        success: true,
        message: "image uploaded successfully",
      });
    }
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.addArtist = async (req, res) => {
  try {
    const { name, sectionId } = req.body;

    if (!name || !sectionId) {
      throw new Error("Please Fill information");
    }
    if (!req.file) {
      throw new Error("Please Select photo");
    }

    const path = req.file.path.split("public");

    await prisma.artist_section_dtk_page_content.create({
      data: {
        name,
        imageUrl: path ? path[1] : "",
        artist_section_dtk_pageId: 1,
      },
    });

    return res.status(200).json({
      success: true,
      message: "artist added successfully",
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.resetDTK = async (req, res) => {
  try {
    const { paragraphId, artistId, sectionId } = req.query;

    let data = {};

    if (parseInt(paragraphId) === 1) {
      data = {
        text: "Designed from scratch by DECAP.",
      };
    }

    if (parseInt(paragraphId) === 2) {
      data = {
        text: "Premium quality, groundbreaking as always.",
      };
    }

    if (parseInt(paragraphId) === 3) {
      data = {
        text: "These drums",
        tradeMark: "KNOCK",
      };
    }

    if (parseInt(paragraphId)) {
      await prisma.dtk_main_section_p.update({
        where: {
          id: parseInt(paragraphId),
        },
        data,
      });
    } else {
      await prisma.dtk_main_section.update({
        where: {
          id: 1,
        },
        data: {
          br: "DRUMS",
          h2: "THAT",
          tradeMark: "KNOCK",
        },
      });
    }

    switch (sectionId) {
      case "artistSection-dtkpage":
        if (parseInt(artistId)) {
          const data = artists[parseInt(artistId) - 1];
          await prisma.artist_section_dtk_page_content.update({
            where: {
              id: parseInt(artistId),
            },
            data,
          });
        }
        await prisma.artist_section_dtk_page.update({
          where: {
            id: 1,
          },
          data: {
            h2: "SOME ARTISTS WHO HAVE USED DRUMS THAT",
            tradeMark: "KNOCK",
          },
        });
        break;

      default:
        break;
    }

    return res.status(200).json({
      success: true,
      message: "Section changed Successfully!",
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// DTK product

exports.getDTKproduct = async (req, res) => {
  try {
    const DTKproduct = await prisma.dtk_product.findFirst({
      where: {
        handle: req.query.productHandle,
      },
      select: {
        id: true,
        handle: true,
        fileCount: true,
        description: {
          select: {
            id: true,
            text: true,
            h3: true,
          },
          orderBy: {
            id: "asc",
          },
        },
        features: {
          select: {
            id: true,
            li: true,
          },
          orderBy: {
            id: "asc",
          },
        },
        youtubeVideo: {
          select: {
            id: true,
            src: true,
            srcImage: true,
            title: true,
          },
          orderBy: {
            id: "asc",
          },
        },
        filesIncluded: {
          select: {
            id: true,
            li: true,
          },
          orderBy: {
            id: "asc",
          },
        },
      },
    });

    return res.status(200).json({
      success: true,
      message: "",
      DTKproduct,
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.addDTKfeature = async (req, res) => {
  const productId = await prisma.dtk_product.findFirst({
    where: {
      handle: req.body.handle,
    },
  });

  try {
    if (!req.body.li) {
      throw new Error("Please fill information!");
    }

    await prisma.features_dtk.create({
      data: {
        li: req.body.li,
        dtk_productId: productId?.id,
      },
    });

    return res.status(200).json({
      success: true,
      message: "Feature added successfully!",
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.removeDTKfeature = async (req, res) => {
  try {
    if (!req.query.handle || !req.query.id) {
      throw new Error("Handle name & id not found");
    }

    const dtkproduct = await prisma.dtk_product.findFirst({
      where: {
        handle: req.query.handle,
      },
    });

    const feature = await prisma.features_dtk.findMany({
      where: {
        dtk_productId: dtkproduct?.id,
      },
    });

    const featureId = feature.filter((el) => el.id === parseInt(req.query.id));

    await prisma.features_dtk.delete({
      where: {
        id: featureId[0].id,
      },
    });

    return res.status(200).json({
      success: true,
      message: "Feature removed successfully!",
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.addFilesIncluded = async (req, res) => {
  const productId = await prisma.dtk_product.findFirst({
    where: {
      handle: req.body.handle,
    },
  });
  try {
    if (!req.body.li) {
      throw new Error("Please fill information!");
    }
    await prisma.files_included.create({
      data: {
        li: req.body.li,
        dtk_productId: productId?.id,
      },
    });

    return res.status(200).json({
      success: true,
      message: "files included added successfully",
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.removeFilesIncluded = async (req, res) => {
  try {
    if (!req.query.handle || !req.query.id) {
      throw new Error("Handle name & id not found");
    }

    const dtkproduct = await prisma.dtk_product.findFirst({
      where: {
        handle: req.query.handle,
      },
    });

    const filesInclude = await prisma.files_included.findMany({
      where: {
        dtk_productId: dtkproduct?.id,
      },
    });

    const filesIncludeId = filesInclude.filter(
      (el) => el.id === parseInt(req.query.id)
    );

    await prisma.files_included.delete({
      where: {
        id: filesIncludeId[0].id,
      },
    });

    return res.status(200).json({
      success: true,
      message: "Files include removed successfully!",
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.addYoutubeVideo = async (req, res) => {
  const productId = await prisma.dtk_product.findFirst({
    where: {
      handle: req.body.handle,
    },
  });
  try {
    if (!req.body.src || !req.body.srcImage) {
      throw new Error("Please fill information!");
    }
    await prisma.youtube_video.create({
      data: {
        src: req.body.src,
        srcImage: req.body.srcImage,
        title: req.body.title,
        dtk_productId: productId?.id,
      },
    });

    return res.status(200).json({
      success: true,
      message: "Youtube video added successfully",
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
exports.removeYoutubeVideo = async (req, res) => {
  try {
    if (!req.query.handle || !req.query.id) {
      throw new Error("Handle name & id not found");
    }

    const dtkproduct = await prisma.dtk_product.findFirst({
      where: {
        handle: req.query.handle,
      },
    });

    const youtube = await prisma.youtube_video.findMany({
      where: {
        dtk_productId: dtkproduct?.id,
      },
    });

    const youtubeId = youtube.filter((el) => el.id === parseInt(req.query.id));

    await prisma.youtube_video.delete({
      where: {
        id: youtubeId[0].id,
      },
    });

    return res.status(200).json({
      success: true,
      message: "Youtube video removed successfully",
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
exports.editDTKproduct = async (req, res) => {
  try {
    let { type } = req.body;

    switch (type) {
      case "description":
        await prisma.description_dtk.update({
          where: {
            id: req.body.id,
          },
          data: {
            h3: req.body.h3,
            text: [req.body.text1, req.body.text2 ? req.body.text2 : ""],
          },
        });
        break;
      case "feature":
        await prisma.features_dtk.update({
          where: {
            id: req.body.id,
          },
          data: {
            li: req.body.li,
          },
        });
        break;
      case "youtube":
        await prisma.youtube_video.update({
          where: {
            id: req.body.id,
          },
          data: {
            src: req.body.src,
            srcImage: req.body.srcImage,
            title: req.body.title,
          },
        });
        break;
      case "filesInclude":
        await prisma.files_included.update({
          where: {
            id: req.body.id,
          },
          data: {
            li: {
              set: req.body.li,
            },
          },
        });
        break;
      default:
        break;
    }

    return res.status(200).json({
      success: true,
      message: "Section changed Successfully!",
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.removeArtist = async (req, res) => {
  try {
    if (!req.query.id) {
      throw new Error("id not found");
    }

    await prisma.artist_section_dtk_page_content.delete({
      where: {
        id: parseInt(req.query.id),
      },
    });

    return res.status(200).json({
      success: true,
      message: "artist removed successfully",
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.addDTKreview = async (req, res) => {
  try {
    const { sectionId, review, reviewBy, alt } = req.body;

    if (!review || !reviewBy) {
      throw new Error("Please fill information");
    }
    const path = req.file?.path.split("public");

    await prisma.review_section_dtk_page_content.create({
      data: {
        review,
        reviewBy,
        alt,
        imageUrl: path ? path[1] : "",
        review_section_dtk_page_id: 1,
      },
    });

    return res.status(200).json({
      success: true,
      message: "review was added successfully",
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// FAQ

exports.getFAQ = async (req, res) => {
  try {
    const FAQpage = await prisma.faq_page.findMany({
      select: {
        id: true,
        h2: true,
        p: true,
        h3: true,
        answer_type: true,
        faq_list: {
          select: {
            id: true,
            li: true,
            faqId: true,
          },
          orderBy: {
            id: "asc",
          },
        },
      },
      orderBy: {
        id: "asc",
      },
    });

    return res.status(200).json({
      success: true,
      message: "",
      FAQpage,
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.resetFAQ = async (req, res) => {
  try {
    await prisma.faq_page.update({
      where: {
        id: 1,
      },
      data: {
        h2: "DOES KNOCK COME WITH PRESETS?",
        p: "Yes! KNOCK comes bundled with factory presets crafted by DECAP.",
        answer_type: "answer",
      },
    });
    await prisma.faq_page.update({
      where: {
        id: 2,
      },
      data: {
        h2: "ARE YOUR PLUGINS COMPATIBLE WITH MY DAW?",
        p: "Our plugins are compatible with every DAW that supports VST3, AU or AAX plugin formats. Please note that VST2 is not supported. This includes the latest versions of: Ableton Live, FL Studio, Pro Tools, Logic Studio, Reaper, Studio One, and others.",
        answer_type: "answer",
      },
    });
    await prisma.faq_page.update({
      where: {
        id: 3,
      },
      data: {
        h2: "WHAT ARE THE SYSTEM REQUIREMENTS / COMPATIBILITY?",
        p: "Supported by all major DAWs in 64-bit VST3, AU and AAX format.",
        h3: "OS/Processor:",
        answer_type: "opening_and_lists",
      },
    });

    await prisma.faq_list.update({
      where: {
        id: 1,
      },
      data: {
        li: "Mac: Intel Core i5, i7, i9, Xeon, Apple M1 - OSX 11+ - AU, VST3, AAX",
      },
    });

    await prisma.faq_list.update({
      where: {
        id: 2,
      },
      data: {
        li: "Windows: Intel Core i5, i7, i9, Xeon (all Gen 5 and above), AMD Quad Core - WIN 8.1, 10 - 64 bit VST3, AAX",
      },
    });
    await prisma.faq_list.update({
      where: {
        id: 3,
      },
      data: {
        li: "HDD Space requirements: Minimum of 500MB - 8GB RAM required, 16GB recommended",
      },
    });

    await prisma.faq_page.update({
      where: {
        id: 4,
      },
      data: {
        h2: "DO YOU OFFER A DEMO VERSION?",
        p: "At the moment, there are no demo versions.",
        answer_type: "answer",
      },
    });
    await prisma.faq_page.update({
      where: {
        id: 5,
      },
      data: {
        h2: "DO YOU SUPPORT MAC OS VENTURA & APPLE SILICON M1 & M2?",
        p: "Our plugins are fully compatible with both Mac OS Ventura and Apple M1 & M2 processors.",
        answer_type: "answer",
      },
    });
    await prisma.faq_page.update({
      where: {
        id: 6,
      },
      data: {
        h2: "IS PRO TOOLS / AAX SUPPORTED?",
        p: "Yes! Our plugins are compatible with Pro Tools / AAX.",
        answer_type: "answer",
      },
    });

    return res.status(200).json({
      success: true,
      message: "Section changed Successfully!",
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.editFAQ = async (req, res) => {
  try {
    const { listId } = req.query;

    if (listId) {
      await prisma.faq_page.update({
        where: {
          id: req.body.faqId,
        },
        data: {
          faq_list: {
            update: {
              where: {
                id: req.body.id,
              },
              data: {
                li: req.body.li,
              },
            },
          },
        },
      });
    } else {
      await prisma.faq_page.update({
        where: {
          id: parseInt(req.body.id),
        },
        data: {
          h2: req.body.h2,
          h3: req.body.h3,
          p: req.body.p,
        },
      });
    }

    return res.status(200).json({
      success: true,
      message: "Section changed Successfully!",
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.addFAQ = async (req, res) => {
  try {
    const { answer_type, h2, h3, p, faq_list } = req.body;

    if (!h2 || !p) {
      throw new Error("please insert an h2 tag and p tag");
    }

    if (!answer_type) {
      throw new Error("please select type of the faq");
    }

    const list = faq_list.map((el) => {
      return {
        li: el,
      };
    });

    if (answer_type === "opening_and_lists") {
      await prisma.faq_page.create({
        data: {
          h2,
          h3,
          p,
          answer_type,
          faq_list: {
            createMany: {
              data: list,
            },
          },
        },
      });
    } else {
      await prisma.faq_page.create({
        data: {
          h2,
          p,
          answer_type,
        },
      });
    }

    return res.status(200).json({
      success: true,
      message: "Faq added Successfully!",
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.addFAQList = async (req, res) => {
  try {
    const { li, id } = req.body;

    if (!li) {
      throw new Error("please insert text");
    }
    if (!id) {
      throw new Error("please provide faq id");
    }

    await prisma.faq_page.update({
      where: {
        id,
      },
      data: {
        faq_list: {
          create: {
            li,
          },
        },
      },
    });

    return res.status(200).json({
      success: true,
      message: "Faq list was added Successfully!",
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.removeFAQ = async (req, res) => {
  try {
    const { id } = req.query;

    const unremovableArray = [1, 2, 3, 4, 5, 6];

    if (unremovableArray.includes(parseInt(id))) {
      throw new Error("you can only remove the new FAQ not the existing");
    }

    if (!id) {
      throw new Error("no faq id was found");
    }

    await prisma.faq_page.delete({
      where: {
        id: parseInt(id),
      },
    });

    return res.status(200).json({
      success: true,
      message: "Faq removed Successfully!",
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.removeFAQlist = async (req, res) => {
  try {
    const { faqId, id } = req.query;

    if (parseInt(faqId) === 3 && [1, 2, 3].includes(parseInt(id))) {
      throw new Error("you can only remove the new added list ");
    }

    await prisma.faq_list.delete({
      where: {
        id: parseInt(id),
      },
    });

    return res.status(200).json({
      success: true,
      message: "Faq list removed Successfully!",
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Terms Of Service

exports.getTermsOfService = async (req, res) => {
  try {
    const termsOfService = await prisma.terms_of_service.findMany({
      select: {
        id: true,
        h3: true,
        p: {
          select: {
            id: true,
            text: true,
          },
          orderBy: {
            id: "asc",
          },
        },
      },
      orderBy: {
        id: "asc",
      },
    });
    return res.status(200).json({
      success: true,
      message: "",
      termsOfService,
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.resetTermsOfService = async (req, res) => {
  try {
    const HEADERS = [
      {
        id: 1,
        h3: "OVERVIEW",
      },
      {
        id: 2,
        h3: "SECTION 1 - ONLINE STORE TERMS",
      },
      {
        id: 3,
        h3: "SECTION 2 - GENERAL CONDITIONS",
      },
      {
        id: 4,
        h3: "SECTION 3 - ACCURACY, COMPLETENESS AND TIMELINESS OF INFORMATION",
      },
      {
        id: 5,
        h3: "SECTION 4 - MODIFICATIONS TO THE SERVICE AND PRICES",
      },
      {
        id: 6,
        h3: "SECTION 5 - PRODUCTS OR SERVICES (if applicable)",
      },
      {
        id: 7,
        h3: "SECTION 6 - ACCURACY OF BILLING AND ACCOUNT INFORMATION",
      },
      {
        id: 8,
        h3: "SECTION 7 - OPTIONAL TOOLS",
      },
      {
        id: 9,
        h3: "SECTION 8 - THIRD-PARTY LINKS",
      },
      {
        id: 10,
        h3: "SECTION 9 - USER COMMENTS, FEEDBACK AND OTHER SUBMISSIONS",
      },
      {
        id: 11,
        h3: "SECTION 10 - PERSONAL INFORMATION",
      },
      {
        id: 12,
        h3: "SECTION 11 - ERRORS, INACCURACIES AND OMISSIONS",
      },
      {
        id: 13,
        h3: "SECTION 12 - PROHIBITED USES",
      },
      {
        id: 14,
        h3: "SECTION 13 - DISCLAIMER OF WARRANTIES; LIMITATION OF LIABILITY",
      },
      {
        id: 15,
        h3: "SECTION 14 - INDEMNIFICATION",
      },
      {
        id: 16,
        h3: "SECTION 15 - SEVERABILITY",
      },
      {
        id: 17,
        h3: "SECTION 16 - TERMINATION",
      },
      {
        id: 18,
        h3: "SECTION 17 - ENTIRE AGREEMENT",
      },
      {
        id: 19,
        h3: "SECTION 18 - GOVERNING LAW",
      },
      {
        id: 20,
        h3: "SECTION 19 - CHANGES TO TERMS OF SERVICE",
      },
      {
        id: 21,
        h3: "SECTION 20 - CONTACT INFORMATION",
      },
    ];
    const SECTION = [
      {
        text: "This website is operated by Drums That Knock. Throughout the site, the terms 'we', 'us' and 'our' refer to Drums That Knock. Drums That Knock offers this website, including all information, tools and services available from this site to you, the user, conditioned upon your acceptance of all terms, conditions, policies and notices stated here.",
        id: 1,
      },
      {
        text: "By visiting our site and/ or purchasing something from us, you engage in our 'Service' and agree to be bound by the following terms and conditions ('Terms of Service', 'Terms'), including those additional terms and conditions and policies referenced herein and/or available by hyperlink. These Terms of Service apply to all users of the site, including without limitation users who are browsers, vendors, customers, merchants, and/ or contributors of content.",
        id: 2,
      },
      {
        text: "Please read these Terms of Service carefully before accessing or using our website. By accessing or using any part of the site, you agree to be bound by these Terms of Service. If you do not agree to all the terms and conditions of this agreement, then you may not access the website or use any services. If these Terms of Service are considered an offer, acceptance is expressly limited to these Terms of Service.",
        id: 3,
      },
      {
        text: "Any new features or tools which are added to the current store shall also be subject to the Terms of Service. You can review the most current version of the Terms of Service at any time on this page. We reserve the right to update, change or replace any part of these Terms of Service by posting updates and/or changes to our website. It is your responsibility to check this page periodically for changes. Your continued use of or access to the website following the posting of any changes constitutes acceptance of those changes.",
        id: 4,
      },
      {
        text: "Our store is hosted on Shopify Inc. They provide us with the online e-commerce platform that allows us to sell our products and services to you.",
        id: 5,
      },
      {
        text: "By agreeing to these Terms of Service, you represent that you are at least the age of majority in your state or province of residence, or that you are the age of majority in your state or province of residence and you have given us your consent to allow any of your minor dependents to use this site.",
        id: 6,
      },
      {
        text: "You may not use our products for any illegal or unauthorized purpose nor may you, in the use of the Service, violate any laws in your jurisdiction (including but not limited to copyright laws).",
        id: 7,
      },
      {
        text: "You must not transmit any worms or viruses or any code of a destructive nature.",
        id: 8,
      },
      {
        text: "A breach or violation of any of the Terms will result in an immediate termination of your Services.",
        id: 9,
      },
      {
        text: "We reserve the right to refuse service to anyone for any reason at any time.",
        id: 10,
      },
      {
        text: "You understand that your content (not including credit card information), may be transferred unencrypted and involve (a) transmissions over various networks; and (b) changes to conform and adapt to technical requirements of connecting networks or devices. Credit card information is always encrypted during transfer over networks.",
        id: 11,
      },
      {
        text: "You agree not to reproduce, duplicate, copy, sell, resell or exploit any portion of the Service, use of the Service, or access to the Service or any contact on the website through which the service is provided, without express written permission by us.",
        id: 12,
      },
      {
        text: "The headings used in this agreement are included for convenience only and will not limit or otherwise affect these Terms.",
        id: 13,
      },
      {
        text: "We are not responsible if information made available on this site is not accurate, complete or current. The material on this site is provided for general information only and should not be relied upon or used as the sole basis for making decisions without consulting primary, more accurate, more complete or more timely sources of information. Any reliance on the material on this site is at your own risk.",
        id: 14,
      },
      {
        text: "This site may contain certain historical information. Historical information, necessarily, is not current and is provided for your reference only. We reserve the right to modify the contents of this site at any time, but we have no obligation to update any information on our site. You agree that it is your responsibility to monitor changes to our site.",
        id: 15,
      },
      {
        text: "Prices for our products are subject to change without notice.",
        id: 16,
      },
      {
        text: "We reserve the right at any time to modify or discontinue the Service (or any part or content thereof) without notice at any time.",
        id: 17,
      },
      {
        text: "We shall not be liable to you or to any third-party for any modification, price change, suspension or discontinuance of the Service.",
        id: 18,
      },
      {
        text: "Certain products or services may be available exclusively online through the website. These products or services may have limited quantities and are subject to return or exchange only according to our Return Policy.",
        id: 19,
      },
      {
        text: "We have made every effort to display as accurately as possible the colors and images of our products that appear at the store. We cannot guarantee that your computer monitor's display of any color will be accurate.",
        id: 20,
      },
      {
        text: "We reserve the right, but are not obligated, to limit the sales of our products or Services to any person, geographic region or jurisdiction. We may exercise this right on a case-by-case basis. We reserve the right to limit the quantities of any products or services that we offer. All descriptions of products or product pricing are subject to change at anytime without notice, at the sole discretion of us. We reserve the right to discontinue any product at any time. Any offer for any product or service made on this site is void where prohibited.",
        id: 21,
      },
      {
        text: "We do not warrant that the quality of any products, services, information, or other material purchased or obtained by you will meet your expectations, or that any errors in the Service will be corrected.",
        id: 22,
      },
      {
        text: "We reserve the right to refuse any order you place with us. We may, in our sole discretion, limit or cancel quantities purchased per person, per household or per order. These restrictions may include orders placed by or under the same customer account, the same credit card, and/or orders that use the same billing and/or shipping address. In the event that we make a change to or cancel an order, we may attempt to notify you by contacting the e‑mail and/or billing address/phone number provided at the time the order was made. We reserve the right to limit or prohibit orders that, in our sole judgment, appear to be placed by dealers, resellers or distributors.",
        id: 23,
      },
      {
        text: "You agree to provide current, complete and accurate purchase and account information for all purchases made at our store. You agree to promptly update your account and other information, including your email address and credit card numbers and expiration dates, so that we can complete your transactions and contact you as needed.",
        id: 24,
      },
      {
        text: "For more detail, please review our Returns Policy.",
        id: 25,
      },
      {
        text: "We may provide you with access to third-party tools over which we neither monitor nor have any control nor input.",
        id: 26,
      },
      {
        text: "You acknowledge and agree that we provide access to such tools 'as is' and 'as available' without any warranties, representations or conditions of any kind and without any endorsement. We shall have no liability whatsoever arising from or relating to your use of optional third-party tools.",
        id: 27,
      },
      {
        text: "Any use by you of optional tools offered through the site is entirely at your own risk and discretion and you should ensure that you are familiar with and approve of the terms on which tools are provided by the relevant third-party provider(s).",
        id: 28,
      },
      {
        text: "We may also, in the future, offer new services and/or features through the website (including, the release of new tools and resources). Such new features and/or services shall also be subject to these Terms of Service.",
        id: 29,
      },
      {
        text: "Certain content, products and services available via our Service may include materials from third-parties.",
        id: 30,
      },
      {
        text: "Third-party links on this site may direct you to third-party websites that are not affiliated with us. We are not responsible for examining or evaluating the content or accuracy and we do not warrant and will not have any liability or responsibility for any third-party materials or websites, or for any other materials, products, or services of third-parties.",
        id: 31,
      },
      {
        text: "We are not liable for any harm or damages related to the purchase or use of goods, services, resources, content, or any other transactions made in connection with any third-party websites. Please review carefully the third-party's policies and practices and make sure you understand them before you engage in any transaction. Complaints, claims, concerns, or questions regarding third-party products should be directed to the third-party.",
        id: 32,
      },
      {
        text: "If, at our request, you send certain specific submissions (for example contest entries) or without a request from us you send creative ideas, suggestions, proposals, plans, or other materials, whether online, by email, by postal mail, or otherwise (collectively, 'comments'), you agree that we may, at any time, without restriction, edit, copy, publish, distribute, translate and otherwise use in any medium any comments that you forward to us. We are and shall be under no obligation (1) to maintain any comments in confidence; (2) to pay compensation for any comments; or (3) to respond to any comments.",
        id: 33,
      },
      {
        text: "We may, but have no obligation to, monitor, edit or remove content that we determine in our sole discretion are unlawful, offensive, threatening, libelous, defamatory, pornographic, obscene or otherwise objectionable or violates any party’s intellectual property or these Terms of Service.",
        id: 34,
      },
      {
        text: "You agree that your comments will not violate any right of any third-party, including copyright, trademark, privacy, personality or other personal or proprietary right. You further agree that your comments will not contain libelous or otherwise unlawful, abusive or obscene material, or contain any computer virus or other malware that could in any way affect the operation of the Service or any related website. You may not use a false e‑mail address, pretend to be someone other than yourself, or otherwise mislead us or third-parties as to the origin of any comments. You are solely responsible for any comments you make and their accuracy. We take no responsibility and assume no liability for any comments posted by you or any third-party.",
        id: 35,
      },
      {
        text: "Your submission of personal information through the store is governed by our Privacy Policy. To view our Privacy Policy.",
        id: 36,
      },
      {
        text: "Occasionally there may be information on our site or in the Service that contains typographical errors, inaccuracies or omissions that may relate to product descriptions, pricing, promotions, offers, product shipping charges, transit times and availability. We reserve the right to correct any errors, inaccuracies or omissions, and to change or update information or cancel orders if any information in the Service or on any related website is inaccurate at any time without prior notice (including after you have submitted your order).We undertake no obligation to update, amend or clarify information in the Service or on any related website, including without limitation, pricing information, except as required by law. No specified update or refresh date applied in the Service or on any related website, should be taken to indicate that all information in the Service or on any related website has been modified or updated.",
        id: 37,
      },
      {
        text: "In addition to other prohibitions as set forth in the Terms of Service, you are prohibited from using the site or its content: (a) for any unlawful purpose; (b) to solicit others to perform or participate in any unlawful acts; (c) to violate any international, federal, provincial or state regulations, rules, laws, or local ordinances; (d) to infringe upon or violate our intellectual property rights or the intellectual property rights of others; (e) to harass, abuse, insult, harm, defame, slander, disparage, intimidate, or discriminate based on gender, sexual orientation, religion, ethnicity, race, age, national origin, or disability; (f) to submit false or misleading information; (g) to upload or transmit viruses or any other type of malicious code that will or may be used in any way that will affect the functionality or operation of the Service or of any related website, other websites, or the Internet; (h) to collect or track the personal information of others; (i) to spam, phish, pharm, pretext, spider, crawl, or scrape; (j) for any obscene or immoral purpose; or (k) to interfere with or circumvent the security features of the Service or any related website, other websites, or the Internet. We reserve the right to terminate your use of the Service or any related website for violating any of the prohibited uses.",
        id: 38,
      },
      {
        text: "We do not guarantee, represent or warrant that your use of our service will be uninterrupted, timely, secure or error-free.",
        id: 39,
      },
      {
        text: "We do not warrant that the results that may be obtained from the use of the service will be accurate or reliable.",
        id: 40,
      },
      {
        text: "You agree that from time to time we may remove the service for indefinite periods of time or cancel the service at any time, without notice to you.",
        id: 41,
      },
      {
        text: "You expressly agree that your use of, or inability to use, the service is at your sole risk. The service and all products and services delivered to you through the service are (except as expressly stated by us) provided 'as is' and 'as available' for your use, without any representation, warranties or conditions of any kind, either express or implied, including all implied warranties or conditions of merchantability, merchantable quality, fitness for a particular purpose, durability, title, and non-infringement.",
        id: 42,
      },
      {
        text: "In no case shall Drums That Knock, our directors, officers, employees, affiliates, agents, contractors, interns, suppliers, service providers or licensors be liable for any injury, loss, claim, or any direct, indirect, incidental, punitive, special, or consequential damages of any kind, including, without limitation lost profits, lost revenue, lost savings, loss of data, replacement costs, or any similar damages, whether based in contract, tort (including negligence), strict liability or otherwise, arising from your use of any of the service or any products procured using the service, or for any other claim related in any way to your use of the service or any product, including, but not limited to, any errors or omissions in any content, or any loss or damage of any kind incurred as a result of the use of the service or any content (or product) posted, transmitted, or otherwise made available via the service, even if advised of their possibility. Because some states or jurisdictions do not allow the exclusion or the limitation of liability for consequential or incidental damages, in such states or jurisdictions, our liability shall be limited to the maximum extent permitted by law.",
        id: 43,
      },
      {
        text: "You agree to indemnify, defend and hold harmless Drums That Knock and our parent, subsidiaries, affiliates, partners, officers, directors, agents, contractors, licensors, service providers, subcontractors, suppliers, interns and employees, harmless from any claim or demand, including reasonable attorneys’ fees, made by any third-party due to or arising out of your breach of these Terms of Service or the documents they incorporate by reference, or your violation of any law or the rights of a third-party.",
        id: 44,
      },
      {
        text: "In the event that any provision of these Terms of Service is determined to be unlawful, void or unenforceable, such provision shall nonetheless be enforceable to the fullest extent permitted by applicable law, and the unenforceable portion shall be deemed to be severed from these Terms of Service, such determination shall not affect the validity and enforceability of any other remaining provisions.",
        id: 45,
      },
      {
        text: "The obligations and liabilities of the parties incurred prior to the termination date shall survive the termination of this agreement for all purposes.",
        id: 46,
      },
      {
        text: "These Terms of Service are effective unless and until terminated by either you or us. You may terminate these Terms of Service at any time by notifying us that you no longer wish to use our Services, or when you cease using our site.",
        id: 47,
      },
      {
        text: "If in our sole judgment you fail, or we suspect that you have failed, to comply with any term or provision of these Terms of Service, we also may terminate this agreement at any time without notice and you will remain liable for all amounts due up to and including the date of termination; and/or accordingly may deny you access to our Services (or any part thereof).",
        id: 48,
      },
      {
        text: "The failure of us to exercise or enforce any right or provision of these Terms of Service shall not constitute a waiver of such right or provision.",
        id: 49,
      },
      {
        text: "These Terms of Service and any policies or operating rules posted by us on this site or in respect to The Service constitutes the entire agreement and understanding between you and us and govern your use of the Service, superseding any prior or contemporaneous agreements, communications and proposals, whether oral or written, between you and us (including, but not limited to, any prior versions of the Terms of Service).",
        id: 50,
      },
      {
        text: "Any ambiguities in the interpretation of these Terms of Service shall not be construed against the drafting party.",
        id: 51,
      },
      {
        text: "These Terms of Service and any separate agreements whereby we provide you Services shall be governed by and construed in accordance with the laws of United States.",
        id: 52,
      },
      {
        text: "You can review the most current version of the Terms of Service at any time at this page.We reserve the right, at our sole discretion, to update, change or replace any part of these Terms of Service by posting updates and changes to our website. It is your responsibility to check our website periodically for changes. Your continued use of or access to our website or the Service following the posting of any changes to these Terms of Service constitutes acceptance of those changes.",
        id: 53,
      },
      {
        text: "Questions about the Terms of Service should be sent to us at decap@drumsthatknock.com.",
        id: 54,
      },
    ];

    HEADERS.map(async (el) => {
      await prisma.terms_of_service.update({
        where: {
          id: el.id,
        },
        data: {
          h3: el.h3,
        },
      });
    });

    SECTION.map(async (el) => {
      await prisma.terms_of_service_p.update({
        where: {
          id: el.id,
        },
        data: {
          text: el.text,
        },
      });
    });

    return res.status(200).json({
      success: true,
      message: "Section changed Successfully!",
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.editTermsOfService = async (req, res) => {
  try {
    const { textId, termSectionId, h3, text } = req.body;

    if (h3) {
      await prisma.terms_of_service.update({
        where: {
          id: termSectionId,
        },
        data: {
          h3,
        },
      });
    }
    if (text) {
      await prisma.terms_of_service.update({
        where: {
          id: termSectionId,
        },
        data: {
          p: {
            update: {
              where: {
                id: textId,
              },
              data: {
                text,
              },
            },
          },
        },
      });
    }

    return res.status(200).json({
      success: true,
      message: "Section changed Successfully!",
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Shipping Policy

exports.getShippingPolicy = async (req, res) => {
  try {
    const ShippingPolicy = await prisma.shipping_policy.findMany({
      select: {
        id: true,
        h2: true,
        h2s: true,
        p: true,
        p2: true,
        ul: {
          select: {
            id: true,
            li: true,
          },
          orderBy: {
            id: "asc",
          },
        },
      },
      orderBy: {
        id: "asc",
      },
    });
    return res.status(200).json({
      success: true,
      message: "",
      ShippingPolicy,
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.resetShippingPolicy = async (req, res) => {
  try {
    const ShippingUl = [
      {
        li: "USA: 3-4 business days",
        id: 1,
      },
      {
        li: "Europe: 6-8 business days",
        id: 2,
      },
      {
        li: "Australia: 2-14 business days",
        id: 3,
      },
      {
        li: "Japan: 4-8 business days",
        id: 4,
      },
      {
        li: "International: 10-20 business days",
        id: 5,
      },
      {
        li: "Our fulfillment times may be longer than usual and may continue toincrease until things get back to normal. Were seeing delays inour supply chain, including distributors and shipping carriers as theentire industry is grappling with challenges.",
        id: 6,
      },
    ];

    await prisma.shipping_policy.update({
      where: {
        id: 1,
      },
      data: {
        h2: "Digital Products",
        h2s: "Physical Products",
        p: "You will be emailed a link to download the product you purchased after you complete checkout.",
        p2: "Usually, it takes 3-7 days to fulfill an order, after which it's shipped out. The shipping time depends on your location, but can be estimated as follows:",
      },
    });

    ShippingUl.map(async (el) => {
      await prisma.shipping_policy_ul.update({
        where: {
          id: el.id,
        },
        data: {
          li: el.li,
        },
      });
    });
    return res.status(200).json({
      success: true,
      message: "Section changed Successfully!",
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.editShippingPolicy = async (req, res) => {
  try {
    const { id, sectionId, h2, h2s, p, p2, li } = req.body;

    if (h2) {
      await prisma.shipping_policy.update({
        where: {
          id,
        },
        data: {
          h2,
          h2s,
          p,
          p2,
        },
      });
    }
    if (li) {
      await prisma.shipping_policy.update({
        where: {
          id: sectionId,
        },
        data: {
          ul: {
            update: {
              where: {
                id,
              },
              data: {
                li,
              },
            },
          },
        },
      });
    }

    return res.status(200).json({
      success: true,
      message: "Section changed Successfully!",
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Refund Policy

exports.getRefundPolicy = async (req, res) => {
  try {
    const RefundPolicy = await prisma.refund_policy.findUnique({
      where: {
        id: 1,
      },
    });
    return res.status(200).json({
      success: true,
      message: "",
      RefundPolicy,
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.resetRefundPolicy = async (req, res) => {
  try {
    await prisma.refund_policy.update({
      where: {
        id: 1,
      },
      data: {
        h2: "What's Your Return Policy?",
        p: "We don't offer returns and exchanges, but if there's something wrong with your order, please let us know by contacting us at support@pluginsthatknock.com",
      },
    });

    return res.status(200).json({
      success: true,
      message: "Section changed Successfully!",
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.editRefundPolicy = async (req, res) => {
  try {
    const { h2, p } = req.body;

    await prisma.refund_policy.update({
      where: {
        id: 1,
      },
      data: {
        h2,
        p,
      },
    });

    return res.status(200).json({
      success: true,
      message: "Section changed Successfully!",
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Privacy Policy

exports.getPrivacyPolicy = async (req, res) => {
  try {
    const PrivacyPolicy = await prisma.privacy_policy.findUnique({
      where: {
        id: 1,
      },
      select: {
        id: true,
        head: true,
        head2: true,
        collecting: {
          select: {
            id: true,
            h2: true,
            p: true,
            u: true,
            u2: true,
            li: {
              select: {
                id: true,
                text: true,
                strong: true,
              },
              orderBy: {
                id: "asc",
              },
            },
            li2: {
              select: {
                id: true,
                strong: true,
                text: true,
              },
              orderBy: {
                id: "asc",
              },
            },
          },
        },
        minors: {
          select: {
            id: true,
            h3: true,
            p: true,
          },
          orderBy: {
            id: "asc",
          },
        },
        sharing: {
          select: {
            id: true,
            h2: true,
            p: true,
            ul: {
              select: {
                id: true,
                li: true,
                a: true,
              },
              orderBy: {
                id: "asc",
              },
            },
          },
        },
        behavioural: {
          select: {
            id: true,
            h3: true,
            p: {
              select: {
                id: true,
                text: true,
                a: true,
              },
              orderBy: {
                id: "asc",
              },
            },
            p2: true,
            ul: {
              select: {
                id: true,
                li: true,
                a: true,
              },
              orderBy: {
                id: "asc",
              },
            },
            a: true,
            ul2: {
              select: {
                id: true,
                li: true,
                em: true,
              },
              orderBy: {
                id: "asc",
              },
            },
          },
        },
        personal: {
          select: {
            id: true,
            h2: true,
            p: true,
          },
          orderBy: {
            id: "asc",
          },
        },
        lawfulBasis: {
          select: {
            id: true,
            p: true,
            h3: true,
            ul: {
              select: {
                id: true,
                li: true,
              },
              orderBy: {
                id: "asc",
              },
            },
          },
        },
        retention: {
          select: {
            id: true,
            h3: true,
            p: true,
          },
          orderBy: {
            id: "asc",
          },
        },
        automatic: {
          select: {
            id: true,
            h3: true,
            p: {
              select: {
                id: true,
                text: true,
              },
              orderBy: {
                id: "asc",
              },
            },
            ul: {
              select: {
                id: true,
                text: true,
              },
              orderBy: {
                id: "asc",
              },
            },
          },
        },
        yourRights: {
          select: {
            id: true,
            h2: true,
            h3: true,
            p: {
              select: {
                id: true,
                em: true,
                text: true,
                a: true,
              },
              orderBy: {
                id: "asc",
              },
            },
          },
          orderBy: {
            id: "asc",
          },
        },
        ccpa: {
          select: {
            id: true,
            h3: true,
            p: {
              select: {
                id: true,
                text: true,
              },
              orderBy: {
                id: "asc",
              },
            },
          },
          orderBy: {
            id: "asc",
          },
        },
        cookies: {
          select: {
            id: true,
            h2: true,
            p: {
              select: {
                id: true,
                text: true,
              },
              orderBy: {
                id: "asc",
              },
            },
          },
          orderBy: {
            id: "asc",
          },
        },
        necessary: {
          select: {
            id: true,
            h3: true,
            table: {
              select: {
                id: true,
                td: true,
                em: true,
                strong: true,
                strong2: true,
              },
              orderBy: {
                id: "asc",
              },
            },
          },
          orderBy: {
            id: "asc",
          },
        },
        analytics: {
          select: {
            id: true,
            h3: true,
            em: true,
            p: {
              select: {
                id: true,
                p: true,
                a: true,
              },
              orderBy: {
                id: "asc",
              },
            },
            table: {
              select: {
                id: true,
                strong: true,
                strong2: true,
                em: true,
                td: true,
              },
              orderBy: {
                id: "asc",
              },
            },
          },
          orderBy: {
            id: "asc",
          },
        },
        doNotTrack: {
          select: {
            id: true,
            h3: true,
            p: true,
          },
          orderBy: {
            id: "asc",
          },
        },
        changes: {
          select: {
            id: true,
            h2: true,
            p: true,
          },
          orderBy: {
            id: "asc",
          },
        },
        contact: {
          select: {
            id: true,
            h2: true,
            p: {
              select: {
                id: true,
                text: true,
              },
              orderBy: {
                id: "asc",
              },
            },
            p2: {
              select: {
                id: true,
                text: true,
                em: true,
                a: true,
              },
              orderBy: {
                id: "asc",
              },
            },
            em: true,
          },
          orderBy: {
            id: "asc",
          },
        },
      },
    });
    return res.status(200).json({
      success: true,
      message: "",
      PrivacyPolicy,
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.resetPrivacyPolicy = async (req, res) => {
  const lawfulBasisUl = [
    {
      li: "Your consent;",
      id: 1,
    },
    {
      li: "The performance of the contract between you and the Site;",
      id: 2,
    },
    {
      li: "Compliance with our legal obligations;",
      id: 3,
    },
    {
      li: "To protect your vital interests;",
      id: 4,
    },
    {
      li: "To perform a task carried out in the public interest;",
      id: 5,
    },
    {
      li: "For our legitimate interests, which do not override your fundamental rights and freedoms.",
      id: 6,
    },
  ];

  const automaticP = [
    {
      text: `If you are a resident of the EEA, you have the right to object to processing based solely on automated decision-making (which includes
  profiling), when that decision-making has a legal effect on you or
  otherwise significantly affects you.`,
      id: 1,
    },
    {
      text: "We do not engage in fully automated decision-making that has alegal or otherwise significant effect using customer data.",
      id: 2,
    },
    {
      text: "Our processor Shopify uses limited automated decision-making to prevent fraud that does not have a legal or otherwise significant effect on you.",
      id: 3,
    },
    {
      text: "Services that include elements of automated decision-making include:",
      id: 4,
    },
  ];

  const automaticUl = [
    {
      text: "Temporary denylist of IP addresses associated with repeated failed transactions. This denylist persists for a small number of hours.",
      id: 1,
    },
    {
      text: "Temporary denylist of credit cards associated with denylisted IP addresses. This denylist persists for a small number of days.",
      id: 2,
    },
  ];

  const necessaryTable = [
    {
      strong: "Name",
      strong2: "Function",
      id: 1,
    },
    {
      em: "_ab",
      td: "Used in connection with access to admin.",
      id: 2,
    },
    {
      em: "_secure_session_id",
      td: "Used in connection with navigation through a storefront.",
      id: 3,
    },
    {
      em: "cart",
      td: "Used in connection with shopping cart.",
      id: 4,
    },
    {
      em: "cart_sig",
      td: "Used in connection with checkout.",
      id: 5,
    },
    {
      em: "cart_ts",
      td: "Used in connection with checkout.",
      id: 6,
    },
    {
      em: "checkout_token",
      td: "Used in connection with checkout.",
      id: 7,
    },
    {
      em: "secret",
      td: "Used in connection with customer login.",
      id: 8,
    },
    {
      em: "storefront_digest",
      td: "Used in connection with customer login.",
      id: 9,
    },
    {
      em: "_shopify_u",
      td: "Used to facilitate updating customer account information.",
      id: 10,
    },
  ];

  const analyticsTable = [
    {
      strong: "Name",
      strong2: "Function",
      id: 1,
    },
    {
      em: "_tracking_consent",
      td: "Tracking preferences.",
      id: 2,
    },
    {
      em: "_landing_page",
      td: "Track landing pages",
      id: 3,
    },
    {
      em: "_orig_referrer",
      td: "Track landing pages",
      id: 4,
    },
    {
      em: "_s",
      td: "Shopify analytics.",
      id: 5,
    },
    {
      em: "_shopify_fs",
      td: "Shopify analytics.",
      id: 6,
    },
    {
      em: "_shopify_s",
      td: "Shopify analytics.",
      id: 7,
    },
    {
      em: "_shopify_sa_p",
      td: "Shopify analytics relating to marketing referrals.",
      id: 8,
    },
    {
      em: "_shopify_sa_t",
      td: "Shopify analytics relating to marketing referrals.",
      id: 9,
    },
    {
      em: "_shopify_y",
      td: "Shopify analytics.",
      id: 10,
    },
    {
      em: "_y",
      td: "Shopify analytics.",
      id: 11,
    },
  ];

  const analyticsP = [
    {
      p: "The length of time that a cookie remains on your computer or mobile device depends on whether it is a ''persistent'' or ''session'' cookie. Session cookies last until you stop browsing and persistent cookies last until they expire or are deleted. Most of the cookies we use are persistent and will expire between 30 minutes and two years from the date they are downloaded to your device.",
      a: "",
      id: 1,
    },
    {
      p: "You can control and manage cookies in various ways. Please keep in mind that removing or blocking cookies can negatively impact your user experience and parts of our website may no longer be fully accessible.",
      a: "",
      id: 2,
    },
    {
      p: "Most browsers automatically accept cookies, but you can choose whether or not to accept cookies through your browser controls, often found in your browser's ''Tools'' or ''Preferences'' menu. For more information on how to modify your browser settings or how to block, manage or filter cookies can be found in your browser's help file or through such sites as",
      a: "www.allaboutcookies.org",
      id: 3,
    },
    {
      p: "Additionally, please note that blocking cookies may not completely prevent how we share information with third parties such as our advertising partners. To exercise your rights or opt-out of certain uses of your information by these parties, please follow the instructions in the ''Behavioural Advertising'' section above.",
      a: "",
      id: 4,
    },
  ];

  try {
    await prisma.privacy_policy.update({
      where: {
        id: 1,
      },
      data: {
        head: "This Privacy Policy describes how pluginsthatknock.com (the 'Site' or 'we')",
        head2:
          "collects, uses, and discloses your Personal Information when you visit or make a purchase from the Site.",
        collecting: {
          update: {
            where: {
              id: 1,
            },
            data: {
              h2: "Collecting Personal Information",
              p: "When you visit the Site, we collect certain information about your device, your interaction with the Site, and information necessary to process your purchases. We may also collect additional information if you contact us for customer support. In this Privacy Policy, we refer to any information that can uniquely identify an individual (including the information below) as ''Personal Information''. See the list below for more information about what Personal Information we collect and why.",
              u: "Device information",
              u2: "Order information",
            },
          },
        },
        minors: {
          update: {
            where: {
              id: 1,
            },
            data: {
              h3: "Minors",
              p: "The Site is not intended for individuals under the age of 18. We do not intentionally collect Personal Information from children. If you are the parent or guardian and believe your child has provided us with Personal Information, please contact us at the address below to request deletion.",
            },
          },
        },
        sharing: {
          update: {
            where: {
              id: 1,
            },
            data: {
              h2: "Sharing Personal Information",
              p: "We share your Personal Information with service providers to help us provide our services and fulfill our contracts with you, as described above. For example:",
            },
          },
        },
        behavioural: {
          update: {
            where: {
              id: 1,
            },
            data: {
              h3: "Behavioural Advertising",
              a: "",
              p2: "You can opt out of targeted advertising by:",
            },
          },
        },
        personal: {
          update: {
            where: {
              id: 1,
            },
            data: {
              h2: "Using Personal Information",
              p: "We use your personal Information to provide our services to you, which includes: offering products for sale, processing payments, shipping and fulfillment of your order, and keeping you up to date on new products, services, and offers.",
            },
          },
        },
        lawfulBasis: {
          update: {
            where: {
              id: 1,
            },
            data: {
              h3: "Lawful basis",
              p: "Pursuant to the General Data Protection Regulation (''GDPR''), if you are a resident of the European Economic Area (''EEA''), we process your personal information under the following lawful bases:",
            },
          },
        },
        retention: {
          update: {
            where: {
              id: 1,
            },
            data: {
              h3: "Retention",
              p: "When you place an order through the Site, we will retain your Personal Information for our records unless and until you ask us to erase this information. For more information on your right of erasure, please see the Your rights section below.",
            },
          },
        },
        automatic: {
          update: {
            where: {
              id: 1,
            },
            data: {
              h3: "Automatic decision-making",
            },
          },
        },
        yourRights: {
          update: {
            where: {
              id: 1,
            },
            data: {
              h2: "Your rights",
              h3: "GDPR",
            },
          },
        },
        ccpa: {
          update: {
            where: {
              id: 1,
            },
            data: {
              h3: "CCPA",
            },
          },
        },
        cookies: {
          update: {
            where: {
              id: 1,
            },
            data: {
              h2: "Cookies",
            },
          },
        },
        necessary: {
          update: {
            where: {
              id: 1,
            },
            data: {
              h3: "Cookies Necessary For The Functioning Of The Store",
            },
          },
        },
        analytics: {
          update: {
            where: {
              id: 1,
            },
            data: {
              h3: "Reporting and Analytics",
              em: "INSERT OTHER COOKIES OR TRACKING TECHNOLOGIES THAT YOU USE",
            },
          },
        },
        doNotTrack: {
          update: {
            where: {
              id: 1,
            },
            data: {
              h3: "Do Not Track",
              p: "Please note that because there is no consistent industry understanding of how to respond to ''Do Not Track'' signals, we do not alter our data collection and usage practices when we detect such a signal from your browser.",
            },
          },
        },
        changes: {
          update: {
            where: {
              id: 1,
            },
            data: {
              h2: "Changes",
              p: "We may update this Privacy Policy from time to time in order to reflect, for example, changes to our practices or for other operational, legal, or regulatory reasons.",
            },
          },
        },
        contact: {
          update: {
            where: {
              id: 1,
            },
            data: {
              h2: "Contact",
              em: "Last updated: 10/13/21",
            },
          },
        },
      },
    });

    lawfulBasisUl.map(async (el) => {
      await prisma.privacy_policy_lawful_basis_ul.update({
        where: {
          id: el.id,
        },
        data: {
          li: el.li,
        },
      });
    });

    automaticP.map(async (el) => {
      await prisma.privacy_policy_automatic_p.update({
        where: {
          id: el.id,
        },
        data: {
          text: el.text,
        },
      });
    });

    automaticUl.map(async (el) => {
      await prisma.privacy_policy_automatic_li.update({
        where: {
          id: el.id,
        },
        data: {
          text: el.text,
        },
      });
    });

    necessaryTable.map(async (el) => {
      await prisma.privacy_policy_cookies_necessary_table.update({
        where: {
          id: el.id,
        },
        data: {
          strong: el.strong,
          strong2: el.strong2,
          em: el.em,
          td: el.td,
        },
      });
    });

    analyticsTable.map(async (el) => {
      await prisma.privacy_policy_cookies_analytics_table.update({
        where: {
          id: el.id,
        },
        data: {
          strong: el.strong,
          strong2: el.strong2,
          em: el.em,
          td: el.td,
        },
      });
    });

    analyticsP.map(async (el) => {
      await prisma.privacy_policy_cookies_analytics_p.update({
        where: {
          id: el.id,
        },
        data: {
          p: el.p,
          a: el.a,
        },
      });
    });

    await prisma.privacy_policy_contact_p.update({
      where: {
        id: 1,
      },
      data: {
        text: "For more information about our privacy practices, if you have questions, or if you would like to make a complaint, please contact us by e-mail at support@pluginsthatknock.com or by mail using the details provided below:",
      },
    });

    await prisma.privacy_policy_contact_p2.update({
      where: {
        id: 1,
      },
      data: {
        text: "If you are not satisfied with our response to your complaint, you have the right to lodge your complaint with the relevant data protection authority. You can contact your local data protection authority, or our supervisory authority here:",
        em: "ADD CONTACT INFORMATION OR WEBSITE FOR THE DATA PROTECTION AUTHORITY IN YOUR JURISDICTION. FOR EXAMPLE:",
        a: "https://ico.org.uk/make-a-complaint/",
      },
    });

    await prisma.privacy_policy_contact_p.update({
      where: {
        id: 2,
      },
      data: {
        text: "THAT KNOCK, INC, 2025 McKinnon Ave, San Francisco CA 94124, United States          ",
      },
    });

    await prisma.privacy_policy_cookies_p.update({
      where: {
        id: 1,
      },
      data: {
        text: "A cookie is a small amount of information that's downloaded to your computer or device when you visit our Site. We use a number of different cookies, including functional, performance, advertising, and social media or content cookies. Cookies make your browsing experience better by allowing the website to remember your actions and preferences (such as login and region selection). This means you don't have to re-enter this information each time you return to the site or browse from one page to another. Cookies also provide information on how people use the website, for instance whether it's their first time visiting or if they are a frequent visitor.",
      },
    });

    await prisma.privacy_policy_cookies_p.update({
      where: {
        id: 2,
      },
      data: {
        text: "We use the following cookies to optimize your experience on our Site and to provide our services.",
      },
    });

    await prisma.privacy_policy_ccpa_p.update({
      where: {
        id: 1,
      },
      data: {
        text: `If you are a resident of California, you have the right to access the Personal Information we hold about you (also known as the 'Right to Know'), to port it to a new service, and to ask that your Personal Information be corrected, updated, or erased. If you would like to exercise these rights, please contact us through the contact information below.`,
      },
    });

    await prisma.privacy_policy_ccpa_p.update({
      where: {
        id: 2,
      },
      data: {
        text: "If you would like to designate an authorized agent to submit these requests on your behalf, please contact us at the address below.",
      },
    });

    await prisma.privacy_policy_your_rights_p.update({
      where: {
        id: 1,
      },
      data: {
        text: "If you are a resident of the EEA, you have the right to access the Personal Information we hold about you, to port it to a new service, and to ask that your Personal Information be corrected, updated, or erased. If you would like to exercise these rights, please contact us through the contact information below",
        em: "OR INSERT ALTERNATIVE INSTRUCTIONS FOR SENDING ACCESS, ERASURE, CORRECTION, AND PORTABILITY REQUESTS",
        a: "",
      },
    });

    await prisma.privacy_policy_your_rights_p.update({
      where: {
        id: 2,
      },
      data: {
        text: "Your Personal Information will be initially processed in Ireland and then will be transferred outside of Europe for storage and further processing, including to Canada and the United States. For more information on how data transfers comply with the GDPR, see Shopify's GDPR Whitepaper:",
        em: "",
        a: "https://help.shopify.com/en/manual/your-account/privacy/GDPR",
      },
    });

    await prisma.privacy_policy_behavioural_p.update({
      where: {
        id: 1,
      },
      data: {
        text: "As described above, we use your Personal Information to provide you with targeted advertisements or marketing communications we believe may be of interest to you. For example:",
        a: "",
      },
    });

    await prisma.privacy_policy_behavioural_p.update({
      where: {
        id: 2,
      },
      data: {
        text: `For more information about how targeted advertising works, you can visit
                  the Network Advertising Initiative's NAI educational page at `,
        a: "http://www.networkadvertising.org/understanding-online-advertising/how-does-it-work",
      },
    });

    await prisma.privacy_policy_behavioural_p.update({
      where: {
        id: 3,
      },
      data: {
        text: `Additionally, you can opt out of some of these services by visiting the
                  Digital Advertising Alliance's opt-out portal at:`,
        a: "http://optout.aboutads.info/",
      },
    });

    await prisma.privacy_policy_behavioural_ul.update({
      where: {
        id: 1,
      },
      data: {
        li: "We use Google Analytics and Facebook Pixel to help us understand howour customers use the Site. You can read more about how Google uses your Personal Information here:",
        a: "https://policies.google.com/privacy?hl=en",
      },
    });

    await prisma.privacy_policy_behavioural_ul.update({
      where: {
        id: 2,
      },
      data: {
        li: ".You can also opt-out of Google Analytics here:",
        a: "https://tools.google.com/dlpage/gaoptout",
      },
    });

    await prisma.privacy_policy_behavioural_ul.update({
      where: {
        id: 3,
      },
      data: {
        li: `We share information about your use of the Site, your purchases, and your interaction with our ads on other websites with our advertising
					partners. We collect and share some of this information directly with
					our advertising partners, and in some cases through the use of cookies
					or other similar technologies (which you may consent to, depending on
					your location).`,
        a: "",
      },
    });

    await prisma.privacy_policy_behavioural_ul2.update({
      where: {
        id: 1,
      },
      data: {
        em: "FACEBOOK -",
        li: "https://www.facebook.com/settings/?tab=ads",
      },
    });

    await prisma.privacy_policy_behavioural_ul2.update({
      where: {
        id: 2,
      },
      data: {
        em: "GOOGLE -",
        li: "https://www.google.com/settings/ads/anonymous",
      },
    });

    await prisma.privacy_policy_collecting_li.update({
      where: {
        id: 1,
      },
      data: {
        strong: "Examples of Personal Information collected:",
        text: "version of web browser, IP address, time zone, cookie information, what sites or products you view, search terms, and how you interact with the Site.",
      },
    });

    await prisma.privacy_policy_collecting_li.update({
      where: {
        id: 2,
      },
      data: {
        strong: "Purpose of collection:",
        text: "to load the Site accurately for you, and to perform analytics on Site usage to optimize our Site.",
      },
    });

    await prisma.privacy_policy_collecting_li.update({
      where: {
        id: 3,
      },
      data: {
        strong: "Source of collection:",
        text: "Collected automatically when you access our Site using cookies, log files, web beacons, tags, or pixels.",
      },
    });

    await prisma.privacy_policy_collecting_li.update({
      where: {
        id: 4,
      },
      data: {
        strong: "Disclosure for a business purpose:",
        text: "shared with our processor Shopify.",
      },
    });

    await prisma.privacy_policy_collecting_li2.update({
      where: {
        id: 1,
      },
      data: {
        strong: "Examples of Personal Information collected:",
        text: "name, billing address, shipping address, payment information (including credit card numbers), email address, and phone number.",
      },
    });

    await prisma.privacy_policy_collecting_li2.update({
      where: {
        id: 2,
      },
      data: {
        strong: "Purpose of collection:",
        text: "to provide products or services to you to fulfill our contract, to process your payment information, arrange for shipping, and provide you with invoices and/or order confirmations, communicate with you, screen our orders for potential risk or fraud, and when in line with the preferences you have shared with us, provide you with information or advertising relating to our products or services.",
      },
    });

    await prisma.privacy_policy_collecting_li2.update({
      where: {
        id: 3,
      },
      data: {
        strong: "Source of collection:",
        text: "collected from you.",
      },
    });

    await prisma.privacy_policy_collecting_li2.update({
      where: {
        id: 4,
      },
      data: {
        strong: "Disclosure for a business purpose:",
        text: "shared with our processor Shopify.",
      },
    });

    await prisma.privacy_policy_sharing_ul.update({
      where: {
        id: 1,
      },
      data: {
        li: "We use Shopify to power our online store. You can read more about how Shopify uses your Personal Information here:",
        a: "https://www.shopify.com/legal/privacy",
      },
    });

    await prisma.privacy_policy_sharing_ul.update({
      where: {
        id: 2,
      },
      data: {
        li: "We may share your Personal Information to comply with applicable laws and regulations, to respond to a subpoena, search warrant or other lawful request for information we receive, or to otherwise protect our rights.",
        a: "",
      },
    });

    return res.status(200).json({
      success: true,
      message: "Section changed Successfully!",
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.editPrivacyPolicy = async (req, res) => {
  try {
    switch (req.body.sectionId) {
      case "head":
        await prisma.privacy_policy.update({
          where: {
            id: 1,
          },
          data: {
            head: req.body.head,
            head2: req.body.head2,
          },
        });
        break;
      case "collecting":
        await prisma.privacy_policy_collecting.update({
          where: {
            id: 1,
          },
          data: {
            h2: req.body.h2,
            p: req.body.p,
            u: req.body.u,
            u2: req.body.u2,
          },
        });
        break;
      case "collecting-li":
        await prisma.privacy_policy_collecting_li.update({
          where: {
            id: req.body.id,
          },
          data: {
            strong: req.body.strong,
            text: req.body.text,
          },
        });
        break;
      case "collecting-li2":
        await prisma.privacy_policy_collecting_li.update({
          where: {
            id: req.body.id,
          },
          data: {
            strong: req.body.strong,
            text: req.body.text,
          },
        });
        break;
      case "minors":
        await prisma.privacy_policy_minors.update({
          where: {
            id: req.body.id,
          },
          data: {
            h3: req.body.h3,
            p: req.body.p,
          },
        });
        break;
      case "sharing-ul":
        await prisma.privacy_policy_sharing_ul.update({
          where: {
            id: req.body.id,
          },
          data: {
            li: req.body.li,
            a: req.body.a,
          },
        });
        break;
      case "behavioural-ul":
        await prisma.privacy_policy_behavioural_ul.update({
          where: {
            id: req.body.id,
          },
          data: {
            li: req.body.li,
            a: req.body.a,
          },
        });
        break;
      case "behavioural-ul2":
        await prisma.privacy_policy_behavioural_ul2.update({
          where: {
            id: req.body.id,
          },
          data: {
            em: req.body.em,
            li: req.body.li,
          },
        });
        break;
      case "behavioural-p":
        await prisma.privacy_policy_behavioural_p.update({
          where: {
            id: req.body.id,
          },
          data: {
            text: req.body.text,
            a: req.body.a,
          },
        });
        break;
      case "personal":
        await prisma.privacy_policy_personal_information.update({
          where: {
            id: req.body.id,
          },
          data: {
            h2: req.body.h2,
            p: req.body.p,
          },
        });
        break;
      case "lawful":
        await prisma.privacy_policy_lawful_basis.update({
          where: {
            id: req.body.id,
          },
          data: {
            h3: req.body.h3,
            p: req.body.p,
          },
        });
        break;
      case "lawfulBasis-ul":
        await prisma.privacy_policy_lawful_basis_ul.update({
          where: {
            id: req.body.id,
          },
          data: {
            li: req.body.li,
          },
        });
        break;
      case "retention":
        await prisma.privacy_policy_retention.update({
          where: {
            id: req.body.id,
          },
          data: {
            h3: req.body.h3,
            p: req.body.p,
          },
        });
        break;
      case "automatic-p":
        await prisma.privacy_policy_automatic_p.update({
          where: {
            id: req.body.id,
          },
          data: {
            text: req.body.text,
          },
        });
        break;
      case "automatic-ul":
        await prisma.privacy_policy_automatic_li.update({
          where: {
            id: req.body.id,
          },
          data: {
            text: req.body.text,
          },
        });
        break;
      case "yourrights-p":
        await prisma.privacy_policy_your_rights_p.update({
          where: {
            id: req.body.id,
          },
          data: {
            text: req.body.text,
            em: req.body.em,
            a: req.body.a,
          },
        });
        break;
      case "ccpa-p":
        await prisma.privacy_policy_ccpa_p.update({
          where: {
            id: req.body.id,
          },
          data: {
            text: req.body.text,
          },
        });
        break;
      case "cookies-p":
        await prisma.privacy_policy_cookies_p.update({
          where: {
            id: req.body.id,
          },
          data: {
            text: req.body.text,
          },
        });
        break;
      case "necessary-th":
      case "necessary-tr":
        await prisma.privacy_policy_cookies_necessary_table.update({
          where: {
            id: req.body.id,
          },
          data: {
            strong: req.body.strong,
            strong2: req.body.strong2,
            td: req.body.td,
            em: req.body.em,
          },
        });
        break;
      case "analytics-th":
      case "analytics-tr":
        await prisma.privacy_policy_cookies_analytics_table.update({
          where: {
            id: req.body.id,
          },
          data: {
            strong: req.body.strong,
            strong2: req.body.strong2,
            td: req.body.td,
            em: req.body.em,
          },
        });
        break;
      case "analytics-p":
        await prisma.privacy_policy_cookies_analytics_p.update({
          where: {
            id: req.body.id,
          },
          data: {
            p: req.body.text,
            a: req.body.a,
          },
        });
        break;
      case "do-not-track":
        await prisma.privacy_policy_do_not_track.update({
          where: {
            id: req.body.id,
          },
          data: {
            p: req.body.p,
            h3: req.body.h3,
          },
        });
        break;
      case "changes":
        await prisma.privacy_policy_changes.update({
          where: {
            id: req.body.id,
          },
          data: {
            p: req.body.p,
            h2: req.body.h2,
          },
        });
        break;
      case "contact-p":
        await prisma.privacy_policy_contact_p.update({
          where: {
            id: req.body.id,
          },
          data: {
            text: req.body.text,
          },
        });
        break;
      case "contact-em":
        await prisma.privacy_policy_contact.update({
          where: {
            id: req.body.id,
          },
          data: {
            em: req.body.em,
          },
        });
        break;
      case "contact-p2":
        await prisma.privacy_policy_contact_p2.update({
          where: {
            id: req.body.id,
          },
          data: {
            text: req.body.text,
            em: req.body.em,
            a: req.body.a,
          },
        });
        break;
      default:
        break;
    }

    return res.status(200).json({
      success: true,
      message: "Section changed Successfully!",
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// reviews

exports.resetReviews = async (req, res) => {
  try {
    const reviewsArray = reviews;

    const { pageId, reviewId } = req.query;

    switch (pageId) {
      case "sixSection-knock":
        const data = reviewsArray[parseInt(reviewId) - 1];
        await prisma.six_section_knock_page.update({
          where: {
            id: 1,
          },
          data: {
            six_section_knock_page_content: {
              update: {
                where: {
                  id: parseInt(reviewId),
                },
                data,
              },
            },
          },
        });
        break;
      case "reviewSection-dtkpage":
        const reviewSection = reviewsDTKPage[parseInt(reviewId) - 1];

        await prisma.reviews_section_dtk_page.update({
          where: {
            id: 1,
          },
          data: {
            review_section_dtk_page_content: {
              update: {
                where: {
                  id: parseInt(reviewId),
                },
                data: reviewSection,
              },
            },
          },
        });
        break;

      default:
        break;
    }

    return res.status(200).json({
      success: true,
      message: "Section changed Successfully!",
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// UpSelling

exports.getUpSellingPopup = async (req, res) => {
  try {
    const upselling = await prisma.upselling_popup.findMany({
      orderBy: {
        id: "asc",
      },
    });

    const upsellingSettings = await prisma.upselling_popup_settings.findMany({
      orderBy: {
        id: "asc",
      },
    });

    return res.status(200).json({
      success: true,
      message: "",
      upselling,
      upsellingSettings,
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.addUpSellingPopup = async (req, res) => {
  try {
    let { handle, discount_percentage, hasDiscount, comparePriceAt, price, discount_code } = req.body;

    if (!handle) {
      throw new Error("Please Select a product");
    }

    const handleExist = await prisma.upselling_popup.findFirst({
      where: {
        handle,
      },
    });

    if (handleExist) {
      throw new Error("Upselling product already exist!");
    }

    if (!hasDiscount && !comparePriceAt) {
      throw new Error("This product is not on sale add discount code")
    }

    if (hasDiscount) {

      if (!discount_percentage) {
        throw new Error('Please  add discount percentage')
      }

      if (!discount_code) {
        throw new Error('Please  add discount code')
      }
    }

    const percentageDecrease = calculatePercentageDecrease(comparePriceAt, price);

    await prisma.upselling_popup.create({
      data: {
        hasDiscount,
        handle,
        discount_code,
        discount_percentage: (!hasDiscount && comparePriceAt) ? parseFloat(percentageDecrease) : discount_percentage ? parseFloat(discount_percentage) : null
      },
    });

    return res.status(200).json({
      success: true,
      message: "Upsell product was added successfully!",
    });

  } catch (error) {
    console.log(error.message);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.editUpSellingPopup = async (req, res) => {
  try {
    let { handle, discount_percentage, hasDiscount, comparePriceAt, price, discount_code } = req.body;

    const handleExist = await prisma.upselling_popup.findFirst({
      where: {
        handle,
      },
    });

    if (!handleExist) {
      throw new Error("Upselling product doesn't exist!");
    }

    if (!hasDiscount && !comparePriceAt) {
      throw new Error("This product is not on sale add discount code")
    }

    if (hasDiscount) {

      if (!discount_percentage) {
        throw new Error('Please  add discount percentage')
      }

      if (!discount_code) {
        throw new Error('Please  add discount code')
      }
    }

    const percentageDecrease = calculatePercentageDecrease(comparePriceAt, price);



    await prisma.upselling_popup.update({
      where: {
        id: handleExist.id,
      },
      data: {
        hasDiscount,
        handle,
        discount_code,
        discount_percentage: (!hasDiscount && comparePriceAt) ? parseFloat(percentageDecrease) : discount_percentage ? parseFloat(discount_percentage) : null
      },
    });

    return res.status(200).json({
      success: true,
      message: "Upsell product was changed successfully!",
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.editUpSellingPopupSettings = async (req, res) => {
  try {
    let { id } = req.body;

    const handleExist = await prisma.upselling_popup_settings.findUnique({
      where: {
        id,
      },
    });

    if (!handleExist) {
      throw new Error("Upselling product doesn't exist!");
    }

    await prisma.upselling_popup_settings.update({
      where: {
        id: handleExist.id,
      },
      data: {
        ...req.body,
      },
    });

    return res.status(200).json({
      success: true,
      message: "Upsell settings was changed successfully!",
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.deleteUpSellingPopup = async (req, res) => {
  try {
    let { handle } = req.query;

    if (!handle) {
      throw new Error("Please select upsell product to delete");
    }

    const handleExist = await prisma.upselling_popup.findFirst({
      where: {
        handle,
      },
    });

    if (!handleExist) {
      throw new Error("Upselling product doesn't exist!");
    }

    await prisma.upselling_popup.delete({
      where: {
        id: handleExist.id,
      },
    });

    return res.status(200).json({
      success: true,
      message: "Upsell product was deleted successfully!",
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
