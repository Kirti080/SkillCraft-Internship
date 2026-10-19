# SkillCraft-Internship reviewer notes

## Architecture

This is a collection of four independent vanilla HTML/CSS/JavaScript projects, organized by task directories rather than a shared application architecture. Each task owns its UI and script: the landing page adds navigation behavior and ScrollReveal effects, the calculator evaluates expressions, the quiz uses an in-memory question array, and the to-do app renders an in-memory task array. There is no visible backend, build system, module structure, or shared state.

## Conventions

- Keep task-specific behavior in the corresponding directory and script: `task1_landing page/task1_script.js`, `task2_calculator/task2_script.js`, `task3_funQuiz/task3_script.js`, and `task4_to do web/task4_script.js`.
- Use browser DOM APIs and event listeners rather than frameworks. Examples include `window.addEventListener("scroll", ...)` in Task 1, button iteration with `addEventListener("click", ...)` in Task 2, and `taskForm.addEventListener("submit", ...)` in Task 4.
- Element references are initialized once near the top of each script using IDs such as `display`, `questionText`, `taskForm`, and `taskList`; subsequent functions operate through those references.
- Task 3 models quiz content as data in `quizData`, with explicit `type` values (`"single"`, `"multiple"`, and `"fill"`), then branches in `loadQuestion`, `getUserAnswer`, and `checkAnswer`.
- Rendering is done by clearing and rebuilding containers. Quiz questions use `optionsContainer.innerHTML = ""`; tasks use `taskList.innerHTML = ""` followed by one generated `<li>` per task.
- State is deliberately simple and in memory: `currentExpression` for the calculator, `currentQuestion`/`score` for the quiz, and `tasks` for the to-do app. Changes generally call a full render/update function afterward.

## Intentional non-standard choices

- The projects use inline event-handler attributes in generated to-do markup, e.g. `onclick="toggleComplete(${task.id})"` in `task4_to do web/task4_script.js`, instead of delegated listeners.
- The calculator intentionally uses `eval(currentExpression)` in `task2_calculator/task2_script.js` to evaluate the user-entered arithmetic expression.
- The quiz’s humorous copy, emojis, prompts, and reactions are part of the stated “Funny Version” design in `readme.md`, not accidental production wording.

## Watch out for

- Flag untrusted interpolation into `innerHTML`. Both task titles in `task4_to do web/task4_script.js` and quiz option values/labels in `task3_funQuiz/task3_script.js` are inserted without escaping, creating an XSS risk if input becomes externally controlled.
- Review any calculator changes around `eval`; expanding accepted input or allowing non-arithmetic content would increase the existing code-execution risk.
- `toggleComplete` and `editTask` assume `tasks.find(...)` returns an object. Invalid, stale, or malformed IDs can cause a runtime error.
- Task data is not persisted: `tasks` resets on reload despite the app supporting date/time fields. Do not claim localStorage or server persistence exists unless it is added explicitly.
- `new Date(task.dateTime).toLocaleString()` may produce an invalid date for malformed or empty values; validate date input before rendering or editing.