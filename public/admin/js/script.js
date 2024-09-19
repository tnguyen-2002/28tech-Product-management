//Prodict Filter
const prodFilter = document.querySelector("[box-filter]");
if (prodFilter) {
  let url = new URL(location.href);

  prodFilter.addEventListener("change", () => {
    const value = prodFilter.value;

    if (value) {
      url.searchParams.set("status", value);
    } else {
      url.searchParams.delete("status");
    }

    location.href = url.href;
  });
  const currentStatus = url.searchParams.get("status");
  if (currentStatus) {
    prodFilter.value = currentStatus;
  }
}

//End product filter

//search feature
const prodSearch = document.querySelector("[form-search]");
if (prodSearch) {
  let url = new URL(location.href);
  prodSearch.addEventListener("submit", (event) => {
    event.preventDefault();
    const value = prodSearch.keyword.value;

    if (value) {
      url.searchParams.set("keyword", value);
    } else {
      url.searchParams.delete("keyword");
    }

    location.href = url.href;
  });
  const currentSearch = url.searchParams.get("keyword");
  if (currentSearch) {
    prodSearch.keyword.value = currentSearch;
  }
}

//end search feature

//pagination
const listPagePagination = document.querySelectorAll("[a-pagination]");
if (listPagePagination.length > 0) {
  let url = new URL(location.href);

  listPagePagination.forEach((a) => {
    a.addEventListener("click", () => {
      const pages = a.getAttribute("a-pagination");

      if (pages) {
        url.searchParams.set("pages", pages);
      } else {
        url.searchParams.delete("pages");
      }

      location.href = url.href;
    });
  });

  // display current page
  const currentPage = url.searchParams.get("pages");
  const buttonCurrent = document.querySelector(
    `[a-pagination="${currentPage}"]`
  );
  if (currentPage) {
    buttonCurrent.parentNode.classList.add("active");
  }
  // end display current page
}
//end pagination

//Status changing button
const statusButtonArray = document.querySelectorAll("[status-change]");
if(statusButtonArray.length > 0) {
  statusButtonArray.forEach(button => {
    button.addEventListener("click", () => {
      const prodID = button.getAttribute("productId");
      const statusChange = button.getAttribute("status-change");
      const path = button.getAttribute("data-path");
      const data = {
        id: prodID,
        status: statusChange
      };

      fetch(path, {
        headers: {
          "Content-Type": "application/json",
        },
        method: "PATCH",
        body: JSON.stringify(data)
      })
        .then(res => res.json())
        .then(data => {
          if(data.code == "success")
            location.reload();
        })
    })
  })
}


//end status changing button