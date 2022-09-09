import BootcampHome from "../components/bootcamps/BootcampHome";

function HomePage() {
  return (
    <>
      <BootcampHome />
      <div className="my-20">
        <h1 className="gradient-text-purple font-bold text-2xl">
          What is a coding bootcamp?
        </h1>
        <p className="font-bold max-w-2xl leading-7 my-4">
          A coding bootcamp is a technical training program that teaches the
          programming skills that employers look for.
        </p>
        <p className="max-w-2xl leading-7 my-4">
          Coding bootcamps enable students with little coding proficiency to
          focus on the most important aspects of coding and immediately apply
          their new coding skills to solve real-world problems.
        </p>
        <p className="max-w-2xl leading-7 my-4">
          The goal of many coding bootcamp attendees is to transition into a
          career in web development. They do this by learning to build
          applications at a professional level - which provides the foundation
          they need to build production-ready applications and demonstrate they
          have the skills to add real value to a potential employer.
        </p>
      </div>
      <div className="my-20 md:text-right">
        <h1 className="gradient-text-purple font-bold text-2xl">
          Why Coding Bootcamps Are Important?
        </h1>
        <p className="font-bold max-w-2xl leading-7 my-4 ml-auto">
          We live in a world where technology is continuing to evolve.
          Technology is drastically changing how we do everything in our lives.
          It’s more common than ever to get around using Uber or Lyft,
          technology driven transportation companies. Companies like Apple,
          Square and PayPal are changing how we pay for things. It seems every
          industry is being radically impacted by how technology is shaping the
          world around us.
        </p>
        <p className="max-w-2xl leading-7 my-4 ml-auto">
          Software is taking over the world. This shift changes how we live our
          lives, but also requires employees with software engineering skills
          capable of building the technology that we all use.
        </p>
        <p className="max-w-2xl leading-7 my-4 ml-auto">
          Attending a coding bootcamp is a viable path to transition into a
          career in web development as an alternative (or supplement) to
          graduating with a 4 year degree in Computer Science to helping fill
          the need of skilled software engineers in industry.
        </p>
      </div>
    </>
  );
}

export default HomePage;
