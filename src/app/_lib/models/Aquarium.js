import mongoose from "mongoose"

const PositionSchema = new mongoose.Schema({
    x: { type: Number, required: true },
    y: { type: Number, required: true },
    z: { type: Number, required: true }
})

const RotationSchema = new mongoose.Schema({
    x: { type: Number, required: true },
    y: { type: Number, required: true },
    z: { type: Number, required: true }
})

const ScaleSchema = new mongoose.Schema({
    x: { type: Number, required: true },
    y: { type: Number, required: true },
    z: { type: Number, required: true }
})

const LightColorSchema = new mongoose.Schema({
    r: { type: Number, required: true },
    g: { type: Number, required: true },
    b: { type: Number, required: true }
})

const LightSchema = new mongoose.Schema({
    lightColor: LightColorSchema,
    lightIntensity: { type: Number, required: true },
})

const ComponentSchema = new mongoose.Schema({
    id: { type: String, required: true },
    assetType: { type: String, required: true },
    assetId: { type: String, required: true },
    displayName: { type: String, required: true },
    locked: { type: Boolean, default: false },
    position: PositionSchema,
    rotation: RotationSchema,
    scale: ScaleSchema,
    objectReference: { type: mongoose.Schema.Types.Mixed, required: true }
})

const AquariumScheme = new mongoose.Schema({
    owner: { type: mongoose.Schema.Types.ObjectId, ref: "users", required: true },
    name: { type: String, required: true },
    components: [ComponentSchema],
    light: LightSchema
}, { timestamps: true })

export const Aquarium = mongoose.models.Aquarium || mongoose.model("Aquarium", AquariumScheme, "aquariums")