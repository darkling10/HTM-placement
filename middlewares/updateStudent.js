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

const updateSkills = async (decoded, req, res) => {
  let message = "ok";
  let errorCode = 200;

  try {
    const findUser = await Students.findById(decoded.id);
    console.log(findUser.skills)
    if (findUser.skills.length === 0) {
      updateSkills(req,message,errorCode)    
      
    }else{
      console.log("Hiiii")
      findUser.skills.forEach(element => {
        if(element.name === req.body.skills.name){
          errorCode = 400,
          message = "Skill already registered"
        }else{
          
        }
      });
    }

    return res.status(errorCode).json({ message: message });
  } catch (error) {
    return res.status(400).json({ message: "Error has occured", error: error });
  }
};


const addSkills = async(req,message,errorCode)=>{
  const updateUser = await Students.updateOne(
    { _id: decoded.id },
    {
      $push: { skills: req.body.skills },
    }
  )
    .then((data) => {
      message = data;
    })
    .catch((err) => {
      message = err;
      errorCode = 400;
    });
}

module.exports = {
  updateEducation,
  updateProject,
  updatePastExp,
  updateCertification,
  updateSkills,
};
