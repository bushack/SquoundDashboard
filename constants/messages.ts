
export const MESSAGES = {

    // Sign out.
    SIGN_OUT_TITLE: "Sign out",
    SIGN_OUT_MSG: "Are you sure you want to sign out?",
    SIGN_OUT_ERROR: "An error occurred while attempting to sign out",
    
    // Customers.
    CREATE_CUSTOMER_TITLE: "Create customer",
    CREATE_CUSTOMER_MSG: "Create a new customer?",
    CREATE_CUSTOMER_SUCCESS: "Customer created",
    CREATE_CUSTOMER_ERROR: "An error occurred while attempting to create the customer",

    DELETE_CUSTOMER_TITLE: "Delete customer",
    DELETE_CUSTOMER_MSG: "Are you sure you want to delete this customer?\n\nThis action is irreversible and will result in the deletion of all data associated with the customer.\n\nContinue?",
    DELETE_CUSTOMER_SUCCESS: "Customer deleted",
    DELETE_CUSTOMER_ERROR: "An error occurred while attempting to delete the customer",

    EDIT_CUSTOMER_TITLE: "Edit customer",
    EDIT_CUSTOMER_MSG: "Submit changes?",
    EDIT_CUSTOMER_SUCCESS: "Customer updated",
    EDIT_CUSTOMER_ERROR: "An error occurred while attempting to update the customer",

    CANCEL_EDIT_CUSTOMER_TITLE: "Edit customer",
    CANCEL_EDIT_CUSTOMER_MSG: "Discard changes?",
    CANCEL_EDIT_CUSTOMER_SUCCESS: "Customer update cancelled",
    CANCEL_EDIT_CUSTOMER_ERROR: "An error occurred while attempting to cancel the update",
    
    // Requests.
    CREATE_REQUEST_TITLE: "Create request",
    CREATE_REQUEST_MSG: "Create a new request?",
    CREATE_REQUEST_SUCCESS: "Request created",
    CREATE_REQUEST_ERROR: "An error occurred while attempting to create the request",
    
    DELETE_REQUEST_TITLE: "Delete request",
    DELETE_REQUEST_MSG: "Are you sure you want to delete this request?\n\nThis action is irreversible.\n\nContinue?",
    DELETE_REQUEST_SUCCESS: "Request deleted",
    DELETE_REQUEST_ERROR: "An error occurred while attempting to delete the request",

    EDIT_REQUEST_TITLE: "Edit request",
    EDIT_REQUEST_MSG: "Submit changes?",
    EDIT_REQUEST_SUCCESS: "Request updated",
    EDIT_REQUEST_ERROR: "An error occurred while attempting to update the request",

    CANCEL_EDIT_REQUEST_TITLE: "Edit request",
    CANCEL_EDIT_REQUEST_MSG: "Discard changes?",
    CANCEL_EDIT_REQUEST_SUCCESS: "Request update cancelled",
    CANCEL_EDIT_REQUEST_ERROR: "An error occurred while attempting to cancel the update",

    // Alerts.
    PRICE_VALIDATION_ALERT: "Minimum price cannot be greater than maximum price",
    WIDTH_VALIDATION_ALERT: "Minimum width cannot be greater than maximum width",
    HEIGHT_VALIDATION_ALERT: "Minimum height cannot be greater than maximum height",
    DEPTH_VALIDATION_ALERT: "Minimum depth cannot be greater than maximum depth",

    // Generic.
    ERROR_GENERIC_TITLE: "Error",
    ERROR_GENERIC_MSG: "Something went wrong",

} as const;

export type MessageKey = keyof typeof MESSAGES;