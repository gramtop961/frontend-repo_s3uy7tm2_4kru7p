import React, { useEffect, useMemo, useRef, useState } from 'react';
import { MessageCircle, Send, X, Loader2 } from 'lucide-react';

const BOOK_URL = 'https://cal.com/velodent-ogbkfv/20min';

function TypingDots() {
  return (
    <div className="flex items-center gap-1">
      <span className="inline-block w-1.5 h-1.5 bg-black/60 rounded-full animate-bounce [animation-delay:-0.2s]"></span>
      <span className="inline-block w-1.5 h-1.5 bg-black/60 rounded-full animate-bounce"></span>
      <span className="inline-block w-1.5 h-1.5 bg-black/60 rounded-full animate-bounce [animation-delay:0.2s]"></span>
    </div>
  );
}

const initialBot = {
  role: 'assistant',
  content: 'Hi! I\'m the Velodent Assistant. I can help with bookings, reschedules, insurance, braces reminders, and payments. How can I help today?',
  ts: new Date().toISOString(),
};

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [consent, setConsent] = useState(false);
  const [messages, setMessages] = useState([initialBot]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [showInvite, setShowInvite] = useState(false);
  const [failCount, setFailCount] = useState(0);
  const [lead, setLead] = useState({ name: '', email: '', phone: '', times: '' });

  const sessionId = useMemo(() => {
    const key = 'vd_session_id';
    let sid = sessionStorage.getItem(key);
    if (!sid) {
      sid = Math.random().toString(36).slice(2);
      sessionStorage.setItem(key, sid);
    }
    return sid;
  }, []);

  const backend = import.meta.env.VITE_BACKEND_URL || '';
  const scrollRef = useRef(null);

  useEffect(() => {
    const t = setTimeout(() => setShowInvite(true), 25000);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (open) setShowInvite(false);
  }, [open]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, loading, open]);

  // Accessibility: close on Escape
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const page = typeof window !== 'undefined' ? window.location.pathname : '/';

  const quickChips = [
    { label: 'Book Now', action: 'book' },
    { label: 'Check Insurance', action: 'insurance' },
    { label: 'Request Callback', action: 'callback' },
  ];

  async function sendEvent(event_type, payload = {}) {
    try {
      if (!backend) return;
      await fetch(`${backend}/api/crm/event`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ event_type, page, source: 'website', session_id: sessionId, payload }),
      });
    } catch (e) {
      // swallow
    }
  }

  async function sendLead(intentOverride) {
    if (!consent) return;
    const body = {
      name: lead.name,
      email: lead.email || undefined,
      phone: lead.phone || undefined,
      preferred_times: lead.times || undefined,
      intent: intentOverride || 'general',
      source: 'website',
      page,
      session_id: sessionId,
    };
    try {
      if (backend) {
        await fetch(`${backend}/api/crm/lead`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(body),
        });
      }
      await sendEvent('lead_captured', { intent: intentOverride || 'general' });
    } catch (e) {
      // ignore
    }
  }

  async function handleSend(text) {
    const content = (text ?? input).trim();
    if (!content) return;
    const userMsg = { role: 'user', content, ts: new Date().toISOString() };
    setMessages((m) => [...m, userMsg]);
    setInput('');
    setLoading(true);

    try {
      if (backend) {
        const res = await fetch(`${backend}/api/chat`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ message: content, session_id: sessionId, page, consent }),
        });
        const data = await res.json();
        const botMsg = { role: 'assistant', content: data.reply, ts: data.timestamp };
        setMessages((m) => [...m, botMsg]);
        setFailCount(0);
      } else {
        const botMsg = { role: 'assistant', content: 'Thanks! Our assistant will help shortly.', ts: new Date().toISOString() };
        setMessages((m) => [...m, botMsg]);
      }
    } catch (e) {
      setFailCount((c) => c + 1);
      const botMsg = { role: 'assistant', content: 'Sorry, I had trouble replying. You can also use Book Now or request a callback.', ts: new Date().toISOString() };
      setMessages((m) => [...m, botMsg]);
    } finally {
      setLoading(false);
    }
  }

  // Fallback to human after two failures
  useEffect(() => {
    if (failCount >= 2) {
      const msg = { role: 'assistant', content: "Would you like a call from our team? Share your number and we'll reach out.", ts: new Date().toISOString() };
      setMessages((m) => [...m, msg]);
      sendEvent('handoff_requested');
    }
  }, [failCount]);

  function onChip(action) {
    if (action === 'book') {
      window.open(BOOK_URL, '_blank', 'noopener');
      sendEvent('booking_requested');
      return;
    }
    if (action === 'insurance') {
      handleSend('Is my insurance covered?');
      return;
    }
    if (action === 'callback') {
      handleSend('Please call me back');
      return;
    }
  }

  const isMobile = typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(max-width: 640px)').matches;

  return (
    <>
      {/* Invite bubble */}
      {!open && showInvite && !isMobile && (
        <button
          onClick={() => setOpen(true)}
          className="fixed bottom-28 right-6 z-40 bg-white text-black border border-black/10 shadow-sm rounded-full px-4 py-2 hover:shadow-md hover:scale-[1.03] transition-transform"
          aria-label="Open Velodent Assistant"
        >
          Need help booking? I can help — Book Now
        </button>
      )}

      {/* Floating button */}
      <button
        onClick={() => {
          setOpen((o) => !o);
          if (!open) sendEvent('chat_started');
        }}
        className="fixed bottom-6 right-6 z-40 w-12 h-12 rounded-full bg-white text-black border border-black/10 shadow-sm flex items-center justify-center hover:shadow-md hover:scale-[1.03] transition-transform"
        aria-label={open ? 'Close chat' : 'Open chat'}
      >
        {open ? <X className="w-6 h-6" /> : <MessageCircle className="w-6 h-6" />}
      </button>

      {/* Panel */}
      <div
        className={`fixed bottom-20 right-6 z-40 w-[360px] max-w-[92vw] bg-white text-black border border-black/10 shadow-lg rounded-2xl overflow-hidden transform transition-all ${open ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 pointer-events-none translate-y-2 scale-95'}`}
        role="dialog"
        aria-modal="true"
        aria-label="Velodent Assistant"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-black/10">
          <div>
            <div className="font-semibold">Velodent Assistant</div>
            <div className="text-xs text-black/60">Ask about bookings, recalls, insurance.</div>
          </div>
          <a
            href={BOOK_URL}
            target="_blank"
            rel="noreferrer noopener"
            className="text-sm underline hover:opacity-80"
            onClick={() => sendEvent('booking_requested')}
          >
            Book Now
          </a>
        </div>

        {/* Consent */}
        <div className="px-4 py-2 text-xs border-b border-black/10">
          <label className="inline-flex items-start gap-2 cursor-pointer select-none">
            <input type="checkbox" className="mt-0.5" checked={consent} onChange={(e) => setConsent(e.target.checked)} />
            <span>By continuing, you agree we may store your name/email/phone to contact you.</span>
          </label>
        </div>

        {/* Messages */}
        <div ref={scrollRef} className="h-72 overflow-y-auto px-4 py-3 space-y-3">
          {messages.map((m, idx) => (
            <div key={idx} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div
                className={`max-w-[85%] text-sm leading-relaxed px-3 py-2 rounded-xl shadow-sm ${
                  m.role === 'user' ? 'bg-black text-white' : 'bg-white text-black border border-black/10'
                }`}
              >
                <div>{m.content}</div>
                <div className={`mt-1 text-[10px] ${m.role === 'user' ? 'text-white/70' : 'text-black/50'}`}>
                  {new Date(m.ts).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </div>
              </div>
            </div>
          ))}
          {loading && (
            <div className="flex justify-start">
              <div className="max-w-[85%] text-sm px-3 py-2 rounded-xl bg-white border border-black/10">
                <TypingDots />
              </div>
            </div>
          )}
        </div>

        {/* Lead capture (optional) */}
        <div className="px-4 pb-2">
          <div className="grid grid-cols-2 gap-2 mb-2">
            <input value={lead.name} onChange={(e) => setLead({ ...lead, name: e.target.value })} placeholder="Name" className="col-span-2 border border-black/10 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-black" />
            <input value={lead.email} onChange={(e) => setLead({ ...lead, email: e.target.value })} placeholder="Email" className="border border-black/10 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-black" />
            <input value={lead.phone} onChange={(e) => setLead({ ...lead, phone: e.target.value })} placeholder="Phone" className="border border-black/10 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-black" />
            <input value={lead.times} onChange={(e) => setLead({ ...lead, times: e.target.value })} placeholder="Preferred times" className="col-span-2 border border-black/10 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-black" />
          </div>
          <button
            onClick={() => sendLead('booking')}
            disabled={!consent || !lead.name}
            className="w-full inline-flex items-center justify-center gap-2 bg-black text-white px-3 py-2 rounded-lg text-sm disabled:opacity-40 hover:scale-[1.02] transition-transform"
          >
            {(!consent || !lead.name) ? <Loader2 className="w-4 h-4 opacity-0" /> : null}
            Send Details
          </button>
        </div>

        {/* Quick replies + input */}
        <div className="px-4 pb-4 pt-2 border-t border-black/10">
          <div className="flex flex-wrap gap-2 mb-2">
            {quickChips.map((c) => (
              <button key={c.action} onClick={() => onChip(c.action)} className="text-xs border border-black/10 rounded-full px-3 py-1 hover:shadow-sm hover:scale-[1.03] transition-transform">
                {c.label}
              </button>
            ))}
          </div>
          <form
            className="flex items-center gap-2"
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
          >
            <input
              aria-label="Message"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your message..."
              className="flex-1 border border-black/10 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-black"
            />
            <button
              type="submit"
              className="inline-flex items-center justify-center w-9 h-9 rounded-lg border border-black/10 hover:shadow-sm hover:scale-[1.03] transition-transform"
              aria-label="Send"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
