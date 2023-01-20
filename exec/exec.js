import {test} from './Produit.js';

/** 
 * Change l'image en focntion du sens dans le quel on va (1 = doite | -1 = gauche)
 */
function move_car_up(move)
{
    let pos_old_pic = document.getElementsByClassName('item_carrousel')[0];
    pos_old_pic.remove();
    index_carrousel = index_carrousel + move;
    if (index_carrousel < 0)
        index_carrousel = all_prod.length + move;
    else if (index_carrousel == all_prod.length)
        index_carrousel = 0;
    all_prod[index_carrousel].gen_picture();
}

/** 
 * Change l'image en focntion du sens dans le quel on va (1 = doite | -1 = gauche)
 */
function move_car_down(move)
{
    let pos_old_button = document.getElementsByClassName('menu'); 
    while (pos_old_button.length)
        pos_old_button[0].remove(); 
    console.log("test" + index_button);
    index_button = index_button + move; 
    if(index_button < 0) 
        index_button = all_categories.length + move;
    else if (index_button >= all_categories.length) 
        index_button = 0;
    console.log("test" + index_button);

    all_categories[index_button].gen_button(); 
    let pos_button = document.getElementsByClassName('menu')[0];
    pos_button.addEventListener("click", show_cat);
}

/** 
 * Ajoute les articles de la bonne categories
 */
function show_cat()
{
    let pos_old_article = document.getElementsByClassName('article');
    let name_cat = all_categories[index_button].name;

    while (pos_old_article.length != 0)
        pos_old_article[0].remove();

    for (let elem of all_prod)
        for (let single_cat of elem.category)
            if (single_cat == name_cat)
                elem.gen_card();
}

function essaie(elem)
{
    elem.nb_prod--;
    console.log(elem.nb_prod);
    if (elem.nb_prod == 0)
    {
        elem.nb_prod = 1;
        console.log("Test");
        test.splice(test.indexOf(elem), 1);
        elem
        console.log(test);
    }
    show_order();
    console.log("Test");

}

document.getElementById("menu_burger").addEventListener("click", function()
{
    document.getElementById("menu_burger").classList.toggle("open");
});

function create_bal(balise, content)
{
    let tmp = document.createElement(balise);
    tmp.classList.add(content);
    return (tmp);
}


/** 
 * Renvoi les produits achetes et la somme totale
 */
function show_order()
{
    if (window.innerWidth < 1025)
        document.getElementById("myLinks").style.display = "none";

    let pos_body = document.body;
    let pos_content = document.getElementsByClassName("content")[0];

    let order = document.getElementsByClassName("commande")[0];
    if (order)
        order.remove();

    order = create_bal('div', 'commande');

    let tmp_food, tmp_img, tmp_img1, tmp_img2, tmp_info, tmp_p, tmp_content, tmp_but, somme = 0;
    for (let elem of test)
    {
        somme += parseInt(elem.price * elem.nb_prod);
        tmp_food = create_bal('div', 'food_content');
        tmp_food.id = elem.name;
        
        tmp_img = create_bal('div', 'image');

        tmp_img1 = create_bal('img', 'visuel');
        tmp_img1.setAttribute('src', elem.img);
        tmp_img1.setAttribute('alt', elem.name);

        tmp_img2 = create_bal('img', 'poubelle');
        if (localStorage.theme == "dark")
            tmp_img2.setAttribute('src', "imgs/poubelle-blanc.png");
        else if (localStorage.theme == "light")
            tmp_img2.setAttribute('src', "imgs/poubelle-noir.png");
        tmp_img2.setAttribute('alt', "poubelle");
        tmp_img2.addEventListener("click", function(){essaie(elem)});

        tmp_img.appendChild(tmp_img1);

        tmp_food.appendChild(tmp_img);

        tmp_info = create_bal('div', 'info');

        tmp_p = create_bal('p', 'nom');
        tmp_content = document.createTextNode(elem.name);
        tmp_p.appendChild(tmp_content);
        tmp_info.appendChild(tmp_p);

        tmp_p = create_bal('p', 'prix');
        tmp_content = document.createTextNode(elem.price + "$");
        tmp_p.appendChild(tmp_content);
        tmp_info.appendChild(tmp_p);

        tmp_p = create_bal('p', 'quantite');
        tmp_content = document.createTextNode("Qts:  " + elem.nb_prod);
        tmp_p.appendChild(tmp_content);
        tmp_info.appendChild(tmp_p);

        tmp_food.appendChild(tmp_info);
        tmp_food.appendChild(tmp_img2);
        order.appendChild(tmp_food);
    }
    tmp_p = create_bal('p', 'prix_complet');
    tmp_content = document.createTextNode("Total:  " + somme + "$");
    tmp_p.appendChild(tmp_content);
    
    let tmp_total = create_bal('div', 'total');
    tmp_total.appendChild(tmp_p);

    tmp_but = create_bal('button', 'buy');
    tmp_p = document.createElement('p')
    tmp_content = document.createTextNode('Order');
    tmp_p.appendChild(tmp_content);
    
    tmp_but.appendChild(tmp_p);
    tmp_but.addEventListener('click', function(){window.alert("Commande validee")});

    tmp_total.appendChild(tmp_but);
    
    tmp_but = create_bal('button', 'exit');
    tmp_p = document.createElement('p')
    tmp_content = document.createTextNode('Exit');
    tmp_p.appendChild(tmp_content);
    
    tmp_but.appendChild(tmp_p);
    tmp_but.addEventListener('click', function(){document.getElementsByClassName("commande")[0].remove()});

    tmp_total.appendChild(tmp_but);

    order.appendChild(tmp_total);

    pos_body.insertBefore(order, pos_content);
}

//Import le fichier json
import file from '../menu.json' assert {type: 'json'};
import {Button} from './Button.js';
import {Produit} from './Produit.js';

//Variables globales
let all_prod = [];
let all_categories = [];
let tmp_all_categories = [];
let index_carrousel = 0;
let index_button = 0;

//Extraction des donnees du json
for (let elem of file.menu)
{
    all_prod.push(new Produit(elem.name, elem.category, elem.price, elem.img));
    
    //Extraction des categories et stockages des Buttons (sous forme de classe)
    for (let inside_elem of elem.category)
    {
        if (tmp_all_categories.includes(inside_elem) == false)
        {
            tmp_all_categories.push(inside_elem);
            all_categories.push(new Button(inside_elem));
        }
    }
}

//Buttons for carrousele picture
let pos_buttons_car = document.getElementsByClassName('fl_gr');
pos_buttons_car[0].addEventListener("click",  function(){move_car_up(-1);});
pos_buttons_car[1].addEventListener('click', function(){move_car_up(1);});

//Buttons for carrousele categories' button
let pos_buttons_cat = document.getElementsByClassName('fl_pt');
pos_buttons_cat[0].addEventListener('click', function(){move_car_down(-1);});
pos_buttons_cat[1].addEventListener('click', function(){move_car_down(1);});

//Creation par defaut des buttons et images
all_categories[0].gen_button();
all_prod[0].gen_picture();    

//Ajoute la fonction de l'affichage de la commande actuelle 
let pos_prim_order = document.getElementById('button_order');
pos_prim_order.addEventListener("click", show_order);

//Ajoute la fonction de l'affichage lors du clic
let pos_button = document.getElementsByClassName('menu')[0];
pos_button.addEventListener("click", show_cat);

show_cat();
