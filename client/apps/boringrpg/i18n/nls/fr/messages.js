if (typeof define !== 'function') { var define = require('amdefine')(module); }
define({
	"locale": "fr", // detector

	title: 'Le JDR barbant, de retour !',
	description: 'Un RPG ultra-simple',
	keywords: 'jeu, jdr, rpg, aventure',

	app_title: 'Le JDR barbant',
	play_button_caption: 'Jouer !',
	meta_header: 'Réglages',

	no_clickmsg:
		'Vous avez hâte de partir à l’aventure !',

	clickmsg_bored:
		'Vous vous ennuyez à tel point que vous bourrez un arbre des coups de poing pendant des heures… Vous gagnez +1 en force !',
	clickmsg_caravan:
		'Vous avez été recruté pour escorter une caravane de marchands. Vous gagnez 12 écus !',
	clickmsg_dying_man:
		'Un mourant dans la rue vous lègue tout ce qu’il possède. Vous gagnez 47 écus !',
	clickmsg_old_wizard:
		'Vous rencontrez un mystérieux vieux magicien… Avant de vous confier une quête, il vous raconte son histoire : Vous gagnez +1 en sagesse !',
	// electricbunnycomics.com
	clickmsg_good_necromancer:
		'Vous croisez un enfant sanglotant sur son hamster mort… Grâce à vos pouvoirs de nécromancie, vous le ranimez en hamster-zombie ! ' +
		'Curieusement, l’enfant pleure encore plus fort tout en s’enfuyant. Heureusement, vous gagnez quand même +1 d’agilité en évitant les pierres jetées par les villageois.',
	// dorkly
	clickmsg_talk_to_all_villagers:
		'Vous avez parlé à tous les villageois du village : Aucune quête n’a pu vous échapper ! ' +
		'Par contre, vous avez mal à la tête d’avoir autant discuté. Mais +1 en mana grâce à cet entraînement !',
	clickmsg_alwayis_keep_potions:
		'En bon aventurier, vous aviez gardé une potion de soin "au cas où" : Bien joué : votre santé est entièrement restaurée !',
	clickmsg_lost:
		'Avec toutes ces quêtes, vous en avez oublié où vous deviez aller. Mais tourner en rond d’un coin à l’autre de la région est bon pour votre santé : +1 en vitalité !',
	// DK
	clickmsg_fate_sword:
		'Pour vous remercier d’avoir sauvé sa femme et ses enfants, le fermier vous offre "destinée", l’épée transmise dans sa famille de générations en générations ! ' +
		'30 minutes plus tard, le marchand ne vous en donne que 17 écus... Quelle misère !!!',
	// dorkly
	clickmsg_grinding:
		'Faute de mieux, vous grindez pendant des heures et des heures… Et oui, c’est un RPG, vous vous attendiez à quoi ? Mais ça paie : +1 niveau !',
	// ?
	clickmsg_so_many_potions:
		'Le combat contre le boss final fut dur, très dur… Et surtout, +1 en force pour avoir réussi à vous retenir malgré les 28 potions que vous avez bu !',
	// cad-comic.com
	clickmsg_rematch:
		'Vous avez été battu par un gobelin ! Honteux, vous parcourez le pays, acceptant quête sur quête pour vous entraîner. ' +
		'Hélas, il en a fait autant de son côté et vous bat à nouveau ! Enfin bon, le +1 en niveau que vous aviez gagné servira bien un jour…',
	// paintraincomic.com
	clickmsg_useless:
		'Arrivé au village, le maire vous assure que le pays n’est pas dangereux ; La sorcière dont vous aviez entendu parler s’est trouvé quelqu’un et ne maudis plus personne ; ' +
		'Le cimetière hanté était un cimetière d’animaux de compagnie et les habitants sont heureux de les revoir ; Le géant aide les villageois aux travaux des champs. ' +
		'Vous vous sentez inutile et réfléchissez à votre place en ce monde… +1 en sagesse !',
	// memecenter.com
	clickmsg_escort:
		'Vous devez escorter un NPC important. Hélas, si vous marchez il va plus vite que vous, mais si vous courrez c’est vous qui allez trop vite ! ' +
		'En zigzagant et en tournant en rond ça passe. +1 en vitalité grâce à tous ces efforts !',
	// memecenter.com
	clickmsg_rare_goode_seller:
		'Vous croisez sur la route un vieil homme habillé de façon excentrique. Gagné, c’est un vendeur d’objets rares ! Il vous fait un très bon prix pour une [TODO weapon]',
	// memecenter.com
	clickmsg_progress_loop:
		'Il vous faudrait un meilleur équipement pour pouvoir monter en niveau. Mais il vous faudrait monter en niveau pour gagner un meilleur équipement. ' +
		'Cruel dilemne ! Heureusement, vous trouvez un [TODO weapon] au fond d’un puits !',
	// memecenter.com/motohorse
	clickmsg_idiot_bandits:
		'On parle de vous depuis que vous avez tué le dragon et la sorcière maléfique. Des bandits décident de vous tendre une embuscade pour vous voler votre butin. Quelle drôle d’idée ! ' +
		'Vous lisez dans leurs yeux qu’ils le comprennent, une fraction de seconde avant que votre boule de feu ne les réduise en cendre. ' +
		'Heureusement, les pièces d’or ne brûlent pas : +33 écus !',
	/*
	// ?
	clickmsg_:
		'',
	*/

	object_found: 'You found a [+1 Common Spiky Shield]!',

	combat_escaped: 'You were attacked by a [Level 1 Blind Falcon] but you got away just before it was about to kill you.'
});
