import { Router } from "express";
import { getTeams, getTeamById,createTeams, updateTeam, deleteTeam } from "../controllers/teamsController";

const router = Router();

// Map URL endpoints to controller functions
router.get("/", getTeams);           // GET all teams
router.get("/:id", getTeamById);     // GET one team by ID
router.post("/", createTeams);       // POST create a new team
router.put("/:id", updateTeam);      // PUT update a team by ID
router.delete("/:id", deleteTeam);   // DELETE a team by ID

export default router;
