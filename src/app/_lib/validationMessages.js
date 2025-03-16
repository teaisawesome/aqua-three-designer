export const validationMessages = {
    en: {
        required: "This field is required",
        invalid_email: "Invalid email format",
        email_exists: "Email is already in use",
        min_length: (length) => `Must be at least ${length} characters long`
    },
    hu: {
        required: "Ez a mező kötelező",
        invalid_email: "Érvénytelen email formátum",
        email_exists: "Email cím már használatban van",
        min_length: (length) => `Legalább ${length} karakter hosszúnak kell lennie`
    },
}