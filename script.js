document.addEventListener('DOMContentLoaded', function () {
  const gridSize = 5;
  const grid = document.getElementById('grid');
  const resetButton = document.getElementById('resetButton');
  const hintButton = document.getElementById('hintButton');
  const instructionsButton = document.getElementById('instructionsButton');
  const instructionsModal = document.getElementById('instructionsModal');
  const closeInstructions = document.querySelector('#instructionsModal .close');
  const hintText = document.getElementById('hintText');
  let moveCount = 0;

  function toggleSquare(square) {
    square.classList.toggle('is-off');
    toggleAdjacentSquares(square);
    moveCount++; // Increment move count
    document.getElementById('moveCount').textContent = moveCount; // Update move count display
    checkWin(); // Check for win after toggling
  }

  function toggleAdjacentSquares(square) {
    const rowIndex = +square.getAttribute('data-row');
    const colIndex = +square.getAttribute('data-col');

    const directions = [
      { row: -1, col: 0 },
      { row: 1, col: 0 },
      { row: 0, col: -1 },
      { row: 0, col: 1 }
    ];

    for (const dir of directions) {
      const adjRow = rowIndex + dir.row;
      const adjCol = colIndex + dir.col;

      if (adjRow >= 0 && adjRow < gridSize && adjCol >= 0 && adjCol < gridSize) {
        const adjSquare = document.querySelector(`[data-row="${adjRow}"][data-col="${adjCol}"]`);
        adjSquare.classList.toggle('is-off');
      }
    }
  }

  function generateGrid() {
    for (let i = 0; i < gridSize; i++) {
      for (let j = 0; j < gridSize; j++) {
        const square = document.createElement('div');
        square.classList.add('square');
        square.setAttribute('data-row', i);
        square.setAttribute('data-col', j);
        square.addEventListener('click', () => {
          toggleSquare(square);
        });

        // Randomly set the initial state of the square
        square.classList.toggle('is-off', Math.random() < 0.5);

        grid.appendChild(square);
      }
    }
  }

  function resetGrid() {
    const squares = document.querySelectorAll('.square');
    const shuffledSquares = Array.from(squares).sort(() => Math.random() - 0.5); // Shuffle the squares

    shuffledSquares.forEach((square, index) => {
      square.classList.toggle('is-off', index < squares.length / 2); // Toggle the 'is-off' class for the first half of the shuffled squares
    });

    moveCount = 0; // Reset move count
    document.getElementById('moveCount').textContent = moveCount; // Update move count display
  }

  function checkWin() {
    const isWin = [...document.querySelectorAll('.square')].every(square => square.classList.contains('is-off'));
    if (isWin) {
      alert('You win!');
      resetGrid();
    }
  }

  resetButton.addEventListener('click', resetGrid);
  hintButton.addEventListener('click', showHint);
  instructionsButton.addEventListener('click', showInstructions);
  closeInstructions.addEventListener('click', closeInstructionsModal);

  function showHint() {
    displayRandomHint();
  }

  function displayRandomHint() {
    const hints = [
      "Tip: Start by toggling squares along the borders to see how it affects the rest of the grid.",
      "Tip: Look for repeating patterns or symmetries in the initial state of the grid.",
      "Tip: Toggling squares in the corners can have a significant impact on the rest of the grid.",
      "Tip: Practice and patience are key. Take your time to analyze the grid and try different strategies."
    ];
    const randomIndex = Math.floor(Math.random() * hints.length);
    hintText.textContent = hints[randomIndex];
  }

  function showInstructions() {
    instructionsModal.style.display = 'block';
  }

  function closeInstructionsModal() {
    instructionsModal.style.display = 'none';
  }

  generateGrid(); // Generate the initial grid
});
