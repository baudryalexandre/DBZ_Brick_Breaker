import {
    initializeGame,
    resumeGame
} from './game.js';
import {
    gameData,
    constants
} from "./constantsControllers.js";
import {
    mapStory
} from "./mapControllers.js";

import {
    resetBallAndPaddle
} from "./ballPaddleControllers.js";
import {
    replaceBricks
} from "./bricksControllers.js";

const nameMap = [
    `Arc Saiyans`,
    `Arc Freeza (Namek)`,
    `Arc Garlic Jr`,
    `Arc Humains Artificiels`,
    `Arc Cell`,
    `Arc Tournoi de l'autre monde`,
    `Arc 25ème Tenka Ichi Budōkai`,
    `Arc Majin Boo`,
    `La paix retrouvée`,
    `Le défi ultime`,
]

const storyDialogue = [
    [{
            "name": `Raditz`,
            "dialogue": `"Jeune Saiyan, te voilà enfin parmi nous sur cette planète que tu devrais considérer comme chez toi. Il est temps de rejoindre notre cause et de montrer ta loyauté envers notre race."`
        },
        {
            "name": `You`,
            "dialogue": `"Je ne suis pas sûr de vouloir suivre vos idéaux, Raditz. La Terre est devenue ma maison, et je ne vais pas laisser qui que ce soit la menacer."`
        },
        {
            "name": `Raditz`,
            "dialogue": `"Tu te trompes, petit Saiyan. La Terre n'est rien de plus qu'une faiblesse pour toi. Rejoins-nous et ensemble, nous pourrons restaurer la grandeur de notre race."`
        },
        {
            "name": `You`,
            "dialogue": `"Je refuse. Je vais prouver que je suis plus fort que vous ne le pensez, Raditz. Je protégerai ma nouvelle maison à tout prix !"`
        },
        {
            "name": `Raditz`,
            "dialogue": `"Tu oses me défier? Tu le regretteras! Je vais te montrer la puissance de notre race!"`
        },
    ],
    [{
            "name": `Piccolo`,
            "dialogue": `"Jeune Saiyan, nous avons besoin de ton aide. Freezer et ses sbires ont envahi notre planète, semant la terreur et la destruction."`
        },
        {
            "name": `You`,
            "dialogue": `"Je ne peux pas rester les bras croisés devant une telle injustice. Je vais vous aider à protéger votre monde."`
        },
        {
            "name": `Piccolo`,
            "dialogue": `"Bien. Mais méfie-toi, Freezer est un tyran impitoyable. Il ne reculera devant rien pour obtenir ce qu'il veut."`
        },
        {
            "name": `You`,
            "dialogue": `"Je ne crains pas Freezer. Ensemble, nous vaincrons ses soldats et ramènerons la paix sur Namek."`
        },
        {
            "name": `Piccolo`,
            "dialogue": `"Nous avons besoin de toute l'aide possible. Avec ta force, nous pourrons peut-être enfin renverser l'oppression de Freezer."`
        },
        {
            "name": `You`,
            "dialogue": `"Je ferai tout ce qui est en mon pouvoir pour aider. Pour Namek et pour la paix dans l'univers !"`
        },
    ],
    [{
            "name": `Garlic Jr.`,
            "dialogue": `"Ah, le jeune Gohan, le Saiyan indécis, et Piccolo, le protecteur de la Terre. Vous osez vous dresser contre moi une fois de plus ? Vous êtes bien naïfs si vous croyez pouvoir m'arrêter."`
        },
        {
            "name": `Gohan`,
            "dialogue": `"Nous ne te laisserons pas semer le chaos à nouveau, Garlic Jr. Tu ne comprends pas la force de notre détermination à protéger cette planète."`
        },
        {
            "name": `Piccolo`,
            "dialogue": `"Garlic Jr., ta quête de pouvoir t'aveugle. Nous te vaincrons comme nous l'avons fait par le passé."`
        },
        {
            "name": `You`,
            "dialogue": `"Je me bats aux côtés de mes amis et de ma nouvelle famille. Garlic Jr., nous te montrerons que la loyauté envers la Terre est plus forte que tout."`
        },
        {
            "name": `Garlic Jr.`,
            "dialogue": `"Haha ! Votre confiance en votre petite planète vous perdra. Mes sbires et moi-même vous montrerons le vrai sens de la terreur !"`
        },
    ],
    [{
            "name": `Vegeta`,
            "dialogue": `"Regarde autour de toi, petit Saiyan. Ces cyborgs représentent l'avenir de notre race. Rejoins-nous et ensemble, nous pourrons atteindre de nouveaux sommets de puissance."`
        },
        {
            "name": `You`,
            "dialogue": `"Je ne suis pas convaincu, Vegeta. Ces machines ont semé le chaos et la destruction sur Terre. Je ne peux pas les soutenir."`
        },
        {
            "name": `Vegeta`,
            "dialogue": `"Tu manques de vision, jeune Saiyan. Les cyborgs sont la prochaine étape de notre évolution. Ensemble, nous pourrions gouverner l'univers."`
        },
        {
            "name": `You`,
            "dialogue": `"Je refuse. La puissance n'est rien sans honneur ni compassion. Je vais défendre la Terre et ses habitants contre vos ambitions destructrices."`
        },
        {
            "name": `Vegeta`,
            "dialogue": `"Tu es un imbécile. Tu regretteras ton choix. Cyborgs, montrez-lui la futilité de sa résistance !"`
        },
    ],
    [{
            "name": `Cell`,
            "dialogue": `"Ah, enfin je suis libre de mes chaînes. Les humains et leur soi-disant justice m'ont enfermé trop longtemps. Mais maintenant, je suis de retour pour accomplir mon destin."`
        },
        {
            "name": `You`,
            "dialogue": `"Cell, je ne vais pas te laisser semer le chaos une fois de plus. Les guerriers de la Terre t'arrêteront, peu importe ce que ça nous coûte."`
        },
        {
            "name": `Cell`,
            "dialogue": `"Ha ! Tu crois vraiment que tu peux m'arrêter, petit Saiyan ? Je suis bien plus fort que tu ne peux l'imaginer. Laisse-moi te montrer la puissance de la perfection."`
        },
        {
            "name": `You`,
            "dialogue": `"Je vais te prouver que la force de la Terre est plus grande que tout ce que tu peux rassembler. Nous te vaincrons, Cell, pour protéger notre monde et nos proches."`
        },
        {
            "name": `Cell`,
            "dialogue": `"Nous verrons bien, petit Saiyan. Mais je te préviens, la perfection ne peut être vaincue aussi facilement. Soldats, montrez-leur la puissance de Cell !"`
        },
    ],
    [{
            "name": `You`,
            "dialogue": `"Ces combats sont incroyables ! Je suis impressionné par la force de nos adversaires venus de différents univers."`
        },
        {
            "name": `Kaio`,
            "dialogue": `"Oui, Jeune Saiyan, mais n'oublie pas que même dans cet autre monde, les enjeux sont importants. Il est essentiel de rester concentré et de donner le meilleur de soi-même."`
        },
        {
            "name": `You`,
            "dialogue": `"Bien sûr, Kaio. Je suis prêt à relever tous les défis qui se présentent à moi. Ces combats sont une opportunité de montrer la puissance des guerriers de la Terre."`
        },
        {
            "name": `Kaio`,
            "dialogue": `"Exactement ! N'oublie jamais que même dans l'au-delà, notre mission de protéger la paix et la justice continue."`
        },
    ],
    [{
            "name": `You`,
            "dialogue": `"C'est le moment tant attendu du tournoi ! Que les combats commencent, et que le meilleur gagne !"`
        },
        {
            "name": `Vegeta`,
            "dialogue": `"Enfin une chance de prouver ma supériorité. Mais ne crois pas que je te laisserai gagner facilement, Jeune Saiyan."`
        },
        {
            "name": `You`,
            "dialogue": `"Ha ha ha ! C'est ce que nous verrons, Vegeta. Que le combat commence ! Mais souviens-toi, dans ce tournoi, l'amitié prime sur la rivalité."`
        },
        {
            "name": `Vegeta`,
            "dialogue": `"Hmpf. Nous verrons bien si tu parles sérieusement quand nous nous affronterons sur le ring."`
        },
    ],
    [{
            "name": `You`,
            "dialogue": `"Majin Boo menace la Terre une fois de plus... Nous devons nous unir pour le vaincre !"`
        },
        {
            "name": `Majin Boo`,
            "dialogue": `"Haha ! Vous êtes bien naïfs de penser que vous pouvez m'arrêter, petits insectes. Je vais réduire cette planète en miettes et me régaler de la peur de ses habitants !"`
        },
        {
            "name": `You`,
            "dialogue": `"Nous ne te laisserons pas faire, Majin Boo. Nous avons déjà vaincu tes précédentes incarnations, et nous te vaincrons à nouveau."`
        },
        {
            "name": `Majin Boo`,
            "dialogue": `"Tu oses me défier, petit Saiyan ? Tu vas bientôt regretter ta témérité. Je vais te montrer la véritable terreur, haha !"`
        },
        {
            "name": `You`,
            "dialogue": `"Nous ne reculerons pas devant toi, Majin Boo. Avec notre force combinée et notre détermination, nous te vaincrons et sauverons notre monde une fois de plus !"`
        },
        {
            "name": `Majin Boo`,
            "dialogue": `"Nous verrons bien, insectes impudents. Mais ne vous attendez pas à ce que je vous montre la moindre pitié ! Mes pouvoirs destructeurs vous réduiront en cendres !"`
        },
    ],
    [{
            "name": `You`,
            "dialogue": `"La Terre est enfin en paix. C'est grâce à l'unité et à la détermination de chacun."`
        },
        {
            "name": `Gohan`,
            "dialogue": `"Oui, nous avons surmonté tant d'obstacles ensemble. C'est grâce à notre amitié et notre volonté de protéger notre monde que nous avons réussi."`
        },
        {
            "name": `Piccolo`,
            "dialogue": `"Cette paix est fragile, mais tant que nous restons unis, nous pouvons surmonter n'importe quelle menace qui se présente à nous."`
        },
        {
            "name": `Krillin`,
            "dialogue": `"Je suis fier de faire partie de cette équipe. Ensemble, nous sommes invincibles."`
        },
        {
            "name": `You`,
            "dialogue": `"Absolument. Tant que nous sommes ensemble, rien ne peut nous arrêter. Continuons à protéger notre monde et à défendre la paix."`
        },
        {
            "name": `Gohan`,
            "dialogue": `"Et n'oublions pas que nous avons aussi des amis dans d'autres univers. Notre responsabilité s'étend bien au-delà de la Terre."`
        },
        {
            "name": `Piccolo`,
            "dialogue": `"Oui, nous devons rester vigilants et prêts à agir pour protéger tout l'univers, pas seulement notre planète."`
        },
        {
            "name": `Krillin`,
            "dialogue": `"Alors continuons à nous entraîner et à rester forts, pour que nous soyons prêts à affronter n'importe quelle menace qui se présente à nous."`
        },
        {
            "name": `You`,
            "dialogue": `"Exactement. Notre détermination et notre amitié sont notre plus grande force. Ensemble, nous sommes prêts à relever tous les défis qui se présentent à nous."`
        },
    ],
    [{
            "name": `You`,
            "dialogue": `"Une nouvelle menace se lève... Nous devons être prêts à la combattre, quoi qu'il en coûte."`
        },
        {
            "name": `Beerus`,
            "dialogue": `"Haha ! Vous parlez d'une menace ? Peu importe ce qui se dresse devant vous, vous ne serez jamais préparés à affronter ma puissance !"`
        },
        {
            "name": `You`,
            "dialogue": `"Beerus, nous ne vous sous-estimons pas. Mais nous sommes déterminés à protéger notre univers, quelles que soient les circonstances."`
        },
        {
            "name": `Beerus`,
            "dialogue": `"Ah, une détermination insolente. Je vais voir de quoi vous êtes capables. Montrez-moi si vous êtes dignes de mon attention, mortels."`
        },
        {
            "name": `You`,
            "dialogue": `"Nous n'avons pas peur de vous, Beerus. Avec notre unité et notre volonté de protéger notre monde, nous sommes prêts à relever n'importe quel défi."`
        },
        {
            "name": `Beerus`,
            "dialogue": `"Haha ! Très bien. Je vais vous donner une chance de me divertir. Mais ne vous attendez pas à ce que je retienne mes coups ! Montrez-moi ce que vous avez, guerriers de la Terre !"`
        },
    ],
]

