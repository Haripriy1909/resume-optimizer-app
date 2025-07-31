  function showSection(sectionId) {
        const sections = document.querySelectorAll(".section-container");
        sections.forEach((sec) => sec.classList.add("hidden-section"));
        const loader = document.getElementById("loader");
        const target = document.getElementById(sectionId);
        if (target) target.classList.remove("hidden-section");
      }

      function Evaluateresume() {
        const resume = document
          .getElementById("input")
          .value.trim()
          .toLowerCase();
        const category = document.getElementById("category-select").value;
        const result = document.getElementById("result");

        if (!resume) {
          loader.style.display = "none";
          alert("Please insert your resume.");
        } else {
          loader.style.display = "block";
          document.getElementById("section-home").style.display = "none";
        }

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

        const selectedKeywords = Languages[category];
        const found = selectedKeywords.filter((word) => resume.includes(word));
        const score = Math.round(
          (found.length / selectedKeywords.length) * 100
        );
        let msg = "";
        if (score > 75) {
          msg = `<br/><br/><span style="color:green;">✅ Your resume is well-aligned with the selected tech role. Keep improving!</span>`;
        } else {
          msg = `<br/></br><span style="color:red";>⚠️ Your Resume is Not-aligned for Tech role.keep improve!</span>`;
        }

        setInterval(() => {
          loader.style.display = "none";
          result.innerHTML = `
          <div style="font-weight:bolder; font-size:2rem; text-shadow:
    0 1px 0 #fff,
    0 4px 18px rgba(255, 90, 90, 0.4);"><strong>----Your Result----</strong></div><br/>
           <span>${score}% match</span> with <strong>${category.replace(
            /^\w/,
            (c) => c.toUpperCase()
          )}</strong> role.<br/>
          Matched Languages: <span>${
            found.join(",  ").toUpperCase() || "None"
          }</span>
         ${msg}
        `;
          result.style.display = "block";
        }, 2000);
      }