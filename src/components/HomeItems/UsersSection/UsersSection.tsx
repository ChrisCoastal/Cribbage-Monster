import React from 'react';
import { AvatarSize } from 'src/@types';
import Avatar from 'src/components/Avatar/Avatar';

const UsersSection = () => {
  return (
    <section className="my-16">
      <div className="mx-auto flex items-center justify-center gap-4">
        <div className="inline-grid w-56 grid-cols-5 grid-rows-1">
          <Avatar
            className={`${AvatarSize.LG} col-span-2 col-start-1 row-start-1 border border-purple-500/60`}
            avatar="🦁"
          />
          <Avatar
            className={`${AvatarSize.LG} col-span-2 col-start-2 row-start-1 border border-purple-500/60`}
            avatar="🦑"
          />
          <Avatar
            className={`${AvatarSize.LG} col-span-2 col-start-3 row-start-1 border border-purple-500/60`}
            avatar="🧙‍♂️"
          />
          <Avatar
            className={`${AvatarSize.LG} col-span-2 col-start-4 row-start-1 border border-purple-500/60`}
            avatar="👩‍🎤"
          />
        </div>
        <h3 className="w-56 text-2xl font-semibold text-emerald-300 sm:w-64 sm:text-4xl">
          Play thousands of users online
        </h3>
      </div>
    </section>
  );
};

export default UsersSection;
