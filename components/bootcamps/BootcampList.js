// Components
import { InView } from "react-intersection-observer";
import BootcampItem from "./BootcampItem";
import { BiFileFind } from "react-icons/bi";

function BootcampList({ bootcamps, setParams, nextPage }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
      {bootcamps.length === 0 && (
        <p className="flex items-center">
          <BiFileFind className="text-2xl" />
          No results found.
        </p>
      )}
      {bootcamps.map((bootcamp, index) => {
        if (bootcamps.length - 1 === index) {
          return (
            <InView
              as={BootcampItem}
              bootcamp={bootcamp}
              setParams={setParams}
              key={index}
              onChange={(inView, entry) => {
                if (inView && bootcamps.length >= 12) {
                  setParams((state) => ({ ...state, page: nextPage }));
                }
              }}
            ></InView>
          );
        }
        return (
          <BootcampItem key={index} bootcamp={bootcamp} setParams={setParams} />
        );
      })}
    </div>
  );
}

export default BootcampList;
