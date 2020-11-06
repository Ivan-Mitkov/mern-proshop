import express from "express";
import path from "path";
import multer from "multer";

const router = express.Router();
//https://github.com/expressjs/multer
const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, "uploads/");
  },
  filename(req, file, cb) {
    //unique filenamse with date
    //original extension with path
    cb(
      null,
      `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
    );
  },
});

function checkFileType(file, cb) {
  const filetypes = /jpg|jpeg|png/;
  const extName = filetypes.test(path.extname(file.originalname).toLowerCase());
  //chech MIME type
  const mimetype = filetypes.test(file.mimetype);

  if (extName && mimetype) {
    return cb(null, true);
  } else {
    //passing error
    cb("Images only");
  }
}
const upload = multer({
  storage,
  //limit only to image files, without filter will save any file
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb);
  },
});

//api/uploads
router.post("/", upload.single("image"), (req, res) => {
  //send path of the image and in the frontend set this path like image path
  res.send(`/${req.file.path}`);
});

export default router;

// There are two options available, destination and filename. They are both functions that determine where the file should be stored.
// destination is used to determine within which folder the uploaded files should be stored. This can also be given as a string (e.g. '/tmp/uploads'). If no destination is given, the operating system's default directory for temporary files is used.
// Note: You are responsible for creating the directory when providing destination as a function. When passing a string, multer will make sure that the directory is created for you.
// filename is used to determine what the file should be named inside the folder. If no filename is given, each file will be given a random name that doesn't include any file extension.
// Note: Multer will not append any file extension for you, your function should return a filename complete with an file extension.
// Each function gets passed both the request (req) and some information about the file (file) to aid with the decision.
// Note that req.body might not have been fully populated yet. It depends on the order that the client transmits fields and files to the server.
// For understanding the calling convention used in the callback (needing to pass null as the first param), refer to Node.js error handling
