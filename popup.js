document.addEventListener("DOMContentLoaded", () => {
    const list = document.getElementById("sites-list");
    const clearButton = document.getElementById("clear-history");

    function loadSites() {
        list.innerHTML = ""; // Clear list before updating
        chrome.storage.local.get({ visitedSites: [] }, (data) => {
            data.visitedSites.forEach(url => {
                const li = document.createElement("li");
                const a = document.createElement("a");
                a.href = url;
                a.textContent = url;
                a.target = "_blank";
                li.appendChild(a);
                list.appendChild(li);
            });
        });
    }

    // Load sites on popup open
    loadSites();

    // Clear history button event
    clearButton.addEventListener("click", () => {
        chrome.storage.local.set({ visitedSites: [] }, () => {
            loadSites(); 
        });
    });
});
