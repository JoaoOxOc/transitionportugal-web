import * as deepFreeze from 'deep-freeze';

export const USERSLIST_TRANSLATIONS = deepFreeze({
    LABELS: {
        createUser: "Register New User",
        actions: "Actions",
        view: "View",
        actualValue: "Actual Value",
        UsersManagement: "Users Management",
        noUsersFound: "We couldn't find any users matching your search criterias",
        chooseGrid: "Choose between table or grid views for displaying the users list.",
        ofSmall: "of",
        paginationRowsPerPage: "Rows per page:",
        showing: "Showing",
        selectAll: "Select all Associations"
    },
    LIST: {
        usersTitle: "Users"
    },
    TABS: {
        system: "System Users",
        association: "Associations Users",
        all: "All Users"
    },
    USEROBJECT: {
        name: "Name",
        userName: "Username",
        email: "User Email",
        association: "User Association/Entity",
        active: "User Activated",
        verified: "User Verified",
        createdAt: "Registered At",
        updatedAt: "Updated at"
    },
    MESSAGES: {
        usersManagementDescription: "All aspects related to the app users can be managed from this page",
        usersNotFound: "The selected user(s) weren't found",
        resentErrors: "Some emails were not sent for the selected user(s). Please try again",
        resentEmails: "Verification Email resent to the selected user(s)",
        usersApproved: "The selected user(s) are now approved/activated",
        usersRemoved: "The selected user(s) are now removed",
        approvingErrors: "Some selected user(s) weren't approved. Please try again",
        deleted: "The selected user(s) were deleted",
        deletingErrors: "Some selected user(s) weren't deleted. Please try again"
    },
    SEARCH: {
        filters: "Filters",
        searchByNameOrEmailPlaceholder: "Search by Username or Email...",
        searchActive: "Activated Users",
        searchVerified: "Users verified by Email",
        searchByAssociationName: "Search by association name or email...",
        associationNotFound: "Association/entity not found",
        searchByRole: ""
    },
    ACTIONS: {
        resendVerifyEmail: "Resend Verification Email",
        approveUser: "Approve User",
        delete: "Delete selected user(s)",
        resendVerifyEmailSingle: "Resend Verification Email",
        approveUserSingle: "Approve this User",
        deleteSingle: "Delete this user"
    }
} as const);