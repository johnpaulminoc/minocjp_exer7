let foodcardslist = [];

// function to validate the form input
function validateform(event) 
{
    // get values from form fields
    const name = document.getElementById("foodName").value;
    const description = document.getElementById("description").value;
    const image = document.getElementById("imageURL").value;
    const rank = document.getElementById("rank").value;

    //check if any field is empty
    if (name === "" || description === "" || image === "" || rank === "") 
    {
        alert("Please fill in all fields.");
        return false;
    }

    //check if rank is not a number
    if (isNaN(rank)) 
    {
        alert("Rank must be a number.");
        return false;
    }

    //creates food card object
    const foodcard = 
    {
        name: name,
        description: description,
        image: image,
        rank: parseInt(rank)
    };

    // add food card to the list
    foodcardslist.push(foodcard);

    //to sort food cards
    sortfoodcards();
    //to display food cards
    displayfoodcards();

    return false;
}

//function to sort food cards by rank
function sortfoodcards() 
{
    const n = foodcardslist.length;
    for (let i = 0; i < n - 1; i++) 
    {
        for (let j = 0; j < n - i - 1; j++) 
        {
            if (foodcardslist[j].rank > foodcardslist[j + 1].rank) 
            {
                // swap elements if needed
                const temp = foodcardslist[j];
                foodcardslist[j] = foodcardslist[j + 1];
                foodcardslist[j + 1] = temp;
            }
        }
    }
}

//form submission event listener
const foodform = document.getElementById("foodForm");
foodform.onsubmit = validateform;

//function to delete a food card
function deletefoodcard(index, cardelement) 
{
    const foodcardssection = document.getElementById("foodCards");
    //remove the card element using removeChild
    foodcardssection.removeChild(cardelement);

    //mark the food card as deleted
    foodcardslist[index] = null;
    //redisplay food cards
    displayfoodcards();
}

//function to display food cards
function displayfoodcards() 
{
    const foodcardssection = document.getElementById("foodCards");
    //clear the existing cards
    foodcardssection.innerHTML = "";

    foodcardslist.forEach((foodcard, index) => 
    {
        if (foodcard !== null) 
        {
            const cardelement = document.createElement("div");
            cardelement.className = "food-card";

            const image = document.createElement("img");
            image.src = foodcard.image;

            const foodnameheading = document.createElement("h2");
            foodnameheading.innerText = foodcard.name;

            const descriptionparagraph = document.createElement("p");
            descriptionparagraph.innerText = foodcard.description;

            const rankparagraph = document.createElement("p");
            rankparagraph.innerText = foodcard.rank;

            const deletebutton = document.createElement("button");
            deletebutton.innerText = "Delete";

            //event listener for delete button
            deletebutton.onclick = function() 
            {
                deletefoodcard(index, cardelement);
            };

            //append elements to the card element
            cardelement.appendChild(image); // Image first
            cardelement.appendChild(foodnameheading);
            cardelement.appendChild(descriptionparagraph);
            cardelement.appendChild(rankparagraph);
            cardelement.appendChild(deletebutton);

            //append the card element to the food cards section
            foodcardssection.appendChild(cardelement);
        }
    });
}

