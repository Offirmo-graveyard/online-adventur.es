if (typeof define !== 'function') { var define = require('amdefine')(module); }
define({
	"locale": "fr", // detector

	"red": "rouge",
	"blue": "bleu",
	"green": "vert",

	hello_world: 'Bonjour, monde !',
	title: 'Une web app bonjour monde',

	server_side_i18n: 'i18n côté serveur',
	client_side_i18n: 'i18n côté client',

	without_key: 'Bonjour monde !',
	simple_key: 'Bonjour {name} !',
	formatted_number: 'J’ai {numCats, number} chats.',
	formatted_number_percent: 'Environ {percentBlackCats, number, percent} d’entre eux sont noirs.',
	formatted_date_short:  'Nous sommes le {now, date, short } et tout va bien.',
	formatted_date_medium: 'Nous sommes le {now, date, medium} et tout va bien.',
	formatted_date_long:   'Nous sommes le {now, date, long  } et tout va bien.',
	formatted_date_full:   'Nous sommes le {now, date, full  } et tout va bien.',
	formatted_time_short:  'Il est {now, time, short } et tout va bien.',
	formatted_time_medium: 'Il est {now, time, medium} et tout va bien.',
	formatted_time_long:   'Il est {now, time, long  } et tout va bien.',
	formatted_time_full:   'Il est {now, time, full  } et tout va bien.',
	key_select:            '{gender, select, male {Il va} female {Elle va} other {Ils vont}} répondre incessament sous peu.',
	key_select_nested:     '{taxableArea, select, true {{taxRate, number, percent} de TVA en sus.} other {TVA 0 %}}',
	plural:                'Vous {itemCount1, plural, =0 {n’avez aucun objet} one {avez 1 objet} other {avez {itemCount1} objets}}.',
	plural_shortcut:       'Vous {itemCount2, plural, =0 {n’avez aucun objet} one {avez # objet} other {avez # objets}}.',
	ordinal:               'C’est le {catAge, selectordinal, one {#er} other {#ème}} anniversaire de mon chat !',
	formatted_number_custom: 'Ce sera {price, number, usd}.',

	custom_formats: {
		number: {
			usd: {
				style: 'currency',
				currency: 'USD',
				//currencyDisplay: 'name'
			}
		}
	}
});
