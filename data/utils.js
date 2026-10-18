export const CATEGORIES = [
    {
        name: "Product",
        color: "bg-indigo-50 border-indigo-200",
        badgeBg: "bg-indigo-50 border-indigo-200",
        badgeText: "text-indigo-700",
        activeColor: "bg-indigo-600 border-indigo-600",
        activeText: "text-white",
    },
    {
        name: "Design",
        color: "bg-purple-50 border-purple-200",
        badgeBg: "bg-purple-50 border-purple-200",
        badgeText: "text-purple-700",
        activeColor: "bg-purple-600 border-purple-600",
        activeText: "text-white",
    },
    {
        name: "Meeting",
        color: "bg-emerald-50 border-emerald-200",
        badgeBg: "bg-emerald-50 border-emerald-200",
        badgeText: "text-emerald-700",
        activeColor: "bg-emerald-600 border-emerald-600",
        activeText: "text-white",
    },
    {
        name: "High Priority",
        color: "bg-amber-50 border-amber-300",
        badgeBg: "bg-amber-50 border-amber-300",
        badgeText: "text-amber-800",
        activeColor: "bg-amber-600 border-amber-600",
        activeText: "text-white",
    },
    {
        name: "Client",
        color: "bg-blue-50 border-blue-200",
        badgeBg: "bg-blue-50 border-blue-200",
        badgeText: "text-blue-700",
        activeColor: "bg-blue-600 border-blue-600",
        activeText: "text-white",
    },
    {
        name: "Other",
        color: "bg-slate-100 border-slate-200",
        badgeBg: "bg-slate-100 border-slate-200",
        badgeText: "text-slate-700",
        activeColor: "bg-slate-700 border-slate-700",
        activeText: "text-white",
    },
];

// Helper to look up styling for any task category safely
export function getCategoryStyle(categoryName) {
    const match = CATEGORIES.find(
        (c) => c.name.toLowerCase() === (categoryName || "").toLowerCase()
    );
    if (match) return match;
    return {
        badgeBg: "bg-slate-100 border-slate-200",
        badgeText: "text-slate-700",
        activeColor: "bg-slate-700 border-slate-700",
        activeText: "text-white",
    };
}


