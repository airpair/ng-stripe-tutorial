'use strict';

Stripe.setPublishableKey('pk_test_aj305u5jk2uN1hrDQWdH0eyl');

angular.module('petShopApp', ['angularPayments', 'mm.foundation', 'ngAnimate', 'angularSpinner'])

	.controller('PetShopCtrl', function ($scope, $http, $modal) {
		$scope.cart = [];

		// Load products from server
		$http.get('products.json').success(function (response) {
			$scope.products = response.products;
		});

		$scope.addToCart = function (product) {
			var found = false;
			$scope.cart.forEach(function (item) {
				if (item.id === product.id) {
					item.quantity++;
					found = true;
				}
			});
			if (!found) {
				$scope.cart.push(angular.extend({quantity: 1}, product));
			}
		};

		$scope.getCartPrice = function () {
			var total = 0;
			$scope.cart.forEach(function (product) {
				total += product.price * product.quantity;
			});
			return total;
		};

		$scope.checkout = function () {
			$modal.open({
				templateUrl: 'checkout.html',
				controller: 'CheckoutCtrl',
				resolve: {
					totalAmount: $scope.getCartPrice
				}
			});
		};
	})

	.controller('CheckoutCtrl', function ($scope, totalAmount) {
		$scope.totalAmount = totalAmount;

		$scope.onSubmit = function () {
			$scope.processing = true;
		};

		$scope.stripeCallback = function (code, result) {
			$scope.processing = false;
			$scope.hideAlerts();
			if (result.error) {
				$scope.stripeError = result.error.message;
			} else {
				$scope.stripeToken = result.id;
			}
		};

		$scope.hideAlerts = function () {
			$scope.stripeError = null;
			$scope.stripeToken = null;
		};
	});
