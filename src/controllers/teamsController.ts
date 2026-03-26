import express, { Request, Response } from "express";
import Team from "../models/team";

/**
 * @swagger
 * tags:
 *   - name: Team
 *     description: Sports Teams API
 */

/**
 * @swagger
 * /api/v1/teams:
 *   get:
 *     summary: Retrieve a list of all teams
 *     tags: [Team]
 *     parameters:
 *       - name: name
 *         in: query
 *         description: Filter by team name
 *         required: false
 *         schema:
 *           type: string
 *       - name: city
 *         in: query
 *         description: Filter by city
 *         required: false
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: A list of teams
 *       404:
 *         description: No teams found
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
 * @swagger
 * /api/v1/teams/{id}:
 *   get:
 *     summary: Retrieve a single team by ID
 *     tags: [Team]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: Team ID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Team found
 *       404:
 *         description: Team not found
 */
export const getTeamById = async (req: Request, res: Response) => {
    try {
        const team = await Team.findById(req.params.id);
        if (!team) return res.status(404).json({ error: "Team Not Found" });
        return res.status(200).json(team);
    } catch (error) {
        return res.status(400).json({ error });
    }
};

/**
 * @swagger
 * /api/v1/teams:
 *   post:
 *     summary: Create a new team
 *     tags: [Team]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - city
 *               - foundedYear
 *               - coach
 *             properties:
 *               name:
 *                 type: string
 *                 example: Raptors
 *               city:
 *                 type: string
 *                 example: Toronto
 *               foundedYear:
 *                 type: number
 *                 example: 1995
 *               coach:
 *                 type: object
 *                 required:
 *                   - firstName
 *                   - lastName
 *                 properties:
 *                   firstName:
 *                     type: string
 *                     example: Darko
 *                   lastName:
 *                     type: string
 *                     example: Rajakovic
 *     responses:
 *       201:
 *         description: Team created successfully
 *       400:
 *         description: Invalid request / incomplete data
 */
export const createTeams = async (req: Request, res: Response) => {
    try {
        const createdTeam = await Team.create(req.body);
        return res.status(201).json(createdTeam);
    }
    catch (error) {
        return res.status(400).json({ error });
    }
};

/**
 * @swagger
 * /api/v1/teams/{id}:
 *   put:
 *     summary: Update an existing team
 *     tags: [Team]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: Team ID
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: Raptors
 *               city:
 *                 type: string
 *                 example: Toronto
 *               foundedYear:
 *                 type: number
 *                 example: 1995
 *               coach:
 *                 type: object
 *                 required:
 *                   - firstName
 *                   - lastName
 *                 properties:
 *                   firstName:
 *                     type: string
 *                     example: Darko
 *                   lastName:
 *                     type: string
 *                     example: Rajakovic
 *     responses:
 *       200:
 *         description: Team updated successfully
 *       400:
 *         description: Invalid request / validation error
 *       404:
 *         description: Team not found
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

        return res.status(200).json(team);
    }
    catch (error) {
        return res.status(400).json({ error });
    }
};

/**
 * @swagger
 * /api/v1/teams/{id}:
 *   delete:
 *     summary: Delete a team by ID
 *     tags: [Team]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: Team ID
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Team deleted successfully
 *       404:
 *         description: Team not found
 *       400:
 *         description: Delete failed
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