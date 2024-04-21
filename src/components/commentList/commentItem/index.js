const CommentItem = (comment, onLike) => {
    const accordionSummary = document.createElement('div');
    const commentText = document.createElement('p');
    commentText.textContent = comment.text;
    const likeButton = document.createElement('button');
    likeButton.textContent = 'Like';
    likeButton.addEventListener('click', onLike);
    const likesCount = document.createElement('span');
    likesCount.textContent = `${comment.likes} Likes`;
  
    accordionSummary.appendChild(commentText);
    accordionSummary.appendChild(likeButton);
    accordionSummary.appendChild(likesCount);
  
    return accordionSummary;
};

export default CommentItem;
  