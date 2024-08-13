import React, { useState } from "react";
import {
  Box,
  Link,
  Card,
  Stack,
  Avatar,
  Typography,
  CardHeader,
  IconButton,
  Menu,
  MenuItem,
  Modal,
} from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import { fDate } from "../../utils/formatTime";

import MoreVertIcon from "@mui/icons-material/MoreVert";
import PostReaction from "./PostReaction";
import CommentForm from "../comment/CommentForm";
import CommentList from "../comment/CommentList";
import PostFormEdit from "./PostFormEdit";
import AskModal from "../../components/AskModal";

function PostCard({ post, handleDeletePost, handleUpdatePost, params }) {
  // Anhvdt18 Code Start

  const [openConfirm, setOpenConfirm] = React.useState(false);
  const handleOpenConfirm = () => setOpenConfirm(true);
  const handleCloseConfirm = () => setOpenConfirm(false);

  const doUpdatePost = (postId) => {
    handleUpdatePost(postId);
  };

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  // Edit Post Modal
  const [openEditPost, setOpenEditPost] = useState(false);
  const handleOpenEditPost = () => setOpenEditPost(true);
  const handleCloseEditPost = () => setOpenEditPost(false);

  // Anhvdt18 Code End

  return (
    <Card>
      <CardHeader
        disableTypography
        avatar={
          <Avatar src={post?.author?.avatarUrl} alt={post?.author?.name} />
        }
        title={
          <Link
            variant="subtitle2"
            color="text.primary"
            component={RouterLink}
            sx={{ fontWeight: 600 }}
            to={`/user/${post.author._id}`}
          >
            {post?.author?.name}
          </Link>
        }
        subheader={
          <Typography
            variant="caption"
            sx={{ display: "block", color: "text.secondary" }}
          >
            {fDate(post.createdAt)}
          </Typography>
        }
        action={
          <div>
            <IconButton onClick={handleClick}>
              <MoreVertIcon sx={{ fontSize: 30 }}></MoreVertIcon>
            </IconButton>
            <Menu
              id="basic-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              MenuListProps={{
                "aria-labelledby": "basic-button",
              }}
            >
              <MenuItem onClick={handleOpenEditPost}>Edit</MenuItem>
              <Modal open={openEditPost} onClose={handleCloseEditPost}>
                <Stack width={"50vw"} justifyItems={"center"}>
                  <PostFormEdit
                    post={post}
                    doUpdatePost={doUpdatePost}
                    params={params}
                  />
                </Stack>
              </Modal>

              <MenuItem onClick={handleOpenConfirm}>Delete</MenuItem>
              <AskModal
                open={openConfirm}
                handleOpen={handleOpenConfirm}
                handleClose={handleCloseConfirm}
                execute={() => handleDeletePost(post._id)}
              />
            </Menu>
          </div>
        }
      />

      <Stack spacing={2} sx={{ p: 3 }}>
        <Typography>{post.content}</Typography>

        {post.image && (
          <Box
            sx={{
              borderRadius: 2,
              overflow: "hidden",
              height: 300,
              "& img": { objectFit: "cover", width: 1, height: 1 },
            }}
          >
            <img src={post.image} alt="post" />
          </Box>
        )}

        <PostReaction post={post} />
        <CommentList postId={post._id} />
        <CommentForm postId={post._id} />
      </Stack>
    </Card>
  );
}

export default PostCard;
