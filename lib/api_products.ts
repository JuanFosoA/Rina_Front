const API  = ''

export const getRecipes = () => {
    return fetch(`${API}/recipes`, {
        method: 'GET'
    })
}