document.addEventListener("DOMContentLoaded", async () => {
  try {
    const response = await fetch("./travel_recommendation_api.json");
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    console.log("Fetched data:", data); // Log to verify access

    const container = document.getElementById("recommendations");
    if (!container) {
      console.error(
        'Container with id "recommendations" not found. Please add <div id="recommendations"></div> to your HTML.',
      );
      return;
    }

    // Render countries section
    if (data.countries && Array.isArray(data.countries)) {
      const countriesSection = document.createElement("section");
      countriesSection.className = "category-section";
      countriesSection.innerHTML =
        '<h2>Countries</h2><div class="recommendation-grid"></div>';
      const countriesGrid = countriesSection.querySelector(
        ".recommendation-grid",
      );

      data.countries.forEach((country) => {
        const countryDiv = document.createElement("div");
        countryDiv.className = "recommendation-item";

        let citiesHtml = "";
        if (country.cities && Array.isArray(country.cities)) {
          citiesHtml = country.cities
            .map(
              (city) => `
                <div>
                  <h4>${city.name}</h4>
                  <img src="${city.imageUrl}" alt="${city.name}" style="max-width: 100%; height: auto;">
                  <p>${city.description}</p>
                </div>
              `,
            )
            .join("");
        }

        countryDiv.innerHTML = `
          <img src="${country.cities?.[0]?.imageUrl || ""}" alt="${country.name}" style="width: 100%; height: 200px; object-fit: cover;">
          <h3>${country.name}</h3>
          <p>${country.cities?.[0]?.description || ""}</p>
          ${citiesHtml ? `<div class="country-cities">${citiesHtml}</div>` : ""}
        `;

        countriesGrid.appendChild(countryDiv);
      });

      container.appendChild(countriesSection);
    }

    // Render temples section
    if (data.temples && Array.isArray(data.temples)) {
      const templesSection = document.createElement("section");
      templesSection.className = "category-section";
      templesSection.innerHTML =
        '<h2>Temples</h2><div class="recommendation-grid"></div>';
      const templesGrid = templesSection.querySelector(".recommendation-grid");

      data.temples.forEach((temple) => {
        const templeDiv = document.createElement("div");
        templeDiv.className = "recommendation-item";
        templeDiv.innerHTML = `
          <img src="${temple.imageUrl}" alt="${temple.name}" style="width: 100%; height: 200px; object-fit: cover;">
          <h3>${temple.name}</h3>
          <p>${temple.description}</p>
        `;
        templesGrid.appendChild(templeDiv);
      });

      container.appendChild(templesSection);
    }

    // Render beaches section
    if (data.beaches && Array.isArray(data.beaches)) {
      const beachesSection = document.createElement("section");
      beachesSection.className = "category-section";
      beachesSection.innerHTML =
        '<h2>Beaches</h2><div class="recommendation-grid"></div>';
      const beachesGrid = beachesSection.querySelector(".recommendation-grid");

      data.beaches.forEach((beach) => {
        const beachDiv = document.createElement("div");
        beachDiv.className = "recommendation-item";
        beachDiv.innerHTML = `
          <img src="${beach.imageUrl}" alt="${beach.name}" style="width: 100%; height: 200px; object-fit: cover;">
          <h3>${beach.name}</h3>
          <p>${beach.description}</p>
        `;
        beachesGrid.appendChild(beachDiv);
      });

      container.appendChild(beachesSection);
    }

    if (!data.countries && !data.temples && !data.beaches) {
      console.error("No valid data sections found:", data);
    }

    // Search functionality setup
    const searchInput = document.getElementById("searchInput");
    const searchBtn = document.getElementById("searchBtn");
    const resetBtn = document.getElementById("resetBtn");
    const recommendations = document.getElementById("recommendations");

    if (!searchInput || !searchBtn || !resetBtn || !recommendations) {
      console.error("Search elements not found.");
      return;
    }

    // Search button click handler
    searchBtn.addEventListener("click", () => {
      const searchTerm = searchInput.value.trim().toLowerCase();
      if (!searchTerm) {
        console.warn("Empty search term.");
        return;
      }

      // Remove existing no-results message if any
      const existingMessage = recommendations.querySelector(".no-results");
      if (existingMessage) {
        existingMessage.remove();
      }

      const sections = recommendations.querySelectorAll(".category-section");
      let hasMatches = false;

      sections.forEach((section) => {
        const h2Text = section.querySelector("h2").textContent.toLowerCase();
        section.style.display = "none"; // Hide all initially

        if (searchTerm.includes("beach") && h2Text === "beaches") {
          section.style.display = "block";
          hasMatches = true;
        } else if (searchTerm.includes("temple") && h2Text === "temples") {
          section.style.display = "block";
          hasMatches = true;
        } else if (searchTerm.includes("country") && h2Text === "countries") {
          section.style.display = "block";
          hasMatches = true;
        }
      });

      if (!hasMatches) {
        const message = document.createElement("p");
        message.className = "no-results";
        message.style.cssText =
          "text-align: center; font-size: 1.2rem; color: #666; padding: 40px 20px; margin: 0;";
        message.textContent = `No results found for "${searchInput.value}".`;
        recommendations.appendChild(message);
      }
    });

    // Reset button click handler
    resetBtn.addEventListener("click", () => {
      searchInput.value = "";
      const sections = recommendations.querySelectorAll(".category-section");
      sections.forEach((section) => {
        section.style.display = "block";
      });
      // Remove no-results message if present
      const existingMessage = recommendations.querySelector(".no-results");
      if (existingMessage) {
        existingMessage.remove();
      }
    });
  } catch (error) {
    console.error("Error fetching data:", error);
  }
});
