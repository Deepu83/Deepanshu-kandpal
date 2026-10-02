import React, { useState } from 'react';
import { personalInfo } from '../data/portfolioData';
import { Mail, Github, Linkedin, Send, Copy, Check, Sparkles, AlertCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { WhatsAppIcon } from './WhatsAppFloatingButton';

interface ContactProps {
  initialProjectType?: string;
}

export const Contact: React.FC<ContactProps> = ({ initialProjectType = 'Web Development' }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    project_type: initialProjectType,
    message: ''
  });

  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedWhatsApp, setCopiedWhatsApp] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  // Sync if initialProjectType changes
  React.useEffect(() => {
    if (initialProjectType) {
      setFormData((prev) => ({ ...prev, project_type: initialProjectType }));
    }
  }, [initialProjectType]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Prevent duplicate submissions while in flight
    if (isSubmitting) return;

    // Field Validations
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setSubmitStatus('error');
      setErrorMessage('Message could not be sent. Please fill in all required fields.');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email.trim())) {
      setSubmitStatus('error');
      setErrorMessage('Message could not be sent. Please enter a valid email address.');
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus('idle');
    setErrorMessage('');

    try {
      const data = new FormData();
      data.append('access_key', 'b386b935-1b1e-4ce4-a16f-236ef635892b');
      data.append('name', formData.name.trim());
      data.append('email', formData.email.trim());
      data.append('project_type', formData.project_type);
      data.append('message', formData.message.trim());

      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: data
      });

      console.log('Web3Forms status:', response.status);

      const result = await response.json();
      console.log('Web3Forms response:', result);

      if (response.ok && result.success) {
        setSubmitStatus('success');
        // Clear the form ONLY after confirmed successful Web3Forms response
        setFormData({
          name: '',
          email: '',
          project_type: 'Web Development',
          message: ''
        });
      } else {
        setSubmitStatus('error');
        setErrorMessage('Message could not be sent. Please try again.');
        console.error('Web3Forms error:', result);
      }
    } catch (error) {
      console.error('Web3Forms error:', error);
      setSubmitStatus('error');
      setErrorMessage('Message could not be sent. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(personalInfo.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const handleCopyWhatsApp = () => {
    navigator.clipboard.writeText(personalInfo.whatsapp);
    setCopiedWhatsApp(true);
    setTimeout(() => setCopiedWhatsApp(false), 2000);
  };

  return (
    <section id="contact" className="py-20 md:py-28 border-t border-slate-200/80 dark:border-slate-800/80 bg-slate-50/50 dark:bg-[#0E1017]/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-3xl mb-16"
        >
          <div className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 mb-2 font-mono-code">
            09 · Get in Touch
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 dark:text-white font-heading">
            Let's Discuss Your Project
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-600 dark:text-slate-400">
            Have a project in mind, need freelance development, or want high-performing technical content? Fill out the form or reach out directly.
          </p>
        </motion.div>

        {/* 2-Column Layout: Direct Details (Left) + Contact Form (Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Direct Contact Info (5 cols) */}
          <motion.div 
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.55, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 space-y-8"
          >
            
            {/* Direct Email Card with Copy button */}
            <div className="p-6 rounded-2xl bg-white dark:bg-[#121520] border border-slate-200 dark:border-slate-800 shadow-xs">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs uppercase tracking-wider text-slate-400 font-semibold font-mono-code">
                    Direct Email
                  </div>
                  <div className="text-sm font-bold text-slate-900 dark:text-white">
                    {personalInfo.email}
                  </div>
                </div>
              </div>

              <p className="text-xs text-slate-500 dark:text-slate-400 my-4">
                Fastest way to get in touch. I typically respond within 24 hours.
              </p>

              <div className="flex items-center gap-2">
                <a
                  href={`mailto:${personalInfo.email}`}
                  className="flex-1 py-2 px-3 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold text-center transition-colors shadow-xs"
                >
                  Send an Email
                </a>
                <button
                  type="button"
                  onClick={handleCopyEmail}
                  className="p-2 rounded-lg bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 text-xs font-medium transition-colors cursor-pointer flex items-center gap-1.5"
                  title="Copy email to clipboard"
                  aria-label="Copy email address"
                >
                  {copiedEmail ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
                  <span className="text-[11px]">{copiedEmail ? 'Copied' : 'Copy'}</span>
                </button>
              </div>
            </div>

            {/* WhatsApp Direct Chat Card */}
            <div className="p-6 rounded-2xl bg-white dark:bg-[#121520] border border-slate-200 dark:border-slate-800 shadow-xs hover:border-[#25D366]/60 transition-colors">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-[#25D366] flex items-center justify-center">
                  <WhatsAppIcon className="w-5 h-5 fill-[#25D366]" />
                </div>
                <div>
                  <div className="text-xs uppercase tracking-wider text-slate-400 font-semibold font-mono-code">
                    WhatsApp Chat
                  </div>
                  <div className="text-sm font-bold text-slate-900 dark:text-white">
                    {personalInfo.whatsapp}
                  </div>
                </div>
              </div>

              <p className="text-xs text-slate-500 dark:text-slate-400 my-4">
                Available for instant messaging and quick project discussions.
              </p>

              <div className="flex items-center gap-2">
                <a
                  href={personalInfo.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Chat on WhatsApp with Deepanshu (+91 8057509308)"
                  className="flex-1 py-2 px-3 rounded-lg bg-[#25D366] hover:bg-[#20bd5a] text-white text-xs font-semibold text-center transition-all duration-150 shadow-xs hover:shadow flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <WhatsAppIcon className="w-4 h-4 fill-white" />
                  <span>Start WhatsApp Chat</span>
                </a>
                <button
                  type="button"
                  onClick={handleCopyWhatsApp}
                  className="p-2 rounded-lg bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 text-xs font-medium transition-colors cursor-pointer flex items-center gap-1.5"
                  title="Copy WhatsApp number"
                  aria-label="Copy WhatsApp number"
                >
                  {copiedWhatsApp ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
                  <span className="text-[11px]">{copiedWhatsApp ? 'Copied' : 'Copy'}</span>
                </button>
              </div>
            </div>

            {/* Social & Professional Links */}
            <div className="p-6 rounded-2xl bg-white dark:bg-[#121520] border border-slate-200 dark:border-slate-800 shadow-xs">
              <div className="text-xs uppercase tracking-wider text-slate-400 font-semibold mb-4 font-mono-code">
                Connect Online
              </div>
              <div className="space-y-3">
                <a
                  href={personalInfo.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Deepanshu Kandpal GitHub Profile (opens in a new tab)"
                  className="flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-slate-800/40 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 text-xs sm:text-sm font-medium transition-colors border border-slate-100 dark:border-slate-800"
                >
                  <div className="flex items-center gap-2.5">
                    <Github className="w-4 h-4 text-indigo-500" />
                    <span>GitHub Profile</span>
                  </div>
                  <span className="text-xs text-slate-400 font-mono-code">github.com/Deepu83</span>
                </a>

                <a
                  href={personalInfo.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Deepanshu Kandpal LinkedIn Profile (opens in a new tab)"
                  className="flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-slate-800/40 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 text-xs sm:text-sm font-medium transition-colors border border-slate-100 dark:border-slate-800"
                >
                  <div className="flex items-center gap-2.5">
                    <Linkedin className="w-4 h-4 text-indigo-500" />
                    <span>LinkedIn Profile</span>
                  </div>
                  <span className="text-xs text-slate-400 font-mono-code">linkedin.com/in/deepanshu...</span>
                </a>
              </div>
            </div>

            {/* Location & Availability Note */}
            <div className="p-4 rounded-xl bg-indigo-50/60 dark:bg-indigo-950/30 border border-indigo-100 dark:border-indigo-900/40 text-xs text-slate-600 dark:text-slate-300">
              <div className="flex items-center gap-2 font-semibold text-slate-900 dark:text-white mb-1">
                <Sparkles className="w-3.5 h-3.5 text-indigo-500" />
                <span>Current Availability</span>
              </div>
              <p>
                {personalInfo.availabilityStatus}. Located in {personalInfo.location}. Open to contract and remote engagements.
              </p>
            </div>

          </motion.div>

          {/* Right Column: Contact Form (7 cols) */}
          <motion.div 
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.55, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7"
          >
            <div className="p-8 sm:p-10 rounded-2xl bg-white dark:bg-[#121520] border border-slate-200 dark:border-slate-800 shadow-sm">
              
              <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white font-heading mb-2">
                Send a Message
              </h3>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mb-8">
                Fill in the details below and I'll get back to you with timeline and project thoughts.
              </p>

              {/* Success Notification */}
              {submitStatus === 'success' && (
                <div className="mb-6 p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/60 text-emerald-800 dark:text-emerald-300 text-xs sm:text-sm flex items-start gap-3 animate-in fade-in duration-200">
                  <Check className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold">Message sent successfully! I'll get back to you soon.</p>
                  </div>
                </div>
              )}

              {/* Error Notification */}
              {submitStatus === 'error' && (
                <div className="mb-6 p-4 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800/60 text-rose-800 dark:text-rose-300 text-xs sm:text-sm flex items-start gap-3 animate-in fade-in duration-200">
                  <AlertCircle className="w-5 h-5 text-rose-500 shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold">{errorMessage || 'Message could not be sent. Please try again.'}</p>
                  </div>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                
                {/* Name Field */}
                <div>
                  <label htmlFor="name" className="block text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-2">
                    Your Name <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="e.g. John Doe or Acme Corp"
                    className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white text-sm focus:outline-hidden focus:ring-2 focus:ring-indigo-500 transition-colors"
                  />
                </div>

                {/* Email Field */}
                <div>
                  <label htmlFor="email" className="block text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-2">
                    Your Email <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="e.g. john@example.com"
                    className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white text-sm focus:outline-hidden focus:ring-2 focus:ring-indigo-500 transition-colors"
                  />
                </div>

                {/* Project Type */}
                <div>
                  <label htmlFor="project_type" className="block text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-2">
                    Project Type
                  </label>
                  <select
                    id="project_type"
                    name="project_type"
                    value={formData.project_type}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white text-sm focus:outline-hidden focus:ring-2 focus:ring-indigo-500 transition-colors cursor-pointer"
                  >
                    <option value="Web Development">Website & Web Application Development</option>
                    <option value="Content Writing">Content Writing & SEO Articles</option>
                    <option value="Full-Stack Application">Full-Stack Application / Dashboard</option>
                    <option value="Landing Page & Copy">Landing Page & Copywriting</option>
                    <option value="Maintenance / Other">Maintenance, Optimization & Consulting</option>
                  </select>
                </div>

                {/* Message Field */}
                <div>
                  <label htmlFor="message" className="block text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-2">
                    Message <span className="text-rose-500">*</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={4}
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell me about your project goals, deliverables, timeline, or any specific technologies..."
                    className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white text-sm focus:outline-hidden focus:ring-2 focus:ring-indigo-500 transition-colors resize-y"
                  ></textarea>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full inline-flex items-center justify-center gap-2 py-3.5 px-6 rounded-xl bg-indigo-600 hover:bg-indigo-500 disabled:bg-indigo-400 dark:disabled:bg-indigo-700/60 text-white font-semibold text-sm shadow-md hover:shadow-lg transition-all duration-150 cursor-pointer disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <span>Sending...</span>
                  ) : (
                    <>
                      <span>Send Project Inquiry</span>
                      <Send className="w-4 h-4" />
                    </>
                  )}
                </button>

                <p className="text-[11px] text-center text-slate-400 dark:text-slate-500">
                  Your information will only be used to respond to your inquiry.
                </p>
              </form>

            </div>
          </motion.div>

        </div>

      </div>
    </section>
  );
};
