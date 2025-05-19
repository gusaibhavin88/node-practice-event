const Event = require("../Schema/eventSchema");

exports.create = async (req, res) => {
  try {
    const { name, description, totalGuest, startDate, endDate } = req.body;

    const fileUrl = req?.files?.map((item) => item.path);

    const newEvent = await Event.create({
      name,
      description,
      totalGuest,
      imagesUrl: fileUrl,
      startDate,
      endDate,
      userId: req?.user?._id,
    });
    res.status(201).json({
      success: true,
      data: newEvent,
      message: "Event Created successfully",
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

exports.getEvent = async (req, res) => {
  try {
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

exports.deleteEvent = async (req, res) => {
  try {
    console.log("jjkjhn", req?.params?.id);

    await Event.findOneAndUpdate(
      { _id: req?.params?.id },
      {
        isDeleted: true,
      }
    );

    console.log("jjkjhn");
    res.status(201).json({
      success: true,
      message: "Event deleted successfully",
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

exports.listEvent = async (req, res) => {
  try {
    const {
      pagination = false,
      page = 1,
      sortField = "createdAt",
      sortOrder = "desc",
      search = "",
      itemPerPage = 10,
    } = req?.query;

    const sortObject = {};
    sortObject[sortField] = sortOrder === "desc" ? 1 : -1;
    const skip = (page - 1) * itemPerPage;

    const queryObject = { isDeleted: false };

    queryObject["$or"] = [
      {
        firstName: {
          $regex: search.toLowerCase(),
          $optional: "i",
        },
        lastName: {
          $regex: search.toLowerCase(),
          $optional: "i",
        },
      },
    ];
    console.log(sortObject, "jnjjjj");
    const [events, totalDocuments] = await Promise.all([
      Event.find().sort(sortObject).skip(skip).limit(itemPerPage).lean(),
      Event.find({}).countDocuments(),
    ]);
    const totalPages = totalDocuments || 0 / itemPerPage;

    res.status(201).json({
      success: true,
      data: { events, totalPages },
      message: "Event fetched successfully",
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};
