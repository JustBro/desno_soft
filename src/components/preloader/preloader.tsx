import '@/components/preloader/preloader.scss';

export const Preloader = () => {
  return (
    <div className="preloader">
      <div className="preloader__container">
        <div className='preloader__wrapper'>
          <img
            className="preloader__bg"
            src="/images/preloader-bg.gif"
            alt="preloader"
          />
          <img
            className="preloader__dots"
            src="/images/preloader.svg"
            alt="preloader"
          />
        </div>
      </div>
    </div>
  );
};
