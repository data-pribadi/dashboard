import React, { useState } from 'react';
import axios from 'axios';
import 'animate.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart, faSpinner } from '@fortawesome/free-solid-svg-icons';
import SuccessModal from './SuccessModal';

const PurchaseModal = ({ isOpen, toggle, item, onPurchase, onSuccess }) => {
  const [successModalOpen, setSuccessModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handlePurchase = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const itemData = {
        id: item?.[0],
        username: item?.[1],
        password: item?.[2],
        harga: item?.[3],
        rowIndex: item?.rowIndex,
      };

      const response = await axios.post(
        'http://localhost:5000/api/update-sheet',
        { item: itemData }
      );
      if (response.data.success) {
        onPurchase(item);
        setSuccessModalOpen(true);
        onSuccess();
      } else {
        console.error('Error updating Google Sheet');
        setError('Error updating Google Sheet');
      }
    } catch (error) {
      console.error('Error during purchase:', error);
      setError('Error during purchase');
    }
    setIsLoading(false);
    toggle();
  };

  const closeSuccessModal = () => {
    setSuccessModalOpen(false);
    onSuccess();
  };

  return (
    <>
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
                <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                  <h3
                    className="text-xl leading-6 font-medium text-gray-900"
                    id="modal-title"
                  >
                    Purchase Item
                  </h3>
                  <div className="mt-4">
                    <form className="space-y-4 w-full">
                      <div className="flex items-center">
                        <label
                          htmlFor="itemId"
                          className="block text-sm font-medium text-gray-700 w-1/3"
                        >
                          ID
                        </label>
                        <input
                          type="text"
                          id="itemId"
                          className="mt-1 block w-2/3 border border-gray-300 rounded-md shadow-sm p-2"
                          value={item?.[0] || ''}
                          readOnly
                        />
                      </div>
                      <div className="flex items-center">
                        <label
                          htmlFor="itemName"
                          className="block text-sm font-medium text-gray-700 w-1/3"
                        >
                          USERNAME
                        </label>
                        <input
                          type="text"
                          id="itemName"
                          className="mt-1 block w-2/3 border border-gray-300 rounded-md shadow-sm p-2"
                          value={item?.[1] || ''}
                          readOnly
                        />
                      </div>
                      <div className="flex items-center">
                        <label
                          htmlFor="itemPassword"
                          className="block text-sm font-medium text-gray-700 w-1/3"
                        >
                          PASSWORD
                        </label>
                        <input
                          type="text"
                          id="itemPassword"
                          className="mt-1 block w-2/3 border border-gray-300 rounded-md shadow-sm p-2"
                          value={item?.[2] || ''}
                          readOnly
                        />
                      </div>
                      <div className="flex items-center">
                        <label
                          htmlFor="itemPrice"
                          className="block text-sm font-medium text-gray-700 w-1/3"
                        >
                          HARGA
                        </label>
                        <input
                          type="text"
                          id="itemPrice"
                          className="mt-1 block w-2/3 border border-gray-300 rounded-md shadow-sm p-2"
                          value={item?.[3] || ''}
                          readOnly
                        />
                      </div>
                    </form>
                    {error && <p className="text-red-500 mt-2">{error}</p>}
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
              <button
                type="button"
                className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-500 text-base font-medium text-white hover:bg-blue-700 sm:ml-3 sm:w-auto sm:text-sm"
                onClick={handlePurchase}
                disabled={isLoading}
              >
                <FontAwesomeIcon icon={faShoppingCart} className="mr-2 mt-1" />
                Purchase
                {isLoading && (
                  <FontAwesomeIcon
                    icon={faSpinner}
                    className="animate-spin ml-2 mt-1"
                  />
                )}
              </button>
              <button
                type="button"
                className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                onClick={toggle}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
      <SuccessModal isOpen={successModalOpen} onClose={closeSuccessModal} />
    </>
  );
};

export default PurchaseModal;
