import { Fragment, useState } from "react";
import { useNewCourseMutation } from "../../services/coursesApi";
import { toast } from "react-toastify";
import formatPhoneNumber from "../../helpers/formatPhoneNumber";

// Components
import { FiPlus } from "react-icons/fi";
import { ImCross } from "react-icons/im";
import { RiArrowUpDownLine } from "react-icons/ri";
import { BiCheck } from "react-icons/bi";
import { Dialog, Listbox, Switch, Transition } from "@headlessui/react";
import Button from "../../components/ui/Button";

function CreateCourse({ bootcamp }) {
  const skillsEnum = ["beginner", "intermediate", "advanced"];

  const [isOpen, setIsOpen] = useState(false);
  const [createCourse] = useNewCourseMutation();

  const [inputs, setInputs] = useState({
    title: "",
    description: "",
    weeks: "",
    tuition: 0,
    minimumSkill: "beginner",
    scholarshipAvailable: false,
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
    const res = await createCourse({ data: inputs, id: bootcamp.id });
    if (res.error) {
      toast.error(res.error.data.error);
    } else {
      setIsOpen(false);
      toast.success("New course added.");
    }
  };

  return (
    <>
      <button
        className="flex items-center gap-1 border border-slate-500 p-1 text-slate-800 hover:-translate-y-1 hover:shadow-[3px_3px_0_0] hover:shadow-black hover:cursor-pointer"
        onClick={() => setIsOpen(true)}
      >
        New Course <FiPlus className="inline" />
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
                      Create a new course for "{bootcamp.name}" bootcamp
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
                        name="title"
                        id="title"
                        placeholder="Full Stack Web Development"
                        onChange={inputHandler}
                        value={inputs.title}
                        required
                      />
                    </div>
                    <div className="flex flex-col gap-2">
                      <label className="font-medium" htmlFor="description">
                        Description*
                      </label>
                      <textarea
                        maxLength={500}
                        className="border-2 rounded p-2"
                        name="description"
                        id="description"
                        placeholder="In this course you will learn full stack web development, first learning all about the frontend with HTML/CSS/JS/Vue and then the backend with Node.js/Express/MongoDB"
                        rows={5}
                        onChange={inputHandler}
                        value={inputs.description}
                        required
                      />
                    </div>
                    <div className="flex flex-col gap-2">
                      <label className="font-medium" htmlFor="weeks">
                        Weeks*
                      </label>
                      <input
                        className="border-2 rounded p-2"
                        type="text"
                        name="weeks"
                        id="weeks"
                        placeholder="12"
                        onChange={inputHandler}
                        value={inputs.weeks}
                        required
                      />
                    </div>
                    <div className="flex flex-col gap-2">
                      <label className="font-medium" htmlFor="tuition">
                        Tuition*
                      </label>
                      <input
                        className="border-2 rounded p-2"
                        type="number"
                        name="tuition"
                        id="tuition"
                        placeholder="5000"
                        onChange={inputHandler}
                        value={inputs.tuition}
                        required
                      />
                    </div>
                    <div className="flex flex-col gap-2 mt-5">
                      <label
                        className="font-medium"
                        htmlFor="scholarhipsAvailable"
                      >
                        Scholarhip
                      </label>
                      <Switch
                        checked={inputs.scholarshipAvailable}
                        name="housing"
                        onChange={() =>
                          setInputs({
                            ...inputs,
                            scholarshipAvailable: !inputs.scholarshipAvailable,
                          })
                        }
                        className={`${
                          inputs.scholarshipAvailable
                            ? "bg-blue-600"
                            : "bg-gray-200"
                        } relative inline-flex h-6 w-11 items-center rounded-full`}
                      >
                        <span
                          className={`${
                            inputs.scholarshipAvailable
                              ? "translate-x-6"
                              : "translate-x-1"
                          } inline-block h-4 w-4 transform rounded-full bg-white transition`}
                        />
                      </Switch>
                    </div>
                    <label className="font-medium mt-5">Minimum Skill</label>
                    <Listbox
                      className="mb-10"
                      value={inputs.minimumSkill}
                      onChange={(e) =>
                        setInputs({ ...inputs, minimumSkill: e })
                      }
                    >
                      <div className="relative mt-1">
                        <Listbox.Button className="relative w-1/2 cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
                          <span className="block truncate">
                            {inputs.minimumSkill}
                          </span>
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
                            {skillsEnum.map((skill, i) => (
                              <Listbox.Option
                                key={i}
                                className={({ active }) =>
                                  `relative cursor-default select-none py-2 pl-10 pr-4 ${
                                    active
                                      ? "bg-amber-100 text-amber-900"
                                      : "text-gray-900"
                                  }`
                                }
                                value={skill}
                              >
                                {({ selected }) => (
                                  <>
                                    <span
                                      className={`block truncate ${
                                        selected ? "font-medium" : "font-normal"
                                      }`}
                                    >
                                      {skill}
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
                        Create Course
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

export default CreateCourse;
