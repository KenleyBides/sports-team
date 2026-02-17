import express, { Request, Response } from "Express";
import Team from "../models/team";

/**
 * GET all teams
 */
export const getTeams = async (req: Request, res: Response) => {
    const filter = req.query;
    const teams = await Team.find(filter);
    if (teams.length === 0) {
        return res.status(404).json({ error: "No Teams Found" });
    }

    return res.status(200).json(teams);
};

/**
 * POST create team
 */
export const createTeams = async (req: Request, res: Response) => {
    if (!req.body) {
        return res.status(400).json({error: "Bad Request: Incomplete Data" });
    }

    try {
        await Team.create(req.body);
        return res.status(201).json();
    }
    catch (error) {
        return res.status(400).json({ error });
    }
};

/**
 * PUT update team
 */
export const updateTeam = async (req: Request, res: Response) => {
    const team = await Team.findById(req.params.id);
    if (!team) {
        return res.status(404).json({ error: "Team Not Found" });
    }

    try {
        team.set(req.body);
        await team.validate();
        await team.save();

        return res.status(204).json();
    }
    catch (error) {
        return res.status(400).json({ error });
    }
};

/**
 * DELETE team
 */
export const deleteTeam = async (req: Request, res: Response) => {
    try {
        const deleted = await Team.findByIdAndDelete(req.params.id);

        if (!deleted) {
            return res.status(404).json({ message: 'Team not Found' });
        }
        return res.status(204).send();
    } catch (err) {
        return res.status(400).json({ message: 'Delete Failed', err });
    }
};