const express = require("express");
// merge params allows us to get access to the id inside of this router
const router = express.Router({mergeParams: true});

const { createMessage, getMessage, deleteMessage } = require("../handlers/messages");

// prefix all routes with /api/users/:id/messages
router.route("/").post(createMessage)

// prefix - /api/users/:id/messages/:messages_id
router
.route("/:message_id")
.get(getMessage)
.delete(deleteMessage);

module.exports = router;