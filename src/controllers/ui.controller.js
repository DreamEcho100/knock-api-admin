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
        const response = await prisma.third_section_knock_clipper_page.update({
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
