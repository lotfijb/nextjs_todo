import Link from "next/link";
import { prisma } from "./db";
import { TodoItem } from "@/components/ToDoItem";

export default async function Home() {
  const getTodos = async () => {
    return prisma.todo.findMany();
  };
  async function toggleTodo(id: string, complete: boolean) {
    "use server";

    await prisma.todo.update({ where: { id }, data: { complete } });
  }
  const todos = await getTodos();
  return (
    <div>
      <header className="flex justify-between">
        <h1 className=" text-2xl font-bold">Your To Do List</h1>
        <Link
          href="/new"
          className="text-2xl border border-slate-300 text-slate-300 px-2 py-1 rounded hover:bg-slate-700 focus-within:bg-slate-700 outline-none transition-all duration-300"
        >
          New
        </Link>
      </header>
      <ul className=" pl-5">
        {todos.length > 0
          ? todos.map((todo) => (
              <TodoItem key={todo.id} {...todo} toggleTodo={toggleTodo} />
            ))
          : "No todos yet"}
      </ul>
    </div>
  );
}
