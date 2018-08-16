document.getElementById('myForm').addEventListener('submit', saveRecipe);

function saveRecipe(e){
    var recipeName = document.getElementById('recipeName').value;
    var recipeIngredients = document.getElementById('ingredients').value;
    var recipeDirections = document.getElementById('directions').value;

if(!validateForm(recipeName, recipeIngredients, recipeDirections)){
    return false;
}

var recipe = {
    name: recipeName,
    ingredients: recipeIngredients,
    directions: recipeDirections
}
console.log(recipe);

if(localStorage.getItem('recipes') === null){

    var recipes = [];
    recipes.push(recipe);
    localStorage.setItem('recipes', JSON.stringify(recipes));
} else {
    var recipes = JSON.parse(localStorage.getItem('recipes'));
    recipes.push(recipe);
    localStorage.setItem('recipes', JSON.stringify(recipes));
}

document.getElementById('myForm').reset();

fetchBookmarks();

// Prevent form from submitting
e.preventDefault();
}

function deleteRecipe(name){
    var recipes = JSON.parse(localStorage.getItem('recipes'));

    for(var i = 0; i < recipes.length; i++){
        if(recipes[i].name == name){
            recipes.splice(i,1);
        }
    }

    localStorage.setItem('recipes', JSON.stringify(recipes));
    fetchBookmarks();
}

function fetchBookmarks(){
    var recipes = JSON.parse(localStorage.getItem('recipes'));
    var recipesResults = document.getElementById('recipesResults');

    recipesResults.innerHTML = '';

    for(var i = 0; i < recipes.length; i++){
        var name = recipes[i].name;
        var ingredients = recipes[i].ingredients;
        var directions = recipes[i].directions;
        recipesResults.innerHTML +='<div class="card">'+
                                    '<div class="card-body">'+
                                    '<h3><a data-toggle="collapse" href="#id'+i+'" role="button" aria-expanded="false" aria-controls="collapseExample" >'
                                    +name+
                                    '</a></h3>'+
                                    '<div class="collapse" id="id'+i+'">'+
                                    '<h6>Ingredients</h6>'+
                                    '<p>'+ingredients+
                                    '</p>'+
                                    '<hr>'+
                                    '<h6>Directions</h6>'+
                                    '<p>'+directions+
                                    '</p>'+
                                    '<hr>'+
                                    ' <a onclick="deleteRecipe(\''+name+'\')" class="btn btn-danger" href="#">Delete</a> '+
                                    '</div>'+
                                    '</div>'+
                                    '</div>';
    }
}

function validateForm(recipeName, recipeIngredients, recipeDirections){
    if(!recipeName || !recipeIngredients || !recipeDirections){
        alert('Please fill in the form');
        return false;
    }
    return true;
}