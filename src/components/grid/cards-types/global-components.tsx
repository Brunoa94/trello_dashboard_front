export const Avatar = (props: { name?: string; id?: string }) => {
  return (
    <div className="w-full items-center flex justify-end mt-2 gap-2">
      <span className="text-xs font-bold">Bruno</span>
      <img src="/foto.png" className="h-6 w-6 rounded-full" />
    </div>
  );
};
