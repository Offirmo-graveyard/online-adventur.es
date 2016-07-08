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

	timer_text: '{delay_s, plural, =0 {Vous pouvez cliquer !} other {Encore {humanized_delay}…}}',

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

	inventory_control_quality: 'Rareté',
	inventory_control_enchant_level: 'Améliorations',
	inventory_control_damage: 'Dégâts : {min_damage, number} - {max_damage, number}',
	inventory_control_cmd_sell: 'Vendre',
	inventory_control_cmd_equip: 'Équiper',

	weapon_base_axe: 'hache',
	weapongender_axe: 'female',
	weapon_base_bow: 'arc',
	weapongender_bow: 'male',
	weapon_base_claw: 'griffe',
	weapongender_claw: 'female',
	weapon_base_dagger: 'dague',
	weapongender_dagger: 'female',
	weapon_base_grimoire: 'grimoire',
	weapongender_grimoire: 'male',
	weapon_base_harp: 'harpe',
	weapongender_harp: 'female',
	weapon_base_knife: 'couteau',
	weapongender_knife: 'male',
	weapon_base_longbow: 'arc long',
	weapongender_longbow: 'male',
	weapon_base_longsword: 'épée longue',
	weapongender_longsword: 'female',
	weapon_base_luth: 'luth',
	weapongender_luth: 'male',
	weapon_base_mace: 'masse',
	weapongender_mace: 'female',
	weapon_base_scythe: 'faux',
	weapongender_scythe: 'female',
	weapon_base_spear: 'lance',
	weapongender_spear: 'female',
	weapon_base_spoon: 'cuillère',
	weapongender_spoon: 'female',
	weapon_base_staff: 'bâton',
	weapongender_staff: 'male',
	weapon_base_sword: 'épée',
	weapongender_sword: 'female',
	weapon_base_wand: 'baguette',
	weapongender_wand: 'female',

	weapon_qualifier1_admirable: 'admirable',
	weapon_qualifier1_arcanic: 'arcanique',
	weapon_qualifier1_bestial: '{gender, select, male {bestial} other {bestiale}}',
	weapon_qualifier1_bone: 'd’os',
	weapon_qualifier1_brass: 'de cuivre',
	weapon_qualifier1_cardboard: 'en carton',
	weapon_qualifier1_complex: 'complexe',
	weapon_qualifier1_composite: 'composite',
	weapon_qualifier1_consecrated: '{gender, select, male {consacré} other {consacrée}}',
	weapon_qualifier1_crafted: '{gender, select, male {artisanal} other {artisanale}}',
	weapon_qualifier1_cruel: '{gender, select, male {cruel} other {cruelle}}',
	weapon_qualifier1_cunning: '{gender, select, male {rusé} other {rusée}}',
	weapon_qualifier1_cursed: '{gender, select, male {maudit} other {maudite}}',
	weapon_qualifier1_emerald: 'd’émeraude',
	weapon_qualifier1_engraved: '{gender, select, male {gravé} other {gravée}}',
	weapon_qualifier1_forbidden: '{gender, select, male {interdit} other {interdite}}',
	weapon_qualifier1_forgotten: '{gender, select, male {oublié} other {oubliée}}',
	weapon_qualifier1_ghost: 'fantôme',
	weapon_qualifier1_golden: 'd’or',
	weapon_qualifier1_heavy: '{gender, select, male {lourd} other {lourde}}',
	weapon_qualifier1_heroic: 'héroïque',
	weapon_qualifier1_holy: '{gender, select, male {saint} other {sainte}}',
	weapon_qualifier1_inflexible: 'inflexible',
	weapon_qualifier1_invincible: 'invincible',
	weapon_qualifier1_iron: 'de fer',
	weapon_qualifier1_jade: 'de jade',
	weapon_qualifier1_light: '{gender, select, male {léger} other {légère}}',
	weapon_qualifier1_living: '{gender, select, male {vivant} other {vivante}}',
	weapon_qualifier1_lost: '{gender, select, male {perdu} other {perdue}}',
	weapon_qualifier1_mechanical: 'mécanique',
	weapon_qualifier1_mysterious: '{gender, select, male {mystérieux} other {mystérieuse}}',
	weapon_qualifier1_old: '{gender, select, male {vieux} other {vieille}}',
	weapon_qualifier1_onyx: 'd’onyx',
	weapon_qualifier1_overrated: '{gender, select, male {surfait} other {surfaite}}',
	weapon_qualifier1_powerful: '{gender, select, male {puissant} other {puissante}}',
	weapon_qualifier1_practical: 'pratique',
	weapon_qualifier1_proven: '{gender, select, male {éprouvé} other {éprouvée}}',
	weapon_qualifier1_raging: '{gender, select, male {enragé} other {enragée}}',
	weapon_qualifier1_robust: 'robuste',
	weapon_qualifier1_sapphire: 'de saphir',
	weapon_qualifier1_savage: 'sauvage',
	weapon_qualifier1_silver: 'd’argent',
	weapon_qualifier1_simple: 'simple',
	weapon_qualifier1_sinister: 'sinistre',
	weapon_qualifier1_skeleton: 'squelette',
	weapon_qualifier1_solid: 'solide',
	weapon_qualifier1_steel: 'd’acier',
	weapon_qualifier1_strange: 'étrange',
	weapon_qualifier1_subtile: '{gender, select, male {subtil} other {subtile}}',
	weapon_qualifier1_swift: 'rapide',
	weapon_qualifier1_unwavering: 'inébranlable',
	weapon_qualifier1_used: '{gender, select, male {usé} other {usée}}',
	weapon_qualifier1_whirling: '{gender, select, male {tournoyant} other {tournoyante}}',
	weapon_qualifier1_wooden: 'en bois',

	weapon_qualifier2_adjudicator: 'de juge',
	weapon_qualifier2_ambassador: 'd’ambassadeur',
	weapon_qualifier2_ancients: 'des Anciens',
	weapon_qualifier2_apprentice: 'd’apprenti',
	weapon_qualifier2_assaulting: 'd’assaut',
	weapon_qualifier2_beginner: 'de débutant',
	weapon_qualifier2_brave: 'de brave',
	weapon_qualifier2_conqueror: 'de conquérant',
	weapon_qualifier2_cruel_tyrant: 'de tyran cruel',
	weapon_qualifier2_defender: 'de défenseur',
	weapon_qualifier2_destructor: 'de destructeur',
	weapon_qualifier2_dwarven: 'des nains',
	weapon_qualifier2_elite: 'd’élite',
	weapon_qualifier2_elven: 'elfique',
	weapon_qualifier2_executioner: 'de bourreau',
	weapon_qualifier2_expert: 'd’expert',
	weapon_qualifier2_explorer: 'd’explorateur',
	weapon_qualifier2_gladiator: 'de gladiateur',
	weapon_qualifier2_goddess: 'de la déesse',
	weapon_qualifier2_guard: 'de guarde',
	weapon_qualifier2_hunter: 'de chasseur',
	weapon_qualifier2_judgement: 'de jugement',
	weapon_qualifier2_king: 'de roi',
	weapon_qualifier2_mediator: 'de médiateur',
	weapon_qualifier2_mercenary: 'de mercenaire',
	weapon_qualifier2_militia: 'de militien',
	weapon_qualifier2_nightmare: 'du cauchemar',
	weapon_qualifier2_noble: 'de noble',
	weapon_qualifier2_noob: 'de noob',
	weapon_qualifier2_pilgrim: 'de pélerin',
	weapon_qualifier2_pioneer: 'de pionnier',
	weapon_qualifier2_pirate: 'de pirate',
	weapon_qualifier2_profane: 'de profane',
	weapon_qualifier2_ranger: 'de traqueur',
	weapon_qualifier2_sorcerer: 'de sorcier',
	weapon_qualifier2_tormentor: 'de tourmenteur',
	weapon_qualifier2_training: 'd’entraînement',
	weapon_qualifier2_traveler: 'de voyageur',
	weapon_qualifier2_twink: 'de twink',
	weapon_qualifier2_tyrant: 'de tyran',
	weapon_qualifier2_upholder: 'de justicier',
	weapon_qualifier2_warfield: 'du champ de bataille',
	weapon_qualifier2_warfield_king: 'de roi du champ de bataille',
	weapon_qualifier2_warrior: 'de guerrier',
	weapon_qualifier2_wise: 'de sage',
	weapon_qualifier2_woodsman: 'de forestier',

	weapon_quality_common: 'commune',
	weapon_quality_uncommon: 'peu commune',
	weapon_quality_rare: 'rare',
	weapon_quality_epic: 'épique',
	weapon_quality_legendary: 'légendaire',
	weapon_quality_artifact: 'artefact',

	weapon: function build_weapon_name(weapon, intl, libs, debug_id) {
		var weapon_gender = libs.format('weapongender_' + weapon.base.id.slice(5), {});

		var parts = libs.format_multiple([
			weapon.base.msg_id,
			weapon.qualifier1.msg_id,
			weapon.qualifier2.msg_id
		], {gender: weapon_gender});

		parts[0] = libs._.capitalize(parts[0])
		return parts.join(' ');
	},

	no_clickmsg:
		'Vous avez hâte de partir à l’aventure !',
	clickmsg_bad:
		'Vous avez cliqué trop tôt !<br/>' +
		'+{penalty_s} secondes d’attente !',

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
		'Vous rencontrez un vieux magicien mystérieux… Avant de vous confier la quête,<br/>' +
		'il vous raconte son histoire : Vous gagnez +1 en sagesse !',
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
		'Avec toutes ces quêtes, vous en avez oublié où vous deviez aller…<br/>' +
		'Mais tourner en rond d’un coin à l’autre de la région est un bon exercice : +1 en vitalité !',
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
		'Vous avez été battu par un gobelin ! Honteux, vous parcourez le pays, acceptant quête sur quête pour vous entraîner, avant de le défier à nouveau<br/>' +
		'Hélas, il s’est entraîné aussi de son côté et vous bat à nouveau ! Enfin bon, le +1 en niveau que vous aviez gagné servira bien un jour…',
	// paintraincomic.com
	clickmsg_useless:
		'Arrivé au village, le maire vous assure que le pays n’est pas dangereux ; La sorcière dont vous aviez entendu parler s’est trouvé quelqu’un et ne maudis plus personne ; ' +
		'Les fantômes du cimetière hanté s’occupent gentiment de leurs proches ; ' +
		'Le géant aide les villageois aux travaux des champs.<br/>' +
		'Vous vous sentez inutile et réfléchissez à votre place en ce monde… +1 en sagesse !',
	// memecenter.com
	clickmsg_escort:
		'Vous devez escorter un NPC important. ' +
		'Hélas, si vous marchez il va plus vite que vous, mais si vous courrez c’est vous qui allez plus vite !<br/>' +
		'En zigzagant et en tournant en rond ça passe. ' +
		'+1 en vitalité grâce à tout cet exercice !',
	// memecenter.com
	clickmsg_rare_goods_seller:
		'Vous croisez sur la route un vieil homme habillé de façon excentrique. ' +
		'Gagné, c’est un vendeur d’objets rares !<br/>' +
		'Il vous fait un très bon prix sur une [TODO weapon].',
	// memecenter.com
	clickmsg_progress_loop:
		'Il vous faudrait un meilleur équipement pour pouvoir monter en niveau. ' +
		'Mais il vous faudrait monter en niveau pour gagner un meilleur équipement. ' +
		'Cruel dilemme !<br/>' +
		'Heureusement, vous trouvez un [TODO weapon] au fond d’un puits !',
	// memecenter.com/motohorse
	clickmsg_idiot_bandits:
		'On parle de vous depuis que vous avez tué le dragon et la sorcière maléfique ! ' +
		'Des bandits vous tendent une embuscade pour voler votre butin.<br/>' +
		'Quelle drôle d’idée ! Vous lisez dans leurs yeux qu’ils le comprennent, juste avant que votre boule de feu les réduise en cendre.<br/>' +
		'Heureusement, les pièces d’or ne brûlent pas&nbsp: +{coins, number} écus !',
	// don't remember the source for this one
	clickmsg_princess:
		'« Vous n’emporterez pas la princesse ! » vous crie le terrible mage noir, ' +
		'alors que vous parvenez au sommet du dongeon.<br/>' +
		'Vous le rassurez : seul le butin vous intéresse.' +
		'Il vous laisse vous servir (+{coins, number} écus) et enchante même une arme pour vous ! ([TODO weapon])',
	// "make friends" necromancy
	xclickmsg_make_friends:
		'',
	// licorne multicolore
	xclickmsg_unicorns:
		'',
	// DM of the ring
	clickmsg_bad_village:
		'Vous arrivez dans un village. Il n’y a pas de marchand d’armes ou de potions ! ' +
		'Et l’auberge ne propose pas de quêtes !!<br/>' +
		'C’en est trop : sur votre ordre, les éclairs et les météorites tombent du ciel pour raser ce pitoyable endroit. ' +
		'Au passage, bonne occasion de pratiquer votre magie : +1 mana.',
	// memes
	xclickmsg_arrown_in_the_knee:
		'', // arrow in the knee
	// retour chez le mage noir, apprentissage de sorts
	xclickmsg_black_mage_again:
		'',
	// ?
	clickmsg_mana_mana:
		'« Mah na mah na » ' +
		'« Tou tou tou dou dou »<br/>' +
		'+1 mana !',
		/*
	// ?
	clickmsg_:
		'',
	*/

	/*
	 "I know that the stars are not really stars, that they're just thousands of helicopters up there in the sky." Then she looked up at the clouds, and started crying.

	 */
/*
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
*/

	object_found: 'You found a [+1 Common Spiky Shield]!',

	combat_escaped: 'You were attacked by a [Level 1 Blind Falcon] but you got away just before it was about to kill you.'
});
