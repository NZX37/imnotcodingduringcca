  const form = document.getElementById("linkForm");
    const urlInput = document.getElementById("urlInput");
    const categoryInput = document.getElementById("categoryInput");
    const categoriesEl = document.getElementById("categories");

    let data = JSON.parse(localStorage.getItem("links")) || {};

    function save() {
      localStorage.setItem("links", JSON.stringify(data));
    }

    function render() {
      categoriesEl.innerHTML = "";

      for (const category in data) {
        const section = document.createElement("div");
        section.className = "category";

        const title = document.createElement("h2");
        title.textContent = category;

        const ul = document.createElement("ul");

        data[category].forEach((link, index) => {
          const li = document.createElement("li");

          const a = document.createElement("a");
          a.href = link;
          a.textContent = link;
          a.target = "_blank";

          const actions = document.createElement("div");
          actions.className = "actions";

          const editBtn = document.createElement("button");
          editBtn.textContent = "Edit";
          editBtn.onclick = () => {
            const newUrl = prompt("Edit link:", link);
            if (newUrl) {
              data[category][index] = newUrl;
              save();
              render();
            }
          };

          const delBtn = document.createElement("button");
          delBtn.textContent = "Delete";
          delBtn.onclick = () => {
            data[category].splice(index, 1);
            if (data[category].length === 0) delete data[category];
            save();
            render();
          };

          actions.append(editBtn, delBtn);
          li.append(a, actions);
          ul.appendChild(li);
        });

        section.append(title, ul);
        categoriesEl.appendChild(section);
      }
    }

    form.addEventListener("submit", (e) => {
      e.preventDefault();

      const url = urlInput.value.trim();
      const category = categoryInput.value.trim();

      if (!data[category]) data[category] = [];
      data[category].push(url);

      save();
      render();

      urlInput.value = "";
      categoryInput.value = "";
    });

    render();