//les personnage
const storyPersonnage = [
    [{
            "perso1": `You`,
            "perso2": `Raditz`,
            "stylePerso1": `non`,
            "stylePerso2": `oui`,
        },
        {
            "perso1": `You`,
            "perso2": `Raditz`,
            "stylePerso1": `oui`,
            "stylePerso2": `non`,
        },
        {
            "perso1": `You`,
            "perso2": `Raditz`,
            "stylePerso1": `non`,
            "stylePerso2": `oui`,
        },
        {
            "perso1": `You`,
            "perso2": `Raditz`,
            "stylePerso1": `oui`,
            "stylePerso2": `non`,
        },
        {
            "perso1": `You`,
            "perso2": `Raditz`,
            "stylePerso1": `non`,
            "stylePerso2": `oui`,
        },
    ],
    [{
            "perso1": `You`,
            "perso2": `Piccolo`,
            "stylePerso1": `non`,
            "stylePerso2": `oui`,
        },
        {
            "perso1": `You`,
            "perso2": `Piccolo`,
            "stylePerso1": `oui`,
            "stylePerso2": `non`,
        },
        {
            "perso1": `You`,
            "perso2": `Piccolo`,
            "stylePerso1": `non`,
            "stylePerso2": `oui`,
        },
        {
            "perso1": `You`,
            "perso2": `Piccolo`,
            "stylePerso1": `oui`,
            "stylePerso2": `non`,
        },
        {
            "perso1": `You`,
            "perso2": `Piccolo`,
            "stylePerso1": `non`,
            "stylePerso2": `oui`,
        },
        {
            "perso1": `You`,
            "perso2": `Piccolo`,
            "stylePerso1": `oui`,
            "stylePerso2": `non`,
        },
    ],
    [{
            "perso1": `Gohan`,
            "perso2": `Garlic-jr`,
            "stylePerso1": `non`,
            "stylePerso2": `oui`,
        },
        {
            "perso1": `Gohan`,
            "perso2": `Garlic-jr`,
            "stylePerso1": `oui`,
            "stylePerso2": `non`,
        },
        {
            "perso1": `Piccolo`,
            "perso2": `Garlic-jr`,
            "stylePerso1": `oui`,
            "stylePerso2": `non`,
        },
        {
            "perso1": `You`,
            "perso2": `Garlic-jr`,
            "stylePerso1": `oui`,
            "stylePerso2": `non`,
        },
        {
            "perso1": `You`,
            "perso2": `Garlic-jr`,
            "stylePerso1": `non`,
            "stylePerso2": `oui`,
        },
    ],
    [{
            "perso1": `You`,
            "perso2": `vegeta`,
            "stylePerso1": `non`,
            "stylePerso2": `oui`,
        },
        {
            "perso1": `You`,
            "perso2": `vegeta`,
            "stylePerso1": `oui`,
            "stylePerso2": `non`,
        },
        {
            "perso1": `You`,
            "perso2": `vegeta`,
            "stylePerso1": `non`,
            "stylePerso2": `oui`,
        },
        {
            "perso1": `You`,
            "perso2": `vegeta`,
            "stylePerso1": `oui`,
            "stylePerso2": `non`,
        },
        {
            "perso1": `You`,
            "perso2": `vegeta`,
            "stylePerso1": `non`,
            "stylePerso2": `oui`,
        },
    ],
    [{
            "perso1": `You`,
            "perso2": `Cell`,
            "stylePerso1": `non`,
            "stylePerso2": `oui`,
        },
        {
            "perso1": `You`,
            "perso2": `Cell`,
            "stylePerso1": `oui`,
            "stylePerso2": `non`,
        },
        {
            "perso1": `You`,
            "perso2": `Cell`,
            "stylePerso1": `non`,
            "stylePerso2": `oui`,
        },
        {
            "perso1": `You`,
            "perso2": `Cell`,
            "stylePerso1": `oui`,
            "stylePerso2": `non`,
        },
        {
            "perso1": `You`,
            "perso2": `Cell`,
            "stylePerso1": `non`,
            "stylePerso2": `oui`,
        },
    ],
    [{
            "perso1": `You`,
            "perso2": `Kaio`,
            "stylePerso1": `oui`,
            "stylePerso2": `non`,
        },
        {
            "perso1": `You`,
            "perso2": `Kaio`,
            "stylePerso1": `non`,
            "stylePerso2": `oui`,
        },
        {
            "perso1": `You`,
            "perso2": `Kaio`,
            "stylePerso1": `oui`,
            "stylePerso2": `non`,
        },
        {
            "perso1": `You`,
            "perso2": `Kaio`,
            "stylePerso1": `non`,
            "stylePerso2": `oui`,
        },
    ],
    [{
            "perso1": `You`,
            "perso2": `vegeta`,
            "stylePerso1": `oui`,
            "stylePerso2": `non`,
        },
        {
            "perso1": `You`,
            "perso2": `vegeta`,
            "stylePerso1": `non`,
            "stylePerso2": `oui`,
        },
        {
            "perso1": `You`,
            "perso2": `vegeta`,
            "stylePerso1": `oui`,
            "stylePerso2": `non`,
        },
        {
            "perso1": `You`,
            "perso2": `vegeta`,
            "stylePerso1": `non`,
            "stylePerso2": `oui`,
        },
    ],
    [{
            "perso1": `You`,
            "perso2": `Majin_boo`,
            "stylePerso1": `oui`,
            "stylePerso2": `non`,
        },
        {
            "perso1": `You`,
            "perso2": `Majin_boo`,
            "stylePerso1": `non`,
            "stylePerso2": `oui`,
        },
        {
            "perso1": `You`,
            "perso2": `Majin_boo`,
            "stylePerso1": `oui`,
            "stylePerso2": `non`,
        },
        {
            "perso1": `You`,
            "perso2": `Majin_boo`,
            "stylePerso1": `non`,
            "stylePerso2": `oui`,
        },
        {
            "perso1": `You`,
            "perso2": `Majin_boo`,
            "stylePerso1": `oui`,
            "stylePerso2": `non`,
        },
        {
            "perso1": `You`,
            "perso2": `Majin_boo`,
            "stylePerso1": `non`,
            "stylePerso2": `oui`,
        },
    ],
    [{
            "perso1": `You`,
            "perso2": `Gohan`,
            "stylePerso1": `oui`,
            "stylePerso2": `non`,
        },
        {
            "perso1": `You`,
            "perso2": `Gohan`,
            "stylePerso1": `non`,
            "stylePerso2": `oui`,
        },
        {
            "perso1": `You`,
            "perso2": `Piccolo`,
            "stylePerso1": `non`,
            "stylePerso2": `oui`,
        },
        {
            "perso1": `You`,
            "perso2": `Krillin`,
            "stylePerso1": `non`,
            "stylePerso2": `oui`,
        },
        {
            "perso1": `You`,
            "perso2": `Krillin`,
            "stylePerso1": `oui`,
            "stylePerso2": `non`,
        },
        {
            "perso1": `You`,
            "perso2": `Gohan`,
            "stylePerso1": `non`,
            "stylePerso2": `oui`,
        },
        {
            "perso1": `You`,
            "perso2": `Piccolo`,
            "stylePerso1": `non`,
            "stylePerso2": `oui`,
        },
        {
            "perso1": `You`,
            "perso2": `Krillin`,
            "stylePerso1": `non`,
            "stylePerso2": `oui`,
        },
        {
            "perso1": `You`,
            "perso2": `Krillin`,
            "stylePerso1": `oui`,
            "stylePerso2": `non`,
        },
    ],
    [{
            "perso1": `You`,
            "perso2": `Beerus`,
            "stylePerso1": `oui`,
            "stylePerso2": `non`,
        },
        {
            "perso1": `You`,
            "perso2": `Beerus`,
            "stylePerso1": `non`,
            "stylePerso2": `oui`,
        },
        {
            "perso1": `You`,
            "perso2": `Beerus`,
            "stylePerso1": `oui`,
            "stylePerso2": `non`,
        },
        {
            "perso1": `You`,
            "perso2": `Beerus`,
            "stylePerso1": `non`,
            "stylePerso2": `oui`,
        },
        {
            "perso1": `You`,
            "perso2": `Beerus`,
            "stylePerso1": `oui`,
            "stylePerso2": `non`,
        },
        {
            "perso1": `You`,
            "perso2": `Beerus`,
            "stylePerso1": `non`,
            "stylePerso2": `oui`,
        },
    ],
]

