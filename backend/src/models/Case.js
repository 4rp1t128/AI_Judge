import mongoose from "mongoose";

const { Schema } = mongoose;

const CaseSchema = new Schema({
    createdAt: { type: Date, default: Date.now },
    sideAUploads: [{ filename: String, originalName: String, text: String }],
    sideBUploads: [{ filename: String, originalName: String, text: String }],
    argumentsA: [{ text: String, at: { type: Date, default: Date.now } }],
    argumentsB: [{ text: String, at: { type: Date, default: Date.now } }],
    verdicts: [{ text: String, at: { type: Date, default: Date.now } }],
    followUpCount: { type: Number, default: 0 }
});

export default mongoose.model("Case", CaseSchema);
