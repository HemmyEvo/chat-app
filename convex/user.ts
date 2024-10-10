import { v } from "convex/values";
import {internalMutation , internalQuery, mutation} from "./_generated/server";

export const create = internalMutation({
    args: {
        username: v.string(),
        imageUrl: v.string(),
        clerkId: v.string(),
        email: v.string(),
    },
    handler: async(ctx, args) =>{
        await ctx.db.insert("users", args);
    }
})

export const get = internalQuery({
    args: {
        clerkId: v.string(),
    },
    async handler(ctx, args){
        return ctx.db
        .query("users")
        .withIndex("by_clerkId", (q) => q.eq("clerkId", args.clerkId))
        .unique()
    }
})
export const update = mutation({
    args:{
        username: v.string(),
        imageUrl: v.string(),
        email: v.string(),
        clerkId: v.string()
    },
    handler: async(ctx, args) => {
        const user = await ctx.db
        .query("users")
        .withIndex("by_clerkId", (q) => q.eq("clerkId", args.clerkId))
        .unique();
  
      if (!user) {
        throw new Error(`User with clerkId ${args.clerkId} not found`);
      }
  
      // Update the user's username and imageUrl
      await ctx.db.patch(user._id, {
        username: args.username,
        imageUrl: args.imageUrl,
        email: args.email
      });
    },
})