//ajouter fin Story victoire
const endStory = [
    [{
        "name": `You`,
        "perso": `You`,
        "dialogue": `"Nous avons enfin réussis! La Terre et l'univers est sauvé! Nous pouvons être fier de ce nous avons accomplit et nous montrons que l'alliance est plus forte que tout!"`
    }, ],
    [{
        "name": `Raditz `,
        "perso": `Raditz `,
        "dialogue": `"Voici la vrai puissance Saiyan!"`
    }, ],
    [{
        "name": `Piccolo `,
        "perso": `Piccolo `,
        "dialogue": `"Nous avons échouer Jeune Saiyan, Freezer a detruit Namek!"`
    }, ],
    [{
        "name": `Garlic Jr`,
        "perso": `Garlic-jr`,
        "dialogue": `"Ma puissance est incommensurable!"`
    }, ],
    [{
        "name": `Vegeta `,
        "perso": `Vegeta `,
        "dialogue": `"Je t'avais prévenu Jeune Saiyan! les cyborgs sont la race ultime"`
    }, ],
    [{
        "name": `Cell`,
        "perso": `Cell`,
        "dialogue": `"J'ai enfin ma forme ultime, je suis le maitre de l'univers!"`
    }, ],
    [{
        "name": `Kaio`,
        "perso": `Kaio`,
        "dialogue": `"Tu as échouer Jeune Saiyan! Tu as sous-estimer ton adversaire"`
    }, ],
    [{
        "name": `Vegeta`,
        "perso": `Vegeta`,
        "dialogue": `"J'ai gagner le tournois, Jeune Saiyan! Il va falloir que tu retourne t'entrainer dans la salle du temps pour espérer atteindre ma puissance"`
    }, ],
    [{
        "name": `Majin Boo`,
        "perso": `Majin_boo`,
        "dialogue": `"Je t'ai transformer en chocolat, maintenant je vais pouvoir te manger!"`
    }, ],
    [{
        "name": `You`,
        "perso": `You`,
        "dialogue": `"Je ne suis pas encore assez fort pour pouvoir protéger la Terre et ses habitants"`
    }, ],
    [{
        "name": `Beerus`,
        "perso": `Beerus`,
        "dialogue": `"Je vais engloutir votre monde!"`
    }, ],

]

