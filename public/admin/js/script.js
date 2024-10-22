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
      } else{
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
const prodStatus = document.querySelectorAll("[status-change]");
if (prodStatus.length > 0) {
  prodStatus.forEach((button) => {
    button.addEventListener("click", () => {
      const prodID = button.getAttribute("productId");
      const status = button.getAttribute("status-change");

      const path = button.getAttribute("data-path");
      const data = {
        id: prodID,
        status: status,
      };

      fetch(path, {
        headers: {
          "Content-Type": "application/json",
        },
        method: "PATCH",
        body: JSON.stringify(data),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.code == "success") location.reload();
        });
    });
  });
}

//end status changing button

//multi status change
const prodMStatus = document.querySelector("[mStatus-change]");
if (prodMStatus) {
  prodMStatus.addEventListener("submit", (event) => {
    event.preventDefault();

    const checked = document.querySelectorAll("[multiStatusChange]:checked");
    const status = prodMStatus.status.value;
    if (status == "delete") {
      const isConfirm = confirm("Delete selected products?");
      if (!isConfirm) return;
    }

    const path = prodMStatus.getAttribute("data-path");
    console.log(path);

    const ids = [];
    checked.forEach((input) => {
      const id = input.getAttribute("multiStatusChange");
      ids.push(id);
    });

    const data = {
      ids: ids,
      status: status,
    };

    fetch(path, {
      headers: {
        "Content-Type": "application/json",
      },
      method: "PATCH",
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.code == "success") {
          location.reload();
        }
      });
  });
}
//end multi status change

//delete product
const deleteButton = document.querySelectorAll("[delete-product]");
if (deleteButton.length > 0) {
  deleteButton.forEach((button) => {
    button.addEventListener("click", () => {
      const prodID = button.getAttribute("productID");
      const path = button.getAttribute("data-path");

      const data = {
        id: prodID,
        deleted: "true",
      };

      fetch(path, {
        headers: {
          "Content-Type": "application/json",
        },
        method: "PATCH",
        body: JSON.stringify(data),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.code == "success") {
            location.reload();
          }
        });
    });
  });
}
//end delete product

//update product position
const prodPosition = document.querySelectorAll("[position-update]");
if (prodPosition.length > 0) {
  prodPosition.forEach((input) => {
    input.addEventListener("change", () => {
      const value = parseInt(input.value);
      const id = input.getAttribute("productID");

      const data = {
        id: id,
        position: value,
      };

      fetch("/admin666/product/position-product", {
        headers: {
          "Content-Type": "application/json",
        },
        method: "PATCH",
        body: JSON.stringify(data),
      })
        .then(res => res.json())
        .then(data => {
          if (data.code == "success") {
            location.reload();
          }
        })
    });
  });
}
//end update product position

// alert timeout
const alertMessage = document.querySelector("[alert-message]");
if(alertMessage) {
  setTimeout(() => {
    alertMessage.style.display = "none";
  }, 3000);
}
//end alert timeout 

// Preview image
const uploadImage = document.querySelector("[upload-image]");
if(uploadImage) {
  const uploadImageInput = uploadImage.querySelector("[upload-image-input]");
  const uploadImagePreview = uploadImage.querySelector("[upload-image-preview]");
  uploadImageInput.addEventListener("change", () => {
    const file = uploadImageInput.files[0];
    if(file) {
      uploadImagePreview.src = URL.createObjectURL(file);
    }
  });
}
// End preview image