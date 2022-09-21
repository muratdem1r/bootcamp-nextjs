import { Fragment, useState } from "react";
import { useNewBootcampMutation } from "../../services/bootcampsApi";
import { toast } from "react-toastify";
import formatPhoneNumber from "../../helpers/formatPhoneNumber";

// Components
import { FiPlus } from "react-icons/fi";
import { ImCross } from "react-icons/im";
import { Dialog, Switch, Transition } from "@headlessui/react";
import Button from "../../components/ui/Button";

function CreateBootcamp({ setParams }) {
  const careerEnum = [
    "Web Development",
    "Mobile Development",
    "UI/UX",
    "Data Science",
    "Business",
    "Other",
  ];

  const [isOpen, setIsOpen] = useState(false);
  const [createBootcamp] = useNewBootcampMutation();

  const [inputs, setInputs] = useState({
    name: "",
    description: "",
    website: "",
    phone: "",
    email: "",
    address: "",
    careers: [],
    housing: false,
    jobAssistance: false,
    jobGuarantee: false,
    acceptGi: false,
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
    const res = await createBootcamp({ ...inputs });
    if (res.error) {
      if (res.error.data.error === "Duplicate field value entered") {
        toast.error("There is a bootcamp by this name");
      } else if (res.error.status === 403) {
        toast.error("You are not allowed to do this");
      } else {
        toast.error("You have already published a bootcamp");
      }
    } else {
      if (setParams) {
        setParams((state) => ({ ...state, page: 1 }));
      }
      setIsOpen(false);
      toast.success("Bootcamp added.");
    }
  };

  return (
    <>
      <Button
        className="bg-custom-orange p-2 font-medium mb-5"
        onClick={() => setIsOpen(true)}
      >
        Create New Bootcamp <FiPlus className="inline" />
      </Button>

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
                      Create a new bootcamp
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
                        placeholder="Devcentral Bootcamp"
                        onChange={inputHandler}
                        value={inputs.name}
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
                        placeholder="Is coding your passion? Codemasters will give you the skills and the tools to become the best developer possible. We specialize in front end and full stack web development"
                        rows={5}
                        onChange={inputHandler}
                        value={inputs.description}
                        required
                      />
                    </div>
                    <div className="flex flex-col gap-2">
                      <label className="font-medium" htmlFor="address">
                        Address*
                      </label>
                      <input
                        className="border-2 rounded p-2"
                        type="text"
                        name="address"
                        id="address"
                        placeholder="45 Upper College Rd Kingston RI 02881"
                        onChange={inputHandler}
                        value={inputs.address}
                        required
                      />
                    </div>
                    <div className="flex flex-col gap-2">
                      <label className="font-medium" htmlFor="email">
                        Email
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
                      />
                    </div>
                    <div className="flex flex-col gap-2">
                      <label className="font-medium" htmlFor="phone">
                        Phone
                      </label>
                      <input
                        className="border-2 rounded p-2"
                        type="tel"
                        name="phone"
                        id="phone"
                        pattern="\([0-9]{3}\) [0-9]{3}-[0-9]{4}"
                        placeholder="(444) 444-4444"
                        onChange={(e) => {
                          setInputs({
                            ...inputs,
                            phone: formatPhoneNumber(e.target.value),
                          });
                        }}
                        value={inputs.phone}
                      />
                    </div>
                    <div className="flex flex-col gap-2">
                      <label className="font-medium" htmlFor="website">
                        Website
                      </label>
                      <input
                        className="border-2 rounded p-2"
                        type="url"
                        name="website"
                        placeholder="https://www.example.com"
                        pattern="https?://.*"
                        id="website"
                        onChange={inputHandler}
                        value={inputs.website}
                      />
                    </div>
                    <div className="flex flex-col gap-2">
                      <label className="font-medium" htmlFor="housing">
                        Housing
                      </label>
                      <Switch
                        checked={inputs.housing}
                        name="housing"
                        onChange={() =>
                          setInputs({ ...inputs, housing: !inputs.housing })
                        }
                        className={`${
                          inputs.housing ? "bg-blue-600" : "bg-gray-200"
                        } relative inline-flex h-6 w-11 items-center rounded-full`}
                      >
                        <span
                          className={`${
                            inputs.housing ? "translate-x-6" : "translate-x-1"
                          } inline-block h-4 w-4 transform rounded-full bg-white transition`}
                        />
                      </Switch>
                    </div>
                    <div className="flex flex-col gap-2">
                      <label className="font-medium" htmlFor="jobAssistance">
                        Job Assistance
                      </label>
                      <Switch
                        checked={inputs.jobAssistance}
                        name="jobAssistance"
                        onChange={() =>
                          setInputs({
                            ...inputs,
                            jobAssistance: !inputs.jobAssistance,
                          })
                        }
                        className={`${
                          inputs.jobAssistance ? "bg-blue-600" : "bg-gray-200"
                        } relative inline-flex h-6 w-11 items-center rounded-full`}
                      >
                        <span
                          className={`${
                            inputs.jobAssistance
                              ? "translate-x-6"
                              : "translate-x-1"
                          } inline-block h-4 w-4 transform rounded-full bg-white transition`}
                        />
                      </Switch>
                    </div>
                    <div className="flex flex-col gap-2">
                      <label className="font-medium" htmlFor="jobGuarantee">
                        Job Guarantee
                      </label>
                      <Switch
                        checked={inputs.jobGuarantee}
                        name="jobGuarantee"
                        onChange={() =>
                          setInputs({
                            ...inputs,
                            jobGuarantee: !inputs.jobGuarantee,
                          })
                        }
                        className={`${
                          inputs.jobGuarantee ? "bg-blue-600" : "bg-gray-200"
                        } relative inline-flex h-6 w-11 items-center rounded-full`}
                      >
                        <span
                          className={`${
                            inputs.jobGuarantee
                              ? "translate-x-6"
                              : "translate-x-1"
                          } inline-block h-4 w-4 transform rounded-full bg-white transition`}
                        />
                      </Switch>
                    </div>
                    <div className="flex flex-col gap-2">
                      <label className="font-medium" htmlFor="acceptGi">
                        Accept Gi
                      </label>
                      <Switch
                        checked={inputs.acceptGi}
                        name="acceptGi"
                        onChange={() =>
                          setInputs({ ...inputs, acceptGi: !inputs.acceptGi })
                        }
                        className={`${
                          inputs.acceptGi ? "bg-blue-600" : "bg-gray-200"
                        } relative inline-flex h-6 w-11 items-center rounded-full`}
                      >
                        <span
                          className={`${
                            inputs.acceptGi ? "translate-x-6" : "translate-x-1"
                          } inline-block h-4 w-4 transform rounded-full bg-white transition`}
                        />
                      </Switch>

                      <ul className="flex gap-1 flex-wrap mt-3">
                        {careerEnum.map((career) => {
                          return (
                            <li
                              className={`transition-colors hover:cursor-pointer p-2 ${
                                inputs.careers.includes(career)
                                  ? "bg-slate-500 text-white"
                                  : "bg-slate-50"
                              }`}
                              key={career}
                              onClick={() => {
                                if (inputs.careers.includes(career)) {
                                  setInputs({
                                    ...inputs,
                                    careers: inputs.careers.filter(
                                      (inputCareer) => {
                                        return inputCareer !== career;
                                      }
                                    ),
                                  });
                                } else {
                                  setInputs({
                                    ...inputs,
                                    careers: [...inputs.careers, career],
                                  });
                                }
                              }}
                            >
                              {career}
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                    <div className="mt-4">
                      <button className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2">
                        Create Bootcamp
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

export default CreateBootcamp;
