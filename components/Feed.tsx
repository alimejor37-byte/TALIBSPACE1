
import React, { useState } from 'react';
import { Post, Language } from '../types';
import { STRINGS, MOCK_POSTS } from '../constants';
import { geminiAssistant } from '../services/geminiService';

interface FeedProps {
  lang: Language;
}

const Feed: React.FC<FeedProps> = ({ lang }) => {
  const t = STRINGS[lang];
  const [posts, setPosts] = useState<Post[]>(MOCK_POSTS as any);
  const [newPost, setNewPost] = useState('');
  const [isPosting, setIsPosting] = useState(false);
  const [summaries, setSummaries] = useState<Record<string, string>>({});

  const handlePost = () => {
    if (!newPost.trim()) return;
    setIsPosting(true);
    setTimeout(() => {
        const post: Post = {
            id: Date.now().toString(),
            authorId: 'me',
            authorName: 'Amine El Fassi',
            authorAvatar: 'https://picsum.photos/seed/amine/100',
            content: newPost,
            timestamp: 'Just now',
            likes: 0,
            comments: [],
            type: 'general'
        };
        setPosts([post, ...posts]);
        setNewPost('');
        setIsPosting(false);
    }, 800);
  };

  const handleSummarize = async (id: string, content: string) => {
    if (summaries[id]) return;
    const summary = await geminiAssistant.summarizePost(content);
    setSummaries(prev => ({ ...prev, [id]: summary }));
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Create Post Card */}
      <div className="glass p-6 rounded-[2.5rem] border border-orange-500/10 transition-transform focus-within:scale-[1.01]">
        <div className="flex space-x-4 space-x-reverse items-start">
          <img src="https://picsum.photos/seed/amine/100" className="w-12 h-12 rounded-2xl border-2 border-orange-500/20 shadow-lg" alt="avatar" />
          <div className="flex-1">
            <textarea
              value={newPost}
              onChange={(e) => setNewPost(e.target.value)}
              placeholder={t.postSomething}
              className="w-full bg-white/5 rounded-2xl p-4 focus:outline-none focus:ring-4 focus:ring-orange-500/10 transition-all resize-none min-h-[120px] text-white text-lg font-medium placeholder:text-slate-500"
            />
            <div className="flex items-center justify-between mt-4">
               <div className="flex space-x-2 space-x-reverse">
                  <button className="p-3 rounded-xl hover:bg-orange-500/10 transition-colors">🖼️</button>
                  <button className="p-3 rounded-xl hover:bg-orange-500/10 transition-colors">🏷️</button>
               </div>
               <button 
                onClick={handlePost}
                disabled={isPosting || !newPost.trim()}
                className="premium-gradient hover:opacity-90 disabled:opacity-30 text-white px-8 py-3 rounded-2xl font-black transition-all shadow-xl shadow-orange-500/20 active:scale-95 flex items-center space-x-2 space-x-reverse"
              >
                {isPosting ? <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div> : <span>{t.post} ✨</span>}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Feed Posts */}
      <div className="space-y-6">
        {posts.map((post) => (
          <div key={post.id} className="glass p-8 rounded-[3rem] border border-orange-500/5 transition-all hover:translate-y-[-4px] group overflow-hidden relative">
            <div className="absolute top-0 right-10 w-16 h-1 premium-gradient opacity-40"></div>
            
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-4 space-x-reverse">
                <img src={post.authorAvatar} className="w-14 h-14 rounded-2xl border-4 border-orange-500/10 shadow-xl" alt="avatar" />
                <div>
                  <h4 className="font-black text-lg text-white leading-tight">{post.authorName}</h4>
                  <div className="flex items-center space-x-2 space-x-reverse">
                    <span className="text-[10px] font-black uppercase text-orange-500 bg-orange-500/10 px-2 py-0.5 rounded-md">PRO</span>
                    <span className="text-xs text-slate-500 font-bold">• {post.timestamp}</span>
                  </div>
                </div>
              </div>
              <button 
                onClick={() => handleSummarize(post.id, post.content)}
                className="text-xs font-black bg-orange-500/10 text-orange-400 px-4 py-2 rounded-xl opacity-0 group-hover:opacity-100 transition-all hover:bg-orange-500 hover:text-white"
              >
                ✨ Summarize
              </button>
            </div>
            
            <div className="text-slate-200 mb-8 text-lg font-medium leading-relaxed">
              {post.content}
            </div>

            {summaries[post.id] && (
              <div className="mb-6 p-5 bg-orange-500/5 border-r-4 border-orange-500 rounded-2xl text-sm font-bold text-orange-200 animate-in fade-in zoom-in-95">
                <span className="block text-[10px] uppercase tracking-widest text-orange-400 mb-1">AI Summary</span>
                "{summaries[post.id]}"
              </div>
            )}

            <div className="flex items-center justify-between pt-6 border-t border-white/5">
              <div className="flex items-center space-x-1 space-x-reverse">
                <button className="flex items-center justify-center w-12 h-12 rounded-2xl text-slate-500 hover:text-orange-500 hover:bg-orange-500/10 transition-all active:scale-90">
                  <span className="text-2xl">❤️</span>
                </button>
                <span className="text-sm font-black text-slate-400">{post.likes}</span>
                
                <button className="flex items-center justify-center w-12 h-12 rounded-2xl text-slate-500 hover:text-orange-400 hover:bg-orange-500/10 transition-all active:scale-90">
                  <span className="text-2xl">💬</span>
                </button>
                <span className="text-sm font-black text-slate-400">{post.comments.length}</span>
              </div>
              
              <button className="flex items-center justify-center w-12 h-12 rounded-2xl text-slate-700 hover:text-red-500 hover:bg-red-500/10 transition-all">
                <span className="text-xl">🚩</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Feed;
