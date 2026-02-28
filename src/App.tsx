/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, useRef, type FC } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import confetti from 'canvas-confetti';
import { Music, Volume2, VolumeX, Heart, Star, Gift, Sparkles, MailOpen, Snowflake, Mountain } from 'lucide-react';

// Falling Snowflake Component
const SnowflakeParticle: FC<{ delay: number }> = ({ delay }) => {
  const randomX = Math.random() * 100;
  const duration = 15 + Math.random() * 10;
  
  return (
    <motion.div
      initial={{ y: -20, x: `${randomX}vw`, opacity: 0, rotate: 0 }}
      animate={{ 
        y: '110vh', 
        x: `${randomX + (Math.random() * 20 - 10)}vw`,
        opacity: [0, 0.8, 0.8, 0],
        rotate: 360 
      }}
      transition={{ 
        duration: duration, 
        repeat: Infinity, 
        delay: delay,
        ease: "linear"
      }}
      className="fixed text-blue-200 pointer-events-none z-0"
      style={{ fontSize: `${Math.random() * 15 + 10}px` }}
    >
      <Snowflake size={20} />
    </motion.div>
  );
};

// Fixed Ski Decorations Component
const SkiDecorations = () => {
  return (
    <>
      {/* Large Mountain Bottom Left */}
      <motion.div 
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        transition={{ duration: 1, delay: 0.5 }}
        className="fixed bottom-0 left-[-50px] text-blue-100 z-0 pointer-events-none opacity-80"
      >
        <Mountain size={300} fill="currentColor" />
      </motion.div>
      
      {/* Snowman Bottom Right */}
      <motion.div 
        initial={{ scale: 0 }}
        animate={{ scale: 1, rotate: [0, 5, 0, -5, 0] }}
        transition={{ 
          scale: { duration: 0.5, delay: 1 },
          rotate: { duration: 4, repeat: Infinity, ease: "easeInOut" }
        }}
        className="fixed bottom-10 right-4 md:right-20 text-6xl md:text-8xl z-10 cursor-pointer hover:scale-110 transition-transform"
      >
        ☃️
      </motion.div>

      {/* Skis Decoration */}
      <motion.div 
        initial={{ x: -100 }}
        animate={{ x: 0 }}
        className="fixed bottom-32 left-10 text-6xl z-10 hidden md:block rotate-12 opacity-80"
      >
        🎿
      </motion.div>
    </>
  );
};

// Falling Sakura Petal Component
const SakuraPetal: FC<{ delay: number }> = ({ delay }) => {
  const randomX = Math.random() * 100;
  const duration = 10 + Math.random() * 10;
  
  return (
    <motion.div
      initial={{ y: -20, x: `${randomX}vw`, opacity: 0, rotate: 0 }}
      animate={{ 
        y: '110vh', 
        x: `${randomX + (Math.random() * 20 - 10)}vw`,
        opacity: [0, 1, 1, 0],
        rotate: 360 
      }}
      transition={{ 
        duration: duration, 
        repeat: Infinity, 
        delay: delay,
        ease: "linear"
      }}
      className="fixed text-pink-300 pointer-events-none z-0"
      style={{ fontSize: `${Math.random() * 20 + 10}px` }}
    >
      🌸
    </motion.div>
  );
};

// Floating Cloud Component
const Cloud = ({ top, left, scale, duration }: { top: string, left: string, scale: number, duration: number }) => {
  return (
    <motion.div
      initial={{ x: '-100vw' }}
      animate={{ x: '100vw' }}
      transition={{ 
        duration: duration, 
        repeat: Infinity, 
        ease: "linear" 
      }}
      className="fixed text-white/40 pointer-events-none z-0"
      style={{ top, left, transform: `scale(${scale})` }}
    >
      <svg width="100" height="60" viewBox="0 0 100 60" fill="currentColor">
        <path d="M10,40 Q20,20 40,30 Q50,10 70,30 Q90,20 90,40 Q100,60 70,60 L30,60 Q0,60 10,40 Z" />
      </svg>
    </motion.div>
  );
};

// Skier Component
const Skier = () => {
  return (
    <motion.div
      initial={{ x: '-20vw', y: '80vh', rotate: 10 }}
      animate={{ x: '120vw', y: '85vh' }}
      transition={{ 
        duration: 12, 
        repeat: Infinity, 
        repeatDelay: 5,
        ease: "linear" 
      }}
      className="fixed z-0 text-4xl pointer-events-none"
    >
      ⛷️
    </motion.div>
  );
};

