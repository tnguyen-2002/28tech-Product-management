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
  if(currentStatus){
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
  if(currentSearch) {
    prodSearch.keyword.value = currentSearch;
  }
}

//end search feature
