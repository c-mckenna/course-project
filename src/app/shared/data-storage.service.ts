import { RecipeService } from '../recipes/recipe.service';
import { Recipe } from 'app/recipes/recipe.model';
import { AuthService } from 'app/auth/auth.service';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';

@Injectable()
export class DataStorageService {

  constructor(private http: HttpClient, private recipeService: RecipeService, private authService: AuthService) { }

  storeRecipes() {
    const token = this.authService.getToken();

    return this.http.put<Recipe[]>(
      'https://ng-recipe-book-c56da.firebaseio.com/recipes.json?auth=' + token,
      this.recipeService.getRecipes());
  }

  getRecipes() {
    const token = this.authService.getToken();

    this.http.get<Recipe[]>('https://ng-recipe-book-c56da.firebaseio.com/recipes.json?auth=' + token)
      .pipe(
        map((recipes: Recipe[]) => {
          for (const recipe of recipes) {
            if (!recipe['ingredients']) {
              recipe['ingredients'] = [];
            }
          }

          return recipes;
        })
      )
      .subscribe(
        (recipes: Recipe[]) => this.recipeService.setRecipes(recipes),
        (error) => console.log(error)
      );
  }
}
