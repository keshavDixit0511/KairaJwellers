// const express = require('express')
// const Jewellery = require("../model/Jewellery.model");
// const SubCategory = require("../model/subCategory.model");
// const Photo = require("../model/Photo.model");
// const router = express.Router()



// router.get("/", async (req, res) => {
//   try {
//     // fetch both fields
//     const jewelleries = await Jewellery.find({}, "name banner");

//     // split into two arrays
//     const jewelleryNames = jewelleries.map(j => j.name);
//     const jewelleryBanner = jewelleries.map(j => j.banner);

//     res.json({ jewelleryNames, jewelleryBanner });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: "Server error" });
//   }
// });



// //  creaete field Diamond , Silver , Gold
// router.post("/", async (req, res) => {
//     try {
//       const { name , banner } = req.body;
  
//       // check if already exists
//       const existing = await Jewellery.findOne({ name: name.toLowerCase() });
//       if (existing) {
//         return res.status(400).json({ message: "Jewellery already exists" });
//       }
  
//       const jewellery = await Jewellery.create({ name: name.toLowerCase(), subcategories: [] , banner:banner });
  
//       res.status(201).json({
//         message: "Jewellery added successfully",
//         jewellery
//       });
  
//     } catch (error) {
//       res.status(500).json({ message: error.message });
//     }
//   });


// //  Ex - Rings , Bangles , Nosepin to add subcategory
// router.post("/:jewelleryName/subcategory", async (req, res) => {
//     try {
//       const { subCategoryName } = req.body;
//       const { jewelleryName } = req.params;
  
//       // find jewellery
//       const jewellery = await Jewellery.findOne({ name: jewelleryName.toLowerCase() });
//       if (!jewellery) {
//         return res.status(404).json({ message: "Jewellery not found" });
//       }
  
//       // create subcategory
//       const subCat = await SubCategory.create({ 
//         subCategoryName: subCategoryName.toLowerCase(), 
//         photos: [] 
//       });
  
//       // push into jewellery
//       jewellery.subcategories.push(subCat._id);
//       await jewellery.save();
  
//       res.status(201).json({
//         message: "SubCategory added successfully",
//         subCat
//       });
  
//     } catch (error) {
//       res.status(500).json({ message: error.message });
//     }
//   });
  

// //  uploading photo in the subcategory
// router.post("/:jewelleryName/subcategory/:subCatName/photo", async (req, res) => {
//   try {
//     const { imageName, image } = req.body;
//     const { jewelleryName, subCatName } = req.params;

//     // find jewellery
//     const jewellery = await Jewellery.findOne({ name: jewelleryName.toLowerCase() }).populate("subcategories");
//     if (!jewellery) {
//       return res.status(404).json({ message: "Jewellery not found" });
//     }

//     // find subcategory inside jewellery
//     let subCat = await SubCategory.findOne({ 
//       _id: { $in: jewellery.subcategories }, 
//       subCategoryName: subCatName.toLowerCase() 
//     });
//     if (!subCat) {
//       return res.status(404).json({ message: "SubCategory not found" });
//     }

//     // Allow unlimited photos, but only first 50 will be fetched in initial GET
//     // (No limit on adding photos, but you can enforce a max if needed)
//     const photo = await Photo.create({ imageName, image });

//     // push into subcategory
//     subCat.photos.push(photo._id);
//     await subCat.save();

//     res.status(201).json({
//       message: "Photo added successfully",
//       photo
//     });

//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// });

// // API to get paginated photos for scroll-based loading
// router.get("/:jewelleryName/subcategory/:subCatName/photos/page/:pg", async (req, res) => {
//   try {
//     const { jewelleryName, subCatName } = req.params;
//     // page=1, limit=50 by default
//     const page = parseInt(req.params.pg) || 1;
//     const limit =  50;
//     const skip = (page - 1) * limit;

//     // Find the jewellery and populate all subcategories (to get banner and subcategory name)
//     const jewellery = await Jewellery.findOne({ name: jewelleryName.toLowerCase() })
//       .populate({
//         path: "subcategories",
//         populate: {
//           path: "photos",
//           select: "imageName image"
//         }
//       });

//     if (!jewellery) {
//       return res.status(404).json({ message: "Jewellery not found" });
//     }

//     // Find the subcategory by name (case-insensitive)
//     const subcategory = jewellery.subcategories.find(
//       (sub) => sub.subCategoryName && sub.subCategoryName.toLowerCase() === subCatName.toLowerCase()
//     );

//     if (!subcategory) {
//       return res.status(404).json({ message: "SubCategory not found" });
//     }

