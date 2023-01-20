/** Change le theme en fonction du status de e
 *  Details:
 *  1       Definie le theme comme light par defaut
 *  2       Si e est checked alors le theme passe en noir
 *  3       Modifie le theme sur le document, en stockage local et sur la variable actualTheme (utilise pour changeColor)
 *  4       Execute changeColor qui va s'occuper de changer globalement le theme
 * 
 * Params:
 *      e   =>   Ensemble des infos fournies par le addEventListener
 * 
 * Retour:
 *      Rien
 */
function switchTheme(e)
{
    let theme = 'light';//1
    if (e.target.checked)//2
        theme = 'dark';
    document.documentElement.setAttribute('data-theme', theme);//3
    localStorage.setItem('theme', theme);
    actualTheme = theme;
    changeColor(); //4
}

/** Genere le code html pour les fleches des deux carrouselles
 *  Details:
 *      1       Cree la balise img
 *      2       Ajoute la source
 *      3       Revoit la balise
 * 
 *  Params:
 *      src     =>      Chemin d'acces vers l'img de la fleche
 * 
 *  Return:
 *      fleche  =>      Balise img creee dans la fonction
 */
function gen_fleche(src)
{
    let fleche = document.createElement('img');
    fleche.setAttribute('src', src);
    return (fleche);
}

/** Genere les 4 fleches avec une couleur en fonction du theme
 *  Details:
 *      1       Suppression des fleches pour le premier carrosuelle
 *      2       Suppression des fleches pour le deuxieme carrosuelle
 *      3       Ajoute les 4 fleches
 * 
 *  Params:
 *      fl_gc   =>      Fleche de gauche
 *      fl_dr   =>      Fleche de droite
 * 
 *  Return:
 *      Rien
 */
function light(fl_gc, fl_dr) 
{
    for (let elem of document.getElementsByClassName('fl_gr'))//1
        if (elem.getElementsByTagName('img').length !=0)
            elem.removeChild(elem.getElementsByTagName('img')[0]);

    for (let elem of document.getElementsByClassName('fl_pt'))//2
        if (elem.getElementsByTagName('img').length !=0)
            elem.removeChild(elem.getElementsByTagName('img')[0]);
    fl_gc.setAttribute("alt", "fleche")
    fl_dr.setAttribute("alt", "fleche")
    document.getElementsByClassName('fl_gr')[0].appendChild(fl_gc);//3
    document.getElementsByClassName('fl_gr')[1].appendChild(fl_dr);
    document.getElementsByClassName('fl_pt')[0].appendChild(fl_gc.cloneNode());
    document.getElementsByClassName('fl_pt')[1].appendChild(fl_dr.cloneNode());
}

/** Change les couleurs des fleches en fonction du theme
 *  Details:
 *      1       Genere les fleches blanches si le theme est dark
 *      2       Genere les fleches noirs si le theme est light
 *  Params:
 *      Rien
 * 
 *  Return:
 *      Rien
 */
function changeColor()
{
    let tmp = document.getElementsByClassName('poubelle');

    if (actualTheme === 'dark')
    {
        for (let elem of tmp)
            elem.setAttribute('src', "imgs/poubelle-blanc.webp");
        light(gen_fleche('imgs/white_arrow_left.webp'), gen_fleche('imgs/white_arrow_right.webp'));

    }
    else if (actualTheme === 'light')
    {
        for (let elem of tmp)
            elem.setAttribute('src', "imgs/poubelle-noir.webp");
        light(gen_fleche('imgs/black_arrow_left.webp'), gen_fleche('imgs/black_arrow_right.webp'));
    }
}

/////////////////////////////////////////////
//      Exec                               //
/////////////////////////////////////////////

const toggleSwitch = document.querySelector('.theme-switch input[type="checkbox"]');
const currentTheme = localStorage.getItem('theme');
let actualTheme = currentTheme;

if (currentTheme)
{
    document.documentElement.setAttribute('data-theme', currentTheme);
    if (currentTheme === 'dark')
        toggleSwitch.checked = true;
}

toggleSwitch.addEventListener('change', switchTheme, false);

changeColor();