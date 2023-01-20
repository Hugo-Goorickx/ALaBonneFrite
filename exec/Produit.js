export let test = [];

function add_order()
{
    if (test.includes(this) == false)
        test.push(this);
    else
    {
        let index = test.indexOf(this);
        test[index].nb_prod++;
    }
}

export class Produit
{
    /**
     * Consrtucteur de la classe
     * Parametres:
     *      name        =>  Nom du produit
     *      category    =>  Liste des categories aux quelles le produit appartient
     *      price       =>  Prix du produit
     *      img         =>  Lien vers l'image du produit
     * 
     * Return:
     *      Rien
     */
    constructor (name, category, price, img)
    {
        this.name = name;
        this.category = category;
        this.price = price;
        this.img = img;
        this.nb_prod = 1;
        this.category.unshift("Tout");
    }

    /**
     * Fonction creant une balise avec le txt a l'interieur
     * Details:
     * 1    creer une balise
     * 2    creer du text
     * 3    ajoute le text a la balise
     * 4    revoit la balise
     * 
     * Parametres:
     *      balise  => Tag de la balise
     *      txt     => Interieur de la balise
     * 
     * Return:
     *      Revoit la balise creee
     */
    creatBalise(balise, txt)
    {
        let out_balise = document.createElement(balise); //1
        let content = document.createTextNode(txt); //2
        out_balise.appendChild(content); //3
        return out_balise; //4
    }

    /**
     * Genere un carte pour un produit
     * Details:
     * 1    Definition ou on ajoutera la carte
     * 2    Creation de la balise et ajout de la classe article
     * 3    Creation de la balise img et ajoute la src et l'alt
     * 4    Creations des balises pour le nom, le prix et le button
     * 5    Ajout des balises img, name_prod, price_prod, button
     * 6    Ajout de la div globale
     * 
     * Parametres:
     *      Rien
     * 
     * Return:
     *      Rien
     */
    gen_card()
    {
        let start = document.getElementsByClassName("all")[0]; //1
        let global_div = document.createElement('div'); //2
        global_div.classList.add('article');
        let img = document.createElement('img'); //3
        img.setAttribute("src", this.img);
        img.setAttribute("alt", this.name);
        let name_prod = this.creatBalise('p', this.name); //4
        let price_prod = this.creatBalise('p', this.price + "$");
        let button = this.creatBalise('button', 'Order');
        button.addEventListener('click', add_order.bind(this));
        global_div.append(img, name_prod, price_prod, button); //5
        start.appendChild(global_div); //6
    }
    
    /**
     * Genere une image pour un produit
     * Details:
     * 1    Definition ou on ajoutera l'image
     * 2    Position du dernier bouton
     * 3    Creation de la balise et ajout de la classe item_carrousel
     * 4    Creation de la balise img et ajoute la src et l'alt
     * 5    Creation d'une balise
     * 6    Ajout des balises img, name_prod
     * 7    Ajoute global_div avant where_we_add
     * 
     * Parametres:
     *      Rien
     * 
     * Return:
     *      Rien
     */
    gen_picture()
    {
        let start = document.getElementsByClassName('carrousel')[0]; //1
        let where_we_add = start.getElementsByTagName('button')[start.getElementsByTagName('button').length - 1]; //2
        let global_div = document.createElement('div'); //3
        global_div.classList.add('item_carrousel');
        let img = document.createElement('img'); //4
        img.setAttribute("src", this.img);
        img.setAttribute("alt", this.name);
        let name_prod = this.creatBalise('p', this.name); //5
        global_div.append(img, name_prod); //6
        start.insertBefore(global_div, where_we_add);//7
    }
}