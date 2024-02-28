import { Skeleton } from "@/components/ui/skeleton";
import {
 Card,
 CardContent,
 CardDescription,
 CardFooter,
 CardHeader,
 CardTitle,
} from "@/components/ui/card";

export default function Loading() {
 return (
  <section className=" w-full h-[calc(100svh-15.5rem)] flex items-center justify-center">
   <Card className={"w-[380px]"}>
    <CardHeader>
     <Skeleton className=" h-6" />
    </CardHeader>
    <CardContent className="grid gap-4">
     <div className=" flex flex-col gap-10">
      <div className="space-y-1">
       <Skeleton className=" h-[0.875rem]" />
       <Skeleton className=" h-5" />
      </div>
      <div className="space-y-1">
       <Skeleton className=" h-[0.875rem]" />
       <Skeleton className=" h-5" />
      </div>
     </div>
    </CardContent>
    <CardFooter>
     <Skeleton className=" h-10" />
    </CardFooter>
   </Card>
  </section>
 );
}
