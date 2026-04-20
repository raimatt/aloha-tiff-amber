// Single source of truth for product categories.
// Used by Home (category grid) and Products (filter tabs) so they never drift.
export const CATEGORIES = [
    { name: "BRACELETS", path: "bracelets" },
    { name: "NECKLACES", path: "necklaces" },
    { name: "EARRINGS", path: "earrings" },
    { name: "RINGS", path: "rings" },
    { name: "ANKLETS", path: "anklets" },
    { name: "SETS", path: "sets" },
]

// Products page needs an extra "ALL" tab at the front; Home does not.
export const CATEGORIES_WITH_ALL = [{ name: "ALL", path: "all" }, ...CATEGORIES]
