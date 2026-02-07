const express = require('express')
const Jewellery = require("../model/Jewellery.model");
const SubCategory = require("../model/subCategory.model");
const Photo = require("../model/Photo.model");
const router = express.Router()



router.get("/", async (req, res) => {
  try {
    // fetch both fields
    const jewelleries = await Jewellery.find({}, "name banner");

    // split into two arrays
    const jewelleryNames = jewelleries.map(j => j.name);
    const jewelleryBanner = jewelleries.map(j => j.banner);

    res.json({ jewelleryNames, jewelleryBanner });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});



//  creaete field Diamond , Silver , Gold
router.post("/", async (req, res) => {
    try {
      const { name , banner } = req.body;
  
      // check if already exists
      const existing = await Jewellery.findOne({ name: name.toLowerCase() });
      if (existing) {
        return res.status(400).json({ message: "Jewellery already exists" });
      }
  
      const jewellery = await Jewellery.create({ name: name.toLowerCase(), subcategories: [] , banner:banner });
  
      res.status(201).json({
        message: "Jewellery added successfully",
        jewellery
      });
  
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });


//  Ex - Rings , Bangles , Nosepin to add subcategory
router.post("/:jewelleryName/subcategory", async (req, res) => {
    try {
      const { subCategoryName } = req.body;
      const { jewelleryName } = req.params;
  
      // find jewellery
      const jewellery = await Jewellery.findOne({ name: jewelleryName.toLowerCase() });
      if (!jewellery) {
        return res.status(404).json({ message: "Jewellery not found" });
      }
  
      // create subcategory
      const subCat = await SubCategory.create({ 
        subCategoryName: subCategoryName.toLowerCase(), 
        photos: [] 
      });
  
      // push into jewellery
      jewellery.subcategories.push(subCat._id);
      await jewellery.save();
  
      res.status(201).json({
        message: "SubCategory added successfully",
        subCat
      });
  
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
  

//  uploading photo in the subcategory
router.post("/:jewelleryName/subcategory/:subCatName/photo", async (req, res) => {
  try {
    const { imageName, image } = req.body;
    const { jewelleryName, subCatName } = req.params;

    // find jewellery
    const jewellery = await Jewellery.findOne({ name: jewelleryName.toLowerCase() }).populate("subcategories");
    if (!jewellery) {
      return res.status(404).json({ message: "Jewellery not found" });
    }

    // find subcategory inside jewellery
    let subCat = await SubCategory.findOne({ 
      _id: { $in: jewellery.subcategories }, 
      subCategoryName: subCatName.toLowerCase() 
    });
    if (!subCat) {
      return res.status(404).json({ message: "SubCategory not found" });
    }

    // Allow unlimited photos, but only first 50 will be fetched in initial GET
    // (No limit on adding photos, but you can enforce a max if needed)
    const photo = await Photo.create({ imageName, image });

    // push into subcategory
    subCat.photos.push(photo._id);
    await subCat.save();

    res.status(201).json({
      message: "Photo added successfully",
      photo
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// API to get paginated photos for scroll-based loading
router.get("/:jewelleryName/subcategory/:subCatName/photos/page/:pg", async (req, res) => {
  try {
    const { jewelleryName, subCatName } = req.params;
    // page=1, limit=50 by default
    const page = parseInt(req.params.pg) || 1;
    const limit =  50;
    const skip = (page - 1) * limit;

    // Find the jewellery and populate all subcategories (to get banner and subcategory name)
    const jewellery = await Jewellery.findOne({ name: jewelleryName.toLowerCase() })
      .populate({
        path: "subcategories",
        populate: {
          path: "photos",
          select: "imageName image"
        }
      });

    if (!jewellery) {
      return res.status(404).json({ message: "Jewellery not found" });
    }

    // Find the subcategory by name (case-insensitive)
    const subcategory = jewellery.subcategories.find(
      (sub) => sub.subCategoryName && sub.subCategoryName.toLowerCase() === subCatName.toLowerCase()
    );

    if (!subcategory) {
      return res.status(404).json({ message: "SubCategory not found" });
    }

    // Paginate photos
    const totalPhotos = (subcategory.photos || []).length;
    const paginatedPhotos = (subcategory.photos || []).slice(skip, skip + limit);

    // Fetch the banner from jewellery
    const banner = jewellery.banner || null;
    const jewell = jewellery.name || null;
    res.status(200).json({
      message: "Photos fetched successfully",
        banner: banner,
        jewellery : jewell,
      subcategory: subcategory.subCategoryName,
      photos: paginatedPhotos,
      page,
      limit,
      totalPhotos
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

 

// Delete a photo from a subcategory of a jewellery item
router.delete("/:jewelleryName/:subcategoryName/photos/:photoId", async (req, res) => {
  try {
    const { jewelleryName, subcategoryName, photoId } = req.params;

    // Step 1: Find the jewellery
    const jewellery = await Jewellery.findOne({ name: jewelleryName.toLowerCase() }).populate("subcategories");
    if (!jewellery) {
      return res.status(404).json({ message: "Jewellery not found" });
    }

    // Step 2: Find the subcategory
    const subcategory = jewellery.subcategories.find(
      (sub) => sub.subCategoryName.toLowerCase() === subcategoryName.toLowerCase()
    );
    if (!subcategory) {
      return res.status(404).json({ message: "Subcategory not found" });
    }

    // Step 3: Remove the photo reference from the subcategory
    const photoIndex = subcategory.photos.findIndex(
      (photo) => photo.toString() === photoId
    );
    if (photoIndex === -1) {
      return res.status(404).json({ message: "Photo not found in subcategory" });
    }
    subcategory.photos.splice(photoIndex, 1);
    await subcategory.save();

    // Step 4: Remove the photo from the Photo collection (delete from DB)
    await Photo.findByIdAndDelete(photoId);

    res.json({ message: "Photo removed from subcategory and deleted from database successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// GET API to fetch only subcategory names of a jewellery
router.get("/:jewelleryName/subcategories/names", async (req, res) => {
  try {
    const { jewelleryName } = req.params;

    // Find the jewellery and populate subcategories
    const jewellery = await Jewellery.findOne({ name: jewelleryName.toLowerCase() }).populate("subcategories");
    if (!jewellery) {
      return res.status(404).json({ message: "Jewellery not found" });
    }

    // Extract only subCategoryName from each subcategory
    const subcategoryNames = jewellery.subcategories.map(subcat => subcat.subCategoryName);

    res.json({ subcategoryNames });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});




module.exports = router;
