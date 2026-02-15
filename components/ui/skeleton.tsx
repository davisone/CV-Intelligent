import { cn } from '@/lib/utils/helpers'

interface SkeletonProps {
  className?: string
}

export function Skeleton({ className }: SkeletonProps) {
  return (
    <div
      className={cn(
        'animate-pulse rounded-lg bg-[#E0D6C8]',
        className
      )}
    />
  )
}

export function SkeletonCard() {
  return (
    <div className="bg-[#F3EDE5] p-6 rounded-2xl border border-[#E0D6C8]">
      <div className="flex items-center gap-3 mb-4">
        <Skeleton className="w-10 h-10 rounded-xl" />
      </div>
      <Skeleton className="h-10 w-16 mb-2" />
      <Skeleton className="h-4 w-24" />
    </div>
  )
}

export function SkeletonResumeCard() {
  return (
    <div className="bg-[#FBF8F4] rounded-xl border border-[#E0D6C8] overflow-hidden">
      {/* Template indicator */}
      <Skeleton className="h-2 w-full rounded-none" />

      <div className="p-5">
        {/* Title */}
        <Skeleton className="h-6 w-3/4 mb-2" />

        {/* Name */}
        <Skeleton className="h-4 w-1/2 mb-3" />

        {/* Template badge */}
        <Skeleton className="h-6 w-20 rounded-full mb-3" />

        {/* Stats */}
        <div className="flex gap-3 mb-4">
          <Skeleton className="h-4 w-12" />
          <Skeleton className="h-4 w-12" />
          <Skeleton className="h-4 w-12" />
        </div>

        {/* Date */}
        <Skeleton className="h-3 w-32 mb-4" />

        {/* Actions */}
        <div className="flex gap-2">
          <Skeleton className="h-10 flex-1 rounded-lg" />
          <Skeleton className="h-10 w-10 rounded-lg" />
          <Skeleton className="h-10 w-10 rounded-lg" />
        </div>
      </div>
    </div>
  )
}

export function SkeletonDashboard() {
  return (
    <div className="max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <Skeleton className="h-8 w-48 mb-2" />
        <Skeleton className="h-5 w-64" />
      </div>

      {/* Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {/* Create New - Large */}
        <div className="md:col-span-2 lg:col-span-2">
          <Skeleton className="h-32 w-full rounded-2xl" />
        </div>

        {/* Stats cards */}
        <SkeletonCard />
        <SkeletonCard />

        {/* Quick Actions */}
        <div className="bg-[#F3EDE5] p-6 rounded-2xl border border-[#E0D6C8]">
          <Skeleton className="h-4 w-24 mb-4" />
          <div className="space-y-2">
            <Skeleton className="h-12 w-full rounded-xl" />
            <Skeleton className="h-12 w-full rounded-xl" />
          </div>
        </div>

        {/* Latest Activity */}
        <div className="md:col-span-2 lg:col-span-2 bg-[#F3EDE5] p-6 rounded-2xl border border-[#E0D6C8]">
          <div className="flex items-center gap-3 mb-4">
            <Skeleton className="w-5 h-5 rounded" />
            <Skeleton className="h-4 w-32" />
          </div>
          <Skeleton className="h-16 w-full rounded-xl" />
        </div>

        {/* Templates Used */}
        <SkeletonCard />
      </div>

      {/* CV List */}
      <div className="bg-[#F3EDE5] rounded-2xl border border-[#E0D6C8] p-6">
        <div className="flex items-center justify-between mb-6">
          <Skeleton className="h-6 w-24" />
          <Skeleton className="h-4 w-20" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <SkeletonResumeCard />
          <SkeletonResumeCard />
          <SkeletonResumeCard />
        </div>
      </div>
    </div>
  )
}

export function SkeletonResumesList() {
  return (
    <div className="space-y-4">
      {/* Action bar */}
      <div className="flex justify-end">
        <Skeleton className="h-10 w-32 rounded-lg" />
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <SkeletonResumeCard />
        <SkeletonResumeCard />
        <SkeletonResumeCard />
        <SkeletonResumeCard />
        <SkeletonResumeCard />
        <SkeletonResumeCard />
      </div>
    </div>
  )
}
