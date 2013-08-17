var views = module.exports = {};

views.listMembers = listMembers;
views.showMember = showMember;
views.createCommunity = createCommunity;

function listMembers(req, res, next) {
  next(new Error('listMembers not implemented'));
}

function showMember(req, res, next) {
  next(new Error('showMember not implemented'));
}

function createCommunity(req, res, next) {
  next(new Error('createCommunity not implemented'));
}
