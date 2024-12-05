import { FC } from "react";
import { MdOutlinePushPin } from "react-icons/md";
import { MdCreate, MdDelete } from "react-icons/md";

interface NoteCardProps {
  title: string;
  date: string;
  description: string;
  tags: string[];
  isPinned: boolean;
  onEdit(): void;
  onDelete(): void;
  onPinNote(): void;
}

const NoteCard: FC<NoteCardProps> = ({
  title,
  date,
  description,
  tags,
  isPinned,
  onEdit,
  onDelete,
  onPinNote,
}) => {
  return (
    <div className="border rounded p-4 bg-white hover:shadow-xl duration-500 transition-all ease-in-out">
      <div className="flex items-center justify-between">
        <div>
          <h6 className="text-sm font-medium">{title}</h6>
          <span className="text-sm text-slate-500">{date}</span>
        </div>

        <MdOutlinePushPin
          className={`icon-btn ${isPinned ? "text-primary" : "text-slate-300"}`}
          onClick={onPinNote}
        />
      </div>

      <p className="text-xs text-slate-600 mt-2">{description?.slice(0, 60)}</p>

      <div className="flex items-center justify-between mt-2">
        <div className="text-xs text-slate-500">
          {tags.map((tag) => `#${tag} `)}
        </div>

        <div className="flex items-center gap-2">
          <MdCreate
            className="icon-btn hover:text-green-600 duration-150"
            onClick={onEdit}
          />

          <MdDelete
            className="icon-btn hover:text-red-500 duration-150"
            onClick={onDelete}
          />
        </div>
      </div>
    </div>
  );
};

export default NoteCard;
