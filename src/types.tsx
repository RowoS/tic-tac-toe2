export interface SquareProps {
  value: string | null;
  onSquareClick: () => void;
}

export interface BoardProps {
  xIsNext: boolean;
  squares: (string | null)[];
  onPlay: (squares: (string | null)[]) => void;
}
