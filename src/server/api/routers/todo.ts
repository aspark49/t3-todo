import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "../trpc";
import { TRPCError } from "@trpc/server";

export const todoRouter = createTRPCRouter({
  // Todo 목록 가져오기
  getAll: protectedProcedure.query(async ({ ctx }) => {
    const todos = await ctx.db.todo.findMany({
      where: { userId: ctx.session.user.id },
      orderBy: { createdAt: "desc" },
    });
    return todos;
  }),

  // 단일 Todo 가져오기
  getById: protectedProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      const todo = await ctx.db.todo.findUnique({
        where: { id: input.id },
      });

      if (!todo || todo.userId !== ctx.session.user.id) {
        throw new TRPCError({ code: "NOT_FOUND" });
      }

      return todo;
    }),

  // Todo 생성
  create: protectedProcedure
    .input(z.object({
      title: z.string().min(1, "제목은 필수입니다"),
      content: z.string().optional(),
    }))
    .mutation(async ({ ctx, input }) => {
      return ctx.db.todo.create({
        data: {
          title: input.title,
          content: input.content,
          userId: ctx.session.user.id,
        },
      });
    }),

  // Todo 수정
  update: protectedProcedure
    .input(z.object({
      id: z.string(),
      title: z.string().optional(),
      content: z.string().optional(),
      completed: z.boolean().optional(),
    }))
    .mutation(async ({ ctx, input }) => {
      const todo = await ctx.db.todo.findUnique({
        where: { id: input.id },
      });

      if (!todo || todo.userId !== ctx.session.user.id) {
        throw new TRPCError({ code: "NOT_FOUND" });
      }

      return ctx.db.todo.update({
        where: { id: input.id },
        data: {
          title: input.title,
          content: input.content,
          completed: input.completed,
        },
      });
    }),

  // Todo 삭제
  delete: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const todo = await ctx.db.todo.findUnique({
        where: { id: input.id },
      });

      if (!todo || todo.userId !== ctx.session.user.id) {
        throw new TRPCError({ code: "NOT_FOUND" });
      }

      return ctx.db.todo.delete({
        where: { id: input.id },
      });
    }),
});