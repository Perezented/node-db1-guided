const express = require("express");

// database access using knex
const knex = require("../data/db-config.js");

const router = express.Router();

router.get("/", (req, res) => {
    // select @ from posts
    knex.select("*")
        .from("posts")
        .then((post) => {
            console.log(post);

            res.status(200).json({ data: post });
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json({ message: error.message });
        });
});

router.get("/:id", (req, res) => {
    knex.select("*")
        .from("posts")
        .where("id", req.params.id)
        .first()
        .then((post) => {
            console.log(post);
            res.status(200).json({ post });
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json({ error: "error", err });
        });
});

router.post("/", (req, res) => {
    knex.insert(req.body, ["*"])
        .into("posts")
        .then((newPost) => {
            res.status(201).json(newPost);
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
});

router.put("/:id", (req, res) => {
    const { id } = req.params;
    const changes = req.body;
    knex("posts")
        .where({ id })
        .update(changes)
        .then((count) => {
            console.log(count);
            if (count > 0) {
                res.status(203).json({
                    messgae: "record updated successfully",
                });
            } else {
                res.status(404).json({
                    error: "Id was not found in the data base",
                });
            }
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
});

router.delete("/:id", (req, res) => {
    const { id } = req.params;
    knex("posts")
        .where({ id })
        .then((count) => {
            console.log(count);
            if (count > 0) {
                res.status(203).json({
                    messgae: "record deleted successfully",
                });
            } else {
                res.status(404).json({
                    error: "Id was not found in the data base",
                });
            }
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
});

module.exports = router;
