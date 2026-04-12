
export const MESSAGES = {

    // Success messages.
    CUSTOMER_CREATED: "Customer saved",
    CUSTOMER_DELETED: "Customer deleted",
    REQUEST_CREATED: "Request saved",
    REQUEST_DELETED: "Request deleted",

    // Confirmtion messages.
    CONFIRM_DELETE_CUSTOMER: "Are you sure you want to delete this customer?\n\nThis action is permanent and not reversible.\n\nContinue?",
    CONFIRM_DELETE_REQUEST: "Are you sure you want to delete this request?\n\nThis action is permanent and not reversible.\n\nContinue?",
    
    // Error messages.
    ERROR_GENERIC: "Something went wrong",
    ERROR_WIDTH_VALIDATION: "Minimum width cannot be greater than maximum width",
    ERROR_HEIGHT_VALIDATION: "Minimum height cannot be greater than maximum height",
    ERROR_DEPTH_VALIDATION: "Minimum depth cannot be greater than maximum depth",
} as const;

export type MessageKey = keyof typeof MESSAGES;