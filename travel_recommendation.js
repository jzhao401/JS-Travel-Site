document.addEventListener('DOMContentLoaded', async () => {
  try {
    const response = await fetch('travel_recommendation_api.json');
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    console.log('Fetched data:', data); // Log to verify access

    // Assume data is an array of recommendation objects
    if (Array.isArray(data)) {
      const container = document.getElementById('recommendations');
      if (!container) {
        console.error('Container with id "recommendations" not found. Please add <div id="recommendations"></div> to your HTML.');
        return;
      }

      data.forEach(item => {
        const recommendationDiv = document.createElement('div');
        recommendationDiv.className = 'recommendation-item'; // For styling if needed

        recommendationDiv.innerHTML = `
          <h2>${item.name}</h2>
          <img src="${item.imageUrl}" alt="${item.name}" style="max-width: 100%; height: auto;">
          <p>${item.description}</p>
          ${item.cities ? `<p>Cities: ${item.cities.join(', ')}</p>` : ''}
        `;

        container.appendChild(recommendationDiv);
      });
    } else {
      console.error('Data is not an array:', data);
    }
  } catch (error) {
    console.error('Error fetching data:', error);
  }
});
