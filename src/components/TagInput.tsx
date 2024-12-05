import { FC, useState } from "react";
import { MdAdd, MdClose } from "react-icons/md";

interface TagInputProps {
  tags: string[];
  setTags(tag: string[]): void;
}

const TagInput: FC<TagInputProps> = ({ tags, setTags }) => {
  const [inputValue, setInputValue] = useState("");

  const addNewTag = () => {
    if (inputValue.trim() !== "") {
      setTags([...tags, inputValue.trim()]);
      setInputValue("");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      addNewTag();
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  return (
    <div>
      {tags?.length > 0 && (
        <div className="flex items-center gap-2 flex-wrap mt-2">
          {tags.map((tag, index) => (
            <span
              key={index}
              className="flex items-center gap-2 text-base text-slate-900 bg-slate-100 px-3 py-1 rounded"
            >
              # {tag}
              <button
                onClick={() => {
                  handleRemoveTag(tag);
                }}
              >
                <MdClose />
              </button>
            </span>
          ))}
        </div>
      )}

      <div className="flex items-center gap-4 mt-3">
        <input
          type="text"
          className="text-sm bg-transparent px-3 py-2 rounded outline-none"
          placeholder="Add tags..."
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          value={inputValue}
        />

        <button
          className="group w-8 h-8 flex items-center justify-center rounded border border-blue-700 hover:bg-blue-700 duration-150 "
          onClick={addNewTag}
        >
          <MdAdd className="text-2xl text-blue-700 group-hover:text-white" />
        </button>
      </div>
    </div>
  );
};

export default TagInput;
