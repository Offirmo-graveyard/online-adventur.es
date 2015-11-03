if (typeof define !== 'function') { var define = require('amdefine')(module); }
define({
	// locale id
	locale: 'en',
	locale_name: 'english',

	// content
	// http://formatjs.io/guides/message-syntax/

	title: 'The Boring RPG reloaded',
	description: 'The most simple RPG',
	keywords: 'game, RPG, adventure',

	back: 'Back',

	app_title: 'The Boring RPG',
	play_button_caption: 'Play!',
	meta_header: 'Settings',

	meta_volume: 'Sound :',
	meta_volume_on: 'on',
	meta_volume_off: 'off',
	meta_volume_half: 'medium',
	meta_music: 'Music :',
	meta_music_on: 'on',
	meta_music_off: 'off',
	meta_locale: 'Language :',
	meta_tutorial: 'Tutorial',
	meta_statistics: 'Statistics',
	meta_rate_app: 'Rate app',
	meta_share: 'Share',
	meta_contact_us: 'Contact us',
	meta_facebook: 'facebook',
	meta_twitter: 'twitter',
	meta_fork: 'Fork on Github',
	meta_save: 'Save',
	meta_update: 'Update',
	meta_advanced: 'Advanced…',
	meta_fullscreen : 'Full screen :',
	meta_fullscreen_on : 'on',
	meta_fullscreen_off : 'off',
	meta_test_error: 'Test error',
	meta_reset: 'Reset game',
	meta_refresh: 'Restart app',
	meta_report_bugs: 'Report a bug',

	inventory_widget_title: 'Inventory',
	knowledge_widget_title: 'Knowledge',

	stats_level: 'Level',
	stats_health: 'Health',
	stats_mana: 'Mana',
	stats_strength: 'Strength',
	stats_agility: 'Agility',
	stats_vitality: 'Vitality',
	stats_wisdom: 'Wisdom',
	stats_luck: 'Luck',
	stats_coin_count: 'Gold',
	stats_item_count: 'Items',
	stats_token_count: 'Tokens',
	stats_click_count: 'Clicks',

	weapon_axe: 'axe',
	weapongender_axe: 'neutral',
	weapon_bow: 'bow',
	weapongender_bow: 'neutral',
	weapon_claw: 'claw',
	weapongender_claw: 'neutral',
	weapon_dagger: 'dagger',
	weapongender_dagger: 'neutral',
	weapon_grimoire: 'grimoire',
	weapongender_grimoire: 'neutral',
	weapon_harp: 'harp',
	weapongender_harp: 'neutral',
	weapon_knife: 'knife',
	weapongender_knife: 'neutral',
	weapon_longbow: 'long bow',
	weapongender_longbow: 'neutral',
	weapon_longsword: 'long sword',
	weapongender_longsword: 'neutral',
	weapon_luth: 'luth',
	weapongender_luth: 'neutral',
	weapon_mace: 'scythe',
	weapongender_mace: 'neutral',
	weapon_scythe: 'spear',
	weapongender_scythe: 'neutral',
	weapon_spear: 'spear',
	weapongender_spear: 'neutral',
	weapon_staff: 'staff',
	weapongender_staff: 'neutral',
	weapon_sword: 'sword',
	weapongender_sword: 'neutral',
	weapon_wand: 'wand',
	weapongender_wand: 'neutral',

	weaponqualif1_admirable: 'admirable',
	weaponqualif1_arcanic: 'arcanic',
	weaponqualif1_bestial: 'bestial',
	weaponqualif1_bone: 'bone',
	weaponqualif1_brass: 'brass',
	weaponqualif1_cardboard: 'cardboard',
	weaponqualif1_complex: 'complex',
	weaponqualif1_composite: 'composite',
	weaponqualif1_consecrated: 'consecrated',
	weaponqualif1_crafted: 'crafted',
	weaponqualif1_cruel: 'cruel',
	weaponqualif1_cunning: 'cunning',
	weaponqualif1_cursed: 'cursed',
	weaponqualif1_emerald: 'emerald',
	weaponqualif1_engraved: 'engraved',
	weaponqualif1_forbidden: 'forbidden',
	weaponqualif1_forgotten: 'forgotten',
	weaponqualif1_ghost: 'ghost',
	weaponqualif1_golden: 'golden',
	weaponqualif1_heavy: 'heavy',
	weaponqualif1_heroic: 'heroic',
	weaponqualif1_holy: 'holy',
	weaponqualif1_inflexible: 'inflexible',
	weaponqualif1_invincible: 'invincible',
	weaponqualif1_iron: 'iron',
	weaponqualif1_jade: 'jade',
	weaponqualif1_light: 'light',
	weaponqualif1_living: 'living',
	weaponqualif1_lost: 'lost',
	weaponqualif1_mechanical: 'mechanical',
	weaponqualif1_mysterious: 'mysterious',
	weaponqualif1_old: 'old',
	weaponqualif1_onyx: 'onyx',
	weaponqualif1_overrated: 'overrated',
	weaponqualif1_powerful: 'powerful',
	weaponqualif1_practical: 'practical',
	weaponqualif1_proven: 'proven',
	weaponqualif1_raging: 'raging',
	weaponqualif1_robust: 'robust',
	weaponqualif1_sapphire: 'sapphire',
	weaponqualif1_savage: 'savage',
	weaponqualif1_silver: 'silver',
	weaponqualif1_simple: 'simple',
	weaponqualif1_sinister: 'sinister',
	weaponqualif1_skeleton: 'skeleton',
	weaponqualif1_solid: 'solid',
	weaponqualif1_steel: 'steel',
	weaponqualif1_strange: 'strange',
	weaponqualif1_subtile: 'subtile',
	weaponqualif1_swift: 'swift',
	weaponqualif1_unwavering: 'unwavering',
	weaponqualif1_used: 'used',
	weaponqualif1_whirling: 'whirling',
	weaponqualif1_wooden: 'wooden',

	weaponqualif2_adjudicator: 'adjudicator’s',
	weaponqualif2_ambassador: 'ambassador’s',
	weaponqualif2_ancients: 'of the ancients',
	weaponqualif2_apprentice: 'apprentice’s',
	weaponqualif2_assaulting: 'assaulting',
	weaponqualif2_beginner: 'beginner’s',
	weaponqualif2_brave: 'of the brave',
	weaponqualif2_conqueror: 'conqueror’s',
	weaponqualif2_cruel_tyrant: 'cruel tyrant’s',
	weaponqualif2_defender: 'defender’s',
	weaponqualif2_destructor: 'destructor’s',
	weaponqualif2_dwarven: 'dwarven',
	weaponqualif2_elite: 'elite',
	weaponqualif2_elven: 'elven',
	weaponqualif2_executioner: 'executioner’s',
	weaponqualif2_expert: 'expert',
	weaponqualif2_explorer: 'explorer’s',
	weaponqualif2_gladiator: 'gladiator’s',
	weaponqualif2_goddess: 'of the goddess',
	weaponqualif2_guard: 'guard’s',
	weaponqualif2_hunter: 'hunter’s',
	weaponqualif2_judgement: 'of judgement',
	weaponqualif2_king: 'king’s',
	weaponqualif2_mediator: 'mediator’s',
	weaponqualif2_mercenary: 'mercenary’s',
	weaponqualif2_militia: 'militia’s',
	weaponqualif2_nightmare: 'nightmare’s',
	weaponqualif2_noble: 'noble’s',
	weaponqualif2_noob: 'of the noob',
	weaponqualif2_pilgrim: 'pilgrim’s',
	weaponqualif2_pioneer: 'pioneer’s',
	weaponqualif2_pirate: 'pirate’s',
	weaponqualif2_profane: 'profane’s',
	weaponqualif2_ranger: 'ranger’s',
	weaponqualif2_sorcerer: 'sorcerer’s',
	weaponqualif2_tormentor: 'tormentor’s',
	weaponqualif2_training: 'training',
	weaponqualif2_traveler: 'traveler’s',
	weaponqualif2_twink: 'of the twink',
	weaponqualif2_tyrant: 'tyrant’s',
	weaponqualif2_upholder: 'upholder’s',
	weaponqualif2_warfield: 'warfield’s',
	weaponqualif2_warfield_king: 'warfield king’s',
	weaponqualif2_warrior: 'warrior’s',
	weaponqualif2_wise: 'of the wise',
	weaponqualif2_woodsman: 'woodsman’s',

	weapon: function build_weapon_name(weapon, intl, libs, debug_id) {
		var parts = libs.format_multiple([
			weapon.qualif2.msg_key,
			weapon.qualif1.msg_key,
			weapon.type.msg_key
		], {});

		if (libs._s.startsWith(parts[0], 'of')) {
			var q2 = parts.shift();
			parts.push(q2);
		}
		return libs._s.words(parts.join(' ')).map(libs._s.capitalize).join(' ');
	},

	no_clickmsg:
		'You’re eager to start adventuring!',

	// original
	clickmsg_bored_log:
		'You were so bored, you punched a log for hours!<br/>' +
		'You gained +1 strength!',
	clickmsg_caravan:
		'You were hired to protect a caravan of merchants.<br/>' +
		'You gained {coins, number} coins!',
	clickmsg_dying_man:
		'A dying man on the street left you everything he had.<br/>' +
		'You gained {coins, number} coins!',
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
	clickmsg_found_green_mushroom:
		'You found a green mushroom.<br/>' +
		'You gained +1 level!',

	// me
	clickmsg_meet_old_wizard:
		'Vous meet a mysterious old wizard…<br/>' +
		'Before giving you the quest, he tells you his loooong story : Vous gain +1 wisdom!',
	// electricbunnycomics.com
	clickmsg_good_necromancer:
		'You meet a child weeping over his dead hamster pet… Thanks to necromancy, you reanimate it an a hamster-zombie! ' +
		'Oddly, the child cries even more while running away. Fortunately, you gain +1 agility for avoiding the stones thrown by the villagers.',
	// dorkly
	clickmsg_talk_to_all_villagers:
		'You spoke to all villagers in the village : no quest may have escaped you! ' +
		'On the other hand, your head aches for discussing so much.<br/>' +
		'+1 mana thanks to this mental training!',
	clickmsg_always_keep_potions:
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
	clickmsg_rare_goods_seller:
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
