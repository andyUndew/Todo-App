// 以下のサイトを参考に作成
// https://qiita.com/Sicut_study/items/d3ef6d1347515c65a713

import { Flex, Heading } from "@radix-ui/themes";
import SideMenu from "./SideMenu";
import MainMenu from "./MainMenu";
import { useEffect, useState } from "react";
import { supabase } from "./supabase/client";
import { useDebouncedCallback } from "use-debounce";
import { Note } from "./Note";

export default function App() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [currentNoteId, setCurrentNoteId] = useState<number | null>(null);
  const [localContent, setLocalContent] = useState<string>("");
  const [localTitle, setLocalTitle] = useState<string>("");

  // ノートが変わったらローカルステートを更新
  useEffect(() => {
    const currentNote = notes.find((note) => note.id === currentNoteId);
    if (currentNote) {
      setLocalContent(currentNote.content);
      setLocalTitle(currentNote.title);
    }
  }, [currentNoteId, notes]); // ← notesが更新されたらローカルのcontent,titleも更新

  const handleLocalContentChange = (
    e: string
  ) => {
    setLocalContent(e);
    handleContentChange(e); // Debounce付きの更新を実行
  };
  const handleLocalTitleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setLocalTitle(e.target.value);
    handleTitleChange(e.target.value); // Debounce付きの更新を実行
  };

  useEffect(() => {
    fetchNotes();
    const mySubscription = supabase
      .channel("note")
      .on(
        "postgres_changes",
        { event: "UPDATE", schema: "public", table: "note" },
        fetchNotes
      )
      .subscribe();
    return () => {
      supabase.removeChannel(mySubscription);
    };
  }, []);

  const fetchNotes = async () => {
    const { data, error } = await supabase
      .from("note")
      .select("*")
      .order("id", { ascending: false });
    if (error) console.error("Error fetching notes", error);
    else setNotes(data);
    console.log(data);
  };

  const handleNewNote = async (noteName:string) => {
    const { data, error } = await supabase
      .from("note")
      .insert({ title: noteName, content: "" });
    if (error || data) {
      console.error(error);
      return;
    }

    fetchNotes();
  }; // 追加

  const handleDeleteNote = async () =>  {
    const { data, error } = await supabase
    .from("note")
    .delete().eq("id",currentNoteId)
  if (error || data) {
    console.error(error);
    return;
  }
  setCurrentNoteId(null);
  fetchNotes();
  };

  const handleContentChange = useDebouncedCallback(async (content) => {
    const { error } = await supabase
      .from("note")
      .update({ content })
      .eq("id", currentNoteId);
    if (error) console.error("Error updating note", error);

    fetchNotes();
    console.log("DB更新したよー");
  }, 500);

  const handleTitleChange = useDebouncedCallback(async (title) => {
    const { error } = await supabase
      .from("note")
      .update({ title })
      .eq("id", currentNoteId);
    if (error) console.error("Error updating note", error);

    fetchNotes();
  }, 500); // 追加

  return (
    <Flex>
      <SideMenu
        notes={notes}
        handleNewNote={handleNewNote}
        selectNoteId={currentNoteId}
        onSelect={(note) => setCurrentNoteId(note.id)}
        localTitle={localTitle}
      />
      {currentNoteId ? 
            <MainMenu
            localContent={localContent}
            localTitle={localTitle}
            content={notes.find((note) => note.id === currentNoteId)?.content || ""}
            title={notes.find((note) => note.id === currentNoteId)?.title || ""}
            onContentChange={handleLocalContentChange}
            onTitleChange={handleLocalTitleChange}
            onDeleteNote={handleDeleteNote}
          />
          :
          <Flex height="100vh" justify="center" align="center" width="calc(100% - 350px)">
            <Heading className="page-title">Welcome to Note-App!</Heading>
          </Flex>
    }
    </Flex>
  );
}
