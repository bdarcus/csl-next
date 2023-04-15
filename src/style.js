"use strict";
// Experimental CSL NEXT typescript model
Object.defineProperty(exports, "__esModule", { value: true });
function formatContributor(contributor, role) {
    return "".concat(contributor.familyName, " ").concat(contributor.givenName);
}
function formatContributorWithRole(contributor, role) {
    return "".concat(contributor.name, " ").concat(contributor.role);
}
