import Input from "@/components/ui/Input";
import React, { useState } from "react";
import Tag from "./Tag";

interface TagInputProps {
  tags: string[];
  onTagsChange: (tags: string[]) => void;
  placeholder?: string;
}

export default function TagInput({
  tags,
  onTagsChange,
  placeholder = "태그를 입력해주세요",
}: TagInputProps) {
  const [inputValue, setInputValue] = useState("");

  const handlekeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && inputValue.trim()) {
      e.preventDefault();
      const newTag = inputValue.trim();
      if (!tags.includes(newTag)) {
        onTagsChange([...tags, newTag]);
      }
      setInputValue("");
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    onTagsChange(tags.filter((tag) => tag !== tagToRemove));
  };

  return (
    <div>
      <div className="w-full">
        <Input
          type="text"
          placeholder={placeholder}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handlekeyPress}
        />
        {tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-3">
            {tags.map((tag, index) => (
              <Tag key={index} onRemove={() => handleRemoveTag(tag)}>
                {tag}
              </Tag>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
