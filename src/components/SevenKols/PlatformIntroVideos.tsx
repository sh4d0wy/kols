import React from 'react'
import { Card } from '../ui'

interface Video {
  id: string
  title: string
  description: string
  thumbnailUrl?: string
  videoUrl?: string
}

interface PlatformIntroVideosProps {
  videos?: Video[]
}

const defaultVideos: Video[] = [
  {
    id: '1',
    title: 'Rick Astley - Never Gonna Give You Up',
    description: 'Official Music Video',
  },
  {
    id: '2',
    title: 'Getting Started with 7KOLS',
    description: 'Quick Guide',
  },
  {
    id: '3',
    title: 'Understanding Structure Rewards',
    description: 'Educational Content',
  },
]

export const PlatformIntroVideos: React.FC<PlatformIntroVideosProps> = ({ 
  videos = defaultVideos 
}) => {
  return (
    <Card className="p-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500/20 to-cyan-500/20 flex items-center justify-center">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <polygon points="5,3 19,12 5,21" fill="#7B61FF"/>
          </svg>
        </div>
        <div>
          <h3 className="text-white font-semibold text-lg">Platform Intro Videos</h3>
          <p className="text-gray-500 text-sm">Learn how to use the platform</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {videos.map((video) => (
          <div key={video.id} className="group cursor-pointer">
            <div className="relative aspect-video bg-gradient-to-br from-[#1a2a3a] to-[#0d1520] rounded-xl overflow-hidden mb-3">
              {/* Play Button Overlay */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-14 h-14 rounded-full bg-black/50 border-2 border-white/30 flex items-center justify-center group-hover:bg-black/70 group-hover:border-cyan-400/50 transition-all duration-300">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="ml-1">
                    <polygon points="5,3 19,12 5,21" fill="white"/>
                  </svg>
                </div>
              </div>
              
              {/* Decorative gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            </div>
            <h4 className="text-white text-sm font-medium mb-1 group-hover:text-cyan-400 transition-colors">
              {video.title}
            </h4>
            <p className="text-gray-500 text-xs">{video.description}</p>
          </div>
        ))}
      </div>
    </Card>
  )
}

