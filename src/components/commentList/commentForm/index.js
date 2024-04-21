const CommentForm = (onAddComment) => {
  const commentInput = document.createElement('input');
  commentInput.type = 'text';
  commentInput.placeholder = 'Add a comment...';

  const submitButton = document.createElement('button');
  submitButton.textContent = 'Submit';
  submitButton.addEventListener('click', () => {
    const commentText = commentInput.value.trim();
    if (commentText !== '') {
      onAddComment(commentText);
      commentInput.value = '';
    }
  });

  const formContainer = document.createElement('div');
  formContainer.appendChild(commentInput);
  formContainer.appendChild(submitButton);

  return formContainer;
};

export default CommentForm;