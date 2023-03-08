const { prisma } = require("../../prisma/prisma");

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

exports.changePopUp = async (req, res) => {
  try {
    let data = req.body;

    delete data.mainImageUrl;

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
        },
        seven_section_knock_page_pc: {
          select: {
            id: true,
            li: true,
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
          },
          forth_section_knock_clipper_page_pc: {
            select: {
              id: true,
              li: true,
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

// DTK

exports.getDTK = async (req, res) => {
  try {
    const DTKPage = await prisma.dtk_page.findMany();

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
      },
    });

    return res.status(200).json({
      success: true,
      message: "",
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
        },
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
