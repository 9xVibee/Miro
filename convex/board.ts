import { v } from "convex/values";
import { mutation } from "./_generated/server";

const images = [
  "/1.svg",
  "/2.svg",
  "/3.svg",
  "/4.svg",
  "/5.svg",
  "/6.svg",
  "/7.svg",
  "/8.svg",
  "/9.svg",
  "/10.svg",
];

export const create = mutation({
  args: {
    orgId: v.string(),
    title: v.string(),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      throw new Error("Unauthorized");
    }

    const randomImage = images[Math.floor(Math.random() * images.length)];

    const board = await ctx.db.insert("boards", {
      title: args.title,
      authorId: identity.subject,
      orgId: args.orgId,
      authorName: identity.name!,
      imageUrl: randomImage,
    });

    return board;
  },
});
