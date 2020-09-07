$(function () {});
  
/* var declaration*/
var today = moment().format("dddd, MMMM Do");

var atm = moment().format("H A");

/* Entry for each hour of the workday 
    9am - 5pm */

var planWorkDay = [
  { time: "9 AM", event: "" },
  { time: "10 AM", event: "" },
  { time: "11 AM", event: "" },
  { time: "12 PM", event: "" },
  { time: "1 PM", event: "" },
  { time: "2 PM", event: "" },
  { time: "3 PM", event: "" },
  { time: "4 PM", event: "" },
  { time: "5 PM", event: "" },
];

/* Local Storage check */
var workEvents = JSON.parse(localStorage.getItem("workDay"));
if (workEvents) {
  planWorkDay = workEvents;
}

/* today vibes */
$("#currentDay").text(today);

/* create rows (keep under everything else so it loads and not break) */

planWorkDay.forEach(function(timeBlock, index) {
	var timeLabel = timeBlock.time;
	var blockColor = colorRow(timeLabel);
	var row =
		'<div class="time-block" id="' +
		index +
		'"><div class="row no-gutters input-group"><div class="col-sm col-lg-1 input-group-prepend hour justify-content-sm-end pr-3 pt-3">' +
		timeLabel +
		'</div><textarea class="form-control ' +
		blockColor +
		'">' +
		timeBlock.event +
		'</textarea><div class="col-sm col-lg-1 input-group-append"><button class="saveBtn btn-block" type="submit"><i class="fas fa-save"></i></button></div></div></div>';

	/* Adding rows to container div */
	$(".container").append(row);
});

/* Color rows based on current time */
function colorRow(time) {
    var planMoment = moment(atm, "H A");
    
	var planEntry = moment(time, "H A");
	if (planMoment.isBefore(planEntry) === true) {
		return "future";
	} else if (planMoment.isAfter(planEntry) === true) {
		return "past";
	} else {
		return "present";
	}
}

/* Save the event */
$(".saveBtn").on("click", function() {
	var blockID = parseInt(
		$(this)
			.closest(".time-block")
			.attr("id")
	);
	var userEntry = $.trim(
		$(this)
			.parent()
			.siblings("textarea")
			.val()
	);
	planWorkDay[blockID].event = userEntry;

	/* Reset the local storage so it can update itself */
	localStorage.setItem("workDay", JSON.stringify(planWorkDay));
});

