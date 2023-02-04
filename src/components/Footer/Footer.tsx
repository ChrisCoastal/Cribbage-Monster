import React from 'react';
import gitHubLogo from 'src/assets/logo/github-mark-white.png';

const Footer = () => {
  return (
    <section className="z-10 flex w-full items-center justify-between bg-black/20 px-4 py-10 text-xs text-stone-50 sm:px-8 sm:text-sm">
      <div className=" w-40 sm:w-auto">
        <p className="mb-1">Inspired by generations of ♥︎♥︎♥︎ for cribbage.</p>
      </div>
      <a
        className="flex items-center gap-2"
        href="https://github.com/ChrisCoastal"
        target="_blank"
        rel="noreferrer">
        <img src={gitHubLogo} alt="GitHub logo" className="h-6 w-6" />
        <p>ChrisCoastal</p>
      </a>
    </section>
  );
};

export default Footer;
