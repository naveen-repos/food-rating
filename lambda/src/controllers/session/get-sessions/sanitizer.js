const { applySpec, pathOr, pipe, map, length } = require('ramda');
const sessionCard = applySpec({
  sessionId: pathOr('', ['session', 'id']),
  sessionName: pathOr('', ['session', 'name']),
  sessionStatus: pathOr('', ['session', 'status']),
  menuId: pathOr('', ['menu', 'id']),
  items: pathOr([], ['menu', 'items']),
  itemsCount: pipe(pathOr([], ['menu', 'items']), length),
  overAllRating: pathOr(0, ['overAllRating']),
});
const sanitizer = map(sessionCard);
module.exports = { sanitizer };
