import { FC } from "react";

interface IDeleteNoteProps {
  setOpenDeleteModal(value: {
    isShown: boolean;
    confirm: boolean;
    noteTitle: string;
    noteId: string
  }): void;
  noteTitle: string;
  noteId: string
}

const DeleteNote: FC<IDeleteNoteProps> = ({
  setOpenDeleteModal,
  noteTitle,
  noteId
}) => {
  return (
    <div className="relative">
      <p className="flex">
        Desea borrar la nota:&nbsp;<h2>{noteTitle}</h2>?
      </p>
      <div className="flex gap-4">
        <button
          onClick={() =>
            setOpenDeleteModal({ isShown: false, confirm: true, noteTitle, noteId })
          }
          className="btn-primary font-medium mt-5 p-3 bg-red-500 hover:bg-red-600"
        >
          Borrar
        </button>
        <button
          onClick={() =>
            setOpenDeleteModal({ isShown: false, confirm: false, noteTitle, noteId })
          }
          className="btn-primary font-medium mt-5 p-3"
        >
          Cancelar
        </button>
      </div>
    </div>
  );
};

export default DeleteNote;
