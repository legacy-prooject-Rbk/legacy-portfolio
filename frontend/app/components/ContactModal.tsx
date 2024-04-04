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
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white rounded-lg shadow-lg p-5 max-w-sm w-full">
        <div className="modal-header flex justify-between items-center">
          <h5 className="modal-title font-bold text-lg">Add {platform.name}</h5>
          <button type="button" className="text-gray-500 hover:text-gray-600" onClick={onClose}>
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div className="modal-body text-center">
          <img src={`http://127.0.0.1:3000/socials/${platform.icon}`} alt={platform.name} className="rounded-full w-16 h-16 mb-4"/>
          <input
            value={value}
            onChange={e => setValue(e.target.value)}
            className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-orange-500 focus:outline-none"
            placeholder={`Enter ${platform.name} link`}
            type="text"
          />
        </div>
        <div className="modal-footer flex justify-end gap-2 mt-4">
          <button type="button" className="btn hover:bg-orange-700 text-white font-bold py-2 px-4 rounded shadow" style={{ backgroundColor: 'orange' }} onClick={onClose}>
            Close
          </button>
          <button type="button" className="btn bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded shadow" onClick={handleSaveChanges}>
            Save changes
          </button>
        </div>
      </div>
    </div>
  );
};


export default ContactModal;
