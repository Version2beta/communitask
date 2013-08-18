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

## Components

RESTful service layer:

* Services supported by this project are written in Restify.js running on Node.js and hosted on DigitalOcean or any similar virtual private server.

Data layer:

* Objects are stored in a CouchDB.

Client layer:

* The client users the Twitter Bootstrap framework.
* The client is a single-page web application using Backbone.js.

### Community class

A community is the top level organizational structure, the "customer" of the application.

Properties:

* id
* name
* avatar
* link
* owners
* status: created, deleted

JSON API:

* ```/communities/?name={name}&owners[]={owners}&status[]={status}&deleted=true```
	* GET: Return list of communities to which the authenticated user has access. Optionally filter by name, owners, and/or status.
	* POST: Create a new community with the authenticated user as owner.
* ```/communities/{id}/```
	* GET: Return details about the specified community.
	* PUT: Update details about the specified community.
	* DELETE: Mark the specified community as deleted.
* ```/communities/{id}/members/```
	* GET: Return a list of members of the specified community.
	* POST: Invite a member to the specified community.
* ```/communities/{id}/members/{id}/```
	* GET: Returns details about the specified member only if the member exists and is a member of the given community.
	* DELETE: Remove the member from the community (or rather, remove the community from the member's account.)
* ```/communities/{id}/owners/```
	* GET: Return a list of community account owners.
	* POST: Add a new owner to the list of community account owners.
* ```/communities/{id}/owners/{id}/```
	* GET: Returns details about the specified owner only if the owner exists and is an owner of the given community.
	* DELETE: Remove the member's owner status for the specified community.

### Member class

Access is limited to invited members, and completed tasks are tracked by member.

Properties:

* id
* name
* email address
* password hash
* phone number
* communities
* avatar
* status: invited, confirmed, deleted, super

JSON API:

* ```/members/?community[]={community}&status[]={status}&deleted=true```
	* GET: Return a list of members grouped by community with whom the authenticated user is connected. Optionally filter by community and status.
	* POST: Create a new member.
* ```/members/{id}/```
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

* ```/tasks/?community[]={community}&status[]={status}&category[]={category}&owner[]={owner}&creator[]={creator}&deleted=true```
	* GET: Returns a list of tasks grouped by community for the authenticated user. Optionally filter by community, status, category, owner, and/or creator.
	* POST: Create a new task.
* ```/tasks/{id}/```
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
* defaultPriority: The priority this task will have when created.
* fixed: Whether the value of this task is fixed (true, always worth the same amount) or adjustable (false, may be adjusted by the member).
* owner: The member ID of the owner of the recurring task template.
* status: inactive, active, deleted
* assignees: To whom the task should be assigned, as a string or array. "*" indicates that each member of the community should be assigned to complete this task individually, and an empty set indicates that any member of the community may complete this task.
* schedule: When this task should be inserted into the active to-do list.
* window: How long this task should appear in a to-do list if it has not been marked as completed.
* recurring: When to create new tasks, using a cron-like syntax.

API:

* ```/recurring/?community[]={community}&owner[]={owner}&status[]={status}&deleted=true```
	* GET: List all recurring tasks grouped by community to which the authenticated user has access. Optionally filter by community, owner, and/or status.
	* POST: Create a new recurring task. Returns the link to the new recurring task.
* ```/recurring/{id}/```
	* GET: Return the details of a recurring task.
	* PUT: Update the details of a recurring task.
	* DELETE: Mark a recurring task as deleted.

## Some notes on the interface

1. Every interaction returns an HTTP status code and text that is descriptive of the result.
2. Every successful POST returns a JSON document including the ID and URI of the record created.
3. Every successful PUT returns the updated JSON document.
4. DELETE should mark items for deletion by changing the item's status. DELETEd items with a status other than "deleted" should return a 202 Accepted status code with a JSON document showing the ID and status. DELETEd items with a status of "deleted" should be permanently removed from the database and return a 204 No Content status code without a response document.
5. Any HTTP method not documented will return a 405 Method Not Allowed.

## Error codes

Communitask will return the following error codes at the command line:

* 1: Could not connect to the CouchDB backend.
