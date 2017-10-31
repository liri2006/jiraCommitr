function copy(text) {
	var input = document.createElement('input');
	input.setAttribute('value', text);
	document.body.appendChild(input);
	input.select();
	document.execCommand('copy');
	document.body.removeChild(input)
}

function getTitle(taskRaw) {
	var task = $(taskRaw);
	var story = task.parents(".ghx-swimlane");
	var storyTitleEl = story.find(".ghx-heading .ghx-summary");
	var storyNum = story.find(".ghx-heading .ghx-parent-key").text();
	var storyTitle = storyTitleEl.contents().not(storyTitleEl.children()).text();
	var taskNum = task.attr("data-issue-key");
	var taskTitle = task.find("section.ghx-summary").text();
	return storyNum + ": " + storyTitle + " - " + taskNum + ": " + taskTitle;
};

$(function () {
	$(".ghx-issue").on("click", function () {
		var title = getTitle(this);
		console.log(title);
		copy(title);
	});
});