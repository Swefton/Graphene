document.addEventListener("DOMContentLoaded", () => {
    const list = document.getElementById("sites-list");

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
});
