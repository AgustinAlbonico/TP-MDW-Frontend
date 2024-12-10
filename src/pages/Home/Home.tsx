import { MdAdd } from "react-icons/md";
import Navbar from "../../components/Navbar";
import NoteCard from "../../components/NoteCard";
import AddEditNotes from "../../components/AddEditNotes";
import { useEffect, useState } from "react";
import Modal from "react-modal";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { notifyError, notifySuccess } from "../../utils/toastFunctions";
import axiosInstance from "../../utils/axiosInstance";
import { SpinnerCircularFixed } from "spinners-react";
import { AxiosError } from "axios";

export interface INote {
  completed: boolean;
  description: string;
  isPinned: boolean;
  tags: string[];
  title: string;
  id: string;
  date: string;
}

interface INoteRaw {
  completed: boolean;
  createdOn: string;
  description: string;
  isPinned: boolean;
  tags: string[];
  title: string;
  user: string;
  __v: number;
  _id: string;
}

interface IOpenModal {
  isShown: boolean;
  type: "add" | "edit";
  data: INote | null;
}

const Home = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const [loading, setLoading] = useState(false);
  const [notes, setNotes] = useState<INote[]>([]);
  const [openModal, setOpenModal] = useState<IOpenModal>({
    isShown: false,
    type: "add",
    data: null,
  });

  useEffect(() => {
    if (!user) navigate("/login");
    else getAllNotes();
  }, [user]);

  //Traer todas las notas del usuario
  const getAllNotes = async () => {
    try {
      setLoading(true);
      const res = await axiosInstance.get("/todos/");

      const notesDb = res.data.todos as INoteRaw[];

      const formattedNotes: INote[] = notesDb.map((note) => ({
        completed: note.completed,
        description: note.description,
        id: note._id,
        isPinned: note.isPinned,
        tags: note.tags,
        title: note.title,
        date: new Intl.DateTimeFormat("es-ES", {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
        }).format(new Date(note.createdOn)),
      }));

      setNotes(formattedNotes);
    } catch (error) {
      notifyError(
        "Error al traer notas de la base de datos, intente nuevamente"
      );
    } finally {
      setLoading(false);
    }
  };

  //Buscar nota con el buscador
  const searchNote = async (query: string) => {
    try {
      setLoading(true);
      const res = await axiosInstance.get("/todos/search", {
        params: { query },
      });

      const notesDb = res.data.todos as INoteRaw[];

      const formattedNotes: INote[] = notesDb.map((note) => ({
        completed: note.completed,
        description: note.description,
        id: note._id,
        isPinned: note.isPinned,
        tags: note.tags,
        title: note.title,
        date: new Intl.DateTimeFormat("es-ES", {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
        }).format(new Date(note.createdOn)),
      }));

      setNotes(formattedNotes);
    } catch (error) {
      console.log(error);
      notifyError(
        "Error al traer notas de la base de datos, intente nuevamente"
      );
    } finally {
      setLoading(false);
    }
  };

  //Limpia el buscador
  const handleClearSearch = () => {
    getAllNotes();
  };

  //Logica para borrar una nota
  const onDelete = async (id: string) => {
    try {
      const confirm = window.confirm("Seguro que desea borrar la nota?");
      if (confirm) {
        const res = await axiosInstance.delete(`/todos/${id}`);

        notifySuccess(res.data.message);
        getAllNotes();
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        notifyError(error.response?.data.message);
      }
    }
  };

  //Abrir modal con los datos de la nota a editar
  const handleEdit = (noteDetails: INote) => {
    setOpenModal({ data: noteDetails, isShown: true, type: "edit" });
  };

  //Fijo una nota arriba
  const updateIsPinned = async (id: string, isPinned: boolean) => {
    try {
      console.log(id, isPinned);
      await axiosInstance.put(`/todos/pin-todo/${id}`, {
        isPinned: !isPinned,
      });

      getAllNotes();
      setOpenModal({ isShown: false, data: null, type: "add" });
    } catch (error) {
      if (error instanceof AxiosError) {
        notifyError(error.response?.data.message);
      }
    }
  };

  return (
    <Navbar searchNote={searchNote} handleClearSearch={handleClearSearch}>
      <div className="container mx-auto">
        {loading && (
          <SpinnerCircularFixed className="mx-auto" color="#2B85FF" />
        )}

        {notes?.length === 0 && loading === false && (
          <p className="text-xl text-center">No hay ninguna nota cargada!</p>
        )}

        <div className="grid grid-cols-3 gap-4 mt-8 justify-start">
          {notes.map((item, index) => (
            <NoteCard
              key={index}
              title={item.title}
              date={item.date}
              description={item.description}
              isPinned={item.isPinned}
              tags={item.tags}
              onDelete={() => {
                onDelete(item.id);
              }}
              onEdit={() => handleEdit(item)}
              onPinNote={() => {
                updateIsPinned(item.id, item.isPinned);
              }}
            />
          ))}
        </div>
      </div>

      <button
        className="w-16 h-16 flex items-center justify-center rounded-2xl bg-primary hover:bg-blue-600 duration-150 absolute right-10 bottom-10 "
        onClick={() => {
          setOpenModal({ isShown: true, type: "add", data: null });
        }}
      >
        <MdAdd className="text-[32px] text-white" />
      </button>

      <Modal
        isOpen={openModal.isShown}
        onRequestClose={() => {}}
        style={{
          overlay: {
            backgroundColor: "rgba(0,0,0,0.2)",
          },
        }}
        contentLabel=""
        className="w-[40%] max-h-3/4 bg-white rounded-md mx-auto mt-14 p-5 overflow-hidden"
      >
        <AddEditNotes
          setOpenModal={setOpenModal}
          type={openModal.type}
          getAllNotes={getAllNotes}
          noteDetails={openModal.data}
        />
      </Modal>
    </Navbar>
  );
};

export default Home;
