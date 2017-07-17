const requireDir = require('require-dir');

// Require all tasks in /tasks, including subfolders (which is the recurse bit)
requireDir('./tasks', { recurse: true });
