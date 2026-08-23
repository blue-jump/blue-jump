import { notFound } from "next/navigation";

import type { Metadata } from "next";

import { findPostById } from "@/mocks/sample-data.selectors";
import { PostDetailView } from "@/views/community";

interface PostDetailPageProps {
  params: Promise<{
    postId: string;
  }>;
}

export async function generateMetadata({ params }: PostDetailPageProps): Promise<Metadata> {
  const { postId } = await params;
  const post = findPostById(postId);

  if (!post) {
    return {
      title: "게시글을 찾을 수 없습니다",
    };
  }

  return {
    title: post.title,
    description: post.body,
  };
}

export default async function PostDetailPage({ params }: PostDetailPageProps) {
  const { postId } = await params;
  const post = findPostById(postId);

  if (!post) {
    notFound();
  }

  return <PostDetailView post={post} />;
}
