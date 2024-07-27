// note can get creative here, could create multiple levels of
// access, etc.

module.exports.isAdmin = (req, res, next) => {
  if (req.user.admin) {
    next();
  } else {
    res.status(401).json({ msg: "You ain't authorized to view this resource" });
  }
};

module.exports.ownDogami = (req, res, next) => {
  // check JWT user owns the dogami
  // - dogami is contained in the owned_dogs toArray

  if (req.user.owned_dogs.includes(req.params.dogamiId)) {
    next();
  } else {
    res
      .status(403)
      .json({ success: false, msg: "Forbidden. You do not own this dogami." });
  }
};
