const express = require("express");
const router = express.Router();
const Jewellery = require('../model/landingPage')

router.put("/page3/gallery/:section/:index", async (req, res) => {
  try {
    const { section, index } = req.params; // e.g. carousel / 0
    const { newImage } = req.body;         // new URL

    if (!["carousel", "diamond", "gold", "silver"].includes(section)) {
      return res.status(400).json({ success: false, message: "Invalid section name" });
    }

    const doc = await Jewellery.findOne();
    if (!doc) return res.status(404).json({ success: false, message: "Document not found" });

    // Make sure index exists
    if (!doc.page3.gallery[section] || !doc.page3.gallery[section][index]) {
      return res.status(400).json({ success: false, message: "Index not found" });
    }

    // Update value
    doc.page3.gallery[section][index] = newImage;
    await doc.save();

    res.json({ success: true, message: "Image updated", data: doc.page3.gallery[section] });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});
// GET API
router.use("/:page", async (req, res) => {
  try {
    const pageName = req.params.page;
    // console.log(pageName);
    const doc = await Jewellery.findOne(
      {},
      
      { [pageName]: 1 }
    );

    if (!doc) {
      return res.status(404).json({ error: "Page not found" });
    }

    res.json(doc[pageName]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});
 
// page1-----------------------------------------------------------------for landing page 
// for updating the largeText of about section 
router.patch("/page1/about/largetext", async (req, res) => {
  try {
    // const { id } = req.params;  
    const { about } = req.body;  

    const result = await Jewellery.updateOne(
      // { _id: id },
      {},
      { $set: { "page1.about.LargeText": about } }
    );

    res.json({ success: true, result });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

//for updating the number of branch and emloyees
router.patch("/page1/about/number/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { name, num } = req.body;

    const result = await Jewellery.updateOne(
      { _id: id, "page1.about.numberData.name": name },
      { $set: { "page1.about.numberData.$.num": num } }
    );

    res.json({ success: true, result });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// for updating categories img and name
router.patch("/page1/categories/name/:name", async (req, res) => {
  try {
    const { name } = req.params;
    const { img, newName } = req.body;

    const doc = await Jewellery.findOneAndUpdate(
      { "page1.categories.name": name },
      {
        $set: {
          "page1.categories.$.img": img,
          "page1.categories.$.name": newName
        }
      },
      { new: true }
    );

    res.json(doc.page1.categories);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

//for updating video
router.patch("/page1/video", async (req, res) => {
  try {
    const { video } = req.body;

    if (!video) {
      return res.status(400).json({ error: "Video URL is required" });
    }

    const doc = await Jewellery.findOneAndUpdate(
      {},
      { $set: { "page1.video": video } },
      { new: true }
    );

    res.json({ video: doc.page1.video });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

//for updating the large banner images by index
router.patch("/page1/banner/:index", async (req, res) => {
  try {
    const { index } = req.params;
    const { newUrl } = req.body;

    if (!newUrl) {
      return res.status(400).json({ error: "newUrl is required" });
    }

    // build dynamic path like page1.banner.3
    const update = {};
    update[`page1.banner.${index}`] = newUrl;

    const doc = await Jewellery.findOneAndUpdate(
      {},
      { $set: update },
      { new: true }
    );

    res.json({ banner: doc.page1.banner });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// for updating qoute
router.patch("", async (req, res) => {
  try {
    const { quote } = req.body;
    // console.log(quote)

    if (!quote ) {
      return res.status(400).json({ error: "Enter some quote" });
    }

    const doc = await Jewellery.findOneAndUpdate(
      {_id :"68835c3a9c715cf3d7030d7a"},
      { $set: { "page1.quote": quote } },
      { new: true }
    );

    res.json({ quote: doc.page1.quote });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// for updating the testimonial
router.patch("/page1/testimonial/:index", async (req, res) => {
  try {
    const { index } = req.params;
    const { img, name, text } = req.body;

    // Validate index
    const idx = parseInt(index, 10);
    if (isNaN(idx)) {
      return res.status(400).json({ error: "Index must be a number" });
    }

    // Build update object dynamically
    const updateData = {};
    if (img) updateData["page1.testimonial." + idx + ".img"] = img;
    if (name) updateData["page1.testimonial." + idx + ".name"] = name;
    if (text) updateData["page1.testimonial." + idx + ".text"] = text;

    if (Object.keys(updateData).length === 0) {
      return res.status(400).json({ error: "Provide at least one field to update" });
    }

    const doc = await Jewellery.findOneAndUpdate(
      {},
      { $set: updateData },
      { new: true }
    );

    res.json({ updatedTestimonial: doc.page1.testimonial[idx] });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


//  page2 ----------------------------------------------------------------- of stores
// for deleting the whole single store
router.delete("/page2/store/:index", async (req, res) => {
  try {
    const { index } = req.params;
    const idx = parseInt(index, 10);

    if (isNaN(idx)) {
      return res.status(400).json({ error: "Index must be a number" });
    }

    // Use $unset to remove the element at index
    await Jewellery.updateOne(
      {},
      { $unset: { ["page2.store." + idx]: 1 } }
    );

    // Use $pull to remove null values after unset
    const doc = await Jewellery.findOneAndUpdate(
      {},
      { $pull: { "page2.store": null } },
      { new: true }
    );

    res.json({ message: "Store deleted successfully", stores: doc.page2.store });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// for updating the stores property 
router.patch("/page2/store/:index", async (req, res) => {
  try {
    const { index } = req.params;
    const { name, address, phone, mapsrc, image } = req.body;

    const idx = parseInt(index, 10);
    if (isNaN(idx)) {
      return res.status(400).json({ error: "Index must be a number" });
    }

    // Build dynamic update object
    const updateData = {};
    if (name) updateData[`page2.store.${idx}.name`] = name;
    if (address) updateData[`page2.store.${idx}.address`] = address;
    if (phone) updateData[`page2.store.${idx}.phone`] = phone;
    if (mapsrc) updateData[`page2.store.${idx}.mapsrc`] = mapsrc;
    if (image) updateData[`page2.store.${idx}.image`] = image;

    if (Object.keys(updateData).length === 0) {
      return res.status(400).json({ error: "Provide at least one field to update" });
    }

    const doc = await Jewellery.findOneAndUpdate(
      {},
      { $set: updateData },
      { new: true }
    );

    res.json({ message: "Store updated successfully", updatedStore: doc.page2.store[idx] });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
// for adding an store 
router.post("/page2/store", async (req, res) => {
  try {
    const newStore = req.body; // expecting { name, address, phone, mapsrc, image }

    // Validate required fields (basic)
    if (!newStore.name || !newStore.address || !newStore.phone) {
      return res.status(400).json({ error: "Name, address, and phone are required" });
    }

    // Push the new object into the store array
    const doc = await Jewellery.findOneAndUpdate(
      {},
      { $push: { "page2.store": newStore } },
      { new: true } // return updated doc
    );

    res.json({ message: "Store added successfully", stores: doc.page2.store });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


router.get("/test", (req, res) => {
  res.send("Route is working!");
});

// page4 ---------------------------------------------------------------------of Franchise
// ADD a new franchise
router.post("/page4/franchise", async (req, res) => {
  try {
    const newFranchise = req.body; // { name, role, image }

    const doc = await Jewellery.findOneAndUpdate(
      {},
      { $push: { "page2.franchise": newFranchise } },
      { new: true }
    );

    res.json({ message: "Franchise added successfully", franchises: doc.page2.franchise });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// UPDATE a franchise by index

router.put("/page4/franchise/:index", async (req, res) => {
  try {
    const { index } = req.params;
    const idx = parseInt(index, 10);
    const updatedFranchise = req.body; // { name, role, image }

    if (isNaN(idx)) {
      return res.status(400).json({ error: "Index must be a number" });
    }

    const updateFields = {};
    for (let key in updatedFranchise) {
      updateFields[`page2.franchise.${idx}.${key}`] = updatedFranchise[key];
    }

    const doc = await Jewellery.findOneAndUpdate(
      {},
      { $set: updateFields },
      { new: true }
    );

    res.json({ message: "Franchise updated successfully", franchises: doc.page2.franchise });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// DELETE a franchise by index
router.delete("/page4/franchise/:index", async (req, res) => {
  try {
    const { index } = req.params;
    const idx = parseInt(index, 10);

    if (isNaN(idx)) {
      return res.status(400).json({ error: "Index must be a number" });
    }

    // First unset
    await Jewellery.updateOne({}, { $unset: { ["page2.franchise." + idx]: 1 } });

    // Then pull nulls
    const doc = await Jewellery.findOneAndUpdate(
      {},
      { $pull: { "page2.franchise": null } },
      { new: true }
    );

    res.json({ message: "Franchise deleted successfully", franchises: doc.page2.franchise });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


module.exports = router;
