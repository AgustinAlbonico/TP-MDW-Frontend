import { FC, useState } from "react";
import TagInput from "./TagInput";
import { MdClose } from "react-icons/md";
import { INote } from "../pages/Home/Home";
import axiosInstance from "../utils/axiosInstance";
import { notifyError, notifySuccess } from "../utils/toastFunctions";
import { AxiosError } from "axios";

interface AddEditNotesProps {
  setOpenModal: (value: {
    isShown: boolean;
    type: "add" | "edit";
    data: INote | null;
  }) => void;
  type: "add" | "edit";
  getAllNotes: () => void;
  noteDetails: INote | null;
}

const AddEditNotes: FC<AddEditNotesProps> = ({
  setOpenModal,
  type,
  getAllNotes,
  noteDetails
}) => {
  const [title, setTitle] = useState(noteDetails?.title || "");
  const [description, setDescription] = useState(noteDetails?.description || "");
  const [tags, setTags] = useState<string[]>(noteDetails?.tags || []);

  const [error, setError] = useState<string | null>(null);

  //Conecta con el back para guardar la nota
  const createNote = async () => {
    try {
      const res = await axiosInstance.post("/todos/", {
        title,
        description,
        tags,
      });

      getAllNotes();
      setOpenModal({ isShown: false, data: null, type: "add" });
      notifySuccess(res.data.message);
    } catch (error) {
      if (error instanceof AxiosError) {
        notifyError(error.response?.data.message);
      }
    }
  };

  //Conecta con el back para edita la nota
  const editNote = async (id: string) => {
    try {
      const res = await axiosInstance.put(`/todos/${id}`, {
        title,
        description,
        tags,
      });

      getAllNotes();
      setOpenModal({ isShown: false, data: null, type: "add" });
      notifySuccess(res.data.message);
    } catch (error) {
      if (error instanceof AxiosError) {
        notifyError(error.response?.data.message);
      }
    }
  };

  const handleAddNote = () => {
    if (!title) {
      setError("Se debe proporcionar un titulo");
      return;
    }
    if (!description) {
      setError("Se debe proporcionar una description");
      return;
    }
    setError("");
    if (type === "edit") {
      editNote(noteDetails?.id as string);
    } else {
      createNote();
    }
  };

  return (
    <div className="relative">
      <button
        className="group w-10 h-10 rounded-full flex items-center justify-center absolute -top-3 -right-3 hover:bg-slate-500 duration-150"
        onClick={() => setOpenModal({ isShown: false, data: null, type: "add" })}
      >
        <MdClose className="text-xl text-slate-400 group-hover:text-slate-50 duration-150" />
      </button>

      <div className="flex flex-col gap-2">
        <label className="input-label" htmlFor="title">
          TITULO
        </label>
        <input
          type="text"
          className="text-2xl text-slate-950"
          placeholder="Ir al gimnasio a las 5"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>

      <div className="flex flex-col gap-2 mt-4">
        <label className="input-label">DESCRIPCIÓN</label>
        <textarea
          className="text-sm text-slate-950 outline-none bg-slate-50 rounded p-2 resize-none"
          placeholder="Descripción"
          rows={10}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>

      <div className="mt-3">
        <label className="input-label">ETIQUETAS</label>
        <TagInput tags={tags} setTags={setTags} />
      </div>

      {error && <p className="error-msg">{error}</p>}

      <button
        className="btn-primary font-medium mt-5 p-3"
        onClick={handleAddNote}
      >
        {type === 'add' ? 'AGREGAR' : 'ACTUALIZAR'}
      </button>
    </div>
  );
};

export default AddEditNotes;
