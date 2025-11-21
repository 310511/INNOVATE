// src/components/VideoCallInterface.tsx

import React, { useState, useEffect, useRef } from 'react';

// Import judge images
import AnanyaGuptaImg from '../assets/AnanyaGupta.png';
import PriyaMehtaImg from '../assets/PriyaMehta.png';
import RajeevKhannaImg from '../assets/RajeevKhanna.png';
import VikramDesaiImg from '../assets/VikramDesai.png';
import VineetSharmaImg from '../assets/VineetSharma.png';

// Extend Window interface for ElevenLabs widget
declare global {
  interface Window {
    ElevenLabsWidget?: any;
  }
  namespace JSX {
    interface IntrinsicElements {
      'elevenlabs-convai': React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement>,
        HTMLElement
      > & {
        'agent-id'?: string;
      };
    }
  }
}

interface Judge {
  id: number;
  name: string;
  image: string;
}

const VideoCallInterface: React.FC = () => {
  // States
  const [isDocumentUploaded, setIsDocumentUploaded] = useState(false);
  const [isCameraOn, setIsCameraOn] = useState(true);
  const [isMicOn, setIsMicOn] = useState(true);
  const [activeSpeaker, setActiveSpeaker] = useState<number | null>(null);
  const [currentTime, setCurrentTime] = useState('00:00');
  const [isAIJudgeSpeaking, setIsAIJudgeSpeaking] = useState(false);

  // Refs
  const localVideoRef = useRef<HTMLVideoElement>(null);
  const localStreamRef = useRef<MediaStream | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const animationFrameRef = useRef<number>(0);
  const elevenLabsWidgetRef = useRef<HTMLElement | null>(null);
  const elevenLabsScriptLoaded = useRef(false);

  // AI Judges with real images (matches order from Judges page)
  const judges: Judge[] = [
    { id: 1, name: 'Ananya Gupta', image: AnanyaGuptaImg }, // Analyst (AI-Powered)
    { id: 2, name: 'Rajeev Khanna', image: RajeevKhannaImg }, // Visionary
    { id: 3, name: 'Priya Mehta', image: PriyaMehtaImg }, // Empath
    { id: 4, name: 'Vikram Desai', image: VikramDesaiImg }, // Globalist
    { id: 5, name: 'Vineet Sharma', image: VineetSharmaImg }, // Strategist
  ];

  // Load ElevenLabs script - prevent duplicate loading
  const loadElevenLabsScript = () => {
    // Check if script already exists in DOM
    const existingScript = document.querySelector('script[src*="elevenlabs"]');
    if (existingScript || elevenLabsScriptLoaded.current) {
      console.log('ElevenLabs script already loaded, skipping');
      elevenLabsScriptLoaded.current = true;
      setTimeout(() => triggerElevenLabsConversation(), 3000);
      return;
    }
    
    const script = document.createElement('script');
    script.src = 'https://unpkg.com/@elevenlabs/convai-widget-embed';
    script.async = true;
    script.type = 'text/javascript';
    script.id = 'elevenlabs-script';
    script.onload = () => {
      elevenLabsScriptLoaded.current = true;
      console.log('✓ ElevenLabs script loaded successfully');
      
      // Wait for widget to be ready, then auto-start
      setTimeout(() => {
        triggerElevenLabsConversation();
      }, 3000);
    };
    script.onerror = () => {
      console.error('✗ Failed to load ElevenLabs script');
    };
    document.body.appendChild(script);
  };

  // Function to trigger ElevenLabs conversation programmatically
  const triggerElevenLabsConversation = () => {
    console.log('🔍 Looking for ElevenLabs widget...');
    const widget = document.querySelector('elevenlabs-convai');
    
    if (!widget) {
      console.log('⏳ Widget not found yet, retrying in 1 second...');
      setTimeout(triggerElevenLabsConversation, 1000);
      return;
    }
    
    console.log('✓ Widget found, attempting to start conversation...');
    
    // Wait a bit for the widget to fully initialize
    setTimeout(() => {
      // Method 1: Try to find and click button in shadow DOM
      try {
        const shadowRoot = widget.shadowRoot;
        if (shadowRoot) {
          const buttons = shadowRoot.querySelectorAll('button');
          console.log(`Found ${buttons.length} buttons in shadow DOM`);
          
          if (buttons.length > 0) {
            // Click the first button (usually the main trigger)
            (buttons[0] as HTMLElement).click();
            console.log('✅ Clicked ElevenLabs button - conversation should start');
            setActiveSpeaker(1);
            setIsAIJudgeSpeaking(true);
            return;
          }
        }
      } catch (error) {
        console.log('⚠️ Could not access shadow DOM:', error);
      }
      
      // Method 2: Try dispatching events
      try {
        (widget as HTMLElement).click();
        console.log('✅ Clicked widget directly');
      } catch (error) {
        console.log('⚠️ Direct click failed:', error);
      }
      
      // Method 3: Custom events
      widget.dispatchEvent(new Event('click', { bubbles: true }));
      widget.dispatchEvent(new CustomEvent('elevenlabs-start'));
      console.log('📢 Dispatched custom events to widget');
      
    }, 500);
  };

  // Function to stop ElevenLabs conversation
  const stopElevenLabsConversation = () => {
    console.log('🛑 Stopping ElevenLabs conversation...');
    
    try {
      const widget = document.querySelector('elevenlabs-convai');
      if (widget) {
        const shadowRoot = widget.shadowRoot;
        if (shadowRoot) {
          // Try to find and click end/close buttons
          const buttons = shadowRoot.querySelectorAll('button');
          buttons.forEach((button) => {
            const btnText = button.textContent?.toLowerCase() || '';
            const btnAriaLabel = button.getAttribute('aria-label')?.toLowerCase() || '';
            
            // Click buttons that look like end/close/stop buttons
            if (btnText.includes('end') || btnText.includes('close') || btnText.includes('stop') ||
                btnAriaLabel.includes('end') || btnAriaLabel.includes('close') || btnAriaLabel.includes('stop')) {
              (button as HTMLElement).click();
              console.log('✓ Clicked end button in widget');
            }
          });
        }
        
        // Dispatch stop events
        widget.dispatchEvent(new CustomEvent('stop'));
        widget.dispatchEvent(new CustomEvent('end'));
        widget.dispatchEvent(new CustomEvent('close'));
        
        // Remove widget from DOM
        widget.remove();
        console.log('✅ ElevenLabs widget removed');
      }
    } catch (error) {
      console.log('⚠️ Error stopping ElevenLabs:', error);
    }
  };

  // Handle document upload
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      const file = e.target.files[0];
      console.log('📄 Document uploaded:', file.name);
      
      // Clean up any existing ElevenLabs widgets first
      const existingWidgets = document.querySelectorAll('elevenlabs-convai');
      if (existingWidgets.length > 0) {
        console.log(`🧹 Cleaning up ${existingWidgets.length} existing widget(s)`);
        existingWidgets.forEach(w => w.remove());
      }
      
      setIsDocumentUploaded(true);
      
      // Load ElevenLabs script which will auto-trigger the conversation
      loadElevenLabsScript();
      
      // Activate AI Judge visual indicator
      setTimeout(() => {
        setActiveSpeaker(1); // Ananya Gupta
        setIsAIJudgeSpeaking(true);
        console.log('🤖 AI Judge (Ananya Gupta) is now active');
      }, 2000);
    }
  };

  // Start local media
  const startLocalMedia = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });

      if (localVideoRef.current) {
        localVideoRef.current.srcObject = stream;
      }

      localStreamRef.current = stream;

      // Set up audio analyser for speaker detection (local only for demo)
      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      const analyser = audioContext.createAnalyser();
      analyser.fftSize = 256;
      const source = audioContext.createMediaStreamSource(stream);
      source.connect(analyser);
      
      audioContextRef.current = audioContext;
      analyserRef.current = analyser;

      // Disable random speaker detection - only AI judge (Ananya Gupta) should speak
      // The active speaker will be controlled by ElevenLabs audio monitoring
    } catch (err) {
      console.error('Media access error:', err);
      alert('Camera/mic access required to continue.');
    }
  };

  // Toggle camera
  const toggleCamera = () => {
    if (!localStreamRef.current) return;
    const videoTrack = localStreamRef.current.getVideoTracks()[0];
    if (videoTrack) {
      videoTrack.enabled = !videoTrack.enabled;
      setIsCameraOn(videoTrack.enabled);
    }
  };

  // Toggle mic
  const toggleMic = () => {
    if (!localStreamRef.current) return;
    const audioTrack = localStreamRef.current.getAudioTracks()[0];
    if (audioTrack) {
      audioTrack.enabled = !audioTrack.enabled;
      setIsMicOn(audioTrack.enabled);
    }
  };

  // End call and terminate ElevenLabs conversation
  const endCall = () => {
    console.log('🔴 Ending call...');
    
    // Stop ElevenLabs conversation first
    stopElevenLabsConversation();
    
    // Stop all media tracks
    if (localStreamRef.current) {
      localStreamRef.current.getTracks().forEach(track => track.stop());
    }
    
    // Clean up video
    if (localVideoRef.current) {
      localVideoRef.current.srcObject = null;
    }
    
    // Clean up audio analysis
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
    }
    if (audioContextRef.current) {
      audioContextRef.current.close();
    }
    
    // Reset all state
    setIsDocumentUploaded(false);
    setIsCameraOn(true);
    setIsMicOn(true);
    setActiveSpeaker(null);
    setIsAIJudgeSpeaking(false);
    elevenLabsScriptLoaded.current = false;
    
    console.log('✅ Call ended successfully - All resources cleaned up');
  };

  // Time update
  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      setCurrentTime(now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Start media only after upload
  useEffect(() => {
    if (isDocumentUploaded) {
      startLocalMedia();
    }
    return () => {
      if (localStreamRef.current) {
        localStreamRef.current.getTracks().forEach(track => track.stop());
      }
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [isDocumentUploaded]);

  // Cleanup ElevenLabs on unmount
  useEffect(() => {
    return () => {
      // Remove any existing widget instances
      const widgets = document.querySelectorAll('elevenlabs-convai');
      widgets.forEach(w => w.remove());
    };
  }, []);

  // Monitor ElevenLabs widget for speaking state
  useEffect(() => {
    if (!isDocumentUploaded) return;

    // Listen for audio playing from the widget
    const checkSpeakingState = setInterval(() => {
      const widget = document.querySelector('elevenlabs-convai');
      if (widget) {
        // Check for audio elements within the widget
        const audioElements = widget.shadowRoot?.querySelectorAll('audio') || [];
        let isPlaying = false;
        
        audioElements.forEach((audio: any) => {
          if (!audio.paused && audio.currentTime > 0) {
            isPlaying = true;
          }
        });
        
        if (isPlaying) {
          setActiveSpeaker(1); // Ananya Gupta
          setIsAIJudgeSpeaking(true);
        } else if (isAIJudgeSpeaking) {
          setActiveSpeaker(null);
          setIsAIJudgeSpeaking(false);
        }
      }
    }, 300);

    return () => clearInterval(checkSpeakingState);
  }, [isDocumentUploaded, isAIJudgeSpeaking]);

  return (
    <div className="bg-gray-900 text-white min-h-screen p-4 font-sans">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-blue-500 rounded flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z" />
              <path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z" />
            </svg>
          </div>
          <h1 className="text-xl font-bold">INNOVATE PITCH</h1>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-lg font-mono">{currentTime}</span>
          <div className="px-3 py-1 bg-gray-800 rounded text-sm">
            AI Shark Tank - Pitch Session
          </div>
        </div>
        <button className="p-2 hover:bg-gray-800 rounded">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 011.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
          </svg>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
        {/* Main Video */}
        <div className="lg:col-span-3">
          <div className="bg-gray-800 rounded-lg overflow-hidden">
            <div className="p-3 border-b border-gray-700">
              <span className="text-xs uppercase tracking-wider">YOUR CAMERA — Live Feed</span>
            </div>
            
            {!isDocumentUploaded ? (
              <div className="h-96 flex flex-col items-center justify-center bg-gray-700">
                <div className="mb-4 p-4 bg-blue-600 rounded-full">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                  </svg>
                </div>
                <h2 className="text-xl font-semibold mb-2">Upload Your Document</h2>
                <p className="text-gray-400 mb-4">Please upload your pitch deck to begin the session</p>
                <div className="mb-4 p-3 bg-yellow-900/30 border border-yellow-600/50 rounded text-xs max-w-md">
                  <p className="text-yellow-300">
                    ⚠️ After upload, please <strong>allow microphone access</strong> when prompted by your browser. Ananya Gupta (AI Judge) will start speaking automatically.
                  </p>
                </div>
                <label className="cursor-pointer px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-md transition-colors">
                  Choose File
                  <input 
                    type="file" 
                    onChange={handleFileUpload}
                    className="hidden"
                    accept=".pdf,.doc,.docx,.ppt,.pptx"
                  />
                </label>
              </div>
            ) : (
              <div className="relative h-96 bg-black">
                {/* Show video ONLY if camera is on */}
                {isCameraOn && (
                  <video
                    ref={localVideoRef}
                    autoPlay
                    muted
                    playsInline
                    className="w-full h-full object-cover"
                  />
                )}

                {/* Overlay when camera is off */}
                {!isCameraOn && (
                  <div className="absolute inset-0 flex items-center justify-center bg-gray-900 bg-opacity-80">
                    <div className="text-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto mb-2 opacity-70" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-4.553A2 2 0 0120 6h4v2a2 2 0 01-2 2h-2v6a2 2 0 01-2 2h-2a2 2 0 01-2-2v-6h-2a2 2 0 01-2-2h-2V6a2 2 0 012-2h4a2 2 0 011.414.586l4.553 4.553z" />
                      </svg>
                      <p className="text-white text-sm">Camera Off</p>
                    </div>
                  </div>
                )}

                {/* Recording indicator */}
                <div className="absolute top-2 left-2 flex items-center gap-1 bg-red-600 px-2 py-1 rounded">
                  <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                  <span className="text-xs">LIVE</span>
                </div>
                {/* Label */}
                <div className="absolute bottom-2 left-2 right-2 text-center bg-black bg-opacity-50 py-1 text-sm">
                  PRESENTER
                </div>
              </div>
            )}
          </div>

          {/* Controls — ONLY AFTER UPLOAD */}
          {isDocumentUploaded && (
            <div className="mt-4 flex flex-wrap gap-3 justify-center items-center">
              <button
                onClick={toggleMic}
                className={`flex flex-col items-center gap-1 px-4 py-2 rounded-lg transition-colors ${
                  isMicOn
                    ? 'bg-gray-700 hover:bg-gray-600'
                    : 'bg-red-600 hover:bg-red-700'
                }`}
              >
                {isMicOn ? (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 17l3.5-3.5" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 5l-2 2" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 17l-2-2" />
                  </svg>
                )}
                <span className="text-xs">Mic {isMicOn ? 'On' : 'Off'}</span>
              </button>

              <button
                onClick={toggleCamera}
                className={`flex flex-col items-center gap-1 px-4 py-2 rounded-lg transition-colors ${
                  isCameraOn
                    ? 'bg-gray-700 hover:bg-gray-600'
                    : 'bg-red-600 hover:bg-red-700'
                }`}
              >
                {isCameraOn ? (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-4.553a2 2 0 012.828 0L24 9.928V19a2 2 0 01-2 2H4a2 2 0 01-2-2V9.928l1.432-4.373a2 2 0 012.828 0L15 10z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 13.5l3 3 3-3" />
                  </svg>
                )}
                <span className="text-xs">Camera {isCameraOn ? 'On' : 'Off'}</span>
              </button>

              <button
                onClick={endCall}
                className="flex flex-col items-center gap-1 px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
                <span className="text-xs">End Call</span>
              </button>
            </div>
          )}
        </div>

        {/* Judges Panel */}
        <div className="lg:col-span-1">
          <div className="bg-gray-800 rounded-lg p-4">
            <h2 className="text-sm uppercase tracking-wider mb-4">AI JUDGES</h2>
            <div className="space-y-3">
              {judges.map((judge) => (
                <div
                  key={judge.id}
                  className={`flex items-center gap-3 p-3 rounded-lg transition-all ${
                    activeSpeaker === judge.id
                      ? 'border-2 border-blue-400 bg-blue-900/20'
                      : 'bg-gray-700 hover:bg-gray-600'
                  }`}
                >
                  <div className="relative">
                    <img
                      src={judge.image}
                      alt={judge.name}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    {activeSpeaker === judge.id && (
                      <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="text-sm font-medium">{judge.name}</div>
                    {activeSpeaker === judge.id && (
                      <div className="text-xs text-green-400 mt-0.5">Speaking…</div>
                    )}
                    {/* Show AI indicator for first judge */}
                    {judge.id === 1 && (
                      <div className="text-xs text-blue-400 mt-0.5">AI-Powered</div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Completely Hidden ElevenLabs Widget - Audio only, no visible UI */}
      {isDocumentUploaded && (
        <div 
          ref={(el) => { elevenLabsWidgetRef.current = el; }}
          style={{ 
            position: 'fixed',
            bottom: '10px',
            right: '10px',
            width: '80px',
            height: '80px',
            opacity: 0,
            zIndex: 9999,
            pointerEvents: 'auto',
            overflow: 'visible'
          }}
          title="AI Assistant (Hidden)"
        >
          {React.createElement('elevenlabs-convai', {
            'agent-id': import.meta.env.VITE_ELEVENLABS_AGENT_ID || 'agent_8801kagtss1aefgb7k53679zjrwb'
          })}
        </div>
      )}
    </div>
  );
};

export default VideoCallInterface;