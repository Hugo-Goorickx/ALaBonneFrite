export class Button
{
    /**
     * Consrtucteur de la classe
     * Parametres:
     *      name        =>  Nom de la categorie
     * 
     * Return:
     *      Rien
     */
    constructor (name)
    {
        this.name = name;
    }

    /**
     * Creation du bouton
     * Details:
     * 1    Definition ou on ajoutera le bouton
     * 2    Creation de la balise button
     * 3    Position du dernier bouton
     * 4    Ajoute global_div avant where_we_add
     * 
     * Params:
     *      Rien
     * 
     * Return:
     *      Rien
     */
    gen_button()
    {
        let start = document.getElementsByClassName('choix')[0]; //1
        let button = document.createElement('button'); //2
        button.classList.add('menu');
        let content = document.createTextNode(this.name);
        button.appendChild(content);
        let where_we_are = start.getElementsByTagName('button')[start.getElementsByTagName('button').length - 1]; //3
        start.insertBefore(button, where_we_are); //4
    }
}