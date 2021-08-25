const {
  applySpec,
  pathOr,
  pipe,
  map,
  length,
  ifElse,
  isEmpty,
  always,
} = require('ramda');
const sessionCard = applySpec({
  sessionId: pathOr('', ['session', 'id']),
  sessionName: pathOr('', ['session', 'name']),
  menuId: pathOr('', ['menu', 'id']),
  sessionStatus: pipe(
    pathOr('', ['menu', 'id']),
    ifElse(isEmpty, always('No menu'), always('Ongoing'))
  ),
  items: pathOr([], ['menu', 'items']),
  itemsCount: pipe(pathOr([], ['menu', 'items']), length),
  overAllRating: pathOr(0, ['overAllRating']),
  sessionTime: pathOr(0, ['sessionTime']),
});
const sanitizer = map(sessionCard);
module.exports = { sanitizer };
