if (typeof define !== 'function') { var define = require('amdefine')(module); }
define({
	"locale": "en", // detector

	"red": "red",
	"blue": "blue",
	"green": "green",

	hello_world: 'Hello world !',
	title: 'An hello world web app',

	server_side_i18n: 'Server-side i18n',
	client_side_i18n: 'Client-side i18n',

	without_key: 'Hello world !',
	simple_key: 'Hello {name} !',
	formatted_number: 'I have {numCats, number} cats.',
	formatted_number_percent: 'Almost {percentBlackCats, number, percent} of them are black.',
	formatted_date_short: 'We are the {now, date, short } and all is well.',
	formatted_date_medium: 'We are the {now, date, medium} and all is well.',
	formatted_date_long: 'We are the {now, date, long  } and all is well.',
	formatted_date_full: 'We are the {now, date, full  } and all is well.',
	formatted_time_short: 'It’s {now, time, short } and all is well.',
	formatted_time_medium: 'It’s {now, time, medium} and all is well.',
	formatted_time_long: 'It’s {now, time, long  } and all is well.',
	formatted_time_full: 'It’s {now, time, full  } and all is well.',
	key_select: '{gender, select, male {He} female {She} other {They}} will respond shortly.',
	key_select_nested: '{taxableArea, select, true {An additional {taxRate, number, percent} tax will be collected.} other {No taxes apply.}}',
	plural: 'You have {itemCount1, plural, =0 {no items} one {1 item} other {{itemCount1} items}}.',
	plural_shortcut: 'You have {itemCount2, plural, =0 {no items} one {# item} other {# items}}.',
	ordinal: 'It’s my cat’s {catAge, selectordinal, one {#st} two {#nd} few {#rd} other {#th}} birthday!',
	formatted_number_custom: 'That will be {price, number, usd}.',

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
