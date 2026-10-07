import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  PlusCircle, 
  Wrench, 
  MapPin, 
  AlertTriangle, 
  CheckCircle2, 
  ArrowLeft,
  Image as ImageIcon,
  Sparkles,
  UploadCloud,
  X,
  FileImage,
  RefreshCw,
  Trash2
} from 'lucide-react';
import { useData } from '../../context/DataContext';
import { useAuth } from '../../context/AuthContext';
import { CAMPUS_CATEGORIES, CAMPUS_LOCATIONS } from '../../components/common/ReportIssueModal';

export default function ReportNewIssue() {
  const { reportIssue } = useData();
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  const [formData, setFormData] = useState({
    title: '',
    category: 'Electrical',
    description: '',
    location: 'EEE Block – Room 204',
    priority: 'High',
    photoUrl: '',
    photoName: '',
    photoSize: ''
  });

  const [isDragging, setIsDragging] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successInfo, setSuccessInfo] = useState(null);
  const [errors, setErrors] = useState({});

  const handleFileSelect = (file) => {
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      alert('Please upload an image file (JPG, PNG, WEBP, etc.)');
      return;
    }

    if (file.size > 15 * 1024 * 1024) {
      alert('Image file size must be less than 15MB.');
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      setFormData(prev => ({
        ...prev,
        photoUrl: event.target.result,
        photoName: file.name,
        photoSize: `${(file.size / 1024).toFixed(1)} KB`
      }));
    };
    reader.readAsDataURL(file);
  };

  const handleFileInputChange = (e) => {
    const file = e.target.files?.[0];
    handleFileSelect(file);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    handleFileSelect(file);
  };

  const handleRemovePhoto = () => {
    setFormData(prev => ({
      ...prev,
      photoUrl: '',
      photoName: '',
      photoSize: ''
    }));
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};
    if (!formData.title.trim()) newErrors.title = 'Issue Title is required.';
    if (!formData.location.trim()) newErrors.location = 'Location is required.';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      const created = reportIssue({
        title: formData.title,
        category: formData.category,
        description: formData.description,
        location: formData.location,
        priority: formData.priority,
        photo: formData.photoUrl || null,
        reportedBy: currentUser?.name || 'Campus Student',
        reportedById: currentUser?.id || 'CF-STU-2026',
        role: currentUser?.role === 'faculty' ? 'Faculty' : currentUser?.role === 'management' ? 'Management' : 'Student',
        department: currentUser?.department || 'Computer Science and Engineering (CSE)'
      });

      setIsSubmitting(false);
      setSuccessInfo(created);
    }, 400);
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {/* Top Breadcrumb Header */}
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="rounded-xl border border-slate-200 bg-white p-2 text-slate-500 hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-900 transition"
        >
          <ArrowLeft size={18} />
        </button>
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white font-['Outfit']">
            Report New Maintenance Issue
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Submit a campus infrastructure complaint to the Central Maintenance Office
          </p>
        </div>
      </div>

      {successInfo ? (
        <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm dark:border-slate-800 dark:bg-slate-900 text-center animate-fade-in">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-600 dark:bg-emerald-950/60 dark:text-emerald-400">
            <CheckCircle2 size={36} />
          </div>
          <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white font-['Outfit']">
            Complaint Submitted Successfully!
          </h2>
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            Your maintenance issue has been generated and queued for inspection.
          </p>

          <div className="my-6 rounded-2xl bg-blue-50/80 p-5 border border-blue-100 dark:bg-blue-950/40 dark:border-blue-900/50 text-left max-w-md mx-auto">
            <div className="flex items-center justify-between pb-3 border-b border-blue-100 dark:border-blue-900/40">
              <span className="text-xs font-bold uppercase tracking-wider text-blue-700 dark:text-blue-300">
                Generated Issue ID
              </span>
              <span className="text-lg font-extrabold text-blue-700 dark:text-cyan-400 font-mono">
                {successInfo.id}
              </span>
            </div>
            <div className="mt-3 text-xs space-y-1.5 text-slate-600 dark:text-slate-300">
              <p><span className="font-semibold text-slate-800 dark:text-white">Title:</span> {successInfo.title}</p>
              <p><span className="font-semibold text-slate-800 dark:text-white">Location:</span> {successInfo.location}</p>
              <p><span className="font-semibold text-slate-800 dark:text-white">Category:</span> {successInfo.category} &bull; <span className="font-semibold text-slate-800 dark:text-white">Priority:</span> {successInfo.priority}</p>
              <p><span className="font-semibold text-slate-800 dark:text-white">Status:</span> <span className="font-bold text-amber-600 dark:text-amber-400">Pending</span></p>
            </div>
          </div>

          <div className="flex justify-center gap-3">
            <button
              type="button"
              onClick={() => {
                setSuccessInfo(null);
                setFormData({
                  title: '',
                  category: 'Electrical',
                  description: '',
                  location: 'EEE Block',
                  priority: 'High',
                  photoUrl: '',
                  photoName: '',
                  photoSize: ''
                });
              }}
              className="rounded-2xl border border-slate-200 px-5 py-2.5 text-xs font-bold text-slate-600 hover:bg-slate-50 dark:border-slate-700 dark:text-slate-300 transition"
            >
              Report Another Issue
            </button>
            <button
              type="button"
              onClick={() => navigate(currentUser?.role === 'faculty' ? '/faculty' : '/student')}
              className="rounded-2xl bg-gradient-to-r from-blue-600 to-cyan-600 px-6 py-2.5 text-xs font-bold text-white shadow-lg shadow-blue-500/25 hover:opacity-95 transition"
            >
              Go to Dashboard
            </button>
          </div>
        </div>
      ) : (
        <div className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Title */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300 mb-1.5">
                Issue Title <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="e.g. Fan not working / Water leakage near Electrical Lab"
                className={`w-full rounded-2xl border ${
                  errors.title ? 'border-rose-400 bg-rose-50/20' : 'border-slate-200 bg-slate-50/60'
                } py-3 px-4 text-sm text-slate-900 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10 dark:border-slate-700 dark:bg-slate-800/50 dark:text-white`}
                required
              />
              {errors.title && <p className="mt-1 text-xs text-rose-500 font-medium">{errors.title}</p>}
            </div>

            {/* Category & Priority */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300 mb-1.5">
                  Category <span className="text-rose-500">*</span>
                </label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50/60 py-3 px-4 text-sm text-slate-900 outline-none transition focus:border-blue-500 focus:bg-white dark:border-slate-700 dark:bg-slate-800/50 dark:text-white"
                >
                  {CAMPUS_CATEGORIES.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300 mb-1.5">
                  Priority <span className="text-rose-500">*</span>
                </label>
                <select
                  value={formData.priority}
                  onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50/60 py-3 px-4 text-sm text-slate-900 outline-none transition focus:border-blue-500 focus:bg-white dark:border-slate-700 dark:bg-slate-800/50 dark:text-white"
                >
                  <option value="Low">Low Priority</option>
                  <option value="Medium">Medium Priority</option>
                  <option value="High">High Priority</option>
                  <option value="Critical">Critical Priority 🚨</option>
                </select>
              </div>
            </div>

            {/* Location */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300 mb-1.5">
                Campus Location <span className="text-rose-500">*</span>
              </label>
              <div className="relative">
                <MapPin size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  list="campus-locations-list-page"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  placeholder="e.g. EEE Block – Room 204 or CSE Block – Lab 2"
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50/60 py-3 pl-11 pr-4 text-sm text-slate-900 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10 dark:border-slate-700 dark:bg-slate-800/50 dark:text-white"
                  required
                />
                <datalist id="campus-locations-list-page">
                  {CAMPUS_LOCATIONS.map((loc) => (
                    <option key={loc} value={loc} />
                  ))}
                </datalist>
              </div>
            </div>

            {/* Description */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300 mb-1.5">
                Detailed Description
              </label>
              <textarea
                rows={3}
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Provide specific room details, damage extent, or equipment serials..."
                className="w-full rounded-2xl border border-slate-200 bg-slate-50/60 py-3 px-4 text-sm text-slate-900 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10 dark:border-slate-700 dark:bg-slate-800/50 dark:text-white"
              />
            </div>

            {/* PHOTO EVIDENCE: LOCAL FILE UPLOAD & PREVIEW */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300 mb-1.5">
                Photo Evidence (Upload from Local Device)
              </label>

              {/* Hidden file input */}
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileInputChange}
                className="hidden"
                id="photo-upload-input"
              />

              {formData.photoUrl ? (
                /* PREVIEW OF LOADED LOCAL PHOTO */
                <div className="relative overflow-hidden rounded-2xl border border-blue-200 bg-blue-50/50 p-4 dark:border-blue-900/60 dark:bg-blue-950/20">
                  <div className="flex flex-col sm:flex-row items-center gap-4">
                    <img
                      src={formData.photoUrl}
                      alt="Uploaded Preview"
                      className="h-28 w-28 rounded-xl object-cover border border-blue-200 dark:border-blue-900 shadow-sm shrink-0"
                    />

                    <div className="flex-1 text-center sm:text-left min-w-0">
                      <div className="flex items-center justify-center sm:justify-start gap-1.5 text-emerald-600 dark:text-emerald-400 font-bold text-xs mb-1">
                        <CheckCircle2 size={16} />
                        <span>Local Photo Attached Successfully</span>
                      </div>
                      <p className="text-xs font-semibold text-slate-800 dark:text-white truncate">
                        {formData.photoName || 'Captured image from local device'}
                      </p>
                      {formData.photoSize && (
                        <p className="text-[11px] text-slate-400">
                          File size: {formData.photoSize}
                        </p>
                      )}

                      <div className="mt-3 flex items-center justify-center sm:justify-start gap-2">
                        <button
                          type="button"
                          onClick={() => fileInputRef.current?.click()}
                          className="flex items-center gap-1 rounded-xl bg-white border border-slate-200 px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-50 dark:bg-slate-800 dark:border-slate-700 dark:text-slate-300 transition"
                        >
                          <RefreshCw size={13} />
                          <span>Change Photo</span>
                        </button>
                        <button
                          type="button"
                          onClick={handleRemovePhoto}
                          className="flex items-center gap-1 rounded-xl bg-rose-50 border border-rose-200 px-3 py-1.5 text-xs font-semibold text-rose-600 hover:bg-rose-100 dark:bg-rose-950/40 dark:border-rose-900 dark:text-rose-400 transition"
                        >
                          <Trash2 size={13} />
                          <span>Remove</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                /* DRAG & DROP / CHOOSE LOCAL FILE DROPZONE */
                <div
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                  onClick={() => fileInputRef.current?.click()}
                  className={`cursor-pointer rounded-2xl border-2 border-dashed p-6 text-center transition-all ${
                    isDragging
                      ? 'border-blue-500 bg-blue-50/80 dark:bg-blue-950/40 scale-[1.01]'
                      : 'border-slate-200 hover:border-blue-400 bg-slate-50/50 hover:bg-blue-50/20 dark:border-slate-700 dark:bg-slate-800/40 dark:hover:bg-slate-800/70'
                  }`}
                >
                  <div className="mx-auto mb-2 flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 text-blue-600 dark:bg-blue-950 dark:text-cyan-400 shadow-sm">
                    <UploadCloud size={24} />
                  </div>
                  <p className="text-sm font-bold text-slate-800 dark:text-white">
                    Click to browse or drag &amp; drop photo from your device
                  </p>
                  <p className="text-xs text-slate-400 mt-1">
                    Supports JPG, PNG, WEBP, GIF (up to 15MB)
                  </p>

                  <div className="mt-3 flex items-center justify-center gap-2" onClick={(e) => e.stopPropagation()}>
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="rounded-xl bg-blue-600 px-4 py-2 text-xs font-bold text-white shadow-sm hover:bg-blue-700 transition"
                    >
                      Browse Local Files
                    </button>
                    <span className="text-xs text-slate-400">or</span>
                    <button
                      type="button"
                      onClick={() => setFormData(prev => ({
                        ...prev,
                        photoUrl: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=500&auto=format&fit=crop&q=80',
                        photoName: 'sample-electrical-fault.jpg',
                        photoSize: '240 KB'
                      }))}
                      className="rounded-xl bg-slate-100 px-3 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300 transition"
                    >
                      Use Demo Photo
                    </button>
                  </div>
                </div>
              )}
            </div>

            <div className="pt-3 flex justify-end gap-3">
              <button
                type="button"
                onClick={() => navigate(-1)}
                className="rounded-2xl border border-slate-200 px-5 py-3 text-xs font-bold text-slate-600 hover:bg-slate-50 dark:border-slate-700 dark:text-slate-400 transition"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex items-center gap-2 rounded-2xl bg-gradient-to-r from-blue-600 via-sky-600 to-cyan-500 px-8 py-3 text-sm font-bold text-white shadow-lg shadow-blue-500/25 hover:opacity-95 transition disabled:opacity-50"
              >
                <PlusCircle size={18} />
                <span>{isSubmitting ? 'Logging Issue...' : 'Submit Maintenance Issue'}</span>
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
