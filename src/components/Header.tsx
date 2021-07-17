interface SelectedGenreProps {
  selectedGenre: {
    id: number;
    name: string;
    title: string;
  }
}

export function Header(props: SelectedGenreProps) {
  //console.log(props.selectedGenre)
  return (
    <header>
      <span className="category">Categoria:<span> {props.selectedGenre.title}</span></span>
    </header>
  )
}