export default function App() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [selectedGift, setSelectedGift] = useState<number | null>(null);

  const GIFTS = [
    { id: 1, message: "马到成功", color: "text-blue-500", bgColor: "bg-blue-100", borderColor: "border-blue-300" },
    { id: 2, message: "平安健康", color: "text-green-500", bgColor: "bg-green-100", borderColor: "border-green-300" },
    { id: 3, message: "幸福快乐", color: "text-pink-500", bgColor: "bg-pink-100", borderColor: "border-pink-300" },
  ];

  // Initialize audio state
  const [audioError, setAudioError] = useState(false);

  const startExperience = () => {
    setHasStarted(true);
    if (audioRef.current) {
      audioRef.current.volume = 0.5;
      const playPromise = audioRef.current.play();
      
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            setIsPlaying(true);
            setAudioError(false);
          })
          .catch(error => {
            console.log("Audio play failed:", error);
            setIsPlaying(false);
            // Don't set error immediately, let user try clicking the button
          });
      }
    }
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    });
  };

  const toggleMusic = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        audioRef.current.play()
          .then(() => {
            setIsPlaying(true);
            setAudioError(false);
          })
          .catch(e => {
            console.error("Play failed", e);
            setAudioError(true);
          });
      }
    }
  };

  const handleGiftClick = (id: number) => {
    confetti({
      particleCount: 150,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#FF69B4', '#FFB6C1', '#FFC0CB', '#FFD700', '#87CEEB']
    });
    setSelectedGift(id);
  };

  const resetGift = (e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedGift(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-100 via-purple-50 to-blue-100 overflow-hidden font-cute relative selection:bg-pink-200">
      
      {/* Audio Element - Kevin MacLeod: Carefree */}
      <audio 
        ref={audioRef} 
        src="https://incompetech.com/music/royalty-free/mp3-royaltyfree/Carefree.mp3"
        loop
        onError={() => setAudioError(true)}
      />

      {/* Background Elements */}
      {[...Array(10)].map((_, i) => (
        <SakuraPetal key={`sakura-${i}`} delay={i * 1.5} />
      ))}
      {[...Array(10)].map((_, i) => (
        <SnowflakeParticle key={`snow-${i}`} delay={i * 2} />
      ))}
      <Cloud top="10%" left="0%" scale={1.5} duration={45} />
      <Cloud top="30%" left="0%" scale={1} duration={35} />
      <Cloud top="60%" left="0%" scale={0.8} duration={50} />
      <Skier />
      <SkiDecorations />

      {/* Start Overlay */}
      <AnimatePresence>
        {!hasStarted && (
          <motion.div 
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.1, filter: "blur(10px)" }}
            transition={{ duration: 0.8 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-pink-50/90 backdrop-blur-sm"
          >
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={startExperience}
              className="bg-white p-8 rounded-full shadow-2xl border-4 border-pink-300 flex flex-col items-center gap-4 group"
            >
              <div className="relative">
                <MailOpen size={64} className="text-pink-500 group-hover:text-pink-600 transition-colors" />
                <motion.div 
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ repeat: Infinity, duration: 2 }}
                  className="absolute -top-2 -right-2"
                >
                  <Heart size={24} className="text-red-400 fill-red-400" />
                </motion.div>
              </div>
              <span className="text-2xl font-bold text-pink-500">点击开启祝福</span>
              <span className="text-sm text-pink-300">(小心意 + 背景音乐)</span>
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Music Control */}
      <button 
        onClick={toggleMusic}
        className={`fixed top-4 right-4 z-40 backdrop-blur-sm p-3 rounded-full shadow-lg transition-colors border-2 ${
          audioError 
            ? 'bg-red-100 text-red-500 border-red-200 hover:bg-red-200' 
            : 'bg-white/80 text-pink-500 border-pink-200 hover:bg-pink-100'
        }`}
        title={audioError ? "Music failed to load" : isPlaying ? "Pause Music" : "Play Music"}
      >
        {audioError ? <VolumeX size={24} /> : isPlaying ? <Volume2 size={24} /> : <VolumeX size={24} />}
      </button>

      {/* Main Content */}
      <div className="relative z-10 container mx-auto px-4 py-12 flex flex-col items-center justify-center min-h-screen">
        
        <motion.div 
          initial={{ scale: 0.8, opacity: 0 }}
          animate={hasStarted ? { scale: 1, opacity: 1 } : { scale: 0.8, opacity: 0 }}
          transition={{ duration: 0.8, type: "spring" }}
          className="bg-white/90 backdrop-blur-md rounded-3xl shadow-xl p-8 max-w-2xl w-full border-4 border-pink-200 text-center relative"
        >
          {/* Decorative Corner Icons */}
          <motion.div 
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ repeat: Infinity, duration: 5 }}
            className="absolute -top-6 -left-6 text-yellow-400"
          >
            <Star size={48} fill="currentColor" />
          </motion.div>
          <motion.div 
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="absolute -bottom-6 -right-6 text-pink-400"
          >
            <Heart size={48} fill="currentColor" />
          </motion.div>

          {/* Header */}
          <motion.h1 
            className="text-4xl md:text-6xl font-bold text-pink-500 mb-6 drop-shadow-sm"
            initial={{ y: -20 }}
            animate={{ y: 0 }}
          >
            谢谢可爱的林洛铱!
          </motion.h1>

          {/* Gift Section */}
          <div className="my-8 min-h-[200px] flex items-center justify-center relative z-20">
            <AnimatePresence mode="wait">
              {selectedGift === null ? (
                <motion.div 
                  key="gift-list"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="flex flex-wrap justify-center gap-8"
                >
                  {GIFTS.map((gift) => (
                    <motion.div
                      key={gift.id}
                      whileHover={{ scale: 1.1, rotate: 5, y: -10 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => handleGiftClick(gift.id)}
                      className="cursor-pointer flex flex-col items-center gap-3 group"
                    >
                      {/* Cartoon Gift Box Design */}
                      <div className={`relative w-24 h-24 ${gift.bgColor} rounded-2xl border-4 ${gift.borderColor} shadow-[0_8px_0_rgba(0,0,0,0.1)] flex items-center justify-center overflow-visible`}>
                        {/* Lid */}
                        <div className={`absolute -top-4 w-[110%] h-8 ${gift.bgColor} border-4 ${gift.borderColor} rounded-lg shadow-sm z-10`}></div>
                        {/* Ribbon Vertical */}
                        <div className="absolute w-4 h-full bg-white/40 z-0"></div>
                        {/* Ribbon Horizontal */}
                        <div className="absolute h-4 w-full bg-white/40 z-0 top-1/2 -translate-y-1/2"></div>
                        {/* Bow Icon */}
                        <div className="absolute -top-10 text-4xl z-20 drop-shadow-md group-hover:animate-bounce">
                          🎀
                        </div>
                        <Gift size={40} className={`${gift.color} z-10 relative opacity-80`} />
                      </div>
                      <span className={`font-bold text-lg ${gift.color} bg-white/80 px-3 py-1 rounded-full shadow-sm`}>点我!</span>
                    </motion.div>
                  ))}
                </motion.div>
              ) : (
                <motion.div
                  key="gift-reveal"
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  exit={{ scale: 0, rotate: 180 }}
                  className="flex flex-col items-center gap-6"
                >
                  <div className={`relative rounded-3xl p-12 shadow-2xl border-8 ${GIFTS[selectedGift - 1].borderColor} ${GIFTS[selectedGift - 1].bgColor} overflow-hidden`}>
                    {/* Skiing Background Pattern */}
                    <div className="absolute inset-0 opacity-10 pointer-events-none flex flex-wrap gap-4 p-4 justify-center content-center">
                      <Snowflake size={24} /> <Mountain size={24} /> 
                      <Snowflake size={24} /> <Mountain size={24} />
                      <Snowflake size={24} /> <Mountain size={24} />
                    </div>
                    
                    <div className="relative z-10 flex flex-col items-center">
                      <div className="text-6xl mb-4 animate-bounce">🏂</div>
                      <h2 className={`text-4xl md:text-6xl font-black tracking-wider ${GIFTS[selectedGift - 1].color} drop-shadow-sm`}>
                        {GIFTS[selectedGift - 1].message}
                      </h2>
                      <div className="flex gap-2 mt-4 text-2xl">
                        <span>❄️</span>
                        <span>🎿</span>
                        <span>❄️</span>
                      </div>
                    </div>
                  </div>
                  <button 
                    onClick={resetGift}
                    className="px-8 py-3 bg-gradient-to-r from-pink-400 to-purple-400 text-white rounded-full font-bold text-lg hover:from-pink-500 hover:to-purple-500 transition-all shadow-lg hover:shadow-xl flex items-center gap-2 transform hover:-translate-y-1"
                  >
                    ⬅ 返回再选一个
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Message Body */}
          <div className="space-y-6 text-gray-700 text-xl md:text-2xl leading-relaxed">
            <p>
              听说你去<span className="text-blue-400 font-bold mx-1">日本</span>玩啦，
              还给我带了这么棒的礼物！
            </p>
            <p>
              收到你的心意我超级开心，
              <br/>
              我会好好珍藏这份来自远方的祝福。
            </p>
            
            <motion.div 
              className="bg-yellow-50 rounded-xl p-6 border-2 border-yellow-200 mt-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <h3 className="text-2xl text-orange-400 mb-2 font-bold flex items-center justify-center gap-2">
                <Sparkles size={24} /> 给洛铱的祝福 <Sparkles size={24} />
              </h3>
              <p className="text-gray-600">
                祝你在一年级每天都开开心心，
                <br/>
                学习进步，像小花一样快乐成长！
                <br/>
                永远做个快乐的小天使！
              </p>
            </motion.div>
            
            {/* Signature */}
            <div className="text-right mt-8 mr-2">
              <span className="text-3xl font-bold text-pink-500 font-cute transform rotate-[-5deg] inline-block">
                —— 汪老师 🖊️
              </span>
            </div>
          </div>

          {/* Footer */}
          <div className="mt-8 flex justify-center gap-4 text-pink-300">
            <Heart size={24} fill="currentColor" />
            <Heart size={24} fill="currentColor" />
            <Heart size={24} fill="currentColor" />
          </div>

        </motion.div>
      </div>
    </div>
  );
}
