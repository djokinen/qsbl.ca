function PopupPic(sPicURL) {
	window.open("popup.htm?" + sPicURL, "", "resizable=1,HEIGHT=200,WIDTH=200");
}

initSchedule = function () {

	_loadData();

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

_loadData = function () {
	// Assign handlers immediately after making the request, and remember the jqxhr object for this request
	var jqxhr = $.getJSON("data/data.json", function (json) {
		_standings(json.qsbl.standings);
		// _schedule(json.qsbl.schedule);
	})
	.done(function () { console.log("done"); })
	.fail(function () { console.log("fail"); })
	.always(function () { console.log("always"); });

	// perform other work here ...

	// Set another completion function for the request above
	jqxhr.complete(function () { console.log("complete"); });
};

function _standings(standings) {
	var items = [];
	$.each(standings, function (key, val) {
		items.push('<tr><td>' + key + '</td><td>' + val.w + '</td><td>' + val.l + '</td><td>' + val.t + '</td><td>' + ((val.w * 2) + (val.t)) + '</td></tr>');
	});

	$('<tbody/>', {
		html: items.join('')
	}).appendTo('#standings');
}


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