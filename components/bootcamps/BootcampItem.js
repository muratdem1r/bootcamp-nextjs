import { useRouter } from "next/router";

function BootcampItem(props) {
  const router = useRouter();

  const showDetailsHandler = () => {
    router.push("/bootcamps/" + props.id);
  };

  return (
    <>
      <div>{props.id} item</div>
      <button onClick={showDetailsHandler}>Show details</button>
    </>
  );
}

export default BootcampItem;
