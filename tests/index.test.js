import { getCount, commentCounter } from '../src/modules/Helpers.js';

describe('Count the number of comments', () => {
  const commentDiv = ` <div class="comment-list-items">
      <div>comment 1</div>
      <div>comment 2</div>
      <div>comment 3</div>
      </div>`;
  document.body.innerHTML = commentDiv;
  const commentsElements = document.querySelector('.comment-list-items');

  test('Number od comments', () => {
    expect(commentCounter(commentsElements)).toBe((3));
  });
});

describe('Cont the number of shows', () => {
  const shows = [
    { id: 1 },
    { id: 2 },
    { id: 3 },
    { id: 4 },
    { id: 5 },
  ];
  test('Numer of items should be 5', () => {
    expect(getCount(shows)).toBe(5);
  });
});
