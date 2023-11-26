# Todo List Application

## Features

## Adding Tasks

### Text Input Field

Users can add tasks by typing them into a text input field.

### Submit Button

A 'Submit' button is available to add the task to the to-do list.

### Task Display

Each task is displayed as a list item in an unordered list, with new tasks appearing at the top.

## Deleting Tasks

### Delete Button

Next to each task, a 'Delete' button is provided.

### Removal Mechanism

Clicking the 'Delete' button removes the corresponding task from the list.

## Prioritizing Tasks

### Mark as Important

Users can mark tasks as 'Important', either through a button or by clicking on the task itself.

### Visual Distinction

Important tasks are visually distinct, possibly highlighted with a different color.

### Sorting

Optionally, a feature to sort or move important tasks to the top of the list can be implemented.

## Advanced Features

### Task Editing

Users have the option to edit the text of existing tasks.

### Task Completion

A feature allows users to mark tasks as completed, with completed tasks styled differently, such as with strikethrough text.

### Categories or Tags

Users can assign categories or tags to tasks, facilitating task filtering based on these categories.

### Responsive Design

The application is designed to be usable on various devices, including mobile phones and tablets.

## Technologies Used

- **NextJS:** A React framework for building user interfaces.
- **TailwindCSS:** Used for styling the application.
- **React Icons:** For Icons

## Local Development

Before running the application locally, you need to update the API origin in the backend to match your local environment. Follow these steps:

1. Open the `api.js` file in the `src/api` directory.

2. Locate the `BASE_URL` constant and update it to the URL where your local backend server is running. By default, it might be something like `http://localhost:8000`.

   ```javascript
   // src/api/api.js

   const BASE_URL = "http://localhost:8000"; // Update this to your local backend URL
   ```
