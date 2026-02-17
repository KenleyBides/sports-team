import mongoose, { Schema } from "mongoose";

interface Coach {
    firstName: string;
    lastName: string;
}

interface Team {
    name: string;
    city: string;
    foundedYear: number;
    coach: Coach;
}

const coachSchema = new Schema<Coach>({
    firstName: {
        type: String,
        required: [true, 'Coach First Name is Required'],
        trim: true,
        minLength: 1
    },
    lastName: {
        type: String,
        required: [true, 'Coach Last Name is Required'],
        trim: true,
        minLength: 1
    }
});

const teamSchema = new Schema<Team>({
    name: {
        type: String,
        required: [true, 'Team Name is Required'],
        trim: true,
        minLength: 3
    },
    city: {
        type: String,
        required: [true, 'Team City is required'],
        trim: true,
        minLength: 2
    },
    foundedYear: {
        type: Number,
        required: [true, 'Founded Year is Required'],
        min: 1800
    },
    coach: coachSchema
});

const Team = mongoose.model<Team>('Team', teamSchema);
export default Team;