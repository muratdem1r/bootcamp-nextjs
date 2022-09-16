import { Fragment, useState } from "react";
import {
  useUpdateBootcampMutation,
  useUploadBootcampPhotoMutation,
} from "../../services/bootcampsApi";
import { toast } from "react-toastify";
import formatPhoneNumber from "../../helpers/formatPhoneNumber";

// Components
import { ImCross } from "react-icons/im";
import { Dialog, Switch, Transition } from "@headlessui/react";

function UpdateBootcamp({ bootcamp, setPage, className, children }) {
  const [isOpen, setIsOpen] = useState(false);
  const careerEnum = [
    "Web Development",
    "Mobile Development",
    "UI/UX",
    "Data Science",
    "Business",
    "Other",
  ];

  const [image, setImage] = useState(null);
  const [imageURL, setImageURL] = useState(bootcamp.photo);

  const [updateBootcamp] = useUpdateBootcampMutation();
  const [uploadImage] = useUploadBootcampPhotoMutation();

  const [inputs, setInputs] = useState({
    name: bootcamp.name,
    description: bootcamp.description,
    website: bootcamp.website,
    phone: bootcamp.phone,
    email: bootcamp.email,
    address: bootcamp.address,
    careers: bootcamp.careers,
    housing: bootcamp.housing,
    jobAssistance: bootcamp.jobAssistance,
    jobGuarantee: bootcamp.jobGuarantee,
    acceptGi: bootcamp.acceptGi,
  });

  const imageChangeHandler = (e) => {
    if (e.target.files && e.target.files[0]) {
      const img = e.target.files[0];
      setImage(img);
      setImageURL(URL.createObjectURL(img));
    }
  };

  const inputHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setInputs((prev) => {
      return { ...prev, [name]: value };
    });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    if (image) {
      const body = new FormData();
      body.append("file", image);

      const resImageUpload = await uploadImage({
        photo: body,
        id: bootcamp.id,
      });

      if (resImageUpload?.error) {
        toast.error(resImageUpload?.error?.data?.error);
        return;
      }
    }
    const res = await updateBootcamp({ data: { ...inputs }, id: bootcamp.id });

    if (res?.error) {
      if (res?.error?.data?.error === "Duplicate field value entered") {
        toast.error("There is a bootcamp by this name");
      } else if (res?.error?.status === 403) {
        toast.error("You are not allowed to do this");
      } else {
        toast.error("You have already published a bootcamp");
      }
    } else {
      if (setPage) {
        setPage(1);
      }
      setIsOpen(false);
      toast.success("Bootcamp updated.");
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
                      Edit bootcamp
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
                                inputs.careers?.includes(career)
                                  ? "bg-slate-500 text-white"
                                  : "bg-slate-50"
                              }`}
                              key={career}
                              onClick={() => {
                                if (inputs.careers?.includes(career)) {
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
                    <img className="h-[320px] object-contain" src={imageURL} />
                    <input
                      type="file"
                      name="image"
                      accept="image/*"
                      onChange={imageChangeHandler}
                    />
                    <div className="mt-4 flex justify-between">
                      <button
                        type="submit"
                        className="rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      >
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

export default UpdateBootcamp;
