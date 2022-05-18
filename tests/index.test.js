import { commentCounter } from '../src/modules/UI.js';

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
