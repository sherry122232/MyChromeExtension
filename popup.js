chrome.storage.sync.get("bookmarks", function(data) {
  const bookmarks = data.bookmarks || [];

  const bookmarksContainer = document.getElementById("bookmarks");
  bookmarksContainer.classList.add("bookmarks-container"); // add a class to the bookmarks container

  // Function to create link and delete button elements for a bookmark
  function createBookmarkElement(url) {
    // Create a container div for the link and delete button
    const linkContainer = document.createElement("div");
    linkContainer.classList.add("link-container");

    // Create an image element for the favicon

    const faviconImg = document.createElement("img");
    faviconImg.src = `https://www.google.com/s2/favicons?domain=${url}`;
    faviconImg.width = 16;
    faviconImg.height = 16;
    faviconImg.alt = ""; 




    // Create a link element for the URL
    const link = document.createElement("a");
    link.href = url;
    link.textContent = url.substring(0, 20) + (url.length > 20 ? "..." : "");
    link.target = "_blank"; // Set the target attribute to "_blank" to open the link in a new tab

    // Create a delete button element for the bookmark
    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.classList.add("delete");
    deleteButton.addEventListener("click", () => {
      // Remove the bookmark from the bookmarks array
      const index = bookmarks.indexOf(url);
      if (index !== -1) {
        bookmarks.splice(index, 1);

        // Store the updated bookmarks array in the storage
        chrome.storage.sync.set({ bookmarks });

        // Remove the link and button elements from the DOM
        linkContainer.remove();

        // Update the index of each bookmark after the deleted bookmark
        bookmarksContainer.querySelectorAll(".link-container").forEach((container, index) => {
          const deleteButton = container.querySelector(".delete");
          deleteButton.removeEventListener("click", deleteBookmark);
          deleteButton.addEventListener("click", () => {
            deleteBookmark(bookmarks[index], container);
          });
        });
      }
    });

    // Append the favicon, link, and delete button elements to the link container
    linkContainer.appendChild(faviconImg);
    linkContainer.appendChild(link);
    linkContainer.appendChild(deleteButton);

    return linkContainer;
  }

  // Loop through the bookmarks array and create link container elements for each bookmark
  bookmarks.forEach((bookmark, index) => {
    const linkContainer = createBookmarkElement(bookmark);
    bookmarksContainer.appendChild(linkContainer);
  });

  // Add a click event listener to the toggle button
  var toggleButton = document.getElementById('toggle');
  toggleButton.addEventListener('click', function() {
    // Get the URL of the active tab
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
      var url = tabs[0].url;
      console.log(url);

      // Check if the URL already exists in the bookmarks array
      if (bookmarks.includes(url)) {
        alert("This URL is already bookmarked."); // Display an alert message if the URL already exists
        return; // Exit the function if the URL already exists
      }

      // Add the URL to the bookmarks array
      bookmarks.push(url);

      // Store the updated bookmarks array in the storage
      chrome.storage.sync.set({ bookmarks });

      // Create a new link container element for the URL and add it to the bookmarks container
      const linkContainer = createBookmarkElement(url);
      bookmarksContainer.appendChild(linkContainer);
    });
  });
});