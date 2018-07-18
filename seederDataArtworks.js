var seeder = require("mongoose-seed");

// Connect to MongoDB via Mongoose (replace the localhost)
seeder.connect(
  process.env.MONGODB_URI || "mongodb://localhost:27017/artworks",
  function() {
    // Load Mongoose models (replace my models file.js)
    seeder.loadModels(["./models/artwork.js"]);

    // Clear specified collections (replace with the module.exports, just the "Artwork")
    seeder.clearModels(["Artwork"], function() {
      // Callback to populate DB once collections have been cleared
      seeder.populateModels(data, function() {
        seeder.disconnect();
      });
    });
  }
);
// Data array containing seed data - documents organized by Model
var data = [
  {
    model: "Artwork",
    documents: [
      {
        id: "1",
        artwork: "orange container of nagpur",
        artist: "bijay biswaal",
        type: "watercolor",
        subject: "cityscape",
        surface: "paper",
        size: "14x22 inch",
        description: "",
        price: 583.33,
        image_url:
          "https://www.artzolo.com/sites/default/files/uploads/multi/101/largest/orange_container_of_nagpur.jpg"
      },
      {
        id: "2",
        artwork: "veg restaurant at paharganj side",
        artist: "bijay biswaal",
        type: "watercolor",
        subject: "cityscape",
        surface: "paper",
        size: "20x14 inch",
        description: "",
        price: 416.67,
        image_url:
          "https://www.artzolo.com/sites/default/files/uploads/multi/101/largest/veg_restaurant_at_paharganj_side_0.jpg"
      },
      {
        id: "3",
        artwork: "the boy",
        artist: "dr.uday bhan",
        type: "watercolor",
        subject: "lifestyle",
        surface: "paper",
        size: "15x22 inch",
        description: "",
        price: 1116.67,
        image_url:
          "https://www.artzolo.com/sites/default/files/uploads/multi/917/largest/the_boy_56x38_cm.jpg"
      },
      {
        id: "4",
        artwork: "ud jayega hans akela",
        artist: "abhishek acharya",
        type: "oil",
        subject: "contemporary",
        surface: "canvas",
        size: "36x60 inch",
        description: "",
        price: 1333.33,
        image_url:
          "https://www.artzolo.com/sites/default/files/uploads/multi/7293/largest/ud_jayega_hans_akela.jpg"
      },
      {
        id: "5",
        artwork: "banaras ganga ghat 15",
        artist: "ganesh hire",
        type: "watercolor",
        subject: "nature",
        surface: "paper",
        size: "22x45 inch",
        description: "",
        price: 1166.67,
        image_url:
          "https://www.artzolo.com/sites/default/files/uploads/multi/4964/largest/22x45_d.jpg"
      }
    ]
  }
];
