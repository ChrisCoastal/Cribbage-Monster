import React, { FC } from 'react';
import { BadgeName } from 'src/@types';
import Badge from 'src/components/Badge/Badge';

type BadgesProps = {
  //
};

const Badges: FC<BadgesProps> = () => {
  const badgeNames: BadgeName[] = ['trophy', 'first', 'jack', 'five', 'star', 'suits'];
  const renderBadges = badgeNames.map((name) => (
    <div key={name} className="h-fit opacity-60">
      <Badge badge={name} height={'4rem'} width={'4rem'} color={'#333'}></Badge>
    </div>
  ));

  return (
    <div className="flex flex-col items-center">
      <div className="grid h-fit grid-cols-3 justify-items-center gap-1">{renderBadges}</div>
    </div>
  );
};

export default Badges;
