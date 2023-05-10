import React, { useEffect, useState } from 'react';
import FIFAData from '../../../../Services/FifaData';
import { PlayerImgProps } from '../../../../types/props';
import { changeSpidToPid } from '../../../../utils/MatchStatistics';

const PlayerImg = ({ spId }: PlayerImgProps) => {
  const [imgUrl, setImgUrl] = useState<string | null>(null);

  useEffect(() => {
    const getImage = async () => {
      const fifa = new FIFAData();

      let result = null;
      try {
        result = await fifa.getActionImg(spId);
      } catch {
        const pid = changeSpidToPid(spId);

        result = await fifa.getHeadImg(pid);
      } finally {
        setImgUrl(result);
      }
    };

    getImage();
  }, [spId]);

  return (
    <div>
      <img src={imgUrl!} alt="선수 이미지" />
    </div>
  );
};

export default PlayerImg;
