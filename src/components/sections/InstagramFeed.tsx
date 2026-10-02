import { getInstagramPosts } from "@/lib/instagram";
import InstagramFeedClient from "./InstagramFeedClient";

export const revalidate = 10800; // ISR 3h

export default async function InstagramFeed() {
  const { posts, isMock } = await getInstagramPosts(30);

  return <InstagramFeedClient posts={posts} isMock={isMock} />;
}
