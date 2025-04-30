'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ImagePlus, Video, Calendar, Grid, List } from 'lucide-react';

type MediaItem = {
  id: string;
  type: 'image' | 'video';
  url: string;
  thumbnail: string;
  title: string;
  date: string;
  author: string;
};

const dummyMedia: MediaItem[] = [
  {
    id: '1',
    type: 'image',
    url: 'https://images.pexels.com/photos/8363104/pexels-photo-8363104.jpeg',
    thumbnail: 'https://images.pexels.com/photos/8363104/pexels-photo-8363104.jpeg',
    title: '園庭での遊び時間',
    date: '2025-04-01',
    author: '田中先生'
  },
  {
    id: '2',
    type: 'image',
    url: 'https://images.pexels.com/photos/8612992/pexels-photo-8612992.jpeg',
    thumbnail: 'https://images.pexels.com/photos/8612992/pexels-photo-8612992.jpeg',
    title: '朝の会の様子',
    date: '2025-04-01',
    author: '山田先生'
  },
  {
    id: '3',
    type: 'video',
    url: 'https://example.com/video1.mp4',
    thumbnail: 'https://images.pexels.com/photos/7319316/pexels-photo-7319316.jpeg',
    title: '誕生日会のビデオ',
    date: '2025-04-01',
    author: '佐藤先生'
  }
];

export default function MiniAppPage() {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [selectedTab, setSelectedTab] = useState('all');

  const filteredMedia = dummyMedia.filter(item => {
    if (selectedTab === 'all') return true;
    return item.type === selectedTab;
  });

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 mb-4">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-xl font-bold">ギャラリー</h1>
            <div className="flex gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setViewMode('grid')}
                className={viewMode === 'grid' ? 'bg-blue-50 dark:bg-blue-900/20' : ''}
              >
                <Grid className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setViewMode('list')}
                className={viewMode === 'list' ? 'bg-blue-50 dark:bg-blue-900/20' : ''}
              >
                <List className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <Tabs defaultValue="all" className="mb-4">
            <TabsList className="w-full">
              <TabsTrigger value="all" className="flex-1">すべて</TabsTrigger>
              <TabsTrigger value="image" className="flex-1">
                <ImagePlus className="h-4 w-4 mr-2" />
                写真
              </TabsTrigger>
              <TabsTrigger value="video" className="flex-1">
                <Video className="h-4 w-4 mr-2" />
                動画
              </TabsTrigger>
            </TabsList>
          </Tabs>

          <div className={`${viewMode === 'grid' ? 'grid grid-cols-2 gap-4' : 'space-y-4'}`}>
            {filteredMedia.map((item) => (
              <div
                key={item.id}
                className={`bg-gray-50 dark:bg-gray-900/50 rounded-lg overflow-hidden ${
                  viewMode === 'list' ? 'flex items-center gap-4' : ''
                }`}
              >
                <div className={viewMode === 'list' ? 'w-24 h-24 relative flex-shrink-0' : 'relative pt-[75%]'}>
                  <Image
                    src={item.thumbnail}
                    alt={item.title}
                    fill
                    className="object-cover"
                  />
                  {item.type === 'video' && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                      <Video className="h-8 w-8 text-white" />
                    </div>
                  )}
                </div>
                <div className="p-3">
                  <h3 className="font-semibold mb-1">{item.title}</h3>
                  <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                    <Calendar className="h-4 w-4 mr-1" />
                    {item.date}
                  </div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{item.author}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}