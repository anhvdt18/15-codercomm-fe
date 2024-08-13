import React from "react";
import { Avatar, Box, Button, Paper, Stack, Typography } from "@mui/material";
import { fDate } from "../../utils/formatTime";
import CommentReaction from "./CommentReaction";
import AskModal from "../../components/AskModal";

function CommentCard({ comment, handleDeleteComment }) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <Stack direction="row" spacing={2}>
      <Avatar alt={comment.author?.name} src={comment.author?.avatarUrl} />
      <Paper sx={{ p: 1.5, flexGrow: 1, bgcolor: "background.neutral" }}>
        <Stack
          direction="row"
          alignItems={{ sm: "center" }}
          justifyContent="space-between"
          sx={{ mb: 0.5 }}
        >
          <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
            {comment.author?.name}
          </Typography>
          <Stack
            direction="row"
            alignItems={{ sm: "center" }}
            justifyContent="space-between"
            spacing={1}
            sx={{ mb: 0.5 }}
          >
            <Typography variant="caption" sx={{ color: "text.disabled" }}>
              {fDate(comment.createdAt)}
            </Typography>
            <Button
              variant="caption"
              sx={{ fontSize: 10, width: 20 }}
              // onClick={() => handleDeleteComment(comment._id)}
              onClick={handleOpen}
            >
              delete
            </Button>
            <AskModal
              open={open}
              handleOpen={handleOpen}
              handleClose={handleClose}
              execute={() => handleDeleteComment(comment._id)}
            />
          </Stack>
        </Stack>
        <Typography variant="body2" sx={{ color: "text.secondary" }}>
          {comment.content}
        </Typography>
        <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
          <CommentReaction comment={comment} />
        </Box>
      </Paper>
    </Stack>
  );
}

export default CommentCard;
