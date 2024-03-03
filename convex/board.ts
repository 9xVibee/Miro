import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

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

//! creating a board
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

//! removing a board from database
export const remove = mutation({
  args: {
    id: v.id("boards"),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      throw new Error("Unauthorized");
    }

    const existingFavorite = await ctx.db
      .query("userFavorites")
      .withIndex("by_user_board", (q) =>
        q.eq("userId", identity.subject).eq("boardId", args.id)
      )
      .unique();

    if (existingFavorite) {
      await ctx.db.delete(existingFavorite._id);
    }

    await ctx.db.delete(args.id);
  },
});

//! renaming a specific board
export const rename = mutation({
  args: {
    id: v.id("boards"),
    rename: v.string(),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      throw new Error("Unauthorized");
    }

    const title = args.rename.trim();

    if (!title) {
      throw new Error("Title Required");
    }

    if (title.length > 60) {
      throw new Error("Title cannot be longer than 60 characters");
    }

    const board = await ctx.db.patch(args.id, {
      title: args.rename,
    });

    return board;
  },
});

//! favorting a board
export const favorite = mutation({
  args: {
    id: v.id("boards"),
    orgId: v.string(),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      throw new Error("Unauthorized");
    }

    const board = await ctx.db.get(args.id);

    if (!board) {
      throw new Error("Board not exist");
    }

    const userId = identity.subject;

    const existingFavorites = await ctx.db
      .query("userFavorites")
      .withIndex("by_user_board_org", (q) => {
        return q
          .eq("userId", userId)
          .eq("boardId", board._id)
          .eq("orgId", args.orgId);
      })
      .unique();

    if (existingFavorites) {
      throw new Error("Already favorited");
    }

    await ctx.db.insert("userFavorites", {
      userId,
      boardId: board._id,
      orgId: args.orgId,
    });

    return board;
  },
});

//! unfavorting a board
export const unfavorite = mutation({
  args: {
    id: v.id("boards"),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      throw new Error("Unauthorized");
    }

    const board = await ctx.db.get(args.id);

    if (!board) {
      throw new Error("Board not exist");
    }

    const userId = identity.subject;

    const existingFavorites = await ctx.db
      .query("userFavorites")
      .withIndex("by_user_board_org", (q) => {
        return q
          .eq("userId", userId)
          .eq("boardId", board._id)
          .eq("orgId", board.orgId);
      })
      .unique();

    if (!existingFavorites) {
      throw new Error("Already not favorited");
    }

    await ctx.db.delete(existingFavorites._id);

    return board;
  },
});

//! getting board based on id
export const get = query({
  args: {
    id: v.id("boards"),
  },
  handler: async (ctx, args) => {
    const board = ctx.db.get(args.id);

    return board;
  },
});
