// Books page: grouping by category, search, and the detail modal.
const state = { category: "All", query: "" };
const grid = document.getElementById("bookGrid");
const chips = document.getElementById("chips");
const search = document.getElementById("search");
const modal = document.getElementById("modal");

const categories = ["All", ...new Set(BOOKS.map((b) => b.category))];

function renderChips() {
  chips.innerHTML = categories
    .map(
      (c) =>
        `<button class="chip ${c === state.category ? "active" : ""}" data-cat="${c}">${c}</button>`,
    )
    .join("");
}

function renderBooks() {
  const q = state.query.trim().toLowerCase();
  const list = BOOKS.filter(
    (b) =>
      (state.category === "All" || b.category === state.category) &&
      (!q ||
        [b.title, b.author, b.category].some((f) =>
          f.toLowerCase().includes(q),
        )),
  );
  if (!list.length) {
    grid.innerHTML = `<p class="empty">No books match "${state.query}". Try a different title, author or category.</p>`;
    return;
  }
  // Group the results by category.
  const groups = {};
  list.forEach((b) => (groups[b.category] = groups[b.category] || []).push(b));
  grid.innerHTML = Object.entries(groups)
    .map(
      ([cat, books]) => `
    <section class="group"><h2>${cat} <small>${books.length} ${books.length === 1 ? "book" : "books"}</small></h2>
    <div class="cards">${books
      .map(
        (b) => `
      <article class="card" tabindex="0" data-id="${b.id}">
        <img src="${coverFor(b)}" alt="Cover of ${b.title}">
        <h3>${b.title}</h3><p>${b.author}</p>
      </article>`,
      )
      .join("")}</div></section>`,
    )
    .join("");
}

function openModal(id) {
  const b = BOOKS.find((x) => x.id === id);
  document.getElementById("modalContent").innerHTML = `
    <img src="${coverFor(b)}" alt="Cover of ${b.title}">
    <div><span class="tag">${b.category}</span><h2>${b.title}</h2>
      <p class="by">by ${b.author}</p>
      <p>${b.summary}</p>
      <p class="meta">Published ${b.year} &middot; ${b.pages} pages</p>
      <button class="btn" id="addBtn">Add to cart</button></div>`;
  document.getElementById("addBtn").onclick = () => Cart.add(b.id);
  modal.classList.add("show");
}
const closeModal = () => modal.classList.remove("show");

chips.addEventListener("click", (e) => {
  const c = e.target.closest(".chip");
  if (!c) return;
  state.category = c.dataset.cat;
  renderChips();
  renderBooks();
});
search.addEventListener("input", () => {
  state.query = search.value;
  renderBooks();
});
grid.addEventListener("click", (e) => {
  const c = e.target.closest(".card");
  if (c) openModal(Number(c.dataset.id));
});
grid.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    const c = e.target.closest(".card");
    if (c) openModal(Number(c.dataset.id));
  }
});
document.getElementById("modalClose").onclick = closeModal;
modal.addEventListener("click", (e) => {
  if (e.target === modal) closeModal();
});
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeModal();
});

renderChips();
renderBooks();
