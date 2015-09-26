if (typeof define !== 'function') { var define = require('amdefine')(module); }
define({
	locale: 'fr', // detector
	locale_name: 'français',

	title: 'Le JDR barbant, de retour !',
	description: 'Un RPG ultra-simple',
	keywords: 'jeu, jdr, rpg, aventure',

	back: 'Retour',

	app_title: 'Le JDR barbant',
	play_button_caption: 'Jouer !',
	meta_header: 'Réglages',

	meta_volume: 'Son :',
	meta_volume_on: 'normal',
	meta_volume_off: 'éteint',
	meta_volume_half: 'faible',
	meta_music: 'Musique :',
	meta_music_on: 'oui',
	meta_music_off: 'non',
	meta_locale: 'Langue :',
	meta_tutorial: 'Tutoriel',
	meta_statistics: 'Statistiques',
	meta_rate_app: 'Noter l’appli',
	meta_share: 'Partager',
	meta_contact_us: 'Contact',
	meta_facebook: 'facebook',
	meta_twitter: 'twitter',
	meta_fork: 'Forker sur Github',
	meta_save: 'Sauvegarder',
	meta_update: 'Mettre à jour',
	meta_advanced: 'Avancé…',
	meta_fullscreen : 'Plein écran :',
	meta_fullscreen_on : 'actif',
	meta_fullscreen_off : 'inactif',
	meta_test_error: 'Tester une erreur',
	meta_reset: 'Réinitialiser le jeu',
	meta_refresh: 'relancer l’appli',
	meta_report_bugs: 'Signaler un bug',

	stats_level: 'Niveau',
	stats_health: 'Santé',
	stats_mana: ' Mana',
	stats_strength: 'Force',
	stats_agility: 'Agilité',
	stats_vitality: 'Vitalité',
	stats_wisdom: 'Sagesse',
	stats_luck: 'Chance',
	stats_coin_count: 'Écus',
	stats_item_count: 'Objets',
	stats_token_count: 'Jetons',
	stats_click_count: 'Clics',

	weapon_axe: 'hache',
	weapon_axe_gender: 'female',
	weapon_bow: 'arc',
	weapon_bow_gender: 'male',
	weapon_claw: 'griffe',
	weapon_claw_gender: 'female',
	weapon_dagger: 'dague',
	weapon_dagger_gender: 'female',
	weapon_grimoire: 'grimoire',
	weapon_grimoire_gender: 'male',
	weapon_harp: 'harpe',
	weapon_harp_gender: 'female',
	weapon_knife: 'couteau',
	weapon_knife_gender: 'male',
	weapon_longbow: 'arc long',
	weapon_longbow_gender: 'male',
	weapon_longsword: 'épée longue',
	weapon_longsword_gender: 'female',
	weapon_luth: 'luth',
	weapon_luth_gender: 'male',
	weapon_mace: 'masse',
	weapon_mace_gender: 'female',
	weapon_scythe: 'faux',
	weapon_scythe_gender: 'female',
	weapon_spear: 'lance',
	weapon_spear_gender: 'female',
	weapon_staff: 'bâton',
	weapon_staff_gender: 'male',
	weapon_sword: 'épée',
	weapon_sword_gender: 'female',
	weapon_wand: 'baguette',
	weapon_wand_gender: 'female',

	no_clickmsg:
		'Vous avez hâte de partir à l’aventure !',

	// original
	clickmsg_bored_log:
		'Vous vous ennuyez à tel point que vous bourrez un arbre des coups de poing pendant des heures…<br/>' +
		'Vous gagnez +1 en force !',
	clickmsg_caravan:
		'Vous avez été recruté pour escorter une caravane de marchands.<br/>' +
		'Vous gagnez {coins, number} écus !',
	clickmsg_dying_man:
		'Un mourant dans la rue vous lègue tout ce qu’il possède.<br/>' +
		'Vous gagnez {coins, number} écus !',
	clickmsg_ate_bacon:
		'Vous mangez du bacon.<br/>' +
		'Vous gagnez +1 niveau !',
	clickmsg_ate_mushroom:
		'Vous mangez un champignon.<br/>' +
		'Vous gagnez +1 niveau !',
	clickmsg_ate_zombie:
		'Vous mangez un zombie !<br/>' +
		'Vous gagnez +1 en mana!',
	clickmsg_refreshing_nap:
		'Vous faites une petite sieste et vous réveillez en pleine forme !<br/>' +
		'Vous gagnez +1 en vitalité!',
	clickmsg_older:
		'Vous vous sentez un peu plus vieux.<br/>' +
		'Vous gagnez +1 niveau !',
	clickmsg_stare_cup:
		'Vous fixez la cuillère intensément… et elle bouge presque !<br/>' +
		'Vous gagnez +2 en mana !',
	clickmsg_nuclear_fusion_paper:
		'You écrivez une thèse sur la fusion nucléaire.<br/>' +
		'Vous gagnez +1 en sagesse !',
	clickmsg_found_green_mushroom:
		'Vous avez trouvé un champignon vert.<br/>' +
		'Vous gagnez +1 niveau !',

	// me
	clickmsg_meet_old_wizard:
		'Vous rencontrez un vieux magicien mystérieux…<br/>' +
		'Avant de vous confier la quête, il vous raconte son histoire : Vous gagnez +1 en sagesse !',
	// electricbunnycomics.com
	clickmsg_good_necromancer:
		'Vous croisez un enfant sanglotant sur son hamster mort… Grâce à la nécromancie, vous le ranimez en hamster-zombie !<br/>' +
		'Curieusement, l’enfant pleure encore plus tout en s’enfuyant. Vous gagnez quand même +1 d’agilité en évitant les pierres jetées par les villageois.',
	// dorkly
	clickmsg_talk_to_all_villagers:
		'Vous avez parlé à tous les villageois du village : Aucune quête n’a pu vous échapper !<br/>' +
		'Par contre, vous avez mal à la tête d’avoir autant discuté. Mais +1 en mana grâce à cet entraînement !',
	clickmsg_always_keep_potions:
		'En bon aventurier, vous aviez gardé une potion de soin "au cas où".<br/>' +
		'Bien joué : votre santé est parfaite : +1 vitalité !',
	clickmsg_lost:
		'Avec toutes ces quêtes, vous en avez oublié où vous deviez aller… Mais tourner en rond d’un coin à l’autre de la région est un bon exercice : +1 en vitalité !',
	// DK
	clickmsg_fate_sword:
		'Pour vous remercier d’avoir sauvé sa femme et ses enfants, ' +
		'le fermier vous offre "destinée", l’épée transmise dans sa famille de générations en générations !<br/>' +
		'30 minutes plus tard, le marchand ne vous en donne que {coins, number} écus… Quelle misère !',
	// dorkly
	clickmsg_grinding:
		'Faute de mieux, vous grindez pendant des heures et des heures… ' +
		'Et oui, c’est un RPG, vous vous attendiez à quoi ?<br/>' +
		'Mais ça paie : +1 niveau !',
	// ?
	clickmsg_so_many_potions:
		'Le combat contre le boss final fut dur, très dur…<br/>' +
		'Et surtout, +1 en force pour avoir réussi à vous retenir malgré les 28 potions que vous avez bu !',
	// cad-comic.com
	clickmsg_rematch:
		'Vous avez été battu par un gobelin ! Honteux, vous parcourez le pays, acceptant quête sur quête pour vous entraîner.<br/>' +
		'Hélas, il en a fait autant de son côté et vous bat à nouveau ! Enfin bon, le +1 en niveau que vous aviez gagné servira bien un jour…',
	// paintraincomic.com
	clickmsg_useless:
		'Arrivé au village, le maire vous assure que le pays n’est pas dangereux ; La sorcière dont vous aviez entendu parler s’est trouvé quelqu’un et ne maudis plus personne ; ' +
		'Les fantômes du cimetière hanté s’occupent gentiment de leurs proches ; ' +
		'Le géant aide les villageois aux travaux des champs.<br/>' +
		'Vous vous sentez inutile et réfléchissez à votre place en ce monde… +1 en sagesse !',
	// memecenter.com
	clickmsg_escort:
		'Vous devez escorter un NPC important.<br/>' +
		'Hélas, si vous marchez il va plus vite que vous, mais si vous courrez c’est vous qui allez plus vite !<br/>' +
		'En zigzagant et en tournant en rond ça passe.<br/>' +
		'+1 en vitalité grâce à tout cet exercice !',
	// memecenter.com
	clickmsg_rare_goods_seller:
		'Vous croisez sur la route un vieil homme habillé de façon excentrique. Gagné, c’est un vendeur d’objets rares !<br/>Il vous fait un très bon prix sur une [TODO weapon].',
	// memecenter.com
	clickmsg_progress_loop:
		'Il vous faudrait un meilleur équipement pour pouvoir monter en niveau. ' +
		'Mais il vous faudrait monter en niveau pour gagner un meilleur équipement. ' +
		'Cruel dilemme !<br/>' +
		'Heureusement, vous trouvez un [TODO weapon] au fond d’un puits !',
	// memecenter.com/motohorse
	clickmsg_idiot_bandits:
		'On parle de vous depuis que vous avez tué le dragon et la sorcière maléfique !<br/>' +
		'Des bandits vous tendent une embuscade pour voler votre butin.<br/>' +
		'Quelle drôle d’idée ! Vous lisez dans leurs yeux qu’ils le comprennent, juste avant que votre boule de feu les réduise en cendre.<br/>' +
		'Heureusement, les pièces d’or ne brûlent pas&nbsp: +{coins, number} écus !',
	// don't remember the source for this one
	clickmsg_princess:
		'« Vous n’emporterez pas la princesse ! » vous crie le terrible mage noir, alors que vous parvenez au sommet du dongeon. ' +
		'Vous le rassurez : seul le butin vous intéresse.<br/>' +
		'Il vous laisse vous servir (+{coins, number} écus) et enchante même une arme pour vous ! ([TODO weapon])',
	// "make friends" necromancy
	xclickmsg_make_friends:
		'',
	// licorne multicolore
	xclickmsg_unicorns:
		'',
	// DM of the ring
	clickmsg_bad_village:
		'Vous arrivez dans un village. Il n’y a pas de marchand d’armes ou de potions !<br/>' +
		'Et l’auberge ne propose pas de quêtes !!<br/>' +
		'C’en est trop : sur votre ordre, les éclairs et les météorites tombent du ciel pour raser ce pitoyable endroit.<br/>' +
		'Au passage, bonne occasion de pratiquer votre magie : +1 mana.',
	// memes
	xclickmsg_arrown_in_the_knee:
		'', // arrow in the knee
	// retour chez le mage noir, apprentissage de sorts
	xclickmsg_black_mage_again:
		'',
	// ?
	clickmsg_mana_mana:
		'« Mah na mah na »<br/>' +
		'« Tou tou tou dou dou »<br/>' +
		'+1 mana !<br/>',
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
