import express from "express";
import {
    createCase,
    getCase,
    postArgument,
    generateVerdict,
    postFollowup
} from "../controllers/caseController.js";

const router = express.Router();

router.post("/create", createCase);
router.get("/:id", getCase);
router.post("/argument", postArgument);
router.post("/verdict", generateVerdict);
router.post("/followup", postFollowup);

export default router;
