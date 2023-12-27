import React from 'react'

export default function LazyLoader() {
    return (
        <div class="border border-slate-100 rounded-md p-4 w-full mx-auto ">
            <div class="animate-pulse flex space-x-4">
                <div class="rounded-full bg-slate-700 h-10 w-10"></div>
                <div class="flex-1 space-y-6 py-1">
                    <div class="h-5 bg-slate-700 rounded"></div>
                    <div class="space-y-3">
                        <div class="grid grid-cols-3 gap-4">
                            <div class="h-10 bg-slate-700 rounded col-span-2"></div>
                            <div class="h-6 bg-slate-700 rounded col-span-1"></div>
                        </div>
                        <div class="h-20 bg-slate-700 rounded"></div>
                    </div>
                </div>
            </div>
        </div>
    )
}
