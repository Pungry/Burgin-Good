var express = require("express");
const burger = require("../models/burger");
const orm = require("../config/orm");
var router = express.Router();

router.get("/", function(req, res) {
    burger.all(function(data) {
      var hbsObject = {
        burgers: data
      };
      console.log(hbsObject);
      res.render("index", hbsObject);
    });
  });
  
  router.post("/api/burgers", function(req, res) {
    burger.create([
      "burger_name"
    ], [
      req.body.name
    ], function(result) {
      
      res.json({ id: result.insertId });
    });
  });
  
  router.put("/api/burgers/:id", function(req, res) {
    var condition = "id = " + req.params.id;
  
    console.log("condition", condition);
  
    burger.update({
      devoured: true
    }, condition, function(result) {
      if (result.changedRows == 0) {
        return res.status(404).end();
      } else {
        res.status(200).end();
      }
    });
  });
  
  router.delete("/api/burgers/:id", function(req, res){
    burger.delete(req.params.id, function(result){
      if (result.affectedRows == 0){
        return res.status(404).end();
      }
      else {
        res.status(200).end();
      }
    });
  });

module.exports = router;