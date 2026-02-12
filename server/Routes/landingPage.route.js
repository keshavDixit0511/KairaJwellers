const express = require("express");
const router = express.Router();
const Jewellery = require('../model/landingPage.model');

// ==========================================
// 1. SYSTEM / TEST ROUTES
// ==========================================
router.get("/test", (req, res) => {
    res.send("Route is working!");
});

// ==========================================
// 2. PAGE 1 (LANDING PAGE) ROUTES
// ==========================================

// Update Video
router.patch("/page1/video", async (req, res) => {
    try {
        const { video } = req.body;
        if (!video) return res.status(400).json({ error: "Video URL is required" });

        const doc = await Jewellery.findOneAndUpdate(
            {},
            { $set: { "page1.video": video } },
            { new: true, upsert: true }
        );
        res.json({ video: doc.page1.video });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Update About Large Text
router.patch("/page1/about/largetext", async (req, res) => {
    try {
        const { about } = req.body;
        const result = await Jewellery.updateOne(
            {},
            { $set: { "page1.about.LargeText": about } },
            { upsert: true }
        );
        res.json({ success: true, result });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
});

// // Update About Numbers (Counters)
// router.patch("/page1/about/number/:id", async (req, res) => {
//     try {
//         const { id } = req.params;
//         const { name, num } = req.body;
//         const result = await Jewellery.updateOne(
//             { _id: id, "page1.about.numberData.name": name },
//             { $set: { "page1.about.numberData.$.num": num } },
//             { upsert: true }
//         );
//         res.json({ success: true, result });
//     } catch (err) {
//         res.status(500).json({ success: false, message: err.message });
//     }
// });


// Update specific counter by INDEX (Developer Friendly)
router.patch("/page1/about/number/:index", async (req, res) => {
    try {
        const { index } = req.params; // 0 for Happy Customers, 1 for Branches
        const { name, num } = req.body;

        const updateData = {};
        if (name) updateData[`page1.about.numberData.${index}.name`] = name;
        if (num) updateData[`page1.about.numberData.${index}.num`] = num;

        const result = await Jewellery.findOneAndUpdate(
            {},
            { $set: updateData },
            { new: true, upsert: true }
        );

        res.json({ success: true, data: result.page1.about.numberData });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
});

// Update Categories
router.patch("/page1/categories/name/:name", async (req, res) => {
    try {
        const { name } = req.params;
        const { img, newName } = req.body;
        
        // Fetch document to checck the doc exists or not 
        let doc = await Jewellery.findOne({});

        // If no document exist, then create it first to prevent error
        if (!doc) {
            doc = await Jewellery.create({
                page1 : {
                    categories : [{ name: newName || name, img: img }]
                }
            });
            return res.json(doc.page1.categories);
        }

        //check if name already exists or not 
        const categoryExists = doc.page1.categories.find((category) => category.name === name);

        if (categoryExists) {
            // 4. UPDATE: Use the positional operator ($) to update the existing entry
            // We filter by the specific name to tell $ where to point
            const updatedDoc = await Jewellery.findOneAndUpdate(
                {"page1.categories.name" : name},
                {
                    $set: {
                        "page1.categories.$.name" : newName || name,
                        "page1.categories.$.img" : img
                    }
                },
                { new : true }
            );
            return res.json(updatedDoc.page1.categories);
        }else {
            // 5. ADD NEW: Use $push to add a new category object to the array
            // We use an empty filter {} here to avoid the "Object vs Array" type error
            const updatedDoc = await Jewellery.findOneAndUpdate(
                {},
                {
                    $push: {
                        "page1.categories" : {name : newName || name, img : img}
                    }
                },
                { new : true, upsert : true }
            );
            return res.json(updatedDoc.page1.categories);
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Update Banner Images by Index (0-8)
router.patch("/page1/banner/:index", async (req, res) => {
    try {
        const { index } = req.params;
        const { newUrl } = req.body;
        const update = {};
        update[`page1.banner.${index}`] = newUrl;

        const doc = await Jewellery.findOneAndUpdate(
            {},
            { $set: update },
            { new: true, upsert: true, setDefaultsOnInsert: true }
        );
        res.json({ success: true, banner: doc.page1.banner });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Update Hero Quote
router.patch("/page1/quote", async (req, res) => {
    try {
        const { quote } = req.body;
        if (!quote) return res.status(400).json({ error: "Enter some quote" });

        const doc = await Jewellery.findOneAndUpdate(
            {},
            { $set: { "page1.quote": quote } },
            { new: true, upsert: true }
        );
        res.json({ quote: doc.page1.quote });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Update Testimonial by Index
router.patch("/page1/testimonial/:index", async (req, res) => {
    try {
        const { index } = req.params;
        const { img, name, text } = req.body;
        const idx = parseInt(index, 10);

        if(isNaN(idx)){
            return res.status(400).json({ error: "Invalid Index" });
        }
        const updateData = {};
        if (img) updateData[`page1.testimonial.${idx}.img`] = img;
        if (name) updateData[`page1.testimonial.${idx}.name`] = name;
        if (text) updateData[`page1.testimonial.${idx}.text`] = text;

        const doc = await Jewellery.findOneAndUpdate(
            {},
            { $set: updateData },
            { new: true, upsert: true }
        );
        res.json({ updatedTestimonial: doc.page1.testimonial[idx] });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// ==========================================
// 3. PAGE 2 (STORES) ROUTES
// ==========================================

router.post("/page2/store", async (req, res) => {
    try {
        const newStore = req.body;
        const doc = await Jewellery.findOneAndUpdate(
            {},
            { $push: { "page2.store": newStore } },
            { new: true, upsert: true }
        );
        res.json({ message: "Store added", stores: doc.page2.store });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.patch("/page2/store/:index", async (req, res) => {
    try {
        const { index } = req.params;
        const updateData = {};
        for (let key in req.body) { updateData[`page2.store.${index}.${key}`] = req.body[key]; }
        const doc = await Jewellery.findOneAndUpdate({}, { $set: updateData }, { new: true });
        res.json({ message: "Store updated", updatedStore: doc.page2.store[index] });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.delete("/page2/store/:index", async (req, res) => {
    try {
        const { index } = req.params;
        await Jewellery.updateOne({}, { $unset: { [`page2.store.${index}`]: 1 } });
        const doc = await Jewellery.findOneAndUpdate({}, { $pull: { "page2.store": null } }, { new: true });
        res.json({ message: "Store deleted", stores: doc.page2.store });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// ==========================================
// 4. PAGE 3 (GALLERY) ROUTES
// ==========================================

router.put("/page3/gallery/:section/:index", async (req, res) => {
    try {
        const { section, index } = req.params;
        const { newImage } = req.body;
        const update = {};
        update[`page3.gallery.${section}.${index}`] = newImage;

        const doc = await Jewellery.findOneAndUpdate({}, { $set: update }, { new: true });
        res.json({ success: true, data: doc.page3.gallery[section] });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// ==========================================
// 5. PAGE 4 (FRANCHISE) ROUTES
// ==========================================

router.post("/page4/franchise", async (req, res) => {
    try {
        const doc = await Jewellery.findOneAndUpdate(
            {},
            { $push: { "page4.user": req.body } },
            { new: true, upsert: true }
        );
        res.json({ message: "Franchise added", franchises: doc.page4.user });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.delete("/page4/franchise/:index", async (req, res) => {
    try {
        const { index } = req.params;
        await Jewellery.updateOne({}, { $unset: { [`page4.user.${index}`]: 1 } });
        const doc = await Jewellery.findOneAndUpdate({}, { $pull: { "page4.user": null } }, { new: true });
        res.json({ message: "Franchise deleted", franchises: doc.page4.user });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// ==========================================
// 6. DYNAMIC DATA FETCHING (GET) - MUST BE LAST
// ==========================================
router.get("/:page", async (req, res) => {
    try {
        const pageName = req.params.page;
        const doc = await Jewellery.findOne({}, { [pageName]: 1 });
        if (!doc || !doc[pageName]) return res.status(404).json({ error: "Page not found" });
        res.json(doc[pageName]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;