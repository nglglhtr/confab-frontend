const Hero = ({
  title, type, proposer,
}: {
  title?: string,
  type?: string,
  proposer?:string
}) => {
  return (
    <div className="flex flex-col justify-items-start">
      <div
        className="
            font-secondary
            uppercase
            sm:text-lg text-base
            text-kernel
          "
      >
        {type}
      </div>
      <div className="
          font-heading
          font-bold
          sm:text-6xl text-4xl
          text-primary
          py-5
        ">
        {title}
      </div>
      {proposer &&
      <div className="font-secondary sm:text-xl text-lg">
        by&nbsp;{proposer}
      </div>}
    </div>
  );
};

export default Hero;
