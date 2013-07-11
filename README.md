# communitask

This is a simple to-do list / task manager for recurring tasks, designed to meet the needs of a family or collaborative group of people.

## Project status

This is a work in progress, although it may not ever progress into a usable project. You can do whatever you like with it (within the confines of an open-source BSD license) but don't expect it to be useful at this point.

## README-driven development

This project provides a single-page application intended to provide:

* A framework for defining tasks (or to-do items) that are often but not always recurring.
* A record of tasks that have been completed, by whom and when.
* A system for tracking contributions to the community through completion of tasks.
* A means for reporting the human energy put into a community.

### Components

Service layer:

* Services supported by this project are written in Restify.js running on Node.js and hosted on DigitalOcean or any similar virtual private server.

Data layer:

* Objects are stored in a CouchDB.

Client layer:

* The client users the Twitter Bootstrap framework.
* The client is a single-page web application using Backbone.js. (Angular?)

### Community class

A community is the top level organizational structure, the "customer" of the application.

Properties:

* id
* name
* owners
* status: created, deleted

JSON API:

* /communities/
	* GET: Return list of communities to which the authenticated user has access.
	* POST: Create a new community with the authenticated user as owner. Returns the new community's URI.
* /communities/{id}/
	* GET: Return details about the specified community.
	* PUT: Update details about the specified community.
	* DELETE: Mark the specified community as deleted.
* /communities/{id}/members/
	* GET: Return a list of members of the specified community.
	* POST: Add a member to the specified community, if the authenticated user is an owner of the community.
* /communities/{id}/members/{id}?page={page}&qty={qty}
	* GET: Return member activity within the specified community, either all activity or activity paged by page and quantity, in reverse chronological order.
* /communities/{id}/owners/
	* GET: Return a list of community account owners.
	* POST: Add a new owner to the list of community account owners.
* /communities/{id}/owners/{id}/
	* GET: Return details about a given community owner.
	* DELETE: Remove an owner from the list of community owners.


### Member class

Access is limited to invited members, and completed tasks are tracked by member.

Properties:

* id
* name
* email address
* phone number
* communities
* avatar
* status: invited, accepted, confirmed, deleted, super

JSON API:

* /members/
	* GET: Return a list of members grouped by community with whom the authenticated user is connected.
	* POST: Create a new member.
* /members/{id}/
	* GET: Return details about the requested user if the authenticated user is connected.
	* PUT: Update the specified user.
	* DELETE: Mark the specified user as deleted.


### Task class

A Task.

Properties specific to a scheduled task:

* id
* title: A concise, human-friendly way of describing the task.
* description: A verbose description of the task.
* community: The community to which this task belongs.
* categories: A list of tags or categories that relate this task to other tasks.
* creator: The ID of the member who created the task.
* createdOn: The timestamp when the task was created.
* status: created, shared, accepted, deleted, done
* owner: The ID of the member who owns the task.
* due: When the task should be complete.
* priority: The priority of the task on a scale of 0 - N where the lower number is higher priority.
* done: The timestamp when a task was marked as complete.
* doneBy: The ID of the member who completed the task.
* value: The value assigned to the task.

JSON API:

* /tasks/?community[]={community}&status[]={status}&category[]={category}&owner[]={owner}&creator[]={creator}
	* GET: Returns a list of tasks grouped by community for the authenticated user. Optionally filter by community, status, category, owner, and/or creator.
	* POST: Create a new task.
* /tasks/{id}/
	* GET: Returns the details of a particular task.
	* PUT: Update the details of a particular task.
	* DELETE: Mark the task as deleted.

### RecurringTask

RecurringTask provides the definition for a new task that repeats automatically, including specification for when the new task should be created. Recurring task is not a task, but instead a template for creating new tasks automatically on a schedule.

Properties from Task:

* title
* description
* community
* categories

Properties specific to RecurringTask:

* link: A link to more information about the task. For example, a link to a page that provides instruction on completing the task.
* defaultValue: A value assigned to this task. For example, how many points or gold stars a member is awarded for completing a task.
* fixed: Whether the value of this task is fixed (true, always worth the same amount) or adjustable (false, may be adjusted by the member).
* owner: The member ID of the owner of the recurring task template.
* status: held, active, deleted
* assignees: To whom the task should be assigned, as a string or array. "*" indicates that each member of the community should be assigned to complete this task individually, and an empty set indicates that any member of the community may complete this task.
* schedule: When this task should be inserted into the active to-do list.
* window: How long this task should appear in a to-do list if it has not been marked as completed.
* recurring: When to create new tasks, using a cron-like syntax.

API:

* /recurring/?community[]={community}&owner[]={owner}&status[]={status}
	* GET: List all recurring tasks grouped by community to which the authenticated user has access. Optionally filter by community, owner, and/or status.
	* POST: Create a new recurring task. Returns the link to the new recurring task.
* /recuuring/{id}/
	* GET: Return the details of a recurring task.
	* PUT: Update the details of a recurring task.
