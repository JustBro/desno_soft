'use client'

import '@/app/404/error-page.scss';

export default function ErrorPage() {
  return (
    <section className="error-page">
      <video
        className="error-page__bg"
        src="/images/bg-error.mp4"
        autoPlay
        loop
        muted
      ></video>
      <div className="error-page__content">
        <img src="/images/error.png" alt="Грустный человечек" />
        {/* <span className='error-page__text'>Ошибочка вышла, нет страницы ...</span> */}
      </div>
    </section>
  );
}
