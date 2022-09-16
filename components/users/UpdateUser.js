import { Fragment, useState } from "react";
import { toast } from "react-toastify";
import { useUpdateUserMutation } from "../../services/usersApi";

// Components
import { Dialog, Listbox, Transition } from "@headlessui/react";
import { RiArrowUpDownLine } from "react-icons/ri";
import { BiCheck } from "react-icons/bi";
import { ImCross } from "react-icons/im";

function UpdateUser({ user, className, children }) {
  const roleEnum = ["publisher", "user"];

  const [isOpen, setIsOpen] = useState(false);

  const [updateUser] = useUpdateUserMutation();

  const [inputs, setInputs] = useState({
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
  });

  const inputHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setInputs((prev) => {
      return { ...prev, [name]: value };
    });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const data = { name: inputs.name, email: inputs.email, role: inputs.role };

    const res = await updateUser({ data, id: inputs.id });

    if (res.error) {
      toast.error("user couldn't be edited!");
    } else {
      toast.success(`User ${inputs.name}, successfully edited.`);
    }
    setIsOpen(false);
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
          className="relative z-10 "
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

          <div className="fixed inset-0 overflow-y-auto mt-20">
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
                <Dialog.Panel className="w-full max-w-3xl transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <div className="flex items-center justify-between">
                    <Dialog.Title
                      as="h3"
                      className="text-lg font-medium leading-6 text-gray-900"
                    >
                      Edit User
                    </Dialog.Title>
                    <ImCross
                      className="text-red-600 hover:cursor-pointer"
                      onClick={() => setIsOpen(false)}
                    />
                  </div>
                  <form
                    onSubmit={submitHandler}
                    className="mt-4 flex flex-col gap-3"
                  >
                    <div className="flex flex-col gap-2">
                      <label className="font-medium" htmlFor="name">
                        Name*
                      </label>
                      <input
                        maxLength={50}
                        className="border-2 rounded p-2"
                        type="text"
                        name="name"
                        id="name"
                        onChange={inputHandler}
                        value={inputs.name}
                        required
                      />
                    </div>
                    <div className="flex flex-col gap-2">
                      <label className="font-medium" htmlFor="email">
                        Email*
                      </label>
                      <input
                        className="border-2 rounded p-2"
                        type="email"
                        name="email"
                        id="email"
                        placeholder="example@gmail.com"
                        pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
                        onChange={inputHandler}
                        value={inputs.email}
                        required
                      />
                    </div>
                    <Listbox
                      className="mt-5 mb-10"
                      value={inputs.role}
                      onChange={(e) => setInputs({ ...inputs, role: e })}
                    >
                      <div className="relative mt-1">
                        <Listbox.Button className="relative w-1/2 cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
                          <span className="block truncate">{inputs.role}</span>
                          <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                            <RiArrowUpDownLine
                              className="h-5 w-5 text-gray-400"
                              aria-hidden="true"
                            />
                          </span>
                        </Listbox.Button>
                        <Transition
                          as={Fragment}
                          leave="transition ease-in duration-100"
                          leaveFrom="opacity-100"
                          leaveTo="opacity-0"
                        >
                          <Listbox.Options className="absolute mt-1 max-h-60 w-1/2 overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                            {roleEnum.map((role, i) => (
                              <Listbox.Option
                                key={i}
                                className={({ active }) =>
                                  `relative cursor-default select-none py-2 pl-10 pr-4 ${
                                    active
                                      ? "bg-amber-100 text-amber-900"
                                      : "text-gray-900"
                                  }`
                                }
                                value={role}
                              >
                                {({ selected }) => (
                                  <>
                                    <span
                                      className={`block truncate ${
                                        selected ? "font-medium" : "font-normal"
                                      }`}
                                    >
                                      {role}
                                    </span>
                                    {selected ? (
                                      <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
                                        <BiCheck
                                          className="h-5 w-5"
                                          aria-hidden="true"
                                        />
                                      </span>
                                    ) : null}
                                  </>
                                )}
                              </Listbox.Option>
                            ))}
                          </Listbox.Options>
                        </Transition>
                      </div>
                    </Listbox>
                    <div className="mt-4">
                      <button className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2">
                        Save Changes
                      </button>
                    </div>
                  </form>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}

export default UpdateUser;
