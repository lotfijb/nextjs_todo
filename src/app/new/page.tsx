import Link from "next/link";
import React from "react";
import { prisma } from "../db";
import { redirect } from "next/navigation";

const createTodo = async (data: FormData) => {
  "use server";
  const title = data.get("title")?.valueOf();

  if (typeof title !== "string" || title.length === 0) {
    throw new Error("Title is required");
  }
  await prisma.todo.create({
    data: {
      title,
      complete: false,
    },
  });
  redirect("/");
};

const New = () => {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Create A New To Do</h1>
      <form action={createTodo} className="flex flex-col">
        <input
          type="text"
          name="title"
          id="todo"
          className="border border-slate-300 bg-transparent rounded px-2 py-1 outline-none focus-within:border-slate-100 h-12"
        />
        <div className="flex gap-4 mt-6">
          <Link
            href=".."
            className="text-2xl border border-slate-300 text-slate-300 px-2 py-1 rounded hover:bg-slate-700 focus-within:bg-slate-700 outline-none transition-all duration-300"
          >
            {" "}
            Cancel{" "}
          </Link>
          <button
            type="submit"
            className="text-2xl border border-slate-300 text-slate-300 px-2 py-1 rounded hover:bg-slate-700 focus-within:bg-slate-700 outline-none transition-all duration-300"
          >
            Create
          </button>
        </div>
      </form>
    </div>
  );
};

export default New;
