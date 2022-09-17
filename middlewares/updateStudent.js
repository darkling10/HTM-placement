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
      message = data;
      errorCode = 200;
    })
    .catch((err) => {
      message = err;
      errorCode = 400;
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
      message = data;
      errorCode = 200;
    })
    .catch((err) => {
      message = err;
      errorCode = 400;
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
      message = data;
      errorCode = 200;
    })
    .catch((err) => {
      message = err;
      errorCode = 400;
    });

  return res.status(errorCode).json({ message: message });
};

const updateCertification = async (decoded, req, res) => {
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
      message = data;
      errorCode = 200;
    })
    .catch((err) => {
      message = err;
      errorCode = 400;
    });

  return res.status(errorCode).json({ message: message });
};

module.exports = {
  updateEducation,
  updateProject,
  updatePastExp,
  updateCertification,
};
