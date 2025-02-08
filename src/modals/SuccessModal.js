import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import "animate.css";

const SuccessModal = ({ isOpen, onClose }) => {
  return (
    <div
      className={`${
        isOpen ? "block" : "hidden"
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
              <div className="mt-3 w-full text-center sm:mt-0 sm:ml-4 sm:text-center">
                <h3 className="text-3xl leading-6 font-bold text-gray-900">
                  Success
                </h3>
                <div className="mt-8 flex flex-col items-center animate__animated animate__heartBeat">
                  <FontAwesomeIcon
                    icon={faCheckCircle}
                    className="text-green-500"
                    size="6x"
                  />
                </div>
                <p className="text-sm text-gray-500 mt-8">
                  Berhasil diperbarui.
                </p>
              </div>
            </div>
          </div>
          <div className="px-4 py-3 sm:px-6 flex justify-center">
            <button
              type="button"
              className="w-full sm:w-auto inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-green-500 text-base font-medium text-white hover:bg-green-700"
              onClick={onClose}
            >
              OK
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SuccessModal;
