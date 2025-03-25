import { Heading, Flex, Button } from "@radix-ui/themes";
import { Note } from "./Note";
import './MainMenu.scss';

type Props = {
  notes: Note[];
  localTitle:string;
  handleNewNote: () => void;
  selectNoteId: number | null;
  onSelect: (note: Note) => void;
};

export default function SideMenu({
  notes,
  localTitle,
  handleNewNote,
  selectNoteId,
  onSelect,
}: Props) {
  return (
    <div className="menu">
      <Flex
        py="8"
        px="4"
        position="sticky"
        width="300px"
        align="stretch"
        direction="column"
        height="100vh"
      >
        <Heading as="h1" mb="6" align="center" weight="bold">
          Undew-App
        </Heading>
        <Button size="4" mb="6" onClick={handleNewNote}>
          ページを追加する
        </Button>
        {notes.map((note) => (
          <Button
            key={note.id}
            size="2"
            mb="4"
            onClick={() => onSelect(note)}
            color={selectNoteId === note.id ? "orange" : "indigo"}
          >
            {localTitle ? localTitle : note.title}
          </Button>
        ))}
      </Flex>
    </div>
  );
}
