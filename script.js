document.getElementById("search-btn").addEventListener("click", function() {
    let query = document.getElementById("search-box").value.trim();
    if (query) {
        fetchRecipes(query);
    }
});

async function fetchRecipes(query) {
    const API_URL = `https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`;
    
    try {
        let response = await fetch(API_URL);
        let data = await response.json();
        displayRecipes(data.meals);
    } catch (error) {
        console.error("Error fetching recipes:", error);
    }
}

function displayRecipes(meals) {
    let resultsDiv = document.getElementById("results");
    resultsDiv.innerHTML = ""; // Clear previous results

    if (!meals) {
        resultsDiv.innerHTML = "<p>No recipes found. Try again!</p>";
        return;
    }

    meals.forEach(meal => {
        let recipeDiv = document.createElement("div");
        recipeDiv.classList.add("recipe");

        let fullRecipeLink = meal.strSource ? `<a href="${meal.strSource}" target="_blank">View Full Recipe</a>` : `<p>No full recipe available</p>`;

        recipeDiv.innerHTML = `
            <h2>${meal.strMeal}</h2>
            <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
            <p><strong>Category:</strong> ${meal.strCategory}</p>
            <p><strong>Instructions:</strong> ${meal.strInstructions.substring(0, 100)}...</p>
            ${fullRecipeLink}
        `;

        resultsDiv.appendChild(recipeDiv);
    });
}

