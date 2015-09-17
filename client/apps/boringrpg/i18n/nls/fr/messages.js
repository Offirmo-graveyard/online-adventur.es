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

	// original
	clickmsg_bored:
		'Vous vous ennuyez à tel point que vous bourrez un arbre des coups de poing pendant des heures…<br/>Vous gagnez +1 en force&nbsp;!',
	clickmsg_caravan:
		'Vous avez été recruté pour escorter une caravane de marchands.<br/>Vous gagnez 12 écus&nbsp;!',
	clickmsg_dying_man:
		'Un mourant dans la rue vous lègue tout ce qu’il possède.<br/>Vous gagnez 47 écus&nbsp;!',
	clickmsg_bacon:
		'You ate some bacon.<br/>' +
		'You gained +1 level!',
	clickmsg_mushroom:
		'You ate a mushroom.<br/>' +
		'You gained +1 level!',
	clickmsg_refreshing_nap:
		'You took a nap and feel refreshed.<br/>' +
		'You gained +1 vitality!',
	clickmsg_older:
		'You feel a little older.<br/>' +
		'You gained +1 level!',
	// me
	clickmsg_old_wizard:
		'Vous rencontrez un mystérieux vieux magicien…<br/>Avant de vous confier la quête, il vous raconte son histoire&nbsp;: Vous gagnez +1 en sagesse&nbsp;!',
	// electricbunnycomics.com
	clickmsg_good_necromancer:
		'Vous croisez un enfant sanglotant sur son hamster mort… Grâce à la nécromancie, vous le ranimez en hamster-zombie&nbsp;!<br/>' +
		'Curieusement, l’enfant pleure encore plus tout en s’enfuyant. Vous gagnez quand même +1 d’agilité en évitant les pierres jetées par les villageois.',
	// dorkly
	clickmsg_talk_to_all_villagers:
		'Vous avez parlé à tous les villageois du village&nbsp;: Aucune quête n’a pu vous échapper&nbsp;!<br/>' +
		'Par contre, vous avez mal à la tête d’avoir autant discuté. Mais +1 en mana grâce à cet entraînement&nbsp;!',
	clickmsg_alwayis_keep_potions:
		'En bon aventurier, vous aviez gardé une potion de soin "au cas où".<br/>' +
		'Bien joué : votre santé est parfaite : +1 vitalité&nbsp;!',
	clickmsg_lost:
		'Avec toutes ces quêtes, vous en avez oublié où vous devez aller… Mais tourner en rond d’un coin à l’autre de la région est un bon exercice&nbsp;: +1 en vitalité&nbsp;!',
	// DK
	clickmsg_fate_sword:
		'Pour vous remercier d’avoir sauvé sa femme et ses enfants, ' +
		'le fermier vous offre "destinée", l’épée transmise dans sa famille de générations en générations !<br/>' +
		'30 minutes plus tard, le marchand ne vous en donne que 17 écus… Quelle misère&nbsp;!',
	// dorkly
	clickmsg_grinding:
		'Faute de mieux, vous grindez pendant des heures et des heures… ' +
		'Et oui, c’est un RPG, vous vous attendiez à quoi&nbsp;?<br/>' +
		'Mais ça paie&nbsp;: +1 niveau&nbsp;!',
	// ?
	clickmsg_so_many_potions:
		'Le combat contre le boss final fut dur, très dur…<br/>' +
		'Et surtout, +1 en force pour avoir réussi à vous retenir malgré les 28 potions que vous avez bu&nbsp;!',
	// cad-comic.com
	clickmsg_rematch:
		'Vous avez été battu par un gobelin&nbsp;! Honteux, vous parcourez le pays, acceptant quête sur quête pour vous entraîner.<br/>' +
		'Hélas, il en a fait autant de son côté et vous bat à nouveau&nbsp;! Enfin bon, le +1 en niveau que vous aviez gagné servira bien un jour…',
	// paintraincomic.com
	clickmsg_useless:
		'Arrivé au village, le maire vous assure que le pays n’est pas dangereux&nbsp;; La sorcière dont vous aviez entendu parler s’est trouvé quelqu’un et ne maudis plus personne&nbsp;; ' +
		'Les fantômes du cimetière hanté s’occupent gentiment de leurs proches&nbsp;; ' +
		'Le géant aide les villageois aux travaux des champs.<br/>' +
		'Vous vous sentez inutile et réfléchissez à votre place en ce monde… +1 en sagesse&nbsp;!',
	// memecenter.com
	clickmsg_escort:
		'Vous devez escorter un NPC important.<br/>Hélas, si vous marchez il va plus vite que vous, mais si vous courrez c’est vous qui allez plus vite&nbsp;!<br/>' +
		'En zigzagant et en tournant en rond ça passe.<br/>+1 en vitalité grâce à tout cet exercice&nbsp;!',
	// memecenter.com
	clickmsg_rare_goode_seller:
		'Vous croisez sur la route un vieil homme habillé de façon excentrique. Gagné, c’est un vendeur d’objets rares&nbsp;!<br/>Il vous fait un très bon prix sur une [TODO weapon].',
	// memecenter.com
	clickmsg_progress_loop:
		'Il vous faudrait un meilleur équipement pour pouvoir monter en niveau. ' +
		'Mais il vous faudrait monter en niveau pour gagner un meilleur équipement. ' +
		'Cruel dilemme&nbsp;!<br/>' +
		'Heureusement, vous trouvez un [TODO weapon] au fond d’un puits&nbsp;!',
	// memecenter.com/motohorse
	clickmsg_idiot_bandits:
		'On parle de vous depuis que vous avez tué le dragon et la sorcière maléfique&nbsp;!<br/>' +
		'Des bandits vous tendent une embuscade pour voler votre butin.<br/>' +
		'Quelle drôle d’idée&nbsp;! Vous lisez dans leurs yeux qu’ils le comprennent, juste avant que votre boule de feu les réduise en cendre.<br/>' +
		'Heureusement, les pièces d’or ne brûlent pas&nbsp: +33 écus&nbsp;!',
	// don't remember the source for this one
	clickmsg_princess:
		'«&nbsp;Vous n’emporterez pas la princesse&nbsp;!&nbsp;» vous crie le terrible mage noir, alors que vous parvenez dans sa salle du trône. ' +
		'Vous le rassurez&nbsp;: seul le butin vous intéresse.<br/>' +
		'Il vous laisse vous servir (+234 écus) et enchante même une arme pour vous&nbsp;! ([TODO weapon])',
	// rpggeek.com
	clickmsg_:
		'',
	// "make friends" necromancy
	clickmsg_:
		'',
	// licorne multicolore
	clickmsg_:
		'',
	// DM of the ring
	clickmsg_bad_village:
		'Vous arrivez dans un village. Il n’y a pas de marchand d’armes. ' +
		'Pas de marchand de potions non plus&nbsp;! Et l’auberge ne propose pas de quêtes&nbsp;!!<br/>' +
		'C’en est trop&nbsp;: sur votre ordre, les éclairs et les météorites rasent ce lieu inutile.<br/>' +
		'Au passage, bon occasion de pratiquer votre magie&nbsp;: +1 mana.',
	// memes
	clickmsg_:
		'', // arrow in the knee
	// retour chez le mage noir, apprentissage de sorts
	clickmsg_:
		'',
	/*
	// ?
	clickmsg_:
		'',
	*/

	skill_spell_meteor:
		'Météorite',
	skill_spell_meteor_shower:
		'Pluie de météorite',
	skill_spell_lightning:
		'Éclair',
	skill_spell_storm:
		'Tempête d’éclairs',
	skill_necromancy_animate_dead:
		'Animation des morts',


	object_found: 'You found a [+1 Common Spiky Shield]!',

	combat_escaped: 'You were attacked by a [Level 1 Blind Falcon] but you got away just before it was about to kill you.'
});
