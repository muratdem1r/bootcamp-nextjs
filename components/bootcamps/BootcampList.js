// Components
import { InView } from "react-intersection-observer";
import BootcampItem from "./BootcampItem";

function BootcampList({ bootcamps, setParams, nextPage }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 my-5">
      {bootcamps.map((bootcamp, index) => {
        if (bootcamps.length - 1 === index) {
          return (
            <InView
              key={index}
              onChange={(inView, entry) => {
                if (inView && bootcamps.length >= 12) {
                  setParams((state) => ({ ...state, page: nextPage }));
                }
              }}
            >
              <BootcampItem bootcamp={bootcamp} setParams={setParams} />
            </InView>
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
