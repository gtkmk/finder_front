import React, { useState } from 'react';
import { Accordion, AccordionSummary, AccordionDetails, Typography, IconButton } from '@mui/material';
import CommentItem from './commentItem';
import CommentForm from './commentForm';
import { useGetPosts } from "@/hooks/useGetPost";

const CommentList = ({ postId, comments, onLikeComment, onAddComment }) => {
  const [expanded, setExpanded] = useState(false);

  const handleAccordionChange = () => {
    setExpanded(!expanded);
  };

  const { postsData } = useGetPosts();

  return (
    <Accordion expanded={expanded} onChange={handleAccordionChange}>
      <AccordionSummary>
        <Typography variant="h6">Comments</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <CommentForm postId={postId} onAddComment={onAddComment} />
      </AccordionDetails>
      {postsData.map((comment, index) => (
        <CommentItem key={index} comment={comment} onLike={() => onLikeComment(index)} />
      ))}
    </Accordion>
  );
};

export default CommentList;