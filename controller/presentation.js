async function getPresentation(req, res) {
  try {
    res.status(200).render("presentation", { layout: "presentation" });
  } catch (error) {
    logger.error(error);
    res.status(500).json({ error: true, msj: "error" });
  }
}

module.exports = {
  getPresentation,
};
