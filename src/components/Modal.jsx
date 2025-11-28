import { Dialog } from '@headlessui/react';
import React from 'react';

export default function Modal({ isOpen, onClose, title, children }) {
  return (
    <Dialog open={isOpen} onClose={onClose} className="fixed z-50 inset-0 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4">
        <Dialog.Overlay className="fixed inset-0 bg-black opacity-30" />
        <div className="bg-white dark:bg-gray-800 rounded max-w-lg mx-auto p-6 z-10">
          {title && <Dialog.Title className="text-lg font-semibold mb-2">{title}</Dialog.Title>}
          <div>{children}</div>
        </div>
      </div>
    </Dialog>
  );
}
