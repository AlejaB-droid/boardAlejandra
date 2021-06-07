const upload = (req, res, next) => {
  if (req.files.type){
    let type = req.files.image.type;
    if(
    type !== "image/jpg" &&
    type !== "image/jpeg" &&
    type !== "image/png" &&
    type !== "image/gif"
    ){
      return res.status(400).send("Invalid format")
    }else{
      next()
    };
  };
}; 

module.exports = upload;
