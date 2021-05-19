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

	return taskPart && storyPart && taskPart !== storyPart ?
		storyPart + " - " + taskPart :
		taskPart;
};

function getTaskPart(task) {
	if (task.length === 0) {
		return null;
	}
	var taskNum = task.attr("data-task");
	var taskTitle = task.find(".cu-task-row-main__link-text-inner").text();
	return "[#" + taskNum + "]: " + taskTitle;
}

function getStoryPart(task) {
	var story = task
		.closest(".cu-task-list")
		.closest('.cu-task-row')
		.find("> .cu-task-row__container");
	if (story.length === 0) {
		return null;
	}

	var storyNum = story.attr("data-task");
	var storyTitle = story.find(".cu-task-row-main__link-text-inner").text();

	return storyNum && storyTitle ?
		"[#" + storyNum + "]: " + storyTitle :
		"";
}

$(function () {
	$(document).on("click", ".cu-task-row__container", function (e) {
		if($(e.target).hasClass('cu-task-row__arrow') )
		{
			return;
		}

		var title = getTitle(this);
		if (title) {
			console.log(title);
			copy(title);
		}
	});
});