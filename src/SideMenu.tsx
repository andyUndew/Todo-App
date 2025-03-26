import "@radix-ui/themes/styles.css";
import { Heading, Flex, Button, Text, Box } from "@radix-ui/themes";
import { CaretDownIcon } from "@radix-ui/react-icons";
import { Dialog, NavigationMenu } from "radix-ui";
import { Note } from "./Note";
import "./MainMenu.scss";
import { ChangeEvent, useState } from "react";

type Props = {
  notes: Note[];
  localTitle: string;
  handleNewNote: (noteName: string) => void;
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
  const [noteName, setNoteName] = useState<string>("");
  const [errTxt, setErrTxt] = useState<string>("");
  const [disable, setDisable] = useState<boolean>(true);

  const handleNoteChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newName = e.target.value;
    setNoteName(newName);
    if (newName === "") {
      setErrTxt("名前を入力してください。");
      setDisable(true);
    } else {
      setErrTxt("");
      setDisable(false);
    }
  };
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
        display={{
          initial: "none",
          md: "flex",
        }}
      >
        <Heading as="h1" mb="6" align="center" weight="bold">
          Note-App
        </Heading>

        <Dialog.Root>
          <Dialog.Trigger>
            <Button className="addButton" size="4" mb="6">
              Add Note
            </Button>
          </Dialog.Trigger>
          <Dialog.Portal>
            <Dialog.Overlay className="DialogOverlay" />
            <Dialog.Content className="DialogContent">
              <Dialog.Title className="DialogTitle">
                Create New Note
              </Dialog.Title>
              <fieldset className="Fieldset">
                <input
                  className="Input"
                  id="name"
                  placeholder="Note Name"
                  value={noteName}
                  onChange={(e) => handleNoteChange(e)}
                />
              </fieldset>
              <Dialog.Description>
                <span className="errTxt">{errTxt}</span>
              </Dialog.Description>
              <div
                style={{
                  display: "flex",
                  marginTop: 25,
                  justifyContent: "flex-end",
                  alignItems: "stretch",
                }}
              >
                <Dialog.Close asChild>
                  <button
                    className="Button green"
                    disabled={disable}
                    onClick={() => handleNewNote(noteName)}
                  >
                    Add Note
                  </button>
                </Dialog.Close>
              </div>
            </Dialog.Content>
          </Dialog.Portal>
        </Dialog.Root>
        {notes.map((note) => (
          <Button
            key={note.id}
            size="2"
            mb="4"
            onClick={() => onSelect(note)}
            color={selectNoteId === note.id ? "orange" : "cyan"}
          >
            {localTitle === note.title ? localTitle : note.title}
          </Button>
        ))}
      </Flex>
      <Box
        position="sticky"
        display={{
          initial: "block",
          md: "none",
        }}
        p="4"
      >
          <NavigationMenu.Root className="NavigationMenuRoot">
            <NavigationMenu.List className="NavigationMenuList">
              <NavigationMenu.Item>
                <Heading className="navHeader" align="center">Note-App</Heading>
              </NavigationMenu.Item>
              <NavigationMenu.Item>
                <Flex justify="end" align="stretch">
                <Dialog.Root>
                  <Dialog.Trigger>
                    <Button className="addButton" size="2">
                      +
                    </Button>
                  </Dialog.Trigger>
                  <Dialog.Portal>
                    <Dialog.Overlay className="DialogOverlay" />
                    <Dialog.Content className="DialogContent">
                      <Dialog.Title className="DialogTitle">
                        Create New Note
                      </Dialog.Title>
                      <fieldset className="Fieldset">
                        <input
                          className="Input"
                          id="name"
                          placeholder="Note Name"
                          value={noteName}
                          onChange={(e) => handleNoteChange(e)}
                        />
                      </fieldset>
                      <Dialog.Description>
                        <span className="errTxt">{errTxt}</span>
                      </Dialog.Description>
                      <div
                        style={{
                          display: "flex",
                          marginTop: 25,
                          justifyContent: "flex-end",
                          alignItems: "stretch",
                        }}
                      >
                        <Dialog.Close asChild>
                          <button
                            className="Button green"
                            disabled={disable}
                            onClick={() => handleNewNote(noteName)}
                          >
                            Add Note
                          </button>
                        </Dialog.Close>
                      </div>
                    </Dialog.Content>
                  </Dialog.Portal>
                </Dialog.Root>
                <NavigationMenu.Trigger className="NavigationMenuTrigger">
                  <Button>
                    ノートを選択{" "}
                    <CaretDownIcon className="CaretDown" aria-hidden />
                  </Button>
                </NavigationMenu.Trigger>
                <NavigationMenu.Content className="NavigationMenuContent">
                  <Flex p="4" direction="column" align="stretch">
                    {notes.map((note) => (
                      <Button
                        key={note.id}
                        size="2"
                        mb="4"
                        onClick={() => onSelect(note)}
                        color={selectNoteId === note.id ? "orange" : "cyan"}
                      >
                        {localTitle === note.title ? localTitle : note.title}
                      </Button>
                    ))}
                  </Flex>
                </NavigationMenu.Content>
                </Flex>
              </NavigationMenu.Item>

              <NavigationMenu.Indicator className="NavigationMenuIndicator">
                <div className="Arrow" />
              </NavigationMenu.Indicator>
            </NavigationMenu.List>

            <div className="ViewportPosition">
              <NavigationMenu.Viewport className="NavigationMenuViewport" />
            </div>
          </NavigationMenu.Root>
      </Box>
    </div>
  );
}