function nextPart(map) {
    // Vérifie s'il y a encore des parties à afficher
    const imageUrl = "../assets/img/fond/" + nameMap[gameData.map - 1] + ".webp";
    if (gameData.currentPartIndex < storyDialogue[map - 1].length && gameData.gameOver === false) {
        if (gameData.currentPartIndex === 0) {
            constants.gameContainer.style.backgroundImage = `url("${imageUrl}")`;
            constants.gameContainer.style.backgroundSize = "cover";

            //Afficher les personnage actuelle de l'histoire
            const newDivPerso = document.createElement("div")
            newDivPerso.id = "divPerso"
            const newPerso1 = document.createElement("div")
            newPerso1.id = "perso1"
            const newPerso2 = document.createElement("div")
            newPerso2.id = "perso2"
            newDivPerso.appendChild(newPerso1)
            newDivPerso.appendChild(newPerso2)

            constants.gameContainer.appendChild(newDivPerso)


            // Affiche la partie actuelle de l'histoire
            const newDiv = document.createElement("div")
            newDiv.id = "divStory"
            const newDivName = document.createElement("div")
            newDivName.id = "divName"
            const newDivText = document.createElement("div")
            newDivText.id = "divText"
            const newPName = document.createElement("p")
            newPName.id = "textName"
            const newPText = document.createElement("p")
            newPText.id = "textStory"
            newDivName.appendChild(newPName)
            newDivText.appendChild(newPText);

            newDiv.appendChild(newDivName)
            newDiv.appendChild(newDivText)

            constants.gameContainer.appendChild(newDiv)
        }


        const personnages = storyPersonnage[map - 1][gameData.currentPartIndex]
        const newPerso1 = document.getElementById("perso1")
        newPerso1.style.backgroundImage = `url("../assets/img/personnage/${personnages.perso1}.png")`;
        if (gameData.currentPartIndex === 0) {
            if (personnages.stylePerso1 === "non") {
                newPerso1.style.filter = 'brightness(0.5)';

            } else {
                newPerso1.style.filter = 'brightness(1)';
                newPerso1.style.transform = 'scale(1.5)';
                newPerso1.style.transition = 'transform 0.5s ease';
                newPerso1.style.transformOrigin = 'top center';
            }
        } else {
            const ancienPerso = storyPersonnage[map - 1][gameData.currentPartIndex - 1]
            if (personnages.stylePerso1 === "non" && ancienPerso.stylePerso1 === "oui") {
                newPerso1.style.filter = 'brightness(0.5)';
                newPerso1.style.transform = 'scale(1)';
                newPerso1.style.transition = 'transform 0.5s ease';
                newPerso1.style.transformOrigin = 'none';
            } else if (personnages.stylePerso1 === "oui" && ancienPerso.stylePerso1 === "non") {
                newPerso1.style.filter = 'brightness(1)';
                newPerso1.style.transform = 'scale(1.5)';
                newPerso1.style.transition = 'transform 0.5s ease';
                newPerso1.style.transformOrigin = 'top center';
            }
        }



        const newPerso2 = document.getElementById("perso2")
        if (gameData.currentPartIndex === 0) {
            if (personnages.stylePerso2 === "non") {
                newPerso2.style.filter = 'brightness(0.5)';
            } else {
                newPerso2.style.filter = 'brightness(1)';
                newPerso2.style.transform = 'scale(1.5)';
                newPerso2.style.transition = 'transform 0.5s ease';
                newPerso2.style.transformOrigin = 'top center';
            }
        } else {
            const ancienPerso = storyPersonnage[map - 1][gameData.currentPartIndex - 1]
            if (personnages.stylePerso2 === "non" && ancienPerso.stylePerso2 === "oui") {
                newPerso2.style.filter = 'brightness(0.5)';
                newPerso2.style.transform = 'scale(1)';
                newPerso2.style.transition = 'transform 0.5s ease';
                newPerso2.style.transformOrigin = 'none';
            } else if (personnages.stylePerso2 === "oui" && ancienPerso.stylePerso2 === "non") {
                newPerso2.style.filter = 'brightness(1)';
                newPerso2.style.transform = 'scale(1.5)';
                newPerso2.style.transition = 'transform 0.5s ease';
                newPerso2.style.transformOrigin = 'top center';
            }
        }
        newPerso2.style.backgroundImage = `url("../assets/img/personnage/${personnages.perso2}.png")`;





        const dialogue = storyDialogue[map - 1][gameData.currentPartIndex]
        const newPName = document.getElementById("textName")
        newPName.innerText = dialogue.name
        const newPText = document.getElementById("textStory")
        newPText.innerText = dialogue.dialogue
        // Passage à la partie suivante
        gameData.currentPartIndex++;
    } else if (gameData.gameOver === true && gameData.currentPartIndex < endStory[map].length) {
        if (gameData.currentPartIndex === 0) {
            constants.gameContainer.style.backgroundImage = `url("${imageUrl}")`;
            constants.gameContainer.style.backgroundSize = "cover";

            //Afficher les personnage actuelle de l'histoire
            const newDivPerso = document.createElement("div")
            newDivPerso.id = "divPerso"
            const newPerso1 = document.createElement("div")
            newPerso1.id = "perso1"
            newDivPerso.appendChild(newPerso1)
            newPerso1.style.width = "100%"
            constants.gameContainer.appendChild(newDivPerso)


            // Affiche la partie actuelle de l'histoire
            const newDiv = document.createElement("div")
            newDiv.id = "divStory"
            const newDivName = document.createElement("div")
            newDivName.id = "divName"
            const newDivText = document.createElement("div")
            newDivText.id = "divText"
            const newPName = document.createElement("p")
            newPName.id = "textName"
            const newPText = document.createElement("p")
            newPText.id = "textStory"
            newDivName.appendChild(newPName)
            newDivText.appendChild(newPText);

            newDiv.appendChild(newDivName)
            newDiv.appendChild(newDivText)

            constants.gameContainer.appendChild(newDiv)
        }


        const personnages = endStory[map][gameData.currentPartIndex]
        const newPerso1 = document.getElementById("perso1")
        newPerso1.style.backgroundImage = `url("../assets/img/personnage/${personnages.perso}.png")`;
        const dialogue = endStory[map][gameData.currentPartIndex]
        const newPName = document.getElementById("textName")
        newPName.innerText = dialogue.name
        const newPText = document.getElementById("textStory")
        newPText.innerText = dialogue.dialogue
        // Passage à la partie suivante
        gameData.currentPartIndex++;

    } else {
        if (gameData.gameOver === true) {
            constants.gameContainer.style.backgroundImage = "none"
            const newDiv = document.getElementById("divStory")
            const newDivPerso = document.getElementById("divPerso")
            newDiv.remove()
            newDivPerso.remove()
            gameData.gameOver = false
            location.reload()
        } else {


            // Si toutes les parties de l'histoire ont été affichées
            constants.gameContainer.style.backgroundImage = "none"
            const newDiv = document.getElementById("divStory")
            const newDivPerso = document.getElementById("divPerso")
            newDiv.remove()
            newDivPerso.remove()

            if (map === 1) {
                startStory()
            } else {
                afterStory()
            }
        }
    }
}

