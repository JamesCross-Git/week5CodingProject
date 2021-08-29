///// Menu App

alert('Welcome to my cookbook! Feel free to edit it as you wish!')


// classes

class Ingredient {
    constructor(name, amount) {
        this.name = name;
        this.amount = amount;
    }
}

class Recipe {
    constructor(name) {
        this.name = name;
        this.ingredients = [];
    }

    addIngredient(ingredient) {
        if (ingredient instanceof Ingredient) {
            this.ingredients.push(ingredient);
        } else {
            throw new Error(`You can only add an ingredient. Argument is not an ingredient: ${ingredient}`);
        }
    }
}

class Menu {
    constructor() {
        this.recipes = [];
        this.selectedRecipe = null;
    }


    // Starts the menu app //

    start() {
        let selection = this.showMainMenuOptions();
        while (selection != 0) {
          switch (selection) {
            case '1':
                this.createRecipe();
                break;
            case '2':
                this.viewRecipe();
                break;
            case '3':
                this.deleteRecipe();
                break;
            default:
                selection = 0;
          }
          selection = this.showMainMenuOptions();
        }

        alert('Goodbye! Thank you for your time!');
    }

    showMainMenuOptions() {
        let recipeString = '';
        for (let i = 0; i < this.recipes.length; i++) {
            recipeString += i + ') ' + this.recipes[i].name + '\n';
        }
        return prompt (`
        ----- My Cookbook -----

            0) Exit Cook Book
            1) Create New Recipe
            2) View Recipe
            3) Delete Recipe

        ----------------------------
            ${recipeString}
        `)
    }

    showRecipeOptions(recipeInfo) {
        return prompt(`
            0) Back
            1) Add Ingredient
            2) Delete Ingredient
            ---------------------
            ${recipeInfo}
        `);
    }


    createRecipe() {
        let name = prompt('Enter new Recipe:');
        this.recipes.push(new Recipe(name));
    }

    viewRecipe() {
        let index = prompt('Enter the index of the recipe you wish to view:');
        if (index > -1 && index < this.recipes.length) {
            this.selectedRecipe = this.recipes[index];
            let description = 'Recipe: ' + this.selectedRecipe.name + '\n';
            
            for (let i = 0; i < this.selectedRecipe.ingredients.length; i++) {
                description += i + ') ' + this.selectedRecipe.ingredients[i].name 
                + ' - ' + this.selectedRecipe.ingredients[i].amount + '\n';
            }

            let selection = this.showRecipeOptions(description);
            switch (selection) {
                case '1':
                    this.createIngredient();
                    break;
                case '2':
                    this.deleteIngredient();
            }
        }
    }

    deleteRecipe() {
        let index = prompt('Enter the index of the recipe you wish to delete:');
        if (index > -1 && index < this.recipes.length) {
            this.recipes.splice(index, 1)
        }
    }

    createIngredient() {
        let name = prompt('Enter name for new ingredient:');
        let amount = prompt('Enter amount needed of your ingredient:');
        this.selectedRecipe.ingredients.push(new Ingredient(name, amount));
    }

    deleteIngredient() {
        let index = prompt('Enter the index of the Ingredient you wish to delete:');
        if (index > -1 && index < this.selectedRecipe.ingredients.length) {
            this.selectedRecipe.ingredients.splice(index, 1);
        }
    }
}

let menu = new Menu();
menu.start();