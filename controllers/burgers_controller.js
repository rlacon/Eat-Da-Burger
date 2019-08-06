var express = require("express");
var router = express.Router();
var burger = require("../models/burger.js");


// Create all our routes and set up logic within those routes where required.
router.get("/", function (req, res) {
    burger.selectAll(function (data) {
        var hbsObject = {
            burgers: data
        };
        console.log(hbsObject);
        console.log("Got all burgers, now diplaying index");
        res.render("index", hbsObject);
    });
});

router.post("/api/burgers", function (req, res) {
    console.log("router post entered");
    burger.insertOne([
        "burger_name", "devoured"
    ], [
            req.body.name, req.body.devoured
        ], function (result) {
            // Send back the ID of the new quote
            console.log("Inserted burger in db.")
            res.json({ id: result.insertId });
        });
});


module.exports = router;