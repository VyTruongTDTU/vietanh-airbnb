const express = require("express");
const router = express.Router();

const {
      getAllListings,
      getListingById,
      getListingBySlug,
      createListing,
      updateListing,
      deleteListing,
} = require("../controllers/listingController");

router.get("/", getAllListings);
router.get("/:id", getListingById);
router.get("/slug/:slug", getListingBySlug);
router.post("/", createListing);
router.put("/:id", updateListing);
router.delete("/:id", deleteListing);

module.exports = router;