//     // Paginate photos
//     const totalPhotos = (subcategory.photos || []).length;
//     const paginatedPhotos = (subcategory.photos || []).slice(skip, skip + limit);

//     // Fetch the banner from jewellery
//     const banner = jewellery.banner || null;
//     const jewell = jewellery.name || null;
//     res.status(200).json({
//       message: "Photos fetched successfully",
//         banner: banner,
//         jewellery : jewell,
//       subcategory: subcategory.subCategoryName,
//       photos: paginatedPhotos,
//       page,
//       limit,
//       totalPhotos
//     });

//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// });

 

// // Delete a photo from a subcategory of a jewellery item
// router.delete("/:jewelleryName/:subcategoryName/photos/:photoId", async (req, res) => {
//   try {
//     const { jewelleryName, subcategoryName, photoId } = req.params;

//     // Step 1: Find the jewellery
//     const jewellery = await Jewellery.findOne({ name: jewelleryName.toLowerCase() }).populate("subcategories");
//     if (!jewellery) {
//       return res.status(404).json({ message: "Jewellery not found" });
//     }

//     // Step 2: Find the subcategory
//     const subcategory = jewellery.subcategories.find(
//       (sub) => sub.subCategoryName.toLowerCase() === subcategoryName.toLowerCase()
//     );
//     if (!subcategory) {
//       return res.status(404).json({ message: "Subcategory not found" });
//     }

//     // Step 3: Remove the photo reference from the subcategory
//     const photoIndex = subcategory.photos.findIndex(
//       (photo) => photo.toString() === photoId
//     );
//     if (photoIndex === -1) {
//       return res.status(404).json({ message: "Photo not found in subcategory" });
//     }
//     subcategory.photos.splice(photoIndex, 1);
//     await subcategory.save();

//     // Step 4: Remove the photo from the Photo collection (delete from DB)
//     await Photo.findByIdAndDelete(photoId);

//     res.json({ message: "Photo removed from subcategory and deleted from database successfully" });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: "Server error" });
//   }
// });

// // GET API to fetch only subcategory names of a jewellery
// router.get("/:jewelleryName/subcategories/names", async (req, res) => {
//   try {
//     const { jewelleryName } = req.params;

//     // Find the jewellery and populate subcategories
//     const jewellery = await Jewellery.findOne({ name: jewelleryName.toLowerCase() }).populate("subcategories");
//     if (!jewellery) {
//       return res.status(404).json({ message: "Jewellery not found" });
//     }

//     // Extract only subCategoryName from each subcategory
//     const subcategoryNames = jewellery.subcategories.map(subcat => subcat.subCategoryName);

//     res.json({ subcategoryNames });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: "Server error" });
//   }
// });




// module.exports = router;







const express = require('express');
const Jewellery = require("../model/Jewellery.model");
const SubCategory = require("../model/subCategory.model");
const Photo = require("../model/Photo.model");
const router = express.Router();

// ==========================================
// 1. GLOBAL / GENERAL ROUTES
// ==========================================

/**
 * GET: Fetch all jewellery main categories (Gold, Silver, Diamond)
 * Logic: Root routes should always come first.
 */
