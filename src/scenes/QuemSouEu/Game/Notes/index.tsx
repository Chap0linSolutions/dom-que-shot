import { useRef, useState, useEffect } from 'react';
import { Note, NoteInput, NoteList, NoteSpace } from './Notes.style';
import { X } from 'react-feather';

export default function Notes() {
  const [notes, setNotes] = useState<string[]>(() => []);
  const inputRef = useRef(null);

  ////Listener para remover foco do <input> quando o usuário aperta Enter/////////////////////////

  useEffect(() => {
    document.addEventListener('keydown', detectKeyDown);
    return () => {
      document.removeEventListener('keydown', detectKeyDown);
    };
  }, []);

  const detectKeyDown = (e) => {
    if (e.key === 'Enter') {
      const a = inputRef.current.value.trim();
      if (a.length === 0) return;
      setNotes((previous) => [...previous, a]);
      inputRef.current.value = '';
    }
  };

  const removeNote = (i: number) => {
    setNotes((previous) => {
      const updated = [...previous];
      updated.splice(i, 1);
      return updated;
    });
  };

  ////////////////////////////////////////////////////////////////////////////////////////////////

  return (
    <NoteSpace>
      <NoteInput ref={inputRef} placeholder="Insira uma anotação aqui..." />
      <NoteList>
        {notes.map((note, i) => (
          <Note>
            <X
              width={20}
              color="#aaaaaa"
              strokeWidth={3}
              style={{ flexShrink: 0, marginRight: 5 }}
              onClick={() => removeNote(i)}
            />
            {note}
          </Note>
        ))}
      </NoteList>
    </NoteSpace>
  );
}
