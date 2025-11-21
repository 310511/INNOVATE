// components/NewPitchModal.tsx
import { useState, useEffect, useRef } from "react";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

const HOST = import.meta.env.VITE_HOST;

interface NewPitchFormData {
  organizationName: string;
  industryType: string;
  websiteUrl: string;
}

interface NewPitchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: ( NewPitchFormData:NewPitchFormData) => void;
}

const NewPitchModal = ({ isOpen, onClose, onSubmit }: NewPitchModalProps) => {
  const navigate=useNavigate()

  const [formData, setFormData] = useState<NewPitchFormData>({
    organizationName: "",
    industryType: "",
    websiteUrl: "",
  });
 const [startupName, setStartupName] = useState("");
const [industry, setIndustry] = useState("");
const [website, setWebsite] = useState("");

  const [uploadingStartup, setUploadingStartup] = useState(false)

  const [errors, setErrors] = useState<Partial<NewPitchFormData>>({});
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      setStartupName("");
      setIndustry("");
      setWebsite("");
    }
  }, [isOpen]);

   // ESCAPE TO CLOSE
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      return () => document.removeEventListener("keydown", handleEscape);
    }
  }, [isOpen, onClose]);

  // CLICK OUTSIDE TO CLOSE
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        onClose();
      }
    };
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      return () => document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [isOpen, onClose]);

  const validate = () => {
    if (!startupName.trim()) {
      toast.error("Startup name is required");
      return false;
    }
    if (!industry.trim()) {
      toast.error("Industry is required");
      return false;
    }
    if (!website.trim()) {
      toast.error("Website URL is required");
      return false;
    }
    return true;
  };

  const createStartup = async () => { 
     if (!validate()) return;

  try {
    setUploadingStartup(true)
    const user_id = localStorage.getItem("usr");
    if (!user_id) {
      alert("User not logged in");
      return;
    }

    const payload = {
      user_id,
      org_name: startupName,
      industry_type: industry,
      website_url: website
    };

    const res = await fetch(`${HOST}/startup/create`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });

    const data = await res.json();

    if (!res.ok) {
      toast.error(data.error || "Failed to create startup");
      setUploadingStartup(false);
      return;
    }

     toast.success("You may proceed!");
    navigate("/dashboard/videocall")
    
  

  } catch (error) {
    console.error("Error creating startup:", error);
    toast.error("Something went wrong");
  }finally {
    setUploadingStartup(false);  
  }
};

  useEffect(() => {
    if (isOpen) {
      setFormData({ organizationName: "", industryType: "", websiteUrl: "" });
      setErrors({});
    }
  }, [isOpen]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      return () => document.removeEventListener("keydown", handleEscape);
    }
  }, [isOpen, onClose]);


  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        onClose();
      }
    };
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      return () => document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [isOpen, onClose]);

 

  

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      // Normalize URL
      let url = formData.websiteUrl.trim();
      if (!url.startsWith("http")) url = `https://${url}`;
      onSubmit({ ...formData, websiteUrl: url });
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div
        ref={modalRef}
        className="w-full max-w-md bg-slate-800 rounded-xl border border-slate-700 overflow-hidden shadow-2xl"
      >
        {/* Header */}
        <div className="bg-slate-700 px-6 py-4 flex items-center justify-between">
          <h3 className="text-lg font-bold text-white">Create New Pitch</h3>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white"
            aria-label="Close modal"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {/* Organization Name */}
          <div>
            <label
              htmlFor="organizationName"
              className="block text-sm font-medium text-slate-300 mb-1"
            >
              Organization Name *
            </label>
            <input
              type="text"
              id="organizationName"
              name="organizationName"
              value={startupName}
              onChange={(e) => setStartupName(e.target.value)}
              className={`w-full px-3 py-2 bg-slate-700 border rounded-md text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 ${
                errors.organizationName ? "border-red-500" : "border-slate-600"
              }`}
              placeholder="e.g., EcoBloom Sustainable Tech"
            />
            {errors.organizationName && (
              <p className="mt-1 text-sm text-red-400">{errors.organizationName}</p>
            )}
          </div>

          {/* Industry Type */}
          <div>
            <label
              htmlFor="industryType"
              className="block text-sm font-medium text-slate-300 mb-1"
            >
              Industry Type *
            </label>
            <select
              id="industryType"
              name="industryType"
              value={industry}
              onChange={(e) => setIndustry(e.target.value)}
              className={`w-full px-3 py-2 bg-slate-700 border rounded-md text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 ${
                errors.industryType ? "border-red-500" : "border-slate-600"
              }`}
            >
              <option value="">Select an industry</option>
              <option value="cleantech">CleanTech / Sustainability</option>
              <option value="healthtech">HealthTech</option>
              <option value="fintech">FinTech</option>
              <option value="edtech">EdTech</option>
              <option value="ai">Artificial Intelligence</option>
              <option value="other">Other</option>
            </select>
            {errors.industryType && (
              <p className="mt-1 text-sm text-red-400">{errors.industryType}</p>
            )}
          </div>

          {/* Website URL */}
          <div>
            <label
              htmlFor="websiteUrl"
              className="block text-sm font-medium text-slate-300 mb-1"
            >
              Website URL *
            </label>
            <input
              type="text"
              id="websiteUrl"
              name="websiteUrl"
              value={website}
              onChange={(e) => setWebsite(e.target.value)}
              className={`w-full px-3 py-2 bg-slate-700 border rounded-md text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 ${
                errors.websiteUrl ? "border-red-500" : "border-slate-600"
              }`}
              placeholder="e.g., ecobloom.com"
            />
            {errors.websiteUrl && (
              <p className="mt-1 text-sm text-red-400">{errors.websiteUrl}</p>
            )}
          </div>

          {/* Actions */}
          <div className="flex justify-end space-x-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-slate-300 hover:text-white hover:bg-slate-700 rounded-md transition-colors"
            >
              Cancel
            </button>
             <button
              onClick={createStartup}
              disabled={uploadingStartup}
              className={`px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-sm rounded-md flex items-center justify-center space-x-2 ${
                uploadingStartup ? "opacity-70 cursor-not-allowed" : ""
              }`}
            >
              {uploadingStartup ? (
                <div className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full"></div>
              ) : (
                <span>Create Pitch</span>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewPitchModal;