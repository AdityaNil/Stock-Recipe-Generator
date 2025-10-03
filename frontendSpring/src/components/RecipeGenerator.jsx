import React, { useState } from "react";

function RecipeGenerator() {
    const [ingredients, setIngredients] = useState('');
    const [cuisine, setCuisine] = useState('Any');
    const [restrictions, setRestrictions] = useState('');
    const [recipe, setRecipe] = useState('');
    const [email, setEmail] = useState('');

    const token = localStorage.getItem("token"); // get JWT

    // Generate recipe
    const createRecipe = async () => {
        if (!token) {
            alert("You must be logged in to generate a recipe!");
            return;
        }

        try {
            const response = await fetch(
                `http://localhost:8080/recipe?ingredients=${encodeURIComponent(ingredients)}&restrictions=${encodeURIComponent(restrictions)}&cuisine=${encodeURIComponent(cuisine)}`,
                {
                    headers: {
                        "Authorization": `Bearer ${token}`
                    }
                }
            );

            if (!response.ok) {
                throw new Error(`Server error: ${response.status}`);
            }

            const data = await response.text();
            setRecipe(data);
        } catch (error) {
            console.error("Error generating recipe:", error);
            setRecipe("Failed to generate recipe. Please try again.");
        }
    };

    // Send recipe to email
    const sendRecipeToEmail = async () => {
        if (!token) {
            alert("You must be logged in to send a recipe!");
            return;
        }

        if (!recipe) {
            alert("Generate a recipe first!");
            return;
        }

        if (!email) {
            alert("Enter a valid email!");
            return;
        }

        try {
            const response = await fetch(
                `http://localhost:8080/send?prompt=${encodeURIComponent(email)}`,
                {
                    headers: {
                        "Authorization": `Bearer ${token}`
                    }
                }
            );

            if (!response.ok) {
                throw new Error(`Server error: ${response.status}`);
            }

            alert("Recipe sent successfully!");
        } catch (error) {
            console.error("Error sending recipe:", error);
            alert("Failed to send recipe.");
        }
    };

    return (
        <div>
            <h2>Create a Recipe</h2>

            <input
                type="text"
                value={ingredients}
                onChange={(e) => setIngredients(e.target.value)}
                placeholder="Enter Ingredients (comma separated)"
            />

            <input
                type="text"
                value={cuisine}
                onChange={(e) => setCuisine(e.target.value)}
                placeholder="Enter Cuisine Type"
            />

            <input
                type="text"
                value={restrictions}
                onChange={(e) => setRestrictions(e.target.value)}
                placeholder="Enter Dietary Restrictions"
            />

            <button onClick={createRecipe}>Create Recipe</button>

            <div className="output" style={{ marginTop: '20px' }}>
                <pre className="recipe-text">{recipe}</pre>
            </div>

            <div style={{ marginTop: '20px' }}>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter email to send recipe"
                />
                <button onClick={sendRecipeToEmail}>Send Recipe to Email</button>
            </div>
        </div>
    );
}

export default RecipeGenerator;
