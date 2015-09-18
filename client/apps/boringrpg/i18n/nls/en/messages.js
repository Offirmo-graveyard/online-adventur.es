if (typeof define !== 'function') { var define = require('amdefine')(module); }
define({
	"locale": "en", // detector

	title: 'The Boring RPG reloaded',
	description: 'The most simple RPG',
	keywords: 'game, RPG, adventure',

	app_title: 'The Boring RPG',
	play_button_caption: 'Play!',
	meta_header: 'Settings',

	stats_level: 'Level',
	stats_health: 'Health',
	stats_mana: 'Mana',
	stats_strength: 'Strength',
	stats_agility: 'Agility',
	stats_vitality: 'Vitality',
	stats_wisdom: 'Wisdom',
	stats_luck: 'Luck',
	stats_money: 'Gold',
	stats_item_count: 'Items',
	stats_token_count: 'Tokens',
	stats_click_count: 'Clicks',

	no_clickmsg:
		'You eager to start adventuring!',

	// original
	clickmsg_bored:
		'You were so bored, you punched a log for hours!<br/>' +
		'You gained +1 strength!',
	clickmsg_caravan:
		'You were hired to protect a caravan of merchants.<br/>' +
		'You gained 12 coins!',
	clickmsg_dying_man:
		'A dying man on the street left you everything he had.<br/>' +
		'You gained 47 coins!',
	clickmsg_ate_bacon:
		'You ate some bacon.<br/>' +
		'You gained +1 level!',
	clickmsg_ate_mushroom:
		'You ate a mushroom.<br/>' +
		'You gained +1 level!',
	clickmsg_ate_zombie:
		'You ate a zombie.<br/>' +
		'You gained +1 mana!',
	clickmsg_refreshing_nap:
		'You took a nap and feel refreshed.<br/>' +
		'You gained +1 vitality!',
	clickmsg_older:
		'You feel a little older.<br/>' +
		'You gained +1 level!',
	clickmsg_stare_cup:
		'You stare really hard at a cup, and it almost moves!<br/>' +
		'You gained +2 mana!',
	clickmsg_nuclear_fusion_paper:
		'You wrote a paper on nuclear fusion.<br/>' +
		'You gained +1 wisdom!',

	// me
	clickmsg_old_wizard:
		'Vous meet a mysterious old wizard…<br/>' +
		'Before giving you the quest, he tells you his loooong story : Vous gain +1 wisdom!',
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
	// don't remember the source for this one
	clickmsg_princess:
		'« Vous n’emporterez pas la princesse ! » vous crie le terrible mage noir, alors que vous parvenez dans sa salle du trône. ' +
		'Vous le rassurez : seul le butin vous intéresse. Il vous laisse vous servir (+234 écus) et enchante même une arme pour vous ! ([TODO weapon])',
	// "make friends" necromancy
	xclickmsg_make_friends:
		'',
	// licorne multicolore
	xclickmsg_unicorns:
		'',
	// DM of the ring
	clickmsg_bad_village:
		'Vous arrivez dans un village. Il n’y a pas de marchand d’armes. ' +
		'Pas de marchand de potions non plus ! Et l’auberge ne propose pas de quêtes !!<br/>' +
		'C’en est trop : sur votre ordre, les éclairs et les météorites rasent ce lieu inutile.<br/>' +
		'Au passage, bon occasion de pratiquer votre magie : +1 mana.',
	// memes
	xclickmsg_arrown_in_the_knee:
		'', // arrow in the knee
	// retour chez le mage noir, apprentissage de sorts
	xclickmsg_black_mage_again:
		'',
	// ?
	clickmsg_mana_mana:
		'« Mah na mah na » « To to to do do »<br/>' +
		'+1 mana!',



	object_found: 'You found a [+1 Common Spiky Shield]!',

	combat_escaped: 'You were attacked by a [Level 1 Blind Falcon] but you got away just before it was about to kill you.'
});
