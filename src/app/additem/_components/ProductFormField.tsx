import Input from "@/components/ui/Input";
import Textarea from "@/components/ui/Textarea";

interface ProductFormFieldProps {
  title: string;
  type: "text" | " Textarea";
  placeholder: string;
  value: string;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  className?: string;
}

export default function ProductFormField({
  title,
  type,
  placeholder,
  value,
  onChange,
  className = "",
}: ProductFormFieldProps) {
  return (
    <div>
      <h2 className="text-2lg font-bold text-gray-800 mb-4">{title}</h2>
      {type === "text" ? (
        <Input
          type="text"
          placeholder={placeholder}
          value={value}
          onChange={onChange}
        />
      ) : (
        <Textarea
          placeholder={placeholder}
          className={`h-[282px] ${className}`}
          value={value}
          onChange={onChange}
        />
      )}
    </div>
  );
}
