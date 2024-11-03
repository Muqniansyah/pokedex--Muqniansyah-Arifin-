// Fungsi untuk menampilkan modal box dengan informasi detail
function openModal(pokemonData) {
  document.getElementById("modalName").textContent = pokemonData.name;
  document.getElementById("modalImage").src = pokemonData.sprites.front_default;
  document.getElementById("modalHeight").textContent = pokemonData.height;
  document.getElementById("modalWeight").textContent = pokemonData.weight;

  // Mendapatkan dan menampilkan abilities
  const abilities = pokemonData.abilities
    .map((ability) => ability.ability.name)
    .join(", ");
  document.getElementById("modalAbilities").textContent = abilities;

  document.getElementById("pokemonModal").style.display = "flex";
}

// Fungsi untuk menutup modal box
document.getElementById("closeModal").addEventListener("click", () => {
  document.getElementById("pokemonModal").style.display = "none";
});

// update halaman pagination
function updatePageInfo() {
  document.getElementById("pageInfo").textContent = `Page ${currentPage}`;
}

// navigasi pagination
document.getElementById("prevPage").addEventListener("click", () => {
  if (currentPage > 1) {
    currentPage--;
    fetchPokemons(currentPage);
    updatePageInfo();
  }
});

document.getElementById("nextPage").addEventListener("click", () => {
  currentPage++;
  fetchPokemons(currentPage);
  updatePageInfo();
});
