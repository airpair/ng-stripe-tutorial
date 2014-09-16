'use strict';

/* Copyright (C) 2013, 2014, Uri Shaked. License: MIT. */

angular.module('step2App', ['angularPayments'])

	.config(function() {
		window.Stripe.setPublishableKey('pk_test_6pRNASCoBOKtIshFeQd4XMUh');
	})

	.controller('step2Ctrl', function($scope) {
		// Stripe Response Handler
		$scope.stripeCallback = function (code, result) {
			if (result.error) {
				window.alert('it failed! error: ' + result.error.message);
			} else {
				window.alert('success! token: ' + result.id);
			}
		};
	});
