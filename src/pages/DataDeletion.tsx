import React from 'react';
import { ArrowLeft, Mail, Instagram, Shield } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function DataDeletion() {
  return (
    <div className="min-h-screen bg-white py-20 px-6">
      <div className="max-w-4xl mx-auto">
        <Link to="/" className="inline-flex items-center gap-2 text-emerald-600 font-bold uppercase text-xs tracking-widest mb-12 hover:gap-3 transition-all">
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </Link>
        
        <div className="bg-neutral-50 rounded-3xl p-12 border border-black/5">
          <div className="flex items-center gap-3 mb-8">
            <Shield className="w-8 h-8 text-emerald-600" />
            <h1 className="text-4xl font-bold tracking-tighter">Data Deletion Request</h1>
          </div>
          
          <p className="text-lg text-black/60 leading-relaxed mb-12">
            At TROIKA DRIVE, we respect your privacy and provide simple ways to request the deletion of your personal data associated with our Instagram chatbot service.
          </p>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className="p-8 bg-white rounded-2xl border border-black/5 shadow-sm">
              <Mail className="w-6 h-6 text-emerald-600 mb-4" />
              <h2 className="text-xl font-bold mb-2">Email Request</h2>
              <p className="text-sm text-black/50 mb-6">Send a formal request to our privacy team.</p>
              <a href="mailto:privacy@troikadrive.com" className="text-emerald-600 font-bold text-sm hover:underline">
                privacy@troikadrive.com
              </a>
            </div>
            
            <div className="p-8 bg-white rounded-2xl border border-black/5 shadow-sm">
              <Instagram className="w-6 h-6 text-emerald-600 mb-4" />
              <h2 className="text-xl font-bold mb-2">Instagram DM</h2>
              <p className="text-sm text-black/50 mb-6">Send a direct message to our account.</p>
              <p className="text-black font-bold text-sm">
                Message: <span className="text-emerald-600">"DELETE MY DATA"</span>
              </p>
            </div>
          </div>
          
          <div className="mt-12 pt-12 border-t border-black/10">
            <h3 className="font-bold uppercase text-xs tracking-widest text-black/40 mb-4">Processing Time</h3>
            <p className="text-sm text-black/60 leading-relaxed">
              We process all manual deletion requests within <strong>7 business days</strong>. Once processed, all your conversation logs and associated identifiers will be permanently removed from our systems.
            </p>
          </div>
          
          <div className="mt-8">
            <h3 className="font-bold uppercase text-xs tracking-widest text-black/40 mb-4">Meta Platform Integration</h3>
            <p className="text-sm text-black/60 leading-relaxed">
              We support Meta's automated data deletion callback. If you remove our application from your Facebook or Instagram "Apps and Websites" settings, a request is automatically sent to our servers to delete your data.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