router.get("/", async (req, res) => {
  try {
    const jewelleries = await Jewellery.find({}, "name banner");
    // const jewelleryNames = jewelleries.map(j => j.name);
    // const jewelleryBanner = jewelleries.map(j => j.banner);

    res.json({ jewelleries }); // Returning the Jewellery objects which is better for frontend maping
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

/**
 * POST: Create a new main category
 */
router.post("/", async (req, res) => {
  try {
    const { name, banner } = req.body; // Get name and banner from request body
    const existing = await Jewellery.findOne({ name: name.toLowerCase() }); // Check if jewellery already exists

    if (existing) {
      return res.status(400).json({ message: "Jewellery already exists" });
    }

    // create a new category like (Gold, Silver, Diamond)
    const jewellery = await Jewellery.create({ 
      name: name.toLowerCase(), 
      banner: banner 
    });
    res.status(201).json({ message: "Category added successfully", jewellery });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// ==========================================
// 2. CATEGORY & SUBCATEGORY LOGIC
// ==========================================

/**
 * NEW: VIEW ALL (e.g., Clicked "GOLD")
 * Fetches every photo belonging to a specific metal regardless of subcategory
 */
router.get("/:jewelleryName/all/page/:pg", async (req, res) => {
  try {
    const { jewelleryName } = req.params; // Get jewellery name from params
    const page = parseInt(req.params.pg) || 1; // Get page number from params or default to 1
    const limit = 50; // Number of photos to fetch per page

    const jewellery = await Jewellery.findOne({ name: jewelleryName.toLocaleLowerCase() }); // Find jewellery by name

    // show 404 if jewellery not found
    if (!jewellery) {
      return res.status(404).json({ message: "Jewellery not found" });
    }
    // It will look for the photos that belong to the jewellery in Photo collection
    const photos = await Photo.find({ jewelleryId: jewellery._id})
      .skip((page - 1) * limit)
      .limit(limit)
      .sort({ createdAt: -1 }); // this line shows newest first

    const totalPhotos = await Photo.countDocuments({ jewelleryId: jewellery._id });

    res.json({ 
      banner: jewellery.banner,
      jewellery: jewellery.name,
      totalPhotos,
      photos,
      totalPages: Math.ceil(totalPhotos / limit),
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
});

// GET subcategory names for hover name
router.get("/:jewelleryName/subcategories/names", async (req, res) => {
  try {
    const { jewelleryName } = req.params; // Get jewellery name from params
    const jewellery = await Jewellery.findOne({ name: jewelleryName.toLowerCase() }).populate("subcategories", "subCategoryName"); // Find jewellery by name and populate subcategories
    if (!jewellery) {
      return res.status(404).json({ message: "Jewellery not found" });
    }
    // Extract only subCategoryName from each subcategory
    const subcategoryNames = jewellery.subcategories.map(
      (subcat) => subcat.subCategoryName
    );

    res.json({ subcategoryNames }); // returning the subcategory names array
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

/**
 * POST: Add a new subcategory to a main category
 */
router.post("/:jewelleryName/subcategory", async (req, res) => {
  try {
    const { subCategoryName } = req.body; // Get subcategory name from request body
    const { jewelleryName } = req.params;  // Get jewellery name from params
    const jewellery = await Jewellery.findOne({ name: jewelleryName.toLowerCase() }); // Find jewellery by name in Jewellery collection

    // show 404 if jewellery not found
    if (!jewellery) {
      return res.status(404).json({ message: "Jewellery not found" });
    }
    // create a new subcategory like (Rings, Bangles, Nosepin) 
    const subCat = await SubCategory.create({ 
      subCategoryName: subCategoryName.toLowerCase(), 
      parentJewellery: jewellery._id
    });

    jewellery.subcategories.push(subCat._id); // push into jewellery
    await jewellery.save(); // save jewellery
    res.status(201).json({ message: "SubCategory added successfully", subCat });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// ==========================================
// 3. PHOTO / DEEP NESTED ROUTES
// ==========================================

/**
 * GET: Paginated photos for a specific subcategory
 */
router.get("/:jewelleryName/subcategory/:subCatName/photos/page/:pg", async (req, res) => {
  try {
    const { jewelleryName, subCatName, pg } = req.params; // Get jewellery name and subcategory name and page number from params
    const limit = 50; // Number of photos to fetch per page
    const skip = (parseInt(pg) - 1) * limit; // Calculate the number of photos to skip

    // Find jewellery by name
    const jewellery = await Jewellery.findOne({ name: jewelleryName.toLowerCase() });

    // Handle null just like an Optional.orElseThrow()
    if (!jewellery) {
      return res.status(404).json({ message: "Main jewellery category not found" });
    }

    // Find subcategory by name
    const subCat = await SubCategory.findOne({
      subCategoryName: subCatName.toLowerCase(),
      parentJewellery: jewellery._id
    })

    if(!subCat) return res.status(404).json({ message: "SubCategory not found" });

    // DATABASE LEVEL PAGINATION (Skip/Limit) - Not JavaScript slicing
    const photos = await Photo.find({ subCategoryId: subCat._id})
      .skip(skip)
      .limit(limit);

    const totalPhotos = await Photo.countDocuments({ subCategoryId: subCat._id });

    res.json({
      banner: jewellery.banner,
      subcategory: subCat.subCategoryName,
      photos,
      totalPages : Math.ceil(totalPhotos / limit),
      totalPhotos
    });

    // if (!jewellery) return res.status(404).json({ message: "Jewellery not found" });

    // const subcategory = jewellery.subcategories.find(
    //   (sub) => sub.subCategoryName && sub.subCategoryName.toLowerCase() === subCatName.toLowerCase()
    // );

    // if (!subcategory) return res.status(404).json({ message: "SubCategory not found" });

    // const totalPhotos = (subcategory.photos || []).length;
    // const paginatedPhotos = (subcategory.photos || []).slice(skip, skip + limit);

    // res.status(200).json({
    //   message: "Photos fetched successfully",
    //   banner: jewellery.banner || null,
    //   jewellery: jewellery.name || null,
    //   subcategory: subcategory.subCategoryName,
    //   photos: paginatedPhotos,
    //   page,
    //   limit,
    //   totalPhotos
    // });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

/**
 * POST: Upload photo to a subcategory
 */
router.post("/:jewelleryName/subcategory/:subCatName/photo", async (req, res) => {
  try {
    const { imageName, image } = req.body; // Get image name and image from request body
    const { jewelleryName, subCatName } = req.params; // Get jewellery name and subcategory name from params
    const jewellery = await Jewellery.findOne({ name: jewelleryName.toLowerCase() }) // Find jewellery by name

    const subCat = await SubCategory.findOne({
      subCategoryName: subCatName.toLowerCase(),
      parentJewellery: jewellery._id
    });

    if(!subCat) return res.status(404).json({ message : "SubCategory not found"});

    // CREATE PHOTO WITH BOTH REFERANCE
    const photo = await Photo.create({
      imageName,
      image,
      jewelleryId: jewellery._id,
      subCategoryId: subCat._id
    })

    subCat.photos.push(photo._id);

    await subCat.save();

    res.status(201).json({ message: "Photo added successfully ", photo});

    // if (!jewellery) return res.status(404).json({ message: "Jewellery not found" });

    // let subCat = await SubCategory.findOne({ 
    //   _id: { $in: jewellery.subcategories }, 
    //   subCategoryName: subCatName.toLowerCase() 
    // });
    // if (!subCat) return res.status(404).json({ message: "SubCategory not found" });

    // const photo = await Photo.create({ imageName, image });
    // subCat.photos.push(photo._id);
    // await subCat.save();

    // res.status(201).json({ message: "Photo added successfully", photo });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


/**
 * BULK POST: Add multiple subcategories to a main category at once
 * Input: { subCategoryNames: ["Rings", "Bangles", "Nosepins"] }
 */
router.post("/:jewelleryName/bulk-subcategories", async (req, res) => {
  try {
    const { jewelleryName } = req.params;
    const { subCategoryNames } = req.body; // Expecting an array of strings

    // 1. Find the parent
    const jewellery = await Jewellery.findOne({ name: jewelleryName.toLowerCase() });
    if (!jewellery) return res.status(404).json({ message: "Jewellery not found" });

    // 2. Map names to creation promises
    const createPromises = subCategoryNames.map(name => {
      return SubCategory.create({
        subCategoryName: name.toLowerCase(),
        parentJewellery: jewellery._id
      });
    });

    // 3. Execute all creations (Parallel execution)
    const newSubCats = await Promise.all(createPromises);

    // 4. Update the parent Jewellery document with all new IDs
    const newIds = newSubCats.map(s => s._id);
    jewellery.subcategories.push(...newIds);
    await jewellery.save();

    res.status(201).json({
      message: `${newSubCats.length} subcategories added successfully`,
      subCategories: newSubCats
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

/**
 * DELETE: Remove a photo
 * Logic: Delete routes usually stay at the bottom.
 */
router.delete("/:jewelleryName/:subcategoryName/photos/:photoId", async (req, res) => {
  try {
    const { jewelleryName, subcategoryName, photoId } = req.params; // Get jewellery name, subcategory name, and photo ID from params
    const jewellery = await Jewellery.findOne({ name: jewelleryName.toLowerCase() }); // Find jewellery by name
    if (!jewellery) return res.status(404).json({ message: "Jewellery not found" }); // show 404 if jewellery not found


    // 1. Remove photo ID from SubCategory array
    const subCategory = await SubCategory.findOneAndUpdate(
      {
        subCategoryName: subcategoryName.toLowerCase(),
        parentJewellery: jewellery._id
      },
      {
        $pull: { photos: photoId}
      },
      { new: true }
    );

    if(!subCategory) return res.status(404).json({ message : "SubCategory not found"});

    //2. Delete the Photo document
    const deletedPhoto = await Photo.findByIdAndDelete(photoId);

    if(!deletedPhoto) return res.status(404).json({ message : "Photo document not found"});

    res.json({ message: "Photo removed and deleted successfully" });
    // const subcategory = jewellery.subcategories.find(
    //   (sub) => sub.subCategoryName.toLowerCase() === subcategoryName.toLowerCase()
    // );
    // if (!subcategory) return res.status(404).json({ message: "Subcategory not found" });

    // const photoIndex = subcategory.photos.findIndex(p => p.toString() === photoId);
    // if (photoIndex === -1) return res.status(404).json({ message: "Photo not found in subcategory" });

    // subcategory.photos.splice(photoIndex, 1);
    // await subcategory.save();
    // await Photo.findByIdAndDelete(photoId);

    // res.json({ message: "Photo removed and deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;