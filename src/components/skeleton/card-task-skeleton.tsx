import { Skeleton } from "@/components/ui/skeleton";

export function CardTaskSkeleton() {
  return (
    <div className="flex flex-col space-y-3 w-full min-w-[250px] h-[154px] shrink-0">
      <Skeleton className="w-full h-full rounded-xl flex flex-col p-4">
        <div className="w-full bg-slate-200 h-6 rounded-2xl"></div>
        <div className="w-32 h-3 bg-slate-200 mt-4 rounded-2xl"></div>
        <div className="w-full flex items-center mt-4">
          <div className="w-28 h-3 bg-slate-200 rounded-xl"></div>
          <div className="w-12 h-3 bg-slate-200 ml-auto rounded-xl"></div>
        </div>
        <div className="w-full flex items-center mt-4">
          <div className="h-6 w-6 rounded-full bg-slate-200 "></div>
          <div className="h-8 w-8 rounded-full bg-slate-200 ml-auto"></div>
        </div>
      </Skeleton>
    </div>
  );
}
