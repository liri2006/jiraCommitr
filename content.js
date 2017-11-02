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

	var taskPart = "";
	if (task.length > 0) {
		var taskNum = task.attr("data-issue-key");
		var taskTitle = task.find("section.ghx-summary").text();
		taskPart = taskNum + ": " + taskTitle;
	}

	var storyPart = "";
	var story = task.parents(".ghx-swimlane");
	if (story.length > 0) {
		var storyTitleEl = story.find(".ghx-heading .ghx-summary");
		var storyNum = story.find(".ghx-heading .ghx-parent-key").text();
		var storyTitle = storyTitleEl.contents().not(storyTitleEl.children()).text();
		if (storyNum && storyTitle) {
			storyPart += storyNum + ": " + storyTitle;
		}
	}

	if (taskPart && storyPart) {
		return storyPart + " - " + taskPart;
	}

	if (taskPart) {
		return taskPart;
	}

	return null;
};

$(function () {
	$(document).on("click", ".ghx-issue", function () {
		var title = getTitle(this);
		if (title) {
			console.log(title);
			copy(title);
		}
	});
});