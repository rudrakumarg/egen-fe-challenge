/**
 * @author Rudra Kumar
 * test data:
 *  American Express - 34343434343434
 *	Discover card - 6011000400000000
 *	Maestro - 6759649826438453/6799990100000000019
 *	Mastercard- 5555555555554444/5454545454545454
 *	Visa - 4444333322221111/4911830000000/4917610000000000
 */
var app = angular.module('myApp', []);

app.filter('validate', [
function() {
	return function(ccnumber) {
		if (!ccnumber) {
			return '';
		}
		ccnumber = ccnumber.toString().replace(/\s+/g, '');
		var len = ccnumber.length, cardType = "default", ca, sum = 0, mul = 1;

		while (len--) {
			ca = parseInt(ccnumber.charAt(len), 10) * mul;
			sum += ca - (ca > 9) * 9;
			mul ^=3;
		};

		if (sum % 10 === 0 && sum > 0) {
			//valid = "valid";
			if (/^(34)|^(37)/.test(ccnumber)) {
				cardType = "amex";
			}
			if (/^(6011)|^(622(1(2[6-9]|[3-9][0-9])|[2-8][0-9]{2}|9([01][0-9]|2[0-5])))|^(64[4-9])|^65/.test(ccnumber)) {
				cardType = "discover";
			}

			if (/^(5018)|^(5020)|^(5038)|^(5893)|^(6304)|^(6759)|^(6761)|^(6762)|^(6763)|^(0604)/.test(ccnumber)) {
				cardType = "mastero";
			}
			if (/^5[1-5]/.test(ccnumber)) {
				cardType = "mastercard";
			}
			if (/^4/.test(ccnumber)) {
				cardType = "visa";
			}
		} else {
			//valid = "not valid";
			cardType = "default";
		}

		return cardType;
	};
}]);

app.controller('myCtrl', function($scope) {
	
	var cards = {
		"amex" : "American Express",
		"discover" : "Discover Card",
		"mastero" : "Maestro",
		"mastercard" : "MasterCard",
		"visa" : "Visa",
		"default" : "No Card Match"
	};
	
});

