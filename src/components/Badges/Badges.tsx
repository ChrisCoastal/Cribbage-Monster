import React, { FC } from 'react';
import { BadgeName } from 'src/@types';
import Badge from 'src/components/UI/badges/Badge/Badge';

type BadgesProps = {
  //
};

const Badges: FC<BadgesProps> = () => {
  const badgeNames: BadgeName[] = ['trophy', 'first', 'jack', 'five', 'star', 'suits'];
  const renderBadges = badgeNames.map((name) => (
    <div key={name} className=" rounded-full">
      <Badge badge={name} height={'4rem'} width={'4rem'}></Badge>
    </div>
  ));

  return <div className="grid grid-cols-3 justify-items-center gap-1">{renderBadges}</div>;
};

export default Badges;
