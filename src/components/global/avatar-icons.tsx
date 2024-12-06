import { AvatarImage, Avatar } from "@/components/ui/avatar";

export const returnAvatar = (name: string) => {
  const returnIcon = () => {
    switch (name) {
      case "Bruno":
        return "data:image/jpeg;base64,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";
      case "Tom":
        return "https://github.com/shadcn.png";
      case "Anna":
        return "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRsYXy0tpwaAilAI0727Lq7SRA3riy_RUMI-A&s";
      case "John":
        return "https://i.pinimg.com/550x/bc/8b/b1/bc8bb101895ed8f2beff898258665942.jpg";
    }
  };
  return (
    <div className="w-full flex items-center">
      <Avatar>
        <AvatarImage src={returnIcon()} alt="@shadcn" />
      </Avatar>
      <span className="ml-4">{name}</span>
    </div>
  );
};
