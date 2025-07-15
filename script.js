// Search function for Pokemon
async function searchPokemon() {
    const input = document.getElementById("pokemonInput").value.trim().toLowerCase();
    const container = document.getElementById("pokemonContainer");
    const errorDiv = document.getElementById("errorMessage")

// this section clears previous errors or results
errorDiv.textContent = "";
container.innerHTML = "";

if (!input) {
    errorDiv.textContent = "Please enter a Pokemon name or ID";
    return;
}

try {
    // using the input to fetch data from the PokeAPI 
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${input}`);
    
    if (!response.ok) {
        throw new Error("Whoops! Pokemon not found");
    }

    const data = await response.json();

    // Create and populate html elements with Pokemon data
    const name = document.createElement("h2");
    name.textContent = `Name: ${data.name}`;

    const image = document.createElement("img");
    image.src = data.sprites.front_default;
    image.alt = data.name;

    const type = document.createElement("p");
    type.textContent = `Type: ${data.types.map(t => t.type.name).join(', ')}`;

    // Appending elements to container 
    container.appendChild(name);
    container.appendChild(image);
    container.appendChild(type);
 } catch (error) {
    errorDiv.textContent = error.message;
 }

}

// event listener for the button
document.getElementById("searchButton").addEventListener("click", searchPokemon);