function startStory() {
    constants.gameContainer.style.backgroundImage = "none"
    const intervalleMap = document.getElementById('intervalleMap')
    document.getElementById('niveauMap').innerText = nameMap[gameData.map - 1]
    intervalleMap.classList.remove('hidden')
    setTimeout(function () {
        intervalleMap.classList.add('hidden')
        constants.gameContainer.classList.remove('hidden')
        constants.paddle.classList.remove('hidden')
        constants.ball.classList.remove('hidden')
        constants.scoreElement.classList.remove('hidden')
        constants.livesElement.classList.remove('hidden')
        constants.timerElement.classList.remove('hidden')
        gameData.roadmap = mapStory
        gameData.currentPartIndex = 0
        initializeGame()
    }, 1000);
}

function afterStory() {
    const intervalleMap = document.getElementById('intervalleMap')

    document.getElementById('niveauMap').innerText = nameMap[gameData.map - 1]
    intervalleMap.classList.remove('hidden')
    setTimeout(function () {
        intervalleMap.classList.add('hidden')
        constants.gameContainer.classList.remove('hidden')
        constants.paddle.classList.remove('hidden')
        constants.ball.classList.remove('hidden')
        constants.scoreElement.classList.remove('hidden')
        constants.livesElement.classList.remove('hidden')
        constants.timerElement.classList.remove('hidden')
        gameData.roadmap = mapStory
        gameData.currentPartIndex = 0
        constants.bricks.forEach(brick => {
            brick.classList.remove('hidden');
        });
        resetBallAndPaddle();
        replaceBricks();
        resumeGame()
    }, 1000);
}

