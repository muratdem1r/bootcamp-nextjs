// Components
import { InView } from "react-intersection-observer";
import BootcampItem from "./BootcampItem";

function BootcampList({ bootcamps, setPage, nextPage }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 my-5">
      {bootcamps.map((bootcamp, index) => {
        if (bootcamps.length - 1 === index) {
          return (
            <InView
              key={index}
              onChange={(inView, entry) => {
                if (inView) {
                  setPage(nextPage);
                }
              }}
            >
              <BootcampItem bootcamp={bootcamp} setPage={setPage} />
            </InView>
          );
        }
        return (
          <BootcampItem key={index} bootcamp={bootcamp} setPage={setPage} />
        );
      })}
    </div>
  );
}

export default BootcampList;
