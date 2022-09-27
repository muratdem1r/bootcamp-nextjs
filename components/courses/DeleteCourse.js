import { Fragment, useState } from "react";

import { toast } from "react-toastify";
import { useDeleteCourseMutation } from "../../services/coursesApi";

// Components
import { Dialog, Transition } from "@headlessui/react";
import { useRouter } from "next/router";

function DeleteCourse({ course, setPage, returnHome, className, children }) {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [deleteCourse] = useDeleteCourseMutation();

  const confirmDeleteHandler = async () => {
    const res = await deleteCourse(course._id);
    if (res.error) {
      toast.error("course couldn't be deleted!");
    } else {
      if (returnHome === true) {
        router.push("/");
      }
      if (setPage) {
        setPage(1);
      }
      toast.success(`course ${course.title}, successfully deleted.`);
    }
  };

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className={className}
      >
        {children}
      </button>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10"
          onClose={() => setIsOpen(false)}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    Are you sure?
                  </Dialog.Title>
                  <div className="mt-2">
                    <p className="text-sm text-gray-500">
                      Do you want to delete &quot;{course.title}&quot; ?
                    </p>
                  </div>

                  <div className="mt-4 flex gap-2">
                    <button
                      type="button"
                      className="rounded-md  bg-red-100 px-4 py-2 text-sm font-medium text-red-900 hover:bg-red-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2"
                      onClick={() => {
                        confirmDeleteHandler();
                        setIsOpen(false);
                      }}
                    >
                      Yes, Delete it!
                    </button>
                    <button
                      type="button"
                      className="rounded-md  bg-green-100 px-4 py-2 text-sm font-medium text-green-900 hover:bg-green-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-offset-2"
                      onClick={() => setIsOpen(false)}
                    >
                      No, thanks
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}

export default DeleteCourse;
