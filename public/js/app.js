$(function() {
	"use strict";

	$("#sign-up-form").on("submit", function(e){
		e.preventDefault();

		$.ajax({
			type:"POST",
			url: '/signup',
			data:$(e.target).serialize(),
			success: function(response) {
				$("#form-submit-result").show();
			}
		});
	});
});