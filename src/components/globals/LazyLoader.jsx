import React from 'react'

export default function LazyLoader() {
    return (
        <div className="border border-slate-100 rounded-md p-4 w-full mx-auto ">
            <div className="animate-pulse flex space-x-4">
                <div className="rounded-full bg-slate-700 h-10 w-10"></div>
                <div className="flex-1 space-y-6 py-1">
                    <div className="h-5 bg-slate-700 rounded"></div>
                    <div className="space-y-3">
                        <div className="grid grid-cols-3 gap-4">
                            <div className="h-10 bg-slate-700 rounded col-span-2"></div>
                            <div className="h-6 bg-slate-700 rounded col-span-1"></div>
                        </div>
                        <div className="h-20 bg-slate-700 rounded"></div>
                    </div>
                </div>
            </div>
        </div>
    )
}
