export function calculateMovePosition(prevSquares: (string | null)[], currentSquares: (string | null)[]): string {
    for (let i = 0; i < 9; i++) {
      if (prevSquares[i] !== currentSquares[i]) {
        const row = Math.floor(i / 3) + 1;
        const col = (i % 3) + 1;
        return `Row ${row}, Col ${col}`;
      }
    }
    return '';
}