import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import 'animate.css';

const SuccessModal = ({ isOpen, onClose }) => {
  return (
    <div
      className={`${
        isOpen ? 'block' : 'hidden'
      } fixed z-10 inset-0 overflow-y-auto`}
    >
      <div className="flex items-center justify-center min-h-screen px-4 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity" aria-hidden="true">
          <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
        </div>
        <span
          className="hidden sm:inline-block sm:align-middle sm:h-screen"
          aria-hidden="true"
        >
          &#8203;
        </span>
        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full animate__animated animate__fadeInDown">
          <div className="bg-white px-6 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div className="sm:flex sm:items-start">
              <div className="text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                <h3
                  className="text-xl leading-6 font-medium text-gray-900"
                  id="modal-title"
                >
                  Success!
                </h3>
                <div className="mt-2">
                  <p className="text-sm text-gray-500">
                    Your purchase has been confirmed.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
            <button
              type="button"
              className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-500 text-base font-medium text-white hover:bg-blue-700 sm:ml-3 sm:w-auto sm:text-sm"
              onClick={onClose}
            >
              Close
              <FontAwesomeIcon icon={faCheckCircle} className="ml-2 mt-1" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SuccessModal;
