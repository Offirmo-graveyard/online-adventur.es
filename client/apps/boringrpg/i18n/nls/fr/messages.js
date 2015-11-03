if (typeof define !== 'function') { var define = require('amdefine')(module); }
define({
	// locale id
	locale: 'fr',
	locale_name: 'français',

	// content
	// http://formatjs.io/guides/message-syntax/

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

	inventory_widget_title: 'Inventaire',
	knowledge_widget_title: 'Savoir',

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
	weapongender_axe: 'female',
	weapon_bow: 'arc',
	weapongender_bow: 'male',
	weapon_claw: 'griffe',
	weapongender_claw: 'female',
	weapon_dagger: 'dague',
	weapongender_dagger: 'female',
	weapon_grimoire: 'grimoire',
	weapongender_grimoire: 'male',
	weapon_harp: 'harpe',
	weapongender_harp: 'female',
	weapon_knife: 'couteau',
	weapongender_knife: 'male',
	weapon_longbow: 'arc long',
	weapongender_longbow: 'male',
	weapon_longsword: 'épée longue',
	weapongender_longsword: 'female',
	weapon_luth: 'luth',
	weapongender_luth: 'male',
	weapon_mace: 'masse',
	weapongender_mace: 'female',
	weapon_scythe: 'faux',
	weapongender_scythe: 'female',
	weapon_spear: 'lance',
	weapongender_spear: 'female',
	weapon_staff: 'bâton',
	weapongender_staff: 'male',
	weapon_sword: 'épée',
	weapongender_sword: 'female',
	weapon_wand: 'baguette',
	weapongender_wand: 'female',

	weaponqualif1_admirable: 'admirable',
	weaponqualif1_arcanic: 'arcanique',
	weaponqualif1_bestial: '{gender, select, male {bestial} other {bestiale}}',
	weaponqualif1_bone: 'd’os',
	weaponqualif1_brass: 'de cuivre',
	weaponqualif1_cardboard: 'en carton',
	weaponqualif1_complex: 'complexe',
	weaponqualif1_composite: 'composite',
	weaponqualif1_consecrated: '{gender, select, male {consacré} other {consacrée}}',
	weaponqualif1_crafted: '{gender, select, male {artisanal} other {artisanale}}',
	weaponqualif1_cruel: '{gender, select, male {cruel} other {cruelle}}',
	weaponqualif1_cunning: '{gender, select, male {rusé} other {rusée}}',
	weaponqualif1_cursed: '{gender, select, male {maudit} other {maudite}}',
	weaponqualif1_emerald: 'd’émeraude',
	weaponqualif1_engraved: '{gender, select, male {gravé} other {gravée}}',
	weaponqualif1_forbidden: '{gender, select, male {interdit} other {interdite}}',
	weaponqualif1_forgotten: '{gender, select, male {oublié} other {oubliée}}',
	weaponqualif1_ghost: 'fantôme',
	weaponqualif1_golden: 'd’or',
	weaponqualif1_heavy: '{gender, select, male {lourd} other {lourde}}',
	weaponqualif1_heroic: 'héroïque',
	weaponqualif1_holy: '{gender, select, male {saint} other {sainte}}',
	weaponqualif1_inflexible: 'inflexible',
	weaponqualif1_invincible: 'invincible',
	weaponqualif1_iron: 'de fer',
	weaponqualif1_jade: 'de jade',
	weaponqualif1_light: '{gender, select, male {léger} other {légère}}',
	weaponqualif1_living: '{gender, select, male {vivant} other {vivante}}',
	weaponqualif1_lost: '{gender, select, male {perdu} other {perdue}}',
	weaponqualif1_mechanical: 'mécanique',
	weaponqualif1_mysterious: '{gender, select, male {mystérieux} other {mystérieuse}}',
	weaponqualif1_old: '{gender, select, male {vieux} other {vieille}}',
	weaponqualif1_onyx: 'd’onyx',
	weaponqualif1_overrated: '{gender, select, male {surfait} other {surfaite}}',
	weaponqualif1_powerful: '{gender, select, male {puissant} other {puissante}}',
	weaponqualif1_practical: 'pratique',
	weaponqualif1_proven: '{gender, select, male {éprouvé} other {éprouvée}}',
	weaponqualif1_raging: '{gender, select, male {enragé} other {enragée}}',
	weaponqualif1_robust: 'robuste',
	weaponqualif1_sapphire: 'de saphir',
	weaponqualif1_savage: 'sauvage',
	weaponqualif1_silver: 'd’argent',
	weaponqualif1_simple: 'simple',
	weaponqualif1_sinister: 'sinistre',
	weaponqualif1_skeleton: 'squelette',
	weaponqualif1_solid: 'solide',
	weaponqualif1_steel: 'd’acier',
	weaponqualif1_strange: 'étrange',
	weaponqualif1_subtile: 'subtile',
	weaponqualif1_swift: 'rapide',
	weaponqualif1_unwavering: 'inébranlable',
	weaponqualif1_used: '{gender, select, male {usé} other {usée}}',
	weaponqualif1_whirling: '{gender, select, male {tournoyant} other {tournoyante}}',
	weaponqualif1_wooden: 'en bois',

	weaponqualif2_adjudicator: 'de juge',
	weaponqualif2_ambassador: 'd’ambassadeur',
	weaponqualif2_ancients: 'des Anciens',
	weaponqualif2_apprentice: 'd’apprenti',
	weaponqualif2_assaulting: 'd’assaut',
	weaponqualif2_beginner: 'de débutant',
	weaponqualif2_brave: 'de brave',
	weaponqualif2_conqueror: 'de conquérant',
	weaponqualif2_cruel_tyrant: 'de tyran cruel',
	weaponqualif2_defender: 'de défenseur',
	weaponqualif2_destructor: 'de destructeur',
	weaponqualif2_dwarven: 'des nains',
	weaponqualif2_elite: 'd’élite',
	weaponqualif2_elven: 'elfique',
	weaponqualif2_executioner: 'de bourreau',
	weaponqualif2_expert: 'd’expert',
	weaponqualif2_explorer: 'd’explorateur',
	weaponqualif2_gladiator: 'de gladiateur',
	weaponqualif2_goddess: 'de la déesse',
	weaponqualif2_guard: 'de guarde',
	weaponqualif2_hunter: 'de chasseur',
	weaponqualif2_judgement: 'de jugement',
	weaponqualif2_king: 'de roi',
	weaponqualif2_mediator: 'de médiateur',
	weaponqualif2_mercenary: 'de mercenaire',
	weaponqualif2_militia: 'de militien',
	weaponqualif2_nightmare: 'du cauchemar',
	weaponqualif2_noble: 'de noble',
	weaponqualif2_noob: 'de noob',
	weaponqualif2_pilgrim: 'de pélerin',
	weaponqualif2_pioneer: 'de pionnier',
	weaponqualif2_pirate: 'de pirate',
	weaponqualif2_profane: 'de profane',
	weaponqualif2_ranger: 'de traqueur',
	weaponqualif2_sorcerer: 'de sorcier',
	weaponqualif2_tormentor: 'de tourmenteur',
	weaponqualif2_training: 'd’entraînement',
	weaponqualif2_traveler: 'de voyageur',
	weaponqualif2_twink: 'de twink',
	weaponqualif2_tyrant: 'de tyran',
	weaponqualif2_upholder: 'de justicier',
	weaponqualif2_warfield: 'du champ de bataille',
	weaponqualif2_warfield_king: 'de roi du champ de bataille',
	weaponqualif2_warrior: 'de guerrier',
	weaponqualif2_wise: 'de sage',
	weaponqualif2_woodsman: 'de forestier',

	weapon: function build_weapon_name(weapon, intl, libs, debug_id) {
		var weapon_gender = libs.format('weapongender_' + weapon.type.id, {});

		var parts = libs.format_multiple([
			weapon.type.msg_key,
			weapon.qualif1.msg_key,
			weapon.qualif2.msg_key
		], {gender: weapon_gender});

		return parts.join(' ');
	},

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
		'Vous gagnez +1 en mana !',
	clickmsg_refreshing_nap:
		'Vous faites une petite sieste et vous réveillez en pleine forme !<br/>' +
		'Vous gagnez +1 en vitalité !',
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
