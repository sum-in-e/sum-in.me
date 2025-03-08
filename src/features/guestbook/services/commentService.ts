import {
  Comment,
  getComments as getCommentsFromRepo,
  createComment as createCommentFromRepo,
} from '../repositories/commentRepository';

export type { Comment };

export async function getComments(): Promise<Comment[]> {
  return getCommentsFromRepo();
}

export async function createComment(comment: string): Promise<Comment> {
  return createCommentFromRepo(comment);
}
