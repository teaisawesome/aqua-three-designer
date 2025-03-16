import { z } from "zod";
import { validationMessages } from "./validationMessages";

export function getSignupSchema(locale) {
    const messages = validationMessages[locale] || validationMessages.en;

    return z.object({
        name: z.string().min(1, { message: messages.required }),
        email: z.string().email({ message: messages.invalid_email }),
        password: z.string().min(6, { message: messages.min_length(6) }),
    });
}