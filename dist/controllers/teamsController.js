"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTeam = exports.updateTeam = exports.createTeams = exports.getTeamById = exports.getTeams = void 0;
const team_1 = __importDefault(require("../models/team"));
/**
 * GET all teams
 */
const getTeams = async (req, res) => {
    const filter = req.query;
    const teams = await team_1.default.find(filter);
    if (teams.length === 0) {
        return res.status(404).json({ error: "No Teams Found" });
    }
    return res.status(200).json(teams);
};
exports.getTeams = getTeams;
/**
 * GET by team ID
 */
const getTeamById = async (req, res) => {
    try {
        const team = await team_1.default.findById(req.params.id);
        if (!team)
            return res.status(404).json({ error: "Team Not Found" });
        return res.status(200).json(team);
    }
    catch (error) {
        return res.status(400).json({ error });
    }
};
exports.getTeamById = getTeamById;
/**
 * POST create team
 */
const createTeams = async (req, res) => {
    if (!req.body) {
        return res.status(400).json({ error: "Bad Request: Incomplete Data" });
    }
    try {
        const createdTeam = await team_1.default.create(req.body);
        return res.status(201).json(createdTeam);
    }
    catch (error) {
        return res.status(400).json({ error });
    }
};
exports.createTeams = createTeams;
/**
 * PUT update team
 */
const updateTeam = async (req, res) => {
    const team = await team_1.default.findById(req.params.id);
    if (!team) {
        return res.status(404).json({ error: "Team Not Found" });
    }
    try {
        team.set(req.body);
        await team.validate();
        await team.save();
        return res.status(200).json(team);
    }
    catch (error) {
        return res.status(400).json({ error });
    }
};
exports.updateTeam = updateTeam;
/**
 * DELETE team
 */
const deleteTeam = async (req, res) => {
    try {
        const deleted = await team_1.default.findByIdAndDelete(req.params.id);
        if (!deleted) {
            return res.status(404).json({ message: 'Team not Found' });
        }
        return res.status(204).send();
    }
    catch (err) {
        return res.status(400).json({ message: 'Delete Failed', err });
    }
};
exports.deleteTeam = deleteTeam;
