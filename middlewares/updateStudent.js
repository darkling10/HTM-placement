const { decode } = require("jsonwebtoken");
const Students = require("../models/studentProfile");

const updateEducation = async (decoded, req, res) => {
  let message = "ok";
  let errorCode = 200;
  const findUser = await Students.findById(decoded.id);

  if (findUser.education[0] !== []) {
    await Students.updateOne(
      { _id: decoded.id },
      {
        $pop: { education: -1 },
      }
    );
  }

  const updateUser = await Students.updateOne(
    { _id: decoded.id },
    {
      $push: { education: req.body.education },
    }
  )
    .then((data) => {
      message = "Update succesfulll";
      errorCode = 200;
    })
    .catch((err) => {
      message = "Error occured in updating";
      errorCode = 200;
    });

  return res.status(errorCode).json({ message: message });
};

const updateProject = async (decoded, req, res) => {
  let message = "ok";
  let errorCode = 200;
  const findUser = await Students.findById(decoded.id);
  console.log(findUser);
  if (findUser.project[0] !== []) {
    await Students.updateOne(
      { _id: decoded.id },
      {
        $pop: { project: -1 },
      }
    );
  }

  const updateUser = await Students.updateOne(
    { _id: decoded.id },
    {
      $push: { project: req.body.project },
    }
  )
    .then((data) => {
      message = "Update Successful";
      errorCode = 200;
    })
    .catch((err) => {
      message = "Error occured in updating";
      errorCode = 200;
    });

  return res.status(errorCode).json({ message: message });
};

const updatePastExp = async (decoded, req, res) => {
  let message = "ok";
  let errorCode = 200;
  const findUser = await Students.findById(decoded.id);

  if (findUser.pastExperience[0] !== []) {
    await Students.updateOne(
      { _id: decoded.id },
      {
        $pop: { pastExperience: -1 },
      }
    );
  }

  const updateUser = await Students.updateOne(
    { _id: decoded.id },
    {
      $push: { pastExperience: req.body.pastExperience },
    }
  )
    .then((data) => {
      message = "Update Successfull";
      errorCode = 200;
    })
    .catch((err) => {
      message = "Update unsuccessfull";
      errorCode = 200;
    });

  return res.status(errorCode).json({ message: message });
};

const updateCertification = async (decoded, req, res) => {
  let message = "";
  let errorCode = 200;
  const findUser = await Students.findById(decoded.id);

  if (findUser.certification[0] !== []) {
    await Students.updateOne(
      { _id: decoded.id },
      {
        $pop: { certification: -1 },
      }
    );
  }

  const updateUser = await Students.updateOne(
    { _id: decoded.id },
    {
      $push: { certification: req.body.certification },
    }
  )
    .then((data) => {
      message = "Update Successfull";
      errorCode = 200;
    })
    .catch((err) => {
      message = "Error occured in updating";
      errorCode = 200;
    });

  return res.status(errorCode).json({ message: message });
};

const updateSkills = async (decoded, req, res) => {
  let message = "ok";
  let errorCode = 200;

  try {
    const findUser = await Students.findById(decoded.id);

    if (findUser.skills.length === 0) {
      return addSkills(req, res, message, errorCode, decoded);
    } else {
      findUser.skills.forEach((element) => {
        if (element.name === req.body.skills.name) {
          return res.json({ message: "skill already registered" });
        } else {
          return addSkills(req, res, message, errorCode, decoded);
        }
      });
    }
  } catch (error) {
    return res.status(200).json({ message: "Error has occured", error: error });
  }
};

const addSkills = async (req, res, message, errorCode, decoded) => {
  const updateUser = await Students.updateOne(
    { _id: decoded.id },
    {
      $push: { skills: req.body.skills },
    }
  )
    .then((data) => {
      return res.status(200).json({ message: "Skill added successfully" });
    })
    .catch((err) => {
      return res.status(200).json({ message: "Cannot add skillss" });
    });
};

async function updateAbout(decoded, req, res) {
  const {
    name,
    email,
    dob,
    headline,
    location,
    twitterLink,
    instaLink,
    githubLink,
    portfolioLink,
    role,
  } = req.body.about;

  const userLinks = {
    twitterLink: twitterLink,
    instaLink: instaLink,
    githubLink: githubLink,
    portfolioLink: portfolioLink,
  };

  try {
    const updateStudent = await Students.updateOne(
      { _id: decoded.id },
      {
        $set: {
          headline: headline,

          dob: dob,
          headline: headline,
          location: location,
          userLinks: userLinks,
          role: role,
        },
      }
    )
      .then((data) => {
        console.log(data);
      })
      .catch((err) => {
        console.log(err);
      });
    console.log(updateStudent);
    return res.status(200).json({ message: "Update SuccessFul" });
  } catch (error) {
    return res.status(404).json({ message: "error occured" });
  }
}

module.exports = {
  updateEducation,
  updateProject,
  updatePastExp,
  updateCertification,
  updateSkills,
  updateAbout,
};
