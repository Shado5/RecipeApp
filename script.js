// Wait for the page to load before running the script
document.addEventListener("DOMContentLoaded", function () {
    
    // Get the search button and add a click event listener
    document.getElementById("search-btn").addEventListener("click", function () {
        // Get the value entered in the search box and remove extra spaces
        let query = document.getElementById("search-box").value.trim();

        // If the search box is not empty, call the fetchRecipes function
        if (query) {
            fetchRecipes(query);
        }
    });

    // Function to fetch recipes from TheMealDB API
    async function fetchRecipes(query) {
        // Construct the API URL with the search query
        const API_URL = `https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`;

        try {
            // Fetch data from the API
            let response = await fetch(API_URL);

            // Convert the response into JSON format
            let data = await response.json();

            // Call function to display the fetched recipes
            displayRecipes(data.meals);
        } catch (error) {
            // If there's an error, log it to the console
            console.error("Error fetching recipes:", error);
        }
    }

    // Function to display recipes on the webpage
    function displayRecipes(meals) {
        // Get the div where the results will be displayed
        let resultsDiv = document.getElementById("results");

        // Clear previous search results
        resultsDiv.innerHTML = "";

        // If no meals are found, display a message
        if (!meals) {
            resultsDiv.innerHTML = "<p>No recipes found. Try again!</p>";
            return;
        }

        // Loop through each meal in the API response
        meals.forEach(meal => {
            // Create a new div for each recipe
            let recipeDiv = document.createElement("div");
            recipeDiv.classList.add("recipe"); // Add a CSS class for styling

            // Check if a valid source link exists, otherwise display a message
            let fullRecipeLink = meal.strSource
                ? `<a class="links" href="${meal.strSource}" target="_blank">View Full Recipe...</a>`
                : `<p>No full recipe available</p>`;

            // Set the inner HTML of the div to display the recipe details
            recipeDiv.innerHTML = `
                <h2>${meal.strMeal}</h2> <!-- Recipe name -->
                <img src="${meal.strMealThumb}" alt="${meal.strMeal}"> <!-- Recipe image -->
                <p><strong>Category:</strong> ${meal.strCategory}</p> <!-- Recipe category -->
                <p><strong>Instructions:</strong> ${meal.strInstructions.substring(0, 100)}...</p> <!-- Shortened instructions -->
                ${fullRecipeLink} <!-- Link to the full recipe -->
            `;

            // Add the recipe div to the results section
            resultsDiv.appendChild(recipeDiv);
        });
    }
});

