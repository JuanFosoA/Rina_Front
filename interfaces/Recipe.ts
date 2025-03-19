export interface StandardRespondeDao{
    status: number;
    message: string;
}

export interface GetRecipesServiceDao extends StandardRespondeDao {
    data: RecipeDao[]
}

export interface RecipeDao {
    id: number;
    nombre: string;
}