const Listing = require("../models/Listing");
const User = require("../models/User");


const getAllListings = async (req, res) => {
      try {
            const listings = await Listing.find().populate("host.user", "name avatar");
            res.status(200).json(listings);
      } catch (error) {
            res.status(500).json({ error: "Failed to fetch listings" });
      }
};

const getListingById = async (req, res) => {
      try {
            const listing = await Listing.findById(req.params.id)
                  .populate('host.user', 'name avatar') // chỉ lấy name & avatar

            if (!listing) {
                  return res.status(404).json({ message: 'Listing not found' });
            }

            const listingObject = listing.toObject();

            // Biến đổi dữ liệu host từ: { user: { name, avatar }, response_time } => { name, avatar, response_time }
            if (listingObject.host && listingObject.host.user) {
                  listingObject.host = {
                        name: listingObject.host.user.name,
                        avatar: listingObject.host.user.avatar,
                        response_time: listingObject.host.response_time,
                  };
            }

            res.status(200).json(listingObject);
      } catch (err) {
            res.status(500).json({ message: 'Server error' });
      }
};

const getListingBySlug = async (req, res) => {
      try {
            // Lấy thông tin listing theo slug
            const listing = await Listing.findOne({ slug: req.params.slug })
                  .populate('host.user', 'name avatar'); // Chỉ lấy name và avatar của host

            if (!listing) {
                  return res.status(404).json({ error: "Listing not found" });
            }

            // Biến đổi dữ liệu host
            const listingObject = listing.toObject();
            if (listingObject.host && listingObject.host.user) {
                  listingObject.host = {
                        name: listingObject.host.user.name,
                        avatar: listingObject.host.user.avatar,
                        response_time: listingObject.host.response_time,
                  };
            }

            res.status(200).json(listingObject);
      } catch (error) {
            res.status(500).json({ error: "Failed to fetch listing" });
      }
};

const createListing = async (req, res) => {
      try {
            const {
                  name,
                  slug,
                  images,
                  description,
                  price,
                  location,
                  amenities,
                  host,
                  booking,
                  rating,
                  reviews
            } = req.body;

            const user = await User.findById(host.user);
            if (!user) return res.status(404).json({ error: "Host user not found" });

            const newListing = new Listing({
                  name,
                  slug,
                  images,
                  description,
                  price,
                  location,
                  amenities,
                  host,
                  booking,
                  rating,
                  reviews
            });

            const saved = await newListing.save();
            res.status(201).json(saved);
      } catch (error) {
            console.error(" Error creating listing:", error);
            res.status(500).json({ error: "Failed to create listing" });
      }
};

// @desc    Update listing
const updateListing = async (req, res) => {
      try {
            const updated = await Listing.findByIdAndUpdate(
                  req.params.id,
                  req.body,
                  { new: true }
            ).populate("host.user", "name avatar");

            if (!updated) return res.status(404).json({ error: "Listing not found" });

            res.status(200).json(updated);
      } catch (error) {
            res.status(500).json({ error: "Failed to update listing" });
      }
};

// @desc    Delete listing
const deleteListing = async (req, res) => {
      try {
            const deleted = await Listing.findByIdAndDelete(req.params.id);
            if (!deleted) return res.status(404).json({ error: "Listing not found" });
            res.status(200).json({ message: "Listing deleted successfully" });
      } catch (error) {
            res.status(500).json({ error: "Failed to delete listing" });
      }
};


module.exports = {
      getAllListings,
      getListingById,
      getListingBySlug,
      createListing,
      updateListing,
      deleteListing,
};
