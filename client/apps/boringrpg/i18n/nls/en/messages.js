if (typeof define !== 'function') { var define = require('amdefine')(module); }
define({
	"locale": "en", // detector

	title: 'The Boring RPG reloaded',
	description: 'The most simple RPG',
	keywords: 'game, RPG, adventure',

	app_title: 'The Boring RPG',
	play_button_caption: 'Play!',
	meta_header: 'Settings',

	no_clickmsg:
		'You eager to start adventuring!',

	clickmsg_bored:
		'You were so bored, you punched a log for hours! You gained +1 strength!',
	clickmsg_caravan:
		'You were hired to protect a caravan of merchants. You gained 12 coins!',
	clickmsg_dying_man:
		'A dying man on the street left you everything he had. You gained 47 coins!',
	clickmsg_old_wizard:
		'Vous rencontrez un mystérieux vieux magicien… Avant de vous confier la quête, il vous raconte sa loooongue histoire : Vous gagnez +1 en sagesse !',
	// electricbunnycomics.com
	clickmsg_good_necromancer:
		'Vous croisez un enfant sanglotant sur son hamster mort… Grâce à vos pouvoirs de nécromancie, vous le ranimez en hamster-zombie avec ! ' +
		'Curieusement, l’enfant pleure encore plus fort tout en s’enfuyant. Heureusement, vous gagnez +1 d’agilité en évitant les pierres jetées par les villageois.',
	// dorkly
	clickmsg_talk_to_all_villagers:
		'Vous avez parlé à tous les villageois du village : Aucune quête n’a pu vous échapper ! ' +
		'Par contre, vous avez mal à la tête d’avoir autant discuté. Mais +1 mana grâce à cet entraînement !',
	clickmsg_alwayis_keep_potions:
		'En bon aventurier, vous aviez gardé une potion de soin "au cas où" : Bravo, votre santé est entièrement restaurée !',
	clickmsg_lost:
		'Avec toutes ces quêtes, vous en avez oublié où vous deviez aller. Mais tourner en rond dans toute la région est bon pour votre santé : +1 en vitalité !',
	// DK
	clickmsg_fate_sword:
		'Pour vous remercier d’avoir sauvé sa femme et ses enfants, le fermier vous offre "destinée", l’épée transmise dans sa famille de générations en générations. ' +
		'30 minutes plus tard, le marchand ne vous en donne que 17 écus... Ah ces pauvres !!!',
	// dorkly
	clickmsg_grinding:
		'Faute de mieux, vous grindez pendant des heures et des heures… Et oui, c’est un RPG, vous vous attendiez à quoi ? Mais ça paie : +1 niveau !',
	// ?
	clickmsg_so_many_potions:
		'Le combat contre le boss final fut dur, très dur… Et surtout, +1 en force pour avoir réussi à vous retenir après avoir bu 25 potions !',
	// cad-comic.com
	clickmsg_rematch:
		'Vous avez été battu par un gobelin ! Honteux, vous parcourez le pays, acceptant quête sur quête pour vous entraîner. ' +
		'Hélas, il en a fait autant et vous bat à nouveau ! Enfin bon, le +1 de niveau servira bien quand même…',
	// paintraincomic.com
	clickmsg_useless:
		'Arrivé au village, le maire vous assure que le pays n’est pas dangereux ; La sorcière dont vous aviez entendu parler s’est trouvé quelqu’un et ne maudis plus personne. ' +
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
		'Il vous faudrait un meilleur équipement pour pouvoir monter en niveau. Mais il faudrait monter en niveau pour pouvoir gagner un meilleur équipement. ' +
		'Cruel dilemne ! Heureusement, vous trouvez un [TODO weapon] au fond d’un puit !',
	// memecenter.com/motohorse
	clickmsg_idiot_bandits:
		'On parle de vous après que vous ayez tué le dragon et la sorcière maléfique. Des bandits vous tendent une embuscade. Quelle drôle d’idée ! ' +
		'À voir ses yeux, le dernier l’a presque compris une fraction de seconde avant que votre boule de feu ne le réduise en cendre. ' +
		'Heureusement, les pièces d’or ne brûlent pas : +33 écus !',

	object_found: 'You found a [+1 Common Spiky Shield]!',

	combat_escaped: 'You were attacked by a [Level 1 Blind Falcon] but you got away just before it was about to kill you.'
});
