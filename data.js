// Book catalogue. Covers are generated as SVG so the app works fully offline.
const BOOKS = [
  {
    id: 1,
    title: "The Midnight Library",
    author: "Matt Haig",
    category: "Fiction",
    year: 2020,
    pages: 304,
    color: "#7a2e1d",
    summary:
      "Between life and death sits a library where every book is a different life Nora could have lived. She gets to try them all and decide what makes a life worth living.",
  },
  {
    id: 2,
    title: "To Kill a Mockingbird",
    author: "Harper Lee",
    category: "Fiction",
    year: 1960,
    pages: 336,
    color: "#b5651d",
    summary:
      "Scout Finch watches her father, a small-town lawyer, defend a Black man falsely accused in 1930s Alabama. A story of courage, prejudice and growing up.",
  },
  {
    id: 3,
    title: "The Alchemist",
    author: "Paulo Coelho",
    category: "Fiction",
    year: 1988,
    pages: 208,
    color: "#c77d1e",
    summary:
      "Santiago, a shepherd boy, travels from Spain to the Egyptian pyramids chasing a dream of treasure and learns to listen to his heart.",
  },
  {
    id: 4,
    title: "Sapiens",
    author: "Yuval Noah Harari",
    category: "Non Fiction",
    year: 2011,
    pages: 464,
    color: "#8c3b2a",
    summary:
      "A sweeping history of humankind, from the first Homo sapiens to the present, asking how stories, money and science shaped our world.",
  },
  {
    id: 5,
    title: "Atomic Habits",
    author: "James Clear",
    category: "Non Fiction",
    year: 2018,
    pages: 320,
    color: "#a8561a",
    summary:
      "A practical guide to building good habits and breaking bad ones through tiny changes that compound into remarkable results.",
  },
  {
    id: 6,
    title: "Wings of Fire",
    author: "A. P. J. Abdul Kalam",
    category: "Non Fiction",
    year: 1999,
    pages: 180,
    color: "#9b2d1f",
    summary:
      "The autobiography of India's Missile Man, tracing his journey from Rameswaram to the heights of Indian space and defence research.",
  },
  {
    id: 7,
    title: "Higher Engineering Mathematics",
    author: "B. S. Grewal",
    category: "Mathematics",
    year: 2017,
    pages: 1300,
    color: "#6b3a14",
    summary:
      "A standard reference for engineering students covering calculus, linear algebra, differential equations, complex analysis and numerical methods.",
  },
  {
    id: 8,
    title: "How to Solve It",
    author: "George Polya",
    category: "Mathematics",
    year: 1945,
    pages: 288,
    color: "#b8860b",
    summary:
      "A classic on problem solving. Polya's four-step method teaches you to understand, plan, carry out and look back on any problem.",
  },
  {
    id: 9,
    title: "Discrete Mathematics",
    author: "Kenneth H. Rosen",
    category: "Mathematics",
    year: 2018,
    pages: 1072,
    color: "#8a4b0f",
    summary:
      "Logic, sets, graphs, combinatorics and proofs, explained with the computer science applications engineers need most.",
  },
  {
    id: 10,
    title: "A Brief History of Time",
    author: "Stephen Hawking",
    category: "Science",
    year: 1988,
    pages: 256,
    color: "#7c2d12",
    summary:
      "Hawking explains black holes, the Big Bang and the nature of time for readers with no background in physics.",
  },
  {
    id: 11,
    title: "The Selfish Gene",
    author: "Richard Dawkins",
    category: "Science",
    year: 1976,
    pages: 360,
    color: "#a3441b",
    summary:
      "A gene-centred view of evolution that explains altruism, conflict and cooperation across the living world.",
  },
  {
    id: 12,
    title: "Clean Code",
    author: "Robert C. Martin",
    category: "Technology",
    year: 2008,
    pages: 464,
    color: "#b3541e",
    summary:
      "Practical rules for writing readable, maintainable code, with case studies that turn messy programs into clean ones.",
  },
  {
    id: 13,
    title: "Introduction to Algorithms",
    author: "Thomas H. Cormen",
    category: "Technology",
    year: 2009,
    pages: 1312,
    color: "#8f3a12",
    summary:
      "The comprehensive textbook on algorithms: sorting, graphs, dynamic programming and complexity, with rigorous analysis.",
  },
];

// Builds an SVG data-URI book cover for a book.
function coverFor(book) {
  const words = book.title.split(" ");
  const lines = [];
  let line = "";
  words.forEach((w) => {
    if ((line + " " + w).trim().length > 13) {
      lines.push(line.trim());
      line = w;
    } else line += " " + w;
  });
  lines.push(line.trim());
  const text = lines
    .slice(0, 5)
    .map(
      (l, i) =>
        `<text x="100" y="${95 + i * 26}" text-anchor="middle" font-family="Georgia,serif" font-size="21" fill="#fff4e0">${l}</text>`,
    )
    .join("");
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 280">
    <rect width="200" height="280" fill="${book.color}"/>
    <rect x="0" y="0" width="14" height="280" fill="rgba(0,0,0,.25)"/>
    <rect x="26" y="22" width="160" height="2" fill="#f2a33a"/>${text}
    <rect x="60" y="236" width="80" height="2" fill="#f2a33a"/>
    <text x="100" y="260" text-anchor="middle" font-family="Georgia,serif" font-size="12" fill="#f2c885">${book.author}</text></svg>`;
  return "data:image/svg+xml;charset=utf-8," + encodeURIComponent(svg);
}
