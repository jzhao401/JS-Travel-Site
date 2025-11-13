document.addEventListener("DOMContentLoaded", async () => {
  let fullData;
  try {
    const response = await fetch("./travel_recommendation_api.json");
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    fullData = data;
    console.log("Fetched data:", data); // Log to verify access

    const renderAllRecommendations = (data) => {
      const recommendations = document.getElementById("recommendations");
      if (!recommendations) return;
      recommendations.innerHTML = '';

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

        recommendations.appendChild(countriesSection);
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

        recommendations.appendChild(templesSection);
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

        recommendations.appendChild(beachesSection);
      }

      if (!data.countries && !data.temples && !data.beaches) {
        console.error("No valid data sections found:", data);
      }
    };

    const container = document.getElementById("recommendations");
    if (!container) {
      console.error(
        'Container with id "recommendations" not found. Please add <div id="recommendations"></div> to your HTML.',
      );
      return;
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

      recommendations.innerHTML = '';

      let hasMatches = false;

      if (searchTerm === 'beach' || searchTerm === 'beaches') {
        if (fullData.beaches && Array.isArray(fullData.beaches)) {
          hasMatches = true;
          const resultsSection = document.createElement("section");
          resultsSection.className = "category-section";
          resultsSection.innerHTML = '<h2>Explore Dream Destinations</h2><div class="recommendation-grid"></div>';
          const resultsGrid = resultsSection.querySelector(".recommendation-grid");
          recommendations.appendChild(resultsSection);
          fullData.beaches.forEach((beach) => {
            const beachDiv = document.createElement("div");
            beachDiv.className = "recommendation-item";
            beachDiv.innerHTML = `
              <img src="${beach.imageUrl}" alt="${beach.name}" style="width: 100%; height: 200px; object-fit: cover;">
              <h3>${beach.name}</h3>
              <p>${beach.description}</p>
            `;
            resultsGrid.appendChild(beachDiv);
          });
        }
      } else if (searchTerm === 'temple' || searchTerm === 'temples') {
        if (fullData.temples && Array.isArray(fullData.temples)) {
          hasMatches = true;
          const resultsSection = document.createElement("section");
          resultsSection.className = "category-section";
          resultsSection.innerHTML = '<h2>Explore Dream Destinations</h2><div class="recommendation-grid"></div>';
          const resultsGrid = resultsSection.querySelector(".recommendation-grid");
          recommendations.appendChild(resultsSection);
          fullData.temples.forEach((temple) => {
            const templeDiv = document.createElement("div");
            templeDiv.className = "recommendation-item";
            templeDiv.innerHTML = `
              <img src="${temple.imageUrl}" alt="${temple.name}" style="width: 100%; height: 200px; object-fit: cover;">
              <h3>${temple.name}</h3>
              <p>${temple.description}</p>
            `;
            resultsGrid.appendChild(templeDiv);
          });
        }
      } else if (searchTerm === 'country' || searchTerm === 'countries') {
        if (fullData.countries && Array.isArray(fullData.countries)) {
          hasMatches = true;
          const resultsSection = document.createElement("section");
          resultsSection.className = "category-section";
          resultsSection.innerHTML = '<h2>Explore Dream Destinations</h2><div class="recommendation-grid"></div>';
          const resultsGrid = resultsSection.querySelector(".recommendation-grid");
          recommendations.appendChild(resultsSection);
          fullData.countries.forEach((country) => {
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

            resultsGrid.appendChild(countryDiv);
          });
        }
      }

      if (!hasMatches) {
        const message = document.createElement("p");
        message.className = "no-results";
        message.textContent = `No results found for "${searchInput.value}".`;
        recommendations.appendChild(message);
      }
    });

    // Reset button click handler
    resetBtn.addEventListener("click", () => {
      searchInput.value = "";
      recommendations.innerHTML = '';
    });
  } catch (error) {
    console.error("Error fetching data:", error);
  }
});
