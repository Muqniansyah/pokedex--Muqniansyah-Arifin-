let currentPage = 1; // halaman pertama.
const limit = 20; // setiap halaman menampilkan maksimal 20 Pokémon.

// fungsi untuk mengambil daftar Pokémon dari PokeAPI
function fetchPokemons(page = 1, searchQuery = "") {
  // Menentukan URL API dan mengatur offset yang dihitung berdasarkan halaman yang diminta, dan limit menentukan jumlah Pokémon per halaman.
  const offset = (page - 1) * limit;
  let url = `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`;

  // Mengatur URL Jika Ada Pencarian
  if (searchQuery) {
    url = `https://pokeapi.co/api/v2/pokemon/${searchQuery.toLowerCase()}`;
  }

  // Mengambil Data dari API
  fetch(url)
    .then((response) => {
      // Jika response.ok (status kode HTTP 200), fungsi akan mengonversi respons menjadi JSON
      if (response.ok) return response.json();
      throw new Error("Pokémon not found"); //Jika tidak, akan muncul pesan error.
    })
    .then((data) => {
      let pokemonGrid = document.getElementById("pokemonGrid");
      pokemonGrid.innerHTML = "";

      // Menampilkan Hasil Pencarian atau Daftar Pokémon
      if (searchQuery) {
        //  memanggil displayPokemon(data) untuk menampilkan hasil pencarian.
        displayPokemon(data);
      } else {
        // Jika tidak ada searchQuery, fungsi menampilkan daftar Pokémon untuk halaman yang diminta.
        data.results.forEach((pokemon) => {
          fetch(pokemon.url)
            .then((response) => response.json())
            .then((pokemonData) => {
              displayPokemon(pokemonData);
            });
        });
      }
    })
    .catch((error) => console.log(error));
}

// fungsi menampilkan data detail dari satu pokemon
function displayPokemon(pokemonData) {
  // Mendapatkan Elemen Grid untuk Kartu Pokémon
  const pokemonGrid = document.getElementById("pokemonGrid");

  // Membuat Elemen Kartu Pokémon
  const pokemonCard = document.createElement("div");
  pokemonCard.classList.add("card");

  // Mengisi Konten Kartu Pokémon
  pokemonCard.innerHTML = `
                <h3 class="card-title">${pokemonData.name}</h3>
                <img src="${pokemonData.sprites.front_default}" alt="${pokemonData.name}" />
            `;

  // Tambahkan event listener untuk membuka modal ketika kartu diklik
  pokemonCard.addEventListener("click", () => openModal(pokemonData));

  // Menambahkan Kartu ke Kontainer Pokémon Grid
  pokemonGrid.appendChild(pokemonCard);
}

document.getElementById("searchBar").addEventListener("input", (event) => {
  const searchQuery = event.target.value;
  if (searchQuery) {
    fetchPokemons(1, searchQuery);
  } else {
    // Jika kolom pencarian kosong, fungsi akan memuat ulang daftar Pokémon pada halaman saat ini
    fetchPokemons(currentPage);
  }
});

// Memuat data Pokémon pertama kali
fetchPokemons();
