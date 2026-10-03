// Cart: stored in localStorage. Read (list), Update (quantity), Delete (remove).
const Cart = {
  KEY: "tcet-lms-cart",
  get() {
    try {
      return JSON.parse(localStorage.getItem(this.KEY)) || [];
    } catch (e) {
      return [];
    }
  },
  save(items) {
    try {
      localStorage.setItem(this.KEY, JSON.stringify(items));
    } catch (e) {}
    this.render();
  },
  add(id) {
    const items = this.get();
    const found = items.find((i) => i.id === id);
    if (found) found.qty += 1;
    else items.push({ id, qty: 1 });
    this.save(items);
    this.toast("Added to cart");
  },
  setQty(id, qty) {
    let items = this.get();
    items =
      qty < 1
        ? items.filter((i) => i.id !== id)
        : items.map((i) => (i.id === id ? { ...i, qty } : i));
    this.save(items);
  },
  remove(id) {
    this.save(this.get().filter((i) => i.id !== id));
  },
  clear() {
    this.save([]);
  },

  init() {
    document.body.insertAdjacentHTML(
      "beforeend",
      `
      <button class="cart-fab" id="cartOpen" aria-label="Open cart">Cart <span id="cartCount">0</span></button>
      <div class="overlay" id="cartOverlay"></div>
      <aside class="cart-panel" id="cartPanel" aria-label="Your cart">
        <div class="cart-head"><h2>Your cart</h2><button id="cartClose" aria-label="Close cart">&times;</button></div>
        <div class="cart-body" id="cartBody"></div>
        <div class="cart-foot"><button class="btn ghost" id="cartClear">Clear cart</button><button class="btn" id="cartIssue">Request books</button></div>
      </aside>
      <div class="toast" id="toast"></div>`,
    );
    const open = (v) => {
      document.getElementById("cartPanel").classList.toggle("open", v);
      document.getElementById("cartOverlay").classList.toggle("show", v);
    };
    document.getElementById("cartOpen").onclick = () => open(true);
    document.getElementById("cartClose").onclick = () => open(false);
    document.getElementById("cartOverlay").onclick = () => open(false);
    document.getElementById("cartClear").onclick = () => this.clear();
    document.getElementById("cartIssue").onclick = () => {
      if (!this.get().length) return this.toast("Your cart is empty");
      this.clear();
      open(false);
      this.toast("Request sent to the librarian");
    };
    document.getElementById("cartBody").addEventListener("click", (e) => {
      const b = e.target.closest("button[data-act]");
      if (!b) return;
      const id = Number(b.dataset.id),
        item = this.get().find((i) => i.id === id);
      if (b.dataset.act === "inc") this.setQty(id, item.qty + 1);
      if (b.dataset.act === "dec") this.setQty(id, item.qty - 1);
      if (b.dataset.act === "del") this.remove(id);
    });
    this.render();
  },
  render() {
    const items = this.get();
    document.getElementById("cartCount").textContent = items.reduce(
      (n, i) => n + i.qty,
      0,
    );
    const body = document.getElementById("cartBody");
    if (!items.length) {
      body.innerHTML = `<p class="empty">Your cart is empty. Open Explore Books and add a title.</p>`;
      return;
    }
    body.innerHTML = items
      .map((i) => {
        const b = BOOKS.find((x) => x.id === i.id);
        if (!b) return "";
        return `<div class="cart-item"><img src="${coverFor(b)}" alt="">
        <div class="ci-info"><strong>${b.title}</strong><span>${b.author}</span>
          <div class="qty"><button data-act="dec" data-id="${b.id}" aria-label="Decrease">&minus;</button><b>${i.qty}</b><button data-act="inc" data-id="${b.id}" aria-label="Increase">+</button></div></div>
        <button class="del" data-act="del" data-id="${b.id}">Remove</button></div>`;
      })
      .join("");
  },
  toast(msg) {
    const t = document.getElementById("toast");
    t.textContent = msg;
    t.classList.add("show");
    clearTimeout(this._t);
    this._t = setTimeout(() => t.classList.remove("show"), 1800);
  },
};
document.addEventListener("DOMContentLoaded", () => Cart.init());
