

function showSection(sectionId) {
  const sections = document.querySelectorAll(".section-container");
  sections.forEach((sec) => {
    sec.classList.add("hidden-section");
    sec.style.display = "";
  });

  const target = document.getElementById(sectionId);
  if (target) {
    target.classList.remove("hidden-section");
  }

  const result = document.getElementById("result");
  if (result) {
    result.classList.add("hidden-section");
    result.innerHTML = "";
  }
}

function Evaluateresume() {
  const loader = document.getElementById("loader");
  const textResume = document.getElementById("input").value.trim();
  const fileInput = document.getElementById("pdf-upload");
  const category = document.getElementById("category-select").value;
  const result = document.getElementById("result");
  const homeSection = document.getElementById("section-home");

  if (result) {
    result.classList.add("hidden-section");
    result.innerHTML = "";
  }

  if (!category) {
    alert("Please select your Tech Role.");
    return;
  }

  if (fileInput.files.length > 0) {
    const file = fileInput.files[0];
    if (file.type !== "application/pdf") {
      alert("Please upload a valid PDF file.");
      return;
    }

    homeSection.classList.add("hidden-section");
    loader.classList.remove("hidden-section");

    const reader = new FileReader();
    reader.onload = function (e) {
      const typedarray = new Uint8Array(e.target.result);
      
      pdfjsLib.getDocument(typedarray).promise.then((pdf) => {
        let maxPages = pdf.numPages;
        let countPromises = [];
        
        for (let j = 1; j <= maxPages; j++) {
          let page = pdf.getPage(j);
          countPromises.push(
            page.then((pageObj) => {
              return pageObj.getTextContent().then((textContent) => {
                return textContent.items.map((item) => item.str).join(" ");
              });
            })
          );
        }
        
        Promise.all(countPromises).then((pageTexts) => {
          const fullText = pageTexts.join(" ").toLowerCase();
          processEvaluation(fullText, category);
        });
      }).catch((err) => {
        loader.classList.add("hidden-section");
        homeSection.classList.remove("hidden-section");
        alert("Failed to parse PDF file content.");
      });
    };
    reader.readAsArrayBuffer(file);

  } else if (textResume) {
    homeSection.classList.add("hidden-section");
    loader.classList.remove("hidden-section");
    processEvaluation(textResume.toLowerCase(), category);
  } else {
    alert("Please insert your resume by pasting text or uploading a PDF.");
  }
}

function processEvaluation(resumeText, category) {
  const loader = document.getElementById("loader");
  const result = document.getElementById("result");

  const Languages = {
    frontend: ["html", "css", "javascript", "react", "vue"],
    backend: ["node", "express", "api", "database", "sql", "mongodb"],
    fullstack: ["javascript", "react", "node.js", "api", "sql", "mongodb", "full stack"],
    software: ["algorithms", "data structures", "oop", "testing", "design patterns", "debugging"],
  };

  const selectedKeywords = Languages[category] || [];
  const found = selectedKeywords.filter((word) => resumeText.includes(word));

  const score = Math.round((found.length / selectedKeywords.length) * 100);

  let msg = score > 75
    ? `<br/><span style="color:green;">✅ Well aligned with role</span>`
    : `<br/><span style="color:red;">⚠️ Needs improvement for this role</span>`;

  setTimeout(() => {
    loader.classList.add("hidden-section");

    result.innerHTML = `
      <div class="result-title">Your Result</div>
      <div class="result-score">${score}% match</div>
      <div><strong>${category.toUpperCase()}</strong> role</div>
      <div class="result-keywords">
        Matched: ${found.length ? found.join(", ").toUpperCase() : "None"}
      </div>
      ${msg}
    `;

    result.classList.remove("hidden-section");
  }, 1500);
}
