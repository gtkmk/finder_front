import { React, useState } from 'react';
import { Base64Image } from '@/components/Image'
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import CardHeader from '@mui/material/CardHeader';
import Grid from '@mui/material/Grid';
import { useLikeHandler } from '@/hooks/useLikeHandler'
import CommentActionsMenu from '../commentActionsMenu';

export const Comment = ({ commentId, postId, authorNickname, commentAuthorAvatar, createdAt, updatedAt, isOwnComment, likes, text }) => {
    const [likesCount, setLikesCount] = useState(likes)
    const { handleLike } = useLikeHandler(commentId, 'comment', likesCount)

    const handleLikeClick = async () => {
        const newLikesCount = await handleLike()
        setLikesCount(newLikesCount)
    };

    return (
        <Grid container spacing={2}>
        <Grid item>
            <CardHeader
                avatar={<Base64Image mediaUrl={commentAuthorAvatar} type="avatar" />}
                title={authorNickname}
                subheader={createdAt}
                titleTypographyProps={{ variant: 'subtitle1' }}
                subheaderTypographyProps={{ variant: 'body2', color: 'text.secondary' }}
                action= {
                    <div style={{ display: 'flex', alignItems: 'center'}}>
                        {isOwnComment == 1 &&
                            <CommentActionsMenu commentId={commentId} text={text}  />
                        }
                    </div>
                }
            />
        </Grid>
        <Grid item xs={12}>
            <Typography
                variant="body1"
                color="text.primary"
                component="p"
                id={`postText_${postId}`}
                style={{
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  display: '-webkit-box',
                  WebkitLineClamp: 4,
                  WebkitBoxOrient: 'vertical',
                  marginBottom: '10px',
                  paddingTop: '0',
                }}
            >
                {text}
              </Typography>
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <IconButton aria-label="like" onClick={handleLikeClick}>
                    <ThumbUpAltIcon />
                </IconButton>
                <Typography variant="body2" color="text.secondary">{likesCount}</Typography>
            </div>
        </Grid>
        </Grid>
    );
};

export default Comment;
