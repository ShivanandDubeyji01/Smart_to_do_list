export default function TaskList({ tasks, onEdit, onDelete }) {
  if (!tasks.length) {
    return (
      <div className="py-8 text-center text-gray-400">No tasks yet. Add one! 🎉</div>
    );
  }

  return (
    <div className="w-full">
      <h2 className="text-xl font-bold mb-4 text-white">Your Tasks</h2>
      <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {tasks.map(task => (
          <div
            key={task.id}
            className="bg-gray-800 border border-gray-700 p-6 rounded-xl shadow-lg flex flex-col justify-between min-h-[200px]"
          >
            <div>
              <div className="flex justify-between items-start mb-2">
                <span className="text-lg font-bold text-blue-300 flex-1 pr-2">{task.title}</span>
                <span className={`px-2 py-1 rounded text-xs font-medium whitespace-nowrap ${
                  task.completed
                    ? 'bg-green-600 text-white'
                    : 'bg-yellow-600 text-white'
                }`}>
                  {task.completed ? "✓ Completed" : "⏳ Pending"}
                </span>
              </div>
              <div className="text-gray-300 text-sm mb-3">{task.description || <span className="text-gray-500 italic">No description</span>}</div>
            </div>
            <div className="text-xs text-gray-400 mb-4 space-y-1">
              <div><span className="font-semibold">Due:</span> {task.due_date ? new Date(task.due_date).toLocaleString() : "Not set"}</div>
              <div><span className="font-semibold">Priority:</span> {task.priority}/5</div>
            </div>
            <div className="flex gap-2">
              <button className="bg-blue-700 text-white px-3 py-1 rounded text-sm hover:bg-blue-900 transition flex-1"
                onClick={() => onEdit(task)}>Edit</button>
              <button className="bg-red-700 text-white px-3 py-1 rounded text-sm hover:bg-red-900 transition flex-1"
                onClick={() => onDelete(task.id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
