// domain.com/bootcamps/bootcampId

import { useRouter } from "next/router";

function BootcampDetailPage() {
  const router = useRouter();

  const bootcampId = router.query.bootcampId;

  return (
    <h1 className="text-3xl font-bold underline text-center">
      Bootcamp singular! {bootcampId}
    </h1>
  );
}

export default BootcampDetailPage;
