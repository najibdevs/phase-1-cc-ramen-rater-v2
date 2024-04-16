// index.js
const handleClick = (ramen) => {
  const detailImage = document.querySelector(".detail-image");
  const nameElement = document.querySelector(".name");
  const restaurantElement = document.querySelector(".restaurant");
  const ratingDisplay = document.getElementById("rating-display");
  const commentDisplay = document.getElementById("comment-display");

  detailImage.src = ramen.image;
  detailImage.alt = ramen.name;
  nameElement.textContent = ramen.name;
  restaurantElement.textContent = ramen.restaurant;
  ratingDisplay.textContent = ramen.rating;
  commentDisplay.textContent = ramen.comment;
};

const addSubmitListener = (ramenForm) => {
  return ramenForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);
    const newRamen = {
      name: formData.get('name'),
      restaurant: formData.get('restaurant'),
      image: formData.get('image'),
      rating: formData.get('rating'),
      comment: formData.get('comment'),
    };

    try {
      const response = await fetch('http://localhost:3000/ramens', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newRamen),
      });

      if (!response.ok) {
        throw new Error('Failed to add new ramen');
      }

      const addedRamen = await response.json();
      const ramenMenuDiv = document.getElementById('ramen-menu');
      const img = document.createElement('img');
      img.src = addedRamen.image;
      img.alt = addedRamen.name;
      ramenMenuDiv.appendChild(img);

      event.target.reset();
      return img;
    } catch (error) {
      console.error('Error adding new ramen:', error);
    }
  });
};

const displayRamens = async () => {
  try {
    const response = await fetch("http://localhost:3000/ramens");
    if (!response.ok) {
      throw new Error("Failed to fetch ramens");
    }
    const ramens = await response.json();
    const ramenMenu = document.getElementById("ramen-menu");
    ramens.forEach((ramen) => {
      const img = document.createElement("img");
      img.src = ramen.image;
      img.alt = ramen.name;
      img.addEventListener("click", () => handleClick(ramen));
      ramenMenu.appendChild(img);
    });
  } catch (error) {
    console.error("Error fetching ramens:", error);
  }
};

const main = () => {
  const ramenForm = document.getElementById("new-ramen");
  displayRamens();
  addSubmitListener(ramenForm);
};

export { displayRamens, addSubmitListener, handleClick, main };
