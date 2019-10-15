import { createSchema, Type, typedModel } from "ts-mongoose";

export const UserSchema = createSchema({
    name: Type.string(),
    email: Type.string(),
}, {
    timestamps: {
        createdAt: true,
    },
});

export const User = typedModel("User", UserSchema);
