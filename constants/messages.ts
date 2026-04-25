
export const MESSAGES = {

    // Sign out.
    CONFIRM_SIGN_OUT_TITLE: "Sign out",
    CONFIRM_SIGN_OUT_MSG: "Are you sure you want to sign out?",
    CONFIRM_SIGN_OUT_ERROR: "An error occurred while attepting to sign out",
    
    // Customers.
    CONFIRM_CREATE_CUSTOMER_TITLE: "Add customer",
    CONFIRM_CREATE_CUSTOMER_MSG: "Add customer to the database?",
    CONFIRM_CREATE_CUSTOMER_ERROR: "An error occurred while attempting to create the customer",

    CONFIRM_DELETE_CUSTOMER_TITLE: "Delete customer",
    CONFIRM_DELETE_CUSTOMER_MSG: "Are you sure you want to delete this customer?\n\nThis action is irreversible and will result in the deletion of all data associated with the customer.\n\nContinue?",
    CONFIRM_DELETE_CUSTOMER_ERROR: "An error occurred while attempting to delete the customer",

    CONFIRM_EDIT_CUSTOMER_TITLE: "Edit customer",
    CONFIRM_EDIT_CUSTOMER_MSG: "Submit changes?",
    CONFIRM_EDIT_CUSTOMER_ERROR: "An error occurred while attempting to submit changes",

    CANCEL_EDIT_CUSTOMER_TITLE: "Edit customer",
    CANCEL_EDIT_CUSTOMER_MSG: "Discard changes?",
    CANCEL_EDIT_CUSTOMER_ERROR: "",
    
    // Requests.
    REQUEST_CREATED_MSG: "Request saved",
    REQUEST_DELETED_MSG: "Request deleted",
    
    CONFIRM_DELETE_REQUEST_TITLE: "Delete request",
    CONFIRM_DELETE_REQUEST_MSG: "Are you sure you want to delete this request?\n\nThis action is irreversible.\n\nContinue?",
    CONFIRM_DELETE_REQUEST_ERROR: "An error occurred while attempting to delete the request",

    CONFIRM_EDIT_REQUEST_TITLE: "Edit request",
    CONFIRM_EDIT_REQUEST_MSG: "Submit changes?",
    CONFIRM_EDIT_REQUEST_ERROR: "An error occurred while attempting to edit the request",

    CANCEL_EDIT_REQUEST_TITLE: "Cancel edit request",
    CANCEL_EDIT_REQUEST_MSG: "Discard changes?",
    CANCEL_EDIT_REQUEST_ERROR: "",

    // Error messages.
    ERROR_GENERIC_TITLE: "Error",
    ERROR_GENERIC_MSG: "Something went wrong",

    ERROR_PRICE_VALIDATION_TITLE: "Price validation error",
    ERROR_PRICE_VALIDATION_MSG: "Minimum price cannot be greater than maximum price",

    ERROR_WIDTH_VALIDATION_TITLE: "Width validation error",
    ERROR_WIDTH_VALIDATION_MSG: "Minimum width cannot be greater than maximum width",

    ERROR_HEIGHT_VALIDATION_TITLE: "Height validation error",
    ERROR_HEIGHT_VALIDATION_MSG: "Minimum height cannot be greater than maximum height",

    ERROR_WIDTH_VALIDATION_TITLE: "Width validation error",
    ERROR_DEPTH_VALIDATION_MSG: "Minimum depth cannot be greater than maximum depth",

} as const;

export type MessageKey = keyof typeof MESSAGES;