import React, { useState, useRef } from 'react';
import { 
  X, 
  PlusCircle, 
  Wrench, 
  MapPin, 
  AlertTriangle, 
  FileText, 
  Upload, 
  UploadCloud,
  CheckCircle2, 
  Layers,
  Sparkles,
  Zap,
  Trash2,
  RefreshCw,
  Image as ImageIcon
} from 'lucide-react';
import { useData } from '../../context/DataContext';
import { useAuth } from '../../context/AuthContext';

export const CAMPUS_CATEGORIES = [
  'Electrical',
  'Plumbing',
  'Furniture',
  'Classroom',
  'Laboratory',
  'Washroom',
  'Network / Internet',
  'Cleaning',
  'Safety',
  'Other'
];

export const CAMPUS_LOCATIONS = [
  'Main Block',
  'CSE Block',
  'ECE Block',
  'EEE Block',
  'Mechanical Block',
  'Civil Block',
  'Computer Lab',
  'Electronics Lab',
  'Electrical Lab',
  'Mechanical Lab',
  'Library',
  'Seminar Hall',
  'Auditorium',
  'Hostel',
  'Canteen',
  'Parking Area',
  'Playground'
];

export default function ReportIssueModal({ isOpen, onClose, onSuccess }) {
  const { reportIssue } = useData();
  const { currentUser } = useAuth();

  const fileInputRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);

  const [formData, setFormData] = useState({
    title: '',
    category: 'Electrical',
    description: '',
    location: 'EEE Block',
    priority: 'High',
    photoUrl: '',
    photoName: '',
    photoSize: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successInfo, setSuccessInfo] = useState(null);
  const [errors, setErrors] = useState({});

  const handleFileSelect = (file) => {
    if (!file) return;
    if (!file.type.startsWith('image/')) {
      alert('Please select an image file (PNG, JPG, WEBP, etc.)');
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

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};
    if (!formData.title.trim()) newErrors.title = 'Issue Title is required.';
    if (!formData.location.trim()) newErrors.location = 'Location is required.';
    if (!formData.category) newErrors.category = 'Category is required.';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsSubmitting(true);
    setErrors({});

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

      if (onSuccess) {
        onSuccess(created);
      }
    }, 400);
  };

  const handleResetAndClose = () => {
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
    setErrors({});
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-lg rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 shadow-2xl dark:border-slate-800 dark:bg-slate-900 max-h-[90vh] overflow-y-auto">
        {/* Close Button */}
        <button
          type="button"
          onClick={handleResetAndClose}
          className="absolute right-5 top-5 rounded-xl p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-600 dark:hover:bg-slate-800 dark:hover:text-slate-200 transition"
        >
          <X size={20} />
        </button>

        {successInfo ? (
          /* SUCCESS CONFIRMATION VIEW (Required for Hackathon Flow) */
          <div className="py-6 text-center animate-fade-in">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-600 dark:bg-emerald-950/50 dark:text-emerald-400">
              <CheckCircle2 size={36} />
            </div>
            <h3 className="text-2xl font-extrabold text-slate-900 dark:text-white font-['Outfit']">
              Complaint Submitted Successfully!
            </h3>
            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
              Your issue has been logged into the central campus maintenance database.
            </p>

            <div className="my-6 rounded-2xl bg-blue-50/80 p-4 border border-blue-100 dark:bg-blue-950/40 dark:border-blue-900/50 text-left">
              <div className="flex items-center justify-between pb-2 border-b border-blue-100 dark:border-blue-900/40">
                <span className="text-xs font-bold uppercase tracking-wider text-blue-700 dark:text-blue-300">
                  Tracking ID
                </span>
                <span className="text-base font-extrabold text-blue-700 dark:text-cyan-400 font-mono">
                  {successInfo.id}
                </span>
              </div>
              <div className="mt-2 text-xs space-y-1 text-slate-600 dark:text-slate-300">
                <p><span className="font-semibold text-slate-800 dark:text-white">Title:</span> {successInfo.title}</p>
                <p><span className="font-semibold text-slate-800 dark:text-white">Location:</span> {successInfo.location}</p>
                <p><span className="font-semibold text-slate-800 dark:text-white">Category:</span> {successInfo.category} &bull; <span className="font-semibold text-slate-800 dark:text-white">Priority:</span> {successInfo.priority}</p>
                <p><span className="font-semibold text-slate-800 dark:text-white">Status:</span> <span className="font-bold text-amber-600 dark:text-amber-400">Pending</span></p>
              </div>
            </div>

            <button
              type="button"
              onClick={handleResetAndClose}
              className="w-full rounded-2xl bg-gradient-to-r from-blue-600 to-cyan-600 py-3 text-sm font-bold text-white shadow-lg shadow-blue-500/25 hover:opacity-95 transition"
            >
              Done & Return to Dashboard
            </button>
          </div>
        ) : (
          /* ISSUE REPORTING FORM */
          <div>
            <div className="mb-6 flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-tr from-blue-600 to-cyan-500 text-white shadow-md">
                <Wrench size={22} />
              </div>
              <div>
                <h3 className="text-xl font-extrabold text-slate-900 dark:text-white font-['Outfit']">
                  Report New Campus Issue
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Submit maintenance complaint to central engineering estate office
                </p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Issue Title */}
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
                  } py-2.5 px-4 text-sm text-slate-900 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10 dark:border-slate-700 dark:bg-slate-800/50 dark:text-white`}
                  required
                />
                {errors.title && <p className="mt-1 text-xs text-rose-500 font-medium">{errors.title}</p>}
              </div>

              {/* Category & Priority Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300 mb-1.5">
                    Category <span className="text-rose-500">*</span>
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full rounded-2xl border border-slate-200 bg-slate-50/60 py-2.5 px-3 text-sm text-slate-900 outline-none transition focus:border-blue-500 focus:bg-white dark:border-slate-700 dark:bg-slate-800/50 dark:text-white"
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
                    className="w-full rounded-2xl border border-slate-200 bg-slate-50/60 py-2.5 px-3 text-sm text-slate-900 outline-none transition focus:border-blue-500 focus:bg-white dark:border-slate-700 dark:bg-slate-800/50 dark:text-white"
                  >
                    <option value="Low">Low Priority</option>
                    <option value="Medium">Medium Priority</option>
                    <option value="High">High Priority</option>
                    <option value="Critical">Critical Priority 🚨</option>
                  </select>
                </div>
              </div>

              {/* Location (Engineering Specific Dropdown / Input) */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300 mb-1.5">
                  Campus Location <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <MapPin size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    list="campus-locations-list"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    placeholder="e.g. EEE Block – Room 204 or CSE Block – Lab 2"
                    className="w-full rounded-2xl border border-slate-200 bg-slate-50/60 py-2.5 pl-11 pr-4 text-sm text-slate-900 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10 dark:border-slate-700 dark:bg-slate-800/50 dark:text-white"
                    required
                  />
                  <datalist id="campus-locations-list">
                    {CAMPUS_LOCATIONS.map((loc) => (
                      <option key={loc} value={loc} />
                    ))}
                  </datalist>
                </div>
              </div>

              {/* Detailed Description */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300 mb-1.5">
                  Issue Description
                </label>
                <textarea
                  rows={3}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Describe the issue, room number, severity, or hazards involved..."
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50/60 py-2.5 px-4 text-sm text-slate-900 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10 dark:border-slate-700 dark:bg-slate-800/50 dark:text-white"
                />
              </div>

              {/* Photo Evidence Upload from Local Device */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300 mb-1.5">
                  Attach Photo Evidence (From Local Device)
                </label>

                {/* Hidden Native File Input */}
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleFileInputChange}
                  className="hidden"
                />

                {formData.photoUrl ? (
                  /* Thumbnail Preview */
                  <div className="relative overflow-hidden rounded-2xl border border-blue-200 bg-blue-50/50 p-3 dark:border-blue-900/60 dark:bg-blue-950/20">
                    <div className="flex items-center gap-3">
                      <img
                        src={formData.photoUrl}
                        alt="Photo Preview"
                        className="h-16 w-16 rounded-xl object-cover border border-blue-200 dark:border-blue-900 shadow-sm shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400 font-bold text-xs">
                          <CheckCircle2 size={14} />
                          <span>Local Photo Attached</span>
                        </div>
                        <p className="text-xs font-semibold text-slate-800 dark:text-white truncate">
                          {formData.photoName || 'Local image selected'}
                        </p>
                        {formData.photoSize && (
                          <p className="text-[10px] text-slate-400">
                            Size: {formData.photoSize}
                          </p>
                        )}
                        <div className="mt-1.5 flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() => fileInputRef.current?.click()}
                            className="flex items-center gap-1 rounded-lg bg-white border border-slate-200 px-2.5 py-1 text-[11px] font-semibold text-slate-700 hover:bg-slate-50 dark:bg-slate-800 dark:border-slate-700 dark:text-slate-300 transition"
                          >
                            <RefreshCw size={11} />
                            <span>Change</span>
                          </button>
                          <button
                            type="button"
                            onClick={handleRemovePhoto}
                            className="flex items-center gap-1 rounded-lg bg-rose-50 border border-rose-200 px-2.5 py-1 text-[11px] font-semibold text-rose-600 hover:bg-rose-100 dark:bg-rose-950/40 dark:border-rose-900 dark:text-rose-400 transition"
                          >
                            <Trash2 size={11} />
                            <span>Remove</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  /* Dropzone */
                  <div
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                    onClick={() => fileInputRef.current?.click()}
                    className={`cursor-pointer rounded-2xl border-2 border-dashed p-4 text-center transition-all ${
                      isDragging
                        ? 'border-blue-500 bg-blue-50/80 dark:bg-blue-950/40'
                        : 'border-slate-200 hover:border-blue-400 bg-slate-50/50 hover:bg-blue-50/20 dark:border-slate-700 dark:bg-slate-800/40 dark:hover:bg-slate-800/70'
                    }`}
                  >
                    <div className="mx-auto mb-1.5 flex h-9 w-9 items-center justify-center rounded-xl bg-blue-50 text-blue-600 dark:bg-blue-950 dark:text-cyan-400">
                      <UploadCloud size={20} />
                    </div>
                    <p className="text-xs font-bold text-slate-800 dark:text-white">
                      Click to choose photo or drag &amp; drop
                    </p>
                    <p className="text-[10px] text-slate-400 mt-0.5">
                      JPG, PNG, WEBP from your computer
                    </p>
                    <div className="mt-2.5 flex items-center justify-center gap-2" onClick={(e) => e.stopPropagation()}>
                      <button
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        className="rounded-lg bg-blue-600 px-3 py-1.5 text-[11px] font-bold text-white shadow-sm hover:bg-blue-700 transition"
                      >
                        Browse Computer
                      </button>
                      <button
                        type="button"
                        onClick={() => setFormData(prev => ({
                          ...prev,
                          photoUrl: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=500&auto=format&fit=crop&q=80',
                          photoName: 'sample-electrical-fault.jpg',
                          photoSize: '240 KB'
                        }))}
                        className="rounded-lg bg-slate-100 px-2.5 py-1.5 text-[11px] font-semibold text-slate-600 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300 transition"
                      >
                        Sample Photo
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Submit Buttons */}
              <div className="pt-2 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={handleResetAndClose}
                  className="rounded-2xl border border-slate-200 px-4 py-2.5 text-xs font-semibold text-slate-600 hover:bg-slate-50 dark:border-slate-700 dark:text-slate-400 dark:hover:bg-slate-800 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex items-center gap-2 rounded-2xl bg-gradient-to-r from-blue-600 via-sky-600 to-cyan-500 px-6 py-2.5 text-xs font-bold text-white shadow-lg shadow-blue-500/25 hover:opacity-95 transition disabled:opacity-50"
                >
                  <PlusCircle size={16} />
                  <span>{isSubmitting ? 'Logging Issue...' : 'Submit Maintenance Issue'}</span>
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
