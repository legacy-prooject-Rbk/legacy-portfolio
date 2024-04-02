import React, { useState } from "react";

type Contact = {
  id: number;
  name: string;
  icon: string;
  link: string;
};

type ContactModalProps = {
  platform: Contact;
  submitContact: (contactId: number, value: string) => void;
  onClose: () => void; // Function to close the modal
};

const ContactModal: React.FC<ContactModalProps> = ({ platform, submitContact, onClose }) => {
  const [value, setValue] = useState<string>("");

  const handleSaveChanges = () => {
    submitContact(platform.id, value);
    setValue(""); // Reset the input field
    onClose(); // Close the modal
  };

  return (
    <div className="modal fade show d-block" tabIndex="-1" role="dialog" style={{ backgroundColor: "rgba(0,0,0,0.5)" }}>
      <div className="modal-dialog modal-sm" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Add {platform.name}</h5>
            <button type="button" className="btn-close" onClick={onClose} aria-label="Close"></button>
          </div>
          <div className="modal-body mx-auto" style={{ maxWidth: '120px' }}>
            <div className="wizard-social mx-auto" >
              <img src={`http://127.0.0.1:3000/socials/${platform.icon}`} alt={platform.name} />
            </div>
            <input
              value={value}
              onChange={e => setValue(e.target.value)}
              className="form-control w-auto mt-2"
              placeholder={platform.name}
              type="text"
            />
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-outline-secondary" onClick={onClose}>Close</button>
            <button type="button" className="btn btn-primary" onClick={handleSaveChanges}>         Save changes</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactModal;
