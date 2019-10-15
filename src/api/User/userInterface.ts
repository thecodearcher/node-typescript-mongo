import { UserSchema } from "./userModel";
import { ExtractDoc, ExtractProps } from "ts-mongoose";

export type UserDoc = ExtractDoc<typeof UserSchema>;
export type UserProps = ExtractProps<typeof UserSchema>;
