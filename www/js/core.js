function PopupPic(sPicURL) {
	window.open("popup.htm?" + sPicURL, "", "resizable=1,HEIGHT=200,WIDTH=200");
}

initSchedule = function () {

	_showCurrentSchedule();

	$("#prev_week").click(function (e) {
		e.preventDefault();
		_showPreviousWeek();
	});

	$("#next_week").click(function (e) {
		e.preventDefault();
		_showNextWeek();
	});
};

_showCurrentSchedule = function () {
	var d = new Date();
	var this_day = d.getDate();
	var this_month = d.getMonth() + 1;

	$("div.schedule").hide();

	$("div.schedule").each(function (index) {
		var that_day = $(this).data("day");
		var that_month = $(this).data("month");

		if (this_month < that_month || this_day < that_day) {
			$(this).show().addClass("active");
			return false;
		}
	});
};

_showNextWeek = function () {
	var current = $("div.schedule.active");
	var next = current.next("div.schedule");

	if (next.length) {
		current.removeClass("active").hide("slide", { direction: "left" }, function () {
			next.addClass("active").show("slide", { direction: "right" });
		});
	}
};

_showPreviousWeek = function () {
	var current = $("div.schedule.active");
	var next = current.prev("div.schedule");

	if (next.length) {
		current.removeClass("active").hide("slide", { direction: "right" }, function () {
			next.addClass("active").show("slide", { direction: "left" });
		});
	}
};