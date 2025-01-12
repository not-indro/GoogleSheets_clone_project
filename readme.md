# Web Application Mimicking Google Sheets

## Features

### 1. Spreadsheet Interface
- **Mimic Google Sheets UI**: The application closely resembles Google Sheets in terms of visual design, layout, toolbar, formula bar, and cell structure.
- **Drag Functions**: Drag functionality for cell content, formulas, and selections is implemented.
- **Cell Dependencies**: Formulas and functions accurately reflect cell dependencies and update dynamically when related cells are modified.
- **Basic Cell Formatting**: Supports bold, italics, font size, and color.
- **Row and Column Management**: Users can add, delete, and resize rows and columns.

### 2. Mathematical Functions
- **SUM**: Calculates the sum of a range of cells.
- **AVERAGE**: Calculates the average of a range of cells.
- **MAX**: Returns the maximum value from a range of cells.
- **MIN**: Returns the minimum value from a range of cells.
- **COUNT**: Counts the number of cells containing numerical values in a range.

### 3. Data Quality Functions
- **TRIM**: Removes leading and trailing whitespace from a cell.
- **UPPER**: Converts the text in a cell to uppercase.
- **LOWER**: Converts the text in a cell to lowercase.
- **REMOVE_DUPLICATES**: Removes duplicate rows from a selected range.
- **FIND_AND_REPLACE**: Allows users to find and replace specific text within a range of cells.

### 4. Data Entry and Validation
- **Data Types**: Supports input of numbers, text, and dates.
- **Data Validation**: Ensures numeric cells only contain numbers.

### 5. Testing
- **User Testing**: Users can test the implemented functions with their own data.
- **Result Display**: Results of function execution are displayed clearly.

### Bonus Features
- **Additional Functions**: Implemented more mathematical and data quality functions.
- **Complex Formulas**: Supports relative and absolute cell referencing.
- **Save/Load**: Users can save and load their spreadsheets.
- **Data Visualization**: Incorporated basic chart and graph capabilities.

---

## Tech Stack
- **Frontend**: Vanilla JavaScript, HTML, CSS
- **Backend**: None (fully client-side application)
- **Data Structures**: 
  - **2D Array**: Used to represent the spreadsheet grid and store cell data.
  - **Object**: Used to manage cell properties (e.g., formatting, formulas, dependencies).
  - **Map**: Used to track cell dependencies and update formulas dynamically.

---

## Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/google-sheets-clone.git
   ```
2. Navigate to the project directory:
   ```bash
   cd google-sheets-clone
   ```
3. Open `index.html` in your browser:
   ```bash
   open index.html
   ```

---

## Project Structure
```
google-sheets-clone/
│
|
|
│--CSS/
|   ├── components.css
│   ├── excel.css
│   ├── header.css
│   ├── layout.css
│   ├── misc.css
│   ├── reset.css
│   ├── responsive.css
│   └── theme.css
│
├── components/
│   ├── baseComponent.js
│   ├── cell.js
│   ├── excel.js
│   ├── graph.js
│   └── modal.js
│
├── utils/
│   ├── DOM.js
│   └── parser.js
│
├── index.html
├── main.js
├── LICENSE
└── README.md
```

---

## Why Vanilla JavaScript, HTML, and CSS?
1. **Simplicity**: 
   - The project is lightweight and does not require a complex framework like React. Vanilla JavaScript, HTML, and CSS are sufficient to build the core functionalities.
   
2. **Performance**:
   - Since the application is relatively simple, using vanilla JavaScript ensures faster load times and better performance compared to a framework with additional overhead.

3. **Learning Opportunity**:
   - Building the application from scratch without a framework provides a deeper understanding of DOM manipulation, event handling, and state management.

4. **No Build Tools**:
   - Vanilla JavaScript eliminates the need for build tools like Webpack or Babel, making the development process straightforward.

5. **Flexibility**:
   - Vanilla JavaScript allows for complete control over the application's behavior and structure, which is ideal for mimicking Google Sheets' intricate features.

---

## Why Not React?
1. **Overhead**:
   - React introduces additional complexity and overhead for a project of this scale. The application does not require React's component-based architecture or virtual DOM.

2. **Unnecessary Features**:
   - Features like state management (e.g., Redux) and routing are not needed for this single-page application.

3. **Performance**:
   - React's virtual DOM and reconciliation process are unnecessary for the relatively simple UI updates in this project.

4. **Learning Curve**:
   - Using vanilla JavaScript ensures that the focus remains on core web development concepts rather than learning a framework.

---

## Data Structures Used
1. **2D Array**:
   - Represents the spreadsheet grid. Each cell is accessed using row and column indices.
   - Example: `grid[row][col] = { value: "Hello", formula: "=A1+B1", formatting: { bold: true } }`.

2. **Object**:
   - Stores cell properties such as value, formula, formatting, and dependencies.
   - Example: `{ value: "42", formula: "=SUM(A1:A10)", formatting: { bold: true, color: "red" } }`.

3. **Map**:
   - Tracks cell dependencies to ensure formulas update dynamically when related cells change.
   - Example: `dependencies.set("A1", ["B1", "C1"])`.
