import { SkeletonResumesList } from '@/components/ui/skeleton'
import { Skeleton } from '@/components/ui/skeleton'

export default function ResumesLoading() {
  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div>
          <Skeleton className="h-9 w-32 mb-2" />
          <Skeleton className="h-5 w-24" />
        </div>
      </div>

      <SkeletonResumesList />
    </div>
  )
}
