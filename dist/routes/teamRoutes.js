"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const teamsController_1 = require("../controllers/teamsController");
const router = (0, express_1.Router)();
// Map URL endpoints to controller functions
router.get("/", teamsController_1.getTeams); // GET all teams
router.get("/:id", teamsController_1.getTeamById); // GET one team by ID
router.post("/", teamsController_1.createTeams); // POST create a new team
router.put("/:id", teamsController_1.updateTeam); // PUT update a team by ID
router.delete("/:id", teamsController_1.deleteTeam); // DELETE a team by ID
exports.default = router;
