export function matchesSearch(task) {
    const searchInput = document.getElementById("search");
    const caseSensitive = document.getElementById("case-sensitive");
    const searchError = document.getElementById("search-error");

    const pattern = searchInput.value.trim();
    if (pattern !=="") {
        try {
            const flags = caseSensitive.checked ? "" : "i";
            const searchRegex = new RegExp(pattern, flags);
            const text = task.title + " " + task.date + " " + task.duration + " " + task.category;

            if (!searchRegex.test(text)) {
                return false;
            }

            searchError.textContent = "";

        } catch (error) {
            searchError.textContent = "Invalid regex pattern.";
            return null;
        }

    } else {
        searchError.textContent = "";
    }
    return true;
}