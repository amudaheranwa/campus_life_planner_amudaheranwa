# campus_life_planner_amudaheranwa

# Campus Life Planner

A vanilla HTML, CSS and JavaScript web app that helps students keep track of campus activities, study sessions and deadlines. Tasks are stored in the browser (localStorage), so no server or account is needed.

- **Theme chosen:** Campus Life Planner
- **Live site (GitHub Pages):** https://amudaheranwa.github.io/campus_life_planner_amudaheranwa/Campus-life-planner/index.html
- **Demo video (unlisted):** 
- **Author:** Alvin Mudaheranwa· GitHub:https://github.com/amudaheranwa/ · Email: amudaheran@alustudent.com

## Features
- Add tasks with a title, date, duration (minutes) and category
- Table of all tasks, sortable by date, title or duration
- Live regex search across title, date, duration and category, with a case-sensitive toggle and an error message for invalid patterns
- Dashboard showing total tasks, total study time and progress against a weekly target
- Settings: weekly study target and display of study time in minutes or hours
- Automatic saving to localStorage, so tasks are still there after a refresh
- Export tasks to a JSON file, and import them back (the file is checked before it is loaded)
- Sample data in `seed.json` (11 tasks, including edge dates, very short and very long durations, and tricky titles)

## Project structure
```
index.html
seed.json
styles/styles.css
scripts/
  main.js        event listeners and start-up
  ui.js          rendering the table and dashboard
  state.js       the tasks array and add/replace logic
  storage.js     localStorage, export and import
  validators.js  form validation rules
  search.js      regex search
```

## How to run
The scripts are ES modules, so the page has to be served over http (opening the file directly will not work).
1. Clone the repo.
2. In the project folder run `python3 -m http.server`.
3. Open `http://localhost:8000`.

Or just use the live GitHub Pages link above.

## Regex catalog
| Where | Pattern | Example |
|---|---|---|
| Title characters | `^[a-zA-Z0-9\s.,!?'-]+$` | `Don't forget, club meeting!` is accepted, `Study #1` is rejected |
| Search box | Any pattern you type, compiled in a `try/catch` | `^Study` finds titles starting with Study, `(exam\|quiz)` finds either word, `\d{4}-10` finds October dates |

Other title rules: 3 to 50 characters after trimming. Date must be a valid date, and duration must be above 0.

## Keyboard map
| Key | Action |
|---|---|
| Tab / Shift+Tab | Move to the next / previous link, field or button |
| Enter | Follow a link, press a button, or submit the task form |
| Space | Toggle the case-sensitive checkbox, press a button |
| Up / Down arrows | Change the selected option in the Sort and Time-format menus |

## Accessibility notes
- Page is split into header, nav, main, sections and footer, with a heading for each section
- Every form field has a label
- Error messages use `role="alert"` and the status messages use `aria-live`
- Header, button and text colours have high contrast against their backgrounds