function victoryMapStory() {
    document.body.style = "background-color: #f0f0f0;"
    gameData.map += 1

    constants.paddle.classList.add('hidden')
    constants.ball.classList.add('hidden')
    constants.scoreElement.classList.add('hidden')
    constants.livesElement.classList.add('hidden')
    constants.timerElement.classList.add('hidden')
    constants.bricks.forEach(brick => {
        brick.remove();
    });

    if (gameData.map === 11) {
        // fin Story Victoire
        const imageUrl = "../assets/img/fond/" + nameMap[9] + ".webp";
        gameData.storyVictory === true
        constants.gameContainer.style.backgroundImage = `url("${imageUrl}")`;
        constants.gameContainer.style.backgroundSize = "cover";

        //Afficher les personnage actuelle de l'histoire
        const newDivPerso = document.createElement("div")
        newDivPerso.id = "divPerso"
        const newPerso1 = document.createElement("div")
        newPerso1.id = "perso1"
        newDivPerso.appendChild(newPerso1)
        newPerso1.style.width = "100%"
        constants.gameContainer.appendChild(newDivPerso)


        // Affiche la partie actuelle de l'histoire
        const newDiv = document.createElement("div")
        newDiv.id = "divStory"
        const newDivName = document.createElement("div")
        newDivName.id = "divName"
        const newDivText = document.createElement("div")
        newDivText.id = "divText"
        const newPName = document.createElement("p")
        newPName.id = "textName"
        const newPText = document.createElement("p")
        newPText.id = "textStory"
        newDivName.appendChild(newPName)
        newDivText.appendChild(newPText);

        newDiv.appendChild(newDivName)
        newDiv.appendChild(newDivText)

        constants.gameContainer.appendChild(newDiv)
        const personnages = endStory[0][0]
        newPerso1.style.backgroundImage = `url("../assets/img/personnage/${personnages.perso}.png")`;
        const dialogue = endStory[0][0]
        newPName.innerText = dialogue.name
        newPText.innerText = dialogue.dialogue
        gameData.storyVictory = true
    } else {
        nextPart(gameData.map)
    }
}

function gameOver() {
    constants.paddle.classList.add('hidden')
    constants.ball.classList.add('hidden')
    constants.scoreElement.classList.add('hidden')
    constants.livesElement.classList.add('hidden')
    constants.timerElement.classList.add('hidden')
    constants.bricks.forEach(brick => {
        brick.remove();
    });
    // fin Story gameOver
    gameData.gameOver = true
    nextPart(gameData.map)
}


export {
    storyDialogue,
    nextPart,
    victoryMapStory,
    gameOver
};