import mongoose from "mongoose";

const taskSchema = new mongoose.Schema(
{
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },

    title: {
        type: String,
        required: true,
        trim: true
    },

    description: {
        type: String,
        trim: true,
        default: ""
    },

    status: {
        type: String,
        enum: ["pendiente", "En progreso", "completada"],
        default: "pendiente"
    },

    clienteId: {
        type: String
    },

    deleted: {
        type: Boolean,
        default: false
    }
},
{ timestamps: true }
);

const Task = mongoose.model("Task", taskSchema);

export default Task;