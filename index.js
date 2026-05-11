function showSection(sectionId) {
  const sections = document.querySelectorAll(".section-container");

  sections.forEach((sec) => sec.classList.add("hidden-section"));

  const target = document.getElementById(sectionId);
  if (target) target.classList.remove("hidden-section");

  
  const result = document.getElementById("result");
  if (result) {
    result.style.display = "none";
    result.innerHTML = "";
  }
}

function Evaluateresume() {
  const loader = document.getElementById("loader");
  const resume = document.getElementById("input").value.trim().toLowerCase();
  const category = document.getElementById("category-select").value;
  const result = document.getElementById("result");

 
  result.style.display = "none";
  result.innerHTML = "";

  if (!resume) {
    alert("Please insert your resume.");
    return;
  }

  loader.style.display = "block";
  document.getElementById("section-home").style.display = "none";

  const Languages = {
    frontend: ["html", "css", "javascript", "react", "vue"],
    backend: ["node", "express", "api", "database", "sql", "mongodb"],
    fullstack: [
      "javascript",
      "react",
      "node.js",
      "api",
      "sql",
      "mongodb",
      "full stack",
    ],
    software: [
      "algorithms",
      "data structures",
      "oop",
      "testing",
      "design patterns",
      "debugging",
    ],
  };

  const selectedKeywords = Languages[category] || [];
  const found = selectedKeywords.filter((word) =>
    resume.includes(word)
  );

  const score = Math.round(
    (found.length / selectedKeywords.length) * 100
  );

  let msg =
    score > 75
      ? `<br/><span style="color:green;">✅ Well aligned with role</span>`
      : `<br/><span style="color:red;">⚠️ Needs improvement for this role</span>`;

  setTimeout(() => {
    loader.style.display = "none";

    result.innerHTML = `
      <div class="result-title">Your Result</div>
      <div class="result-score">${score}% match</div>
      <div><strong>${category.toUpperCase()}</strong> role</div>
      <div class="result-keywords">
        Matched: ${found.length ? found.join(", ").toUpperCase() : "None"
      }
      </div>
      ${msg}
    `;

    result.style.display = "block";
  }, 1500);
}
