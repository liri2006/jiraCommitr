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

	var taskPart = getTaskPart(task);
	var storyPart = getStoryPart(task);

	//try to get story title from group (kanban)
	if (!storyPart) {
		storyPart = getStoryTitleFromParentGroup(task);
	}

	return taskPart && storyPart && taskPart !== storyPart ?
		storyPart + " - " + taskPart :
		taskPart;
};

function getTaskPart(task) {
	if (task.length === 0) {
		return null;
	}
	var taskNum = task.attr("data-issue-key");
	var taskTitle = task.find("section.ghx-summary").text();
	return taskNum + ": " + taskTitle;
}

function getStoryPart(task) {
	var story = task.parents(".ghx-swimlane");
	if (story.length === 0) {
		return null;
	}

	var storyTitleEl = story.find(".ghx-heading .ghx-summary");
	var storyNum = story.find(".ghx-heading .ghx-parent-key").text();
	var storyTitle = storyTitleEl.contents().not(storyTitleEl.children()).text();

	return storyNum && storyTitle ?
		storyNum + ": " + storyTitle :
		"";
}

//this can be found on kanban boards
function getStoryTitleFromParentGroup(task) {
	var story = task.parents(".ghx-parent-group");
	if (story.length === 0) {
		return null;
	}

	var storyNum = "";
	var storyTitle = "";

	//check if its fake parent or full one
	var parentStub = story.find("> .ghx-parent-stub");
	if (parentStub.length > 0) {
		storyTitle = parentStub.find(".ghx-summary").text();
		storyNum = parentStub.find(".ghx-key").text();
	} else {
		storyTitle = story.find("> .ghx-issue .ghx-summary").text();
		storyNum = story.find("> .ghx-issue .ghx-row.ghx-stat-2 a").attr("aria-label");
	}

	return storyNum && storyTitle ?
		storyNum + ": " + storyTitle :
		"";
}

$(function () {
	$(document).on("click", ".ghx-issue", function () {
		var title = getTitle(this);
		if (title) {
			console.log(title);
			copy(title);
		}
	});